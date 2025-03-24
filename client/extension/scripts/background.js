// listen for the OPEN_EXTENSION message from notification popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'OPEN_EXTENSION') {
    // open the extension popup programmatically
    chrome.action.openPopup();
  }
}); 