import type { Plugin } from 'vite'
import Koa from 'koa'

export const app = new Koa()
app.listen(9719)

export default (): Plugin => {
  return {
    name: 'vite-plugin-koa-mock',
    config: () => ({
    }),
  }
}
