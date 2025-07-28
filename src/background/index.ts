chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in background:', message);
  sendResponse({ status: 'Message received' });
});