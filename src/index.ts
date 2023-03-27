import type { Plugin, ProxyOptions } from 'vite'
import type { Middleware } from 'koa'
import { blue, bold, dim, green } from 'kolorist'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

import type { KoaMockOptions } from './types'
import logger from './logger'

declare module 'koa' {
  interface Request {
    body?: unknown
    rawBody: string
  }
}

const koaApp = new Koa()

// to ensure that builtin middleware is used before using user middleware
const _use = koaApp.use.bind(koaApp)
const userMiddleware: Middleware[] = []
// @ts-expect-error it's ok
koaApp.use = (middleware) => {
  // @ts-expect-error it's ok
  userMiddleware.push(middleware)
  return koaApp
}

function useUserMiddleware() {
  for (const middleware of userMiddleware)
    _use(middleware)
}

function createPlugin(options: KoaMockOptions = {}): Plugin {
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
    bodyParser: enableBodyParser = true,
  } = options

  // use builtin middleware
  if (enableLogger)
    _use(logger())
  if (enableCors)
    _use(cors(typeof enableCors === 'boolean' ? undefined : enableCors))
  if (enableBodyParser)
    _use(bodyParser())

  // use user middleware
  useUserMiddleware()

  // start to listen
  const server = koaApp.listen(port)

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
        console.log(`  ${dim(green('➜'))}  ${dim(bold('Mock'))}: ${blue(`http://localhost:${port}/`)}`)
      }
      const _restart = devServer.restart
      devServer.restart = async (forceOptimize?: boolean) => {
        await new Promise<void>(resolve => server.close(() => resolve()))
        await _restart(forceOptimize)
      }
      const _close = devServer.close
      devServer.close = async () => {
        await new Promise<void>(resolve => server.close(() => resolve()))
        await _close()
      }
    },
  }
}

export type { Middleware } from 'koa'
export type { Options as CorsOptions } from '@koa/cors'
export { default as Router } from '@koa/router'

export type { KoaMockOptions } from './types'
export const app = koaApp
export default createPlugin
