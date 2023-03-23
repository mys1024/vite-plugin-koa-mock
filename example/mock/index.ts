import { Router, app } from 'vite-plugin-koa-mock'

const router = new Router()

router.get('/api/foo', (ctx) => {
  ctx.body = 'bar'
})

app.use(router.routes())
app.use(router.allowedMethods())
