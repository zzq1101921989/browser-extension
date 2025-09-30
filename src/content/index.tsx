/**
 * 注入网页js逻辑
 */

import mountIdentifyArea from "./components/IntelligentRecognitionModal";
import mountCreateRuleArea from "./components/mountCreateRuleArea/CreateRuleArea";
import {createRoot} from "react-dom/client";
import App from "./App";
import {ReactNode} from "react";

type ConCreateRuletentScriptMessage = {
    action: AppType.MessageStatus;
    data?: any;
}

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


function initEvent() {
    window.onload = () => {
        console.log('插件加载完成 -----');
    }

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            //  初始化的时候加载基础组件，组件用于承载一些相关的功能
            if (message.action === 'initial') {
                const root = createRoot(createComponentContainer('xc_app'));
                root.render(<App/> as ReactNode)
                sendResponse({status: 'success'});
            }

            if (message.action === 'Intelligent') {
                console.log('触发了把')
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

initEvent()