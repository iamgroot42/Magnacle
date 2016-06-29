document.addEventListener('DOMContentLoaded', function() {
		  chrome.storage.sync.get('KnurkdLoginUsername', function (obj) {
		    if(obj['KnurkdLoginUsername'])
		    {
		      location.href = "logged_in.html";
		    }
		    else
		    {
		      location.href = "login.html"; 
		    }
		  });
		}, false);
