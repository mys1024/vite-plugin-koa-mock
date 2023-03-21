import type { Plugin } from 'vite'
import type Koa from 'koa'

export default (
  config: {
    app: Koa
    port?: number
  },
): Plugin => {
  const {
    app,
    port = 9719,
  } = config

  app.listen(port)

  return {
    name: 'vite-plugin-koa-mock',
    config: () => ({
    }),
  }
}
