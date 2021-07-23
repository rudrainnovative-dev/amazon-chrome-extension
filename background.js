chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
		var left = screen.width-450;
		var top = 100;
		var width = 380;
		var height = 400;
		var tabUrl = "dna_popup.html?url="+tabs[0].url;
		var popupUrl = chrome.runtime.getURL('dna_popup.html?*');
		chrome.tabs.query({url: popupUrl},function(tabs) {
			if(tabs.length == 0) {
				chrome.tabs.create({ url: chrome.extension.getURL(tabUrl), active: false }, function(tab) { chrome.windows.create({ tabId: tab.id, type: 'popup', 'width': width, 'height': height, 'left': left, 'top': top, focused: true }); });
			}
			else{
				chrome.tabs.remove(tabs[0].id);
				chrome.tabs.create({ url: chrome.extension.getURL(tabUrl), active: false }, function(tab) { chrome.windows.create({ tabId: tab.id, type: 'popup', 'width': width, 'height': height, 'left': left, 'top': top, focused: true }); });
			}
		});
	});

	//chrome.tabs.executeScript({ file: "assets/js/analyzer.js" });
});
