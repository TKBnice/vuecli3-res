const WebSocket = require('ws');

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
    port: 3000
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

console.log('ws server started at port 3000...');

// client test:

// let count = 0;

// let ws = new WebSocket('ws://localhost:3000/ws/chat');

// ws.on('open', function () {
//     console.log(`[CLIENT] open()`);
//     ws.send('Hello!');
// });

// ws.on('message', function (message) {
//     console.log(`[CLIENT] Received: ${message}`);
//     count++;
//     if (count > 3) {
//         ws.send('Goodbye!');
//         ws.close();
//     } else {
//         setTimeout(() => {
//             ws.send(`Hello, I'm Mr No.${count}!`);
//         }, 1000);
//     }
// });

var vm = require('vm');

var localVar = 'initial value';
var data = "data"
//在runInThisContext创建的沙箱环境中执行
var vmResult = vm.runInThisContext('localVar = "vmaaaaaaaa";data = "aaaaaaaaaa"');
console.log('vmResult: ', vmResult);    //vmResult:  vm
console.log('localVar: ', localVar);    //localVar:  initial value

//在eval中执行
var evalResult = eval('localVar = "evaaaaaaaaaaaaaaal";data = "aaaaaaaaaa"');
console.log('evalResult: ', evalResult);	//evalResult:  eval
console.log('localVar: ', localVar);	//localVar:  eval