const xml2js = require('xml2js')
const template = require('./tpl')

exports.parseXML = xml => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { trim: true }, (err, content) => {
      if (err) {
        reject(err)
      } else {
        resolve(content)
      }
    })
  })
}

// 将xml转成json 对象
const formatMessage = result => {
  let message = {}
  if (typeof result === 'object') {
    const keys = Object.keys(result)

    for (let i = 0; i < keys.length; i++) {
      let item = result[keys[i]]
      let key = keys[i]
      if (!(item instanceof Array) || item.length === 0) {
        continue
      }
      if (item.length === 1) {
        let val = item[0]
        if (typeof val === 'object') {
          message[key] = formatMessage(val)
        } else {
          message[key] = (val || '').trim()
        }
      } else {
        message[key] = []
        for (let j = 0; j < item.length; j++) {
          message[key].push(formatMessage(item[j]))
        }
      }
    }
  }
  return message
}

const tep = (content, msg) =>{
  // 先写一个默认值,防止出错
  let type = 'text'
  // content是数组的话可能是图文消息
  if (Array.isArray(content)) {
    type ='news'
  }
  if (!content) content ='Empty News'
           
  if(content && content.type) {
    type = content.type
  }
  // 在拼装之前把数据整理

  let info = Object.assign({},{
    content: content,
    msgType: type,
    createTime: new Date().getTime(),
    toUserName: msg.FromUserName,
    formUserName: msg.ToUserName
  })
//  这个template就是把这数据替换成占位符的模板
return template(info)
}

exports.formatMessage = formatMessage
