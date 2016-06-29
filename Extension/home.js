document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
		if(obj['KnurkdLoginToken'])
		{
			chrome.storage.sync.get('KnurkdLoginKey', function (obj) {
				if(obj['KnurkdLoginKey'])
				{
					// Redirect to master login
					location.href = "logged_in.html";		
				}
				else
				{
					// Redirect to voice auth
					location.href = "authenticate.html";	
				}
			});
		}
		else
		{
			// Redirect to normal mode
			location.href = "login.html"; 
		}
	});
}, false);
