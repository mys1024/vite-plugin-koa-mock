import type { Middleware } from 'koa'
import { green } from 'kolorist'

import { log } from './utils'

export default (): Middleware => {
  return async (ctx, next) => {
    await next()
    log([
      ctx.response.status,
      ctx.method,
      green(ctx.url),
    ].join(' '))
  }
}
