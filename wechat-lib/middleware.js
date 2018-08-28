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
        // 实现一个自动回复功能,总共四步
        // 1. 拿到微信服务器发送过来的data
        // 2. 将data解析为json格式
        // 3. 拼装成xml的数据片段
        // 4. 通过ctx返回数据

        const data = await getRawBody(ctx.req, {
          length: ctx.length,
          limit: '1mb', // 体积过大就丢掉
          encoding: ctx.charset
        })
        // 2. 将data解析为json格式
        const content = await util.parseXml(data)
        const message = util.formatMessage(content.xml)
        // 3. 拼装成xml的数据片段
        // 4. 通过ctx返回数据

        ctx.body = 'wecome to la la la'
      }
    }
  }
}
