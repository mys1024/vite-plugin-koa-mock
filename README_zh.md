# vite-plugin-koa-mock

[![npm-version](https://img.shields.io/npm/v/vite-plugin-koa-mock?style=flat-square&color=%23cb3837)](https://www.npmjs.com/package/vite-plugin-koa-mock)
[![license](https://img.shields.io/github/license/mys1024/vite-plugin-koa-mock?&style=flat-square)](./LICENSE)

[English](./README.md) | 中文

使用 **Koa.js** 为你的 **Vite** 项目提供模拟接口。

![logger](https://raw.githubusercontent.com/mys1024/vite-plugin-koa-mock/main/images/cover.png)

## 安装

```shell
npm install -D vite-plugin-koa-mock
```

## 用法

配置 `vite.config.js`：

```javascript
import { defineConfig } from 'vite'
import KoaMock from 'vite-plugin-koa-mock'

export default defineConfig({
  plugins: [
    KoaMock({
      mockDir: './mock',
      proxyKeys: ['/api'],
    }),
  ],
})
```

创建 `mock/index.js` 或 `mock/index.ts`，并编写你的模拟接口：

```javascript
import { Router } from 'vite-plugin-koa-mock'

export const router = new Router()

router.get('/api/foo', (ctx) => {
  ctx.body = 'bar'
})

router.get('/api/bar', (ctx) => {
  ctx.body = 'foo'
})
```

## 选项

```typescript
import type { Options as CorsOptions } from '@koa/cors'

export interface KoaMockOptions {
  /**
   * The dir for mock APIs.
   * @default './mock'
   */
  mockDir?: string

  /**
   * The port for mock server.
   * @default 9719
   */
  port?: number

  /**
   * Keys for Vite's configuration `server.proxy`.
   * @see https://vitejs.dev/config/server-options.html#server-proxy
   * @default ['/api']
   */
  proxyKeys?: string[]

  /**
   * Whether to enable builtin logger middleware.
   * @default true
   */
  logger?: boolean

  /**
   * Whether to enable builtin CORS middleware.
   * You can configure the CORS middleware by setting an options object.
   * @see https://github.com/koajs/cors#corsoptions
   * @default true
   */
  cors?: boolean | CorsOptions

  /**
   * Whether to enable builtin body parser middleware.
   * @see https://github.com/koajs/bodyparser
   * @default true
   */
  bodyParser?: boolean
}
```

## 许可证

[MIT](./LICENSE) License &copy; 2024-PRESENT
[mys1024](https://github.com/mys1024)
