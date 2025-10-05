/**
 * 注入网页js逻辑
 */
import {createRoot, Root} from "react-dom/client";
import App from "./App";
import {ReactNode} from "react";

// 创建隔离的容器
function createComponentContainer(id: string) {
    // 检查是否已经存在容器
    const existingContainer = document.getElementById(id);
    if (existingContainer) {
        existingContainer.innerHTML = ''; // 清空内容
        return existingContainer;
    }

    const container = document.createElement('div');
    container.id = id;
    document.body.appendChild(container);
    return container;
}

function renderApp() {
    const root = createRoot(createComponentContainer('xc_app'));
    root.render(<App/> as ReactNode)
}

function initEvent() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            //  初始化的时候加载基础组件，组件用于承载一些相关的功能
            if (message.action === 'initial') {
                renderApp()
                sendResponse({status: 'success'});
            }

            if (message.action === 'Intelligent') {
                // 派发自定义事件
                window.dispatchEvent(new CustomEvent('pluginMessage', {
                    detail: {
                        action: message.action,
                        data: message.data
                    }
                }));
                sendResponse({status: 'success'});
            }

            if (message.action === 'CreateRule') {
                // 派发自定义事件
                window.dispatchEvent(new CustomEvent('pluginMessage', {
                    detail: {
                        action: message.action,
                        data: message.data
                    }
                }));
                sendResponse({status: 'success'});
            }

            return true

        }
    )
}

function initWebSocket() {
    // 开发环境下连接 WebSocket
    if (process.env.NODE_ENV === 'development') {
        const socket = new WebSocket(`${process.env.WS_SERVER_URL}?clientType=content`);

        socket.onmessage = (event) => {
            if (event.data === 'RELOAD') {
                // console.log('🔄 收到热更新信号！!');
                // 重新渲染组件（暂时行不通）
                // renderApp();
                //  修改成：在background 中 刷新插件，然后在content 中去刷新页面
                window.location.reload()
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket 错误:', error);
        };
    }
}

initEvent()
initWebSocket()