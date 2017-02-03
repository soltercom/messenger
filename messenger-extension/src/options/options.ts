function save() {
  let pin = (document.getElementById('pin') as HTMLInputElement).value;
  chrome.storage.sync.set({
    pin: pin
  }, () => {
    chrome.runtime.reload();
  });
}

function restore() {
  chrome.storage.sync.get('pin', function(items : {pin: string}) {
    (document.getElementById('pin') as HTMLInputElement).value = items.pin || '';
  });
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);