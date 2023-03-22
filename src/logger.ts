import type { Middleware } from 'koa'
import { bold, green } from 'kolorist'

import { log } from './utils'

export default (): Middleware => {
  return async (ctx, next) => {
    await next()
    log([
      ctx.response.status,
      bold(ctx.method),
      green(ctx.url),
    ].join(' '))
  }
}
