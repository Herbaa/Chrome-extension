window.onload = () => {
  const btnInfo = document.getElementById('btnInfo')
  const btnTrans = document.getElementById('btnTrans')
  const btnCloseAll = document.getElementById('btnCloseAll')

  function sendMessage(action) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action }, () => window.close());
    });
  }
  btnTrans.onclick = () => sendMessage('showTranslator')
  btnInfo.onclick = () => sendMessage('showInfo')
  btnCloseAll.onclick = () => sendMessage('closeAll')
};