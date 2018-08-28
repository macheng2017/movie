const Koa = require('koa')
const sha1 = require('sha1')
const config = require('./config/config')
const wechat = require('./wechat-lib/middleware')
const app = new Koa()

app.use(wechat(config))
app.listen(3000)
console.log('listen: ' + 3000)
