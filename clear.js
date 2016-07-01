// Delete session when exiting Chrome
chrome.windows.onRemoved.addListener(function(windowId){
		chrome.windows.getAll(function(windows) {
    		if(!windows.length)
    		{
          	chrome.storage.sync.remove('KnurkdLoginKey',function() {});
    		} 
		});
	});