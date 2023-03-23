# vite-plugin-koa-mock

English | [中文](./README_zh.md)

Serve mock API with **Koa.js** in **Vite** projects.

![logger](https://raw.githubusercontent.com/mys1024/vite-plugin-koa-mock/main/images/logger.png)

## Install

```shell
npm install -D vite-plugin-koa-mock
```

## Usage

Create `mock/index.js` and write mock API:

```javascript
import { app } from 'vite-plugin-koa-mock'

app.use((ctx) => {
  ctx.body = 'bar'
})
```

Config `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import KoaMock from 'vite-plugin-koa-mock'

import './mock/index' // necessary

export default defineConfig({
  plugins: [
    KoaMock({ proxyKeys: ['/api'] }),
  ],
})
```

Send requests in your application code:

```javascript
const res = await fetch('/api/foo')
console.log(await res.text()) // -> bar
```

## Options

```typescript
import type { Options as CorsOptions } from '@koa/cors'

export interface KoaMockOptions {
  /**
   * The port of mock server.
   */
  port?: number

  /**
   * Keys for Vite's configuration `server.proxy`.
   * @see https://vitejs.dev/config/server-options.html#server-proxy
   */
  proxyKeys?: string[]

  /**
   * Whether to enable builtin logger middleware.
   */
  logger?: boolean

  /**
   * Whether to enable builtin CORS middleware.
   * You can configure the CORS middleware by setting an options object.
   * @see https://github.com/koajs/cors#corsoptions
   */
  cors?: boolean | CorsOptions
}
```

## Koa middleware

The variable `app` we imported in `mock/index.js` is a Koa instance, so we can set the Koa middleware you need for this instance, such as `@koa/router`, `koa-bodyparser`, and so on.

Example with `@koa/router`:

```javascript
import Router from '@koa/router'
import { app } from 'vite-plugin-koa-mock'

const router = new Router()

router.get('/api/foo', (ctx) => {
  ctx.body = 'bar'
})

app.use(router.routes())
app.use(router.allowedMethods())
```

## License

MIT
