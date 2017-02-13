//const SOCKET_PATH = 'http://localhost:3000';
//const PATH        = 'http://localhost:3000';

const SOCKET_PATH = 'http://80.73.81.154:3000';
const PATH = 'http://80.73.81.154:3000';

let socket = io(SOCKET_PATH);

let i18Msg = chrome.i18n.getMessage;
let alarmId: string = "repeatNotifications";
let alarmPeriod: number = 0.25;

function createRepeatNotificationAlarm() {
  chrome.alarms.clear(alarmId, (wasCleared: boolean) => {
    chrome.alarms.create(alarmId, {
      delayInMinutes: alarmPeriod
    });
  });
}

function createNotification(data: any) {

  let items = data.map(message => {
    return {
      title:   `${i18Msg('from')} ${message.addressee}`,
      message: `${message.text.substr(0, 20)}${message.text.length > 20?"...":""}`
    }
  });

  chrome.notifications.create("new messages", {
    type:    'list',
    iconUrl: 'icons/icon48.png',
    title:   i18Msg('titleNewMsg'),
    message: '',
    items:   items,
    buttons: [
      {
        title: i18Msg('openButtonTitle'),
        iconUrl: 'icons/open_in_browser.png'
      }
    ],
  }, (id: string) => {
    createRepeatNotificationAlarm();
    chrome.tts.speak(i18Msg('ttsNewMessages'), { lang: 'ru' }, () => {
      if (chrome.runtime.lastError) {
        console.log('TTS Error: ' + chrome.runtime.lastError.message);
      }});
  });
}

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

function activateTab(id: string, index: number) {
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
}

function connect() {
  chrome.browserAction.setIcon({ path: 'icons/icon19.png' });
  chrome.storage.sync.get('pin', (item: {pin: string}) => {
    if (item && item.pin) socket.emit('ext online', {pin: item.pin});
  });
}

function disconnect() {
  chrome.browserAction.setIcon({ path: 'icons/icon19-.png' });
}

function onWindowMessage(data: any) {
  if (data.pin)
    chrome.storage.sync.set({pin: data.pin}, () => {
      console.log('pin saved');
    });
}

function onAlarm(alarm: chrome.alarms.Alarm) {
  if (alarm.name === alarmId) {
    chrome.storage.sync.get('pin', (item: {pin: string}) => {
      if (item && item.pin) socket.emit('ext has new messages', {pin: item.pin});
    });
  }
}

function createNotificationNewMessages() {
  chrome.notifications.create("new messages", {
    type:    'basic',
    iconUrl: 'icons/icon48.png',
    title:   i18Msg('titleNewMsg'),
    message: i18Msg('ttsNewMessagesRepeat'),
    buttons: [
      {
        title: i18Msg('openButtonTitle'),
        iconUrl: 'icons/open_in_browser.png'
      }
    ],
  }, (id: string) => {
    createRepeatNotificationAlarm();
    chrome.tts.speak(i18Msg('ttsNewMessagesRepeat'), { lang: 'ru' }, () => {
      if (chrome.runtime.lastError) {
        console.log('TTS Error: ' + chrome.runtime.lastError.message);
      }});
  });
}

socket.on('connect', connect);
socket.on('disconnect', disconnect);
socket.on('ext message', createNotification);
socket.on('ext has new messages', createNotificationNewMessages);

chrome.notifications.onButtonClicked.addListener(activateTab);
chrome.runtime.onMessage.addListener(onWindowMessage);
chrome.alarms.onAlarm.addListener(onAlarm);

chrome.browserAction.setIcon({ path: 'icons/icon19-.png' });