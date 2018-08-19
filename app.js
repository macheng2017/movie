const Koa = require('koa')
const sha1 = require('sha1')
const config = {
    wechat: {
        appID: '',
        appSecret: '',
        token: ''
    }
}
const app = new Koa()

app.use(async (ctx, next) =>{
    const {signature, timestamp, nonce, echostr} = ctx.query 
    const token = config.wechat.token
    let str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
// 在自己的服务器，已经作过校验了
    if (sha === signature) {
        ctx.body = echostr
    }else {
        ctx.body = "wrong"
    }
})
app.listen(3000)
console.log('listen: '+ 3000);