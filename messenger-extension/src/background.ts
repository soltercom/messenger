//let SOCKET_PATH = 'http://localhost:3000';
//let PATH        = 'http://localhost:3000';
let SOCKET_PATH = 'http://Альтерком.РФ:3000';
let PATH = 'http://Альтерком.РФ:3000';

let socket = io(SOCKET_PATH);

function highlightWindow(windowId: number) {
  chrome.windows.update(windowId, { drawAttention: true });
}

function clearNotification(id: string) {
  chrome.notifications.clear(id);
}

function highlightTabs(notificationId: string, tabs: chrome.tabs.Tab[]) {
  chrome.tabs.highlight({tabs: tabs.map(item => item.index)}, () => {
    highlightWindow(tabs[0].windowId);
    clearNotification(notificationId);
  });
}

function createTab(notificationId: string, windowId: number) {
  chrome.tabs.create({ url: `${PATH}`, windowId: windowId }, () => {
    highlightWindow(windowId);
    clearNotification(notificationId);
  });
}

function createWindow(notificationId: string) {
  chrome.windows.create((window: chrome.windows.Window) => {
    chrome.tabs.query({windowId: window.id}, (tabs: chrome.tabs.Tab[]) => {
      if (tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { url: `${PATH}`});
        highlightWindow(window.id);
      } else {
        createTab(notificationId, window.id);
      }
    });
  });
}

chrome.storage.sync.get('pin', (item: {pin: string}) => {
  if (item && item.pin) socket.emit('ext online', { pin: item.pin });
});

socket.on('ext message', (data: any) => {
  console.log(data);
  let titleNewMsg      = chrome.i18n.getMessage('titleNewMsg');
  let from             = chrome.i18n.getMessage('from');
  let openButtonTitle  = chrome.i18n.getMessage('openButtonTitle');
  let closeButtonTitle = chrome.i18n.getMessage('closeButtonTitle');
  let items = data.map(message => {
    return {
      title: `${from} ${message.addressee}`,
      message: `${message.text.substr(0, 20)}${message.text.length > 20?"...":""}`
    }});
  chrome.notifications.create('new message', {
    type: 'list',
    iconUrl: 'icons/icon48.png',
    title: titleNewMsg,
    message: '',
    items: items,
    buttons: [
      {
        title: openButtonTitle,
        iconUrl: 'icons/open_in_browser.png'
      }
    ],
    requireInteraction: true
  });
});

chrome.notifications.onButtonClicked
  .addListener((id: string, index: number) => {
    if (id && index === 0) {
      chrome.tabs.query({ url: `${PATH}/*` }, (tabs: chrome.tabs.Tab[]) => {
        if (tabs.length > 0) {
          highlightTabs(id, tabs);
        } else {
          chrome.windows.getAll((windows: chrome.windows.Window[]) => {
            if (windows.length > 0) {
              createTab(id, windows[0].id);
            } else {
              createWindow(id);
            }
          });
        }
      });
    }
  });
