import { defineConfig } from 'vite'
import KoaMock from '../dist/index'

export default defineConfig({
  plugins: [
    KoaMock(),
  ],
})
