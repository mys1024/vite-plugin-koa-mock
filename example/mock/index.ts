import Router from '@koa/router'
import { app } from '../../src/index'

const router = new Router()

router.get('/api/foo', (ctx) => {
  ctx.body = 'bar'
})

app.use(router.routes())
app.use(router.allowedMethods())
