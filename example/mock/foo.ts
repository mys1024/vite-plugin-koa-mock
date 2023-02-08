import { app } from '../../dist/index'

app.use((ctx) => {
  ctx.body = 'bar'
})
