const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// 监听文件变化
const chokidar = require('chokidar');
chokidar.watch('./dist/content.js').on('change', () => {
    console.log('🔄 content.js已更新，通知所有客户端');
    console.log(Array.from(wss.clients).map(item => item.clientType), 'wss.clients')
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send('RELOAD');
        }
    });
});

// 连接管理
wss.on('connection', (ws, req) => {
    // 从URL解析客户端类型
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    ws.clientType = urlParams.get('clientType'); // 'content' 或 'background'

    console.log(`[连接] 类型: ${ws.clientType}, IP: ${ws._socket.remoteAddress}`);

    ws.on('close', () => {
        console.log(`❌客户端断开连接：${ws.clientType}, IP: ${ws._socket.remoteAddress}`);
    });
});

console.log('🚀 WebSocket热更新服务器已启动 (ws://localhost:8080)');