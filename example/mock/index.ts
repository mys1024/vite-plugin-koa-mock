import Koa from 'koa'

export const app = new Koa()

app.use((ctx) => {
  ctx.body = 'bar'
})
