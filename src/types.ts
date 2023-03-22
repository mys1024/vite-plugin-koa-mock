import type { Options as CorsOptions } from '@koa/cors'

export interface KoaMockOptions {
  /**
   * The port of mock server.
   */
  port?: number

  /**
   * Keys for Vite's configuration `server.proxy`.
   * @see https://vitejs.dev/config/server-options.html#server-proxy
   */
  proxyKeys?: string[]

  /**
   * Whether to enable builtin logger middleware.
   */
  logger?: boolean

  /**
   * Whether to enable builtin CORS middleware.
   * You can configure the CORS middleware by setting an options object.
   * @see https://github.com/koajs/cors#corsoptions
   */
  cors?: boolean | CorsOptions
}
