document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get('KnurkdVerificationWords', function (obj) {
      var three_words = obj['KnurkdVerificationWords'];
      var wordesTag = document.getElementById('wordes');
      var insider = "For voice authentication, say the words \"";
      insider = insider + three_words[0] + " " + three_words[1] + " " + three_words[2] + "\" out loud with a gap of at least half second";
      wordesTag.innerHTML = insider;
      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
      // Listen to message from child window
      eventer(messageEvent,function(e) {
          var key = e.message ? "message" : "data";
          var link = e[key];
          chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
            var token = obj['KnurkdLoginToken'];
            chrome.storage.sync.get('KnurkdLoginUsername', function (obj) {
              chrome.storage.sync.get('KnurkdVerificationSecret', function (obj) {
                 var ver_sec = obj['KnurkdVerificationSecret'];
            	   $.ajax(
            	   {
                  	type: 'GET',
                    url: "http://localhost:3000/verify?at="+token+"&audioUrl="+link+"&verificationSecret="+ver_sec,
             	    	success: function(data)
             	    	{
                        if(!data["key"])
                        {
                          alert("Voice auth failed! Try again");
                          location.href = 'authenticate.html';
                          return;
                        }
                        // Get instructions for next time
                    		chrome.storage.sync.set({'KnurkdLoginKey':data["key"]},function()
                    		{
                          $.ajax({
                              type: 'GET',
                              url: "http://localhost:3000/getVerifyInstructions?at="+token.toString(),
                              success: function(data)
                              {
                                if(data['verified'])
                                {
                                  chrome.storage.sync.set({'KnurkdVerificationSecret':data["verificationSecret"]},function()
                                  {
                                      chrome.storage.sync.set({'KnurkdVerificationWords':data["words"]},function()
                                      {
                                          // Redirect to 'logged in' page
                                          alert("Voice authenticated!");
                                          location.href = 'logged_in.html';
                                      });
                                    });
                                }
                                else
                                {
                                  alert('Authentication problem! Sign in again');
                                  // Delete access token, log in again
                                  chrome.storage.sync.remove('KnurkdLoginToken',function() {
                                    location.href = "login.html";
                                  });
                                }
                              }
                          });
                    		});
             	    	 },
                     error: function(data)
                     {
                        alert("Voice auth failed! Try again");
                        location.href = 'authenticate.html';
                        return;
                     }
            	   });
               });
            });
          });
      },false);
      // Render username in HTML
      chrome.storage.sync.get('KnurkdLoginUsername', function (obj) {
        document.getElementById("uname").innerHTML = obj['KnurkdLoginUsername'];
      });
      // Define source of iframe dynamically
      chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
        var token = obj['KnurkdLoginToken'];
        var source = "http://localhost:3000/";
        var iframeButton = document.getElementById('eyeframe');
        iframeButton.src = source;
      });
      var logoutButton = document.getElementById('logout');
      logoutButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
              var token = obj['KnurkdLoginToken']; 
              chrome.storage.sync.remove('KnurkdLoginToken',function() {
                chrome.storage.sync.remove('KnurkdLoginUsername',function() {
                  // Redirect to login page
                  console.log('Logged out!');
                  location.href = "login.html";
                });
              });
            });
        });
      }, false);
    });
}, false);
