const Koa = require("koa")
const sha1 = require("sha1")
const config = require("./config/config")
const app = new Koa()

app.use()
app.listen(3000)
console.log("listen: " + 3000)
