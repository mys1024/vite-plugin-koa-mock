import type { Plugin, ProxyOptions } from 'vite'
import type { Middleware } from 'koa'
import type { Options as CorsOptions } from '@koa/cors'
import Koa from 'koa'
import cors from '@koa/cors'
import { blue, bold, dim, green } from 'kolorist'

import logger from './logger'

export const app = new Koa()

// to ensure that internal middleware is used before using user middleware
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
  config: {
    port?: number
    proxyKeys?: string[]
    logger?: boolean
    cors?: boolean | CorsOptions
  } = {},
): Plugin => {
  // options
  const {
    port = 9719,
    proxyKeys = [],
    logger: enableLogger = true,
    cors: enableCors = true,
  } = config

  // use internal middleware
  if (enableLogger)
    _use(logger())
  if (enableCors)
    _use(cors(typeof enableCors === 'boolean' ? undefined : enableCors))

  // use user middleware
  useUserMiddleware()

  // start to listen
  const server = app.listen(port)

  // config vite's server.proxy
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
