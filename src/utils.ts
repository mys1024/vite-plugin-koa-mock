import { blue, bold } from 'kolorist'

export function log(message: any) {
  const date = new Date()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const time = `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`
  console.log(
    time,
    blue(bold('[mock]')),
    message,
  )
}
