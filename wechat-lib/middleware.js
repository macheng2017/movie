const sha1 = require('sha1')
module.exports = config => {
  return async (ctx, next) => {
    const { signature, timestamp, nonce, echostr } = ctx.query
    const token = config.wechat.token
    let str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    // 在自己的服务器，已经作过校验了
    // console.log(signature)
    // console.log(sha)
    if (ctx.method === 'GET') {
      if (sha === signature) {
        ctx.body = echostr
      } else {
        ctx.body = 'Failed'
      }
    } else if (ctx.method === 'POST') {
      if (sha !== signature) {
        ctx.body = 'Failed'
      } else {
        ctx.body = 'wecome to la la la'
      }
    }
  }
}
