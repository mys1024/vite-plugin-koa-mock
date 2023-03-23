# vite-plugin-koa-mock

[English](./README.md) | 中文

使用 **Koa.js** 为你的 **Vite** 项目提供模拟接口。

![logger](https://raw.githubusercontent.com/mys1024/vite-plugin-koa-mock/main/images/cover.png)

## 安装

```shell
npm install -D vite-plugin-koa-mock
```

## 使用方法

创建 `mock/index.js` 并编写模拟接口:

```javascript
import { app } from 'vite-plugin-koa-mock'

app.use((ctx) => {
  ctx.body = 'bar'
})
```

配置 `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import KoaMock from 'vite-plugin-koa-mock'

import './mock/index' // 必要的

export default defineConfig({
  plugins: [
    KoaMock({ proxyKeys: ['/api'] }),
  ],
})
```

在你的应用代码中发送请求:

```javascript
const res = await fetch('/api/foo')
console.log(await res.text()) // -> bar
```

## 配置项

```typescript
import type { Options as CorsOptions } from '@koa/cors'

export interface KoaMockOptions {
  /**
   * 模拟服务器的端口。
   * @default 9719
   */
  port?: number

  /**
   * 用于配置 Vite 配置项 `server.proxy` 的键值数组。
   * @see https://vitejs.dev/config/server-options.html#server-proxy
   * @default []
   */
  proxyKeys?: string[]

  /**
   * 是否启用内置的日志中间件。
   * @default true
   */
  logger?: boolean

  /**
   * 是否启用内置的 CORS 中间件。
   * 你可以设置一个选项对象来配置这个 CORS 中间件。
   * @see https://github.com/koajs/cors#corsoptions
   * @default true
   */
  cors?: boolean | CorsOptions

  /**
   * 是否启用内置的 body 解析中间件。
   * @see https://github.com/koajs/bodyparser
   * @default true
   */
  bodyParser?: boolean
}
```

## Koa 中间件

在 `mock/index.js` 中导入的变量 `app` 是一个 Koa 实例，因此你可以为这个实例设置你所需的 Koa 中间件。

`vite-plugin-koa-router` 将 `@koa/router` 导出为 `Router`。这是一个使用路由中间件的例子：

```javascript
import { Router, app } from 'vite-plugin-koa-mock'

const router = new Router()

router.get('/api/foo', (ctx) => {
  ctx.body = 'bar'
})

app.use(router.routes())
app.use(router.allowedMethods())
```

## License

MIT
