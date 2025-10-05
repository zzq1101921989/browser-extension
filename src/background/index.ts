// 开发模式下的热更新监听
if (process.env.NODE_ENV === 'development') {
    const ws = new WebSocket(`${process.env.WS_SERVER_URL}?clientType=background`);

    // 监听到 ws-server 服务发送的消息
    ws.onmessage = (event) => {
        if (event.data === 'RELOAD') {
            // 刷新浏览器插件插件
            chrome.runtime.reload();
        }
    };

    ws.onerror = (error) => {
        console.error('WebSocket连接错误:', error);
    };
}

console.log("后台服务启动中 ...")