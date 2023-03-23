import type { Plugin, ProxyOptions } from 'vite'
import type { Middleware } from 'koa'
import Koa from 'koa'
import cors from '@koa/cors'
import { blue, bold, dim, green } from 'kolorist'

import type { KoaMockOptions } from './types'
import logger from './logger'

export const app = new Koa()

// to ensure that builtin middleware is used before using user middleware
const _use = app.use.bind(app)
const userMiddleware: Middleware[] = []
// @ts-expect-error it's ok
app.use = (middleware) => {
  // @ts-expect-error it's ok
  userMiddleware.push(middleware)
  return app
}

function useUserMiddleware() {
  for (const middleware of userMiddleware)
    _use(middleware)
}

export default (
  options: KoaMockOptions = {},
): Plugin => {
  // enabled only in development mode
  if (process.env.NODE_ENV !== 'development') {
    return {
      name: 'vite-plugin-koa-mock',
      apply: () => false,
    }
  }

  // options
  const {
    port = 9719,
    proxyKeys = [],
    logger: enableLogger = true,
    cors: enableCors = true,
  } = options

  // use builtin middleware
  if (enableLogger)
    _use(logger())
  if (enableCors)
    _use(cors(typeof enableCors === 'boolean' ? undefined : enableCors))

  // use user middleware
  useUserMiddleware()

  // start to listen
  const server = app.listen(port)

  // configure Vite's server.proxy
  const proxyOptions = {
    target: `http://localhost:${port}`,
    changeOrigin: true,
  }
  const proxy: Record<string, ProxyOptions> = {}
  for (const key of proxyKeys)
    proxy[key] = proxyOptions

  // return the plugin
  return {
    name: 'vite-plugin-koa-mock',
    apply: 'serve',
    config: () => ({
      server: {
        proxy,
      },
    }),
    configureServer: (devServer) => {
      const _printUrls = devServer.printUrls
      devServer.printUrls = () => {
        _printUrls()
        console.log(`  ${dim(green('➜'))}  ${bold('Mock')}: ${blue(`http://localhost:${port}/`)}`)
      }
      const _restart = devServer.restart
      devServer.restart = async (forceOptimize?: boolean) => {
        await new Promise<void>(resolve => server.close(() => resolve()))
        await _restart(forceOptimize)
      }
    },
  }
}
