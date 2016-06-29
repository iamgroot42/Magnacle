// Delete session when exiting Chrome
chrome.windows.onRemoved.addListener(function(windowId){
		chrome.windows.getAll(function(windows) {
    		if(!windows.length)
    		{
		    	chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
          			var token = obj['KnurkdLoginToken']; 
          			chrome.storage.sync.remove('KnurkdLoginToken',function() {
              			chrome.storage.sync.remove('KnurkdLoginUsername',function() {
              				console.log("Removed data..shouldn't be here now");
              				console.log("WTAF");
         	 				});
     	 			});	
   				});	
    		}
		});
	});