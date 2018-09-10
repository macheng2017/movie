const ejs = require('ejs')
const tpl =`
<xml>
    <ToUserName><![CDATA[<%= message.FromUserName %>]]></ToUserName>
    <FromUserName><![CDATA[<%= message.ToUserName %>]]></FromUserName>
    <CreateTime><%= createTime %></CreateTime>
    <% if (msgType === 'text'){ %>
        
        <MsgType><![CDATA[text]]></MsgType>
    <% }else if (msgType === 'text'){ %>
    <Content><![CDATA[<%- message.Content %>]]></Content>
</xml>
`