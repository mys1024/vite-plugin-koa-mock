import fs from 'node:fs'

const injection = '/// <reference types="koa" />'

const dts = fs.readFileSync('./dist/index.d.ts', { encoding: 'utf-8' })

fs.writeFileSync('./dist/index.d.ts', `${injection}\n\n${dts}`, { encoding: 'utf-8' })
