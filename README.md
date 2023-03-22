# vite-plugin-koa-mock

Serve mock API with Koa.js in Vite projects.

![logger](https://raw.githubusercontent.com/mys1024/vite-plugin-koa-mock/main/images/logger.png)

## Install

```shell
npm install -D vite-plugin-koa-mock
```

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
      // mock server's port
      port: 9719,
      // keys of vite's server.proxy, see: https://vitejs.dev/config/server-options.html#server-proxy
      proxyKeys: ['/api'], 
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
