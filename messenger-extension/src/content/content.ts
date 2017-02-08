window.addEventListener("message", (event) => {
	// We only accept messages from ourselves
	if (event.source != window)
		return;

	if (event.data.pin)
		chrome.runtime.sendMessage(event.data);

	if (event.data.totalNewMessages !== undefined)
		chrome.runtime.sendMessage(event.data);

}, false);