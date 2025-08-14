/**
 * 注入网页js逻辑
 */

import mountIdentifyArea from "./components/mountIdentifyArea";
import mountCreateRuleArea from "./components/mountCreateRuleArea";

type ContentScriptMessage = {
  action: App.MessageStatus;
  data?: any;
}

// 创建隔离的容器
function createComponentContainer(id: string) {
  const container = document.createElement('div');
  container.id = id;
  document.body.appendChild(container);
  return container;
}


function initEvent() {
  window.onload = () => {
    console.log('Content script loaded -----');
  }

  chrome.runtime.onMessage.addListener((message: ContentScriptMessage, sender, sendResponse) => {

    console.log(message, 'message');
    
    if (message.action === 'Intelligent') {
      const container = createComponentContainer('intelligent-react-root');
      const unmount = mountIdentifyArea(container);
      sendResponse({ status: 'success' });
    }

    if (message.action === 'CreateRule') {
      const container = createComponentContainer('createRule-react-root');
      const unmount = mountCreateRuleArea(container);
      sendResponse({ status: 'success' });
    }
  }
  )
}

initEvent()