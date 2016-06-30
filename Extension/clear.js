// Delete session when exiting Chrome
chrome.windows.onRemoved.addListener(function(windowId){
		chrome.windows.getAll(function(windows) {
    		if(!windows.length)
    		{
          	chrome.storage.sync.remove('KnurkdLoginKey',function() { console.log("Key removed");});
          	chrome.storage.sync.remove('KnurkdVerificationWords',function() { console.log("VWs removed");});
          	chrome.storage.sync.remove('KnurkdVerificationSecret',function() { console.log("VSt removed");});
    		}
		});
	});