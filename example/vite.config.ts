import { defineConfig } from 'vite'
import KoaMock from '../dist/index'

import { app } from './mock'

export default defineConfig({
  plugins: [
    KoaMock(app),
  ],
})
