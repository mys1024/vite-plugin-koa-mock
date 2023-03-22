import { defineConfig } from 'vite'
import KoaMock from 'vite-plugin-koa-mock'

import './mock/index'

export default defineConfig({
  plugins: [
    KoaMock({
      port: 9719,
      proxyKeys: ['/api'],
    }),
  ],
})
