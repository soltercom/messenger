let PATH2 = 'http://localhost:3000';
//let PATH2 = 'http://Альтерком.РФ:3000';

function openExt() {
	chrome.tabs.query({ url: `${PATH2}/*` }, (tabs: chrome.tabs.Tab[]) => {
		if (tabs.length > 0) {
			chrome.tabs.highlight({
				tabs: tabs.map(item => item.index)
			}, null);
		} else {
			chrome.tabs.create({
				url: `${PATH2}`
			});
		}
	});

}

function optionsExt() {
	chrome.runtime.openOptionsPage();
}

function reloadExt() {
  chrome.runtime.reload();
}

document.getElementById('open').addEventListener('click', openExt);
document.getElementById('options').addEventListener('click', optionsExt);
document.getElementById('reload').addEventListener('click', reloadExt);
