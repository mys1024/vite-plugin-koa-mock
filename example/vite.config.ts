import { defineConfig } from 'vite'
import KoaMock from '../src/index'

import './mock/index'

export default defineConfig({
  plugins: [
    KoaMock({
      port: 9719,
      proxyKeys: ['/api'],
    }),
  ],
})
