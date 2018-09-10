/**
 * 放置回复业务代码
 *
 * target: 配置正确的回复策略
 */
exports.reply = async (ctx, next) => {
  const message = ctx.weixin
  if (message.MsgType === 'text') {
    let content = message.Content
    // 默认回复
    let reply = 'oh,你说的' + content + '太复杂了，无法解析'
    if (content === '1') {
      reply ='把你的心我的心穿一穿'
        
    } else if ( content ==='2'){
      reply ='我们是终身学习者'
    } else if (content ==='3') {
      reply = '注意力>时间>金钱'
    } else if (content==='呵呵') {
      reply='呵呵笑很重要'
    }
    // 把回复的内容交给ctx,然后调用next(),让回复流程向下走
    ctx.body = reply
  }
  await next()
}
