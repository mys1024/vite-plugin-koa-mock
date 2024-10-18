import { defineConfig } from 'vite'
import KoaMock from '../src/index'

export default defineConfig({
  plugins: [
    KoaMock(),
  ],
})
