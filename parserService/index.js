require('babel-register');
var express = require('express'),
routes    = require('./routes'),
path = require('path'),
pkg = require('./package'),
WebSocket = require('ws');


var app = express();

const WebSocketServer = WebSocket.Server;


// 设置模板目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// 设置模板全局常量
// 在调用 res.render 的时候，express 合并（merge）了 3 处的结果后传入要渲染的模板
// 第一处就是app.locals --模板全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

app.all('*', function (req, res, next) {
  // console.log('req.headers.origin',req.headers.origin);
  
  if( req.headers.origin == "http://localhost:8800" || req.headers.origin == "http://localhost:8088" || req.headers.origin == "http://127.0.0.1:8088" ){ 
    res.header('Access-Control-Allow-Origin', req.headers.origin);//跨域允许的域名
    res.header('Access-Control-Allow-Headers', '*');//跨域允许包含的头。
    res.header('Access-Control-Allow-Methods', '*');//允许的请求方式。
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-Type", "application/json;charset=utf-8");
  } 
  
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }

});

// parse user from cookie:
// app.use(async (ctx, next) => {
//   ctx.state.user = parseUser(ctx.cookies.get('name') || '');
//   await next();
// });

app.use('/',routes)


app.use(function (err, req, res, next) {
  console.error(err)
})
//开启站点
var server  = app.listen(8800,function(){
    console.log("http://localhost:8800,启动服务")

});

const wss = new WebSocketServer({
  server : server 
});

wss.on('connection', function (ws) {
  console.log(`[SERVER] connection()`);
  ws.on('message', function (message) {
      console.log(`[SERVER] Received: ${message}`);
      setTimeout(() => {
        ws.send(`Hello,your ${message}`, (err) => {
              if (err) {
                  console.log(`[SERVER] error: ${err}`);
              }
          });
      }, 1000);
  })
});

console.log(`ws server started at port 8800...`);

