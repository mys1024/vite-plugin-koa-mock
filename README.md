# vite-plugin-koa-mock

Serve mock API with Koa.js in Vite project.

## Usage

mock/index.js:

```javascript
import { app } from 'vite-plugin-koa-mock'

router.use('/api/foo', (ctx) => {
  ctx.body = 'bar'
})
```

vite.config.js:

```javascript
import { defineConfig } from 'vite'
import KoaMock from 'vite-plugin-koa-mock'

import './mock/index' // necessary

export default defineConfig({
  plugins: [
    KoaMock({
      port: 9719, // mock server's port
      proxyKeys: ['/api'], // config vite's server.proxy, see: https://vitejs.dev/config/server-options.html#server-proxy
    }),
  ],
})
```

src/main.js:

```javascript
const res = await fetch('/api/foo')
console.log(await res.text()) // -> bar
```

## License

MIT
