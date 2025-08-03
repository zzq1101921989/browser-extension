import mountIdentifyArea from "./components/mountIdentifyArea";

type ContentScriptMessage = {
  action: App.MessageStatus;
  data?: any;
}

// 创建隔离的容器
function createComponentContainer() {
  const container = document.createElement('div');
  container.id = 'extension-react-root';

  document.body.appendChild(container);

  return container;
}


function initEvent() {
  window.onload = () => {
    console.log('Content script loaded -----');
  }

  chrome.runtime.onMessage.addListener((message: ContentScriptMessage, sender, sendResponse) => {
    if (message.action === 'Intelligent') {

      const container = createComponentContainer();

      const unmount = mountIdentifyArea(container);

      sendResponse({ status: 'success' });
    }
  }
  )
}

initEvent()