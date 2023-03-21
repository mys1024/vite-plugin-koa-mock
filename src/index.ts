import type { Plugin, ProxyOptions } from 'vite'
import Koa from 'koa'
import cors from '@koa/cors'
import { blue, bold, green } from 'kolorist'

import logger from './logger'

export const app = new Koa()
app.use(logger())
app.use(cors())

export default (
  config: {
    port?: number
    proxyKeys?: string[]
  } = {},
): Plugin => {
  const {
    port = 9719,
    proxyKeys = [],
  } = config

  // start to listen
  const server = app.listen(port)

  // configure vite's server.proxy
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
        console.log(`  ${green('➜')}  ${bold('Mock')}: ${blue(`http://localhost:${port}/`)}`)
      }
      const _restart = devServer.restart
      devServer.restart = async (forceOptimize?: boolean) => {
        await new Promise<void>(resolve => server.close(() => resolve()))
        await _restart(forceOptimize)
      }
    },
  }
}
