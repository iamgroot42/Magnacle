document.addEventListener('DOMContentLoaded', function() {
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  // Listen to message from child window
  eventer(messageEvent,function(e) {
      var key = e.message ? "message" : "data";
      var link = e[key];
      var k = {};
      chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
        token = obj['KnurkdLoginToken'];
        chrome.storage.sync.get('KnurkdLoginUsername', function (obj) {
        	k["token"] = token.toString(); 
        	k["dropbox"] = link;
        	k["name"] = obj['KnurkdLoginUsername'].toString();
        	$.ajax(
        	{
          		type: 'POST',
          		url: "http://127.0.0.1:5001/authenticate",
         		data: JSON.stringify(k),
         		success: function(data)
         		{
            		data = JSON.parse(data);
            		// data["key"] == "" implies auth failed; request to try again
                if(!data["key"])
                {
                  alert("Voice auth failed! Try again");
                  location.href = 'authenticate.html';
                  return;
                }
            		chrome.storage.sync.set({'KnurkdLoginKey':data["key"]},function()
            		{
              			console.log("Key saved successfully");
              			location.href = 'home.html';
            		});
         		}
         		// failure: //Network error
        	});
        });
      });
  },false);
  // Get order of words to be spoken
  chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
    var token = obj['KnurkdLoginToken'];
    var k = {};
    k['at'] = token;
    // Get instructions from nodeJS server
    $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:5001/getVerifyInstructions",
        data: JSON.stringify(k),
        success: function(data)
        {
          data = JSON.parse(data);
          chrome.storage.sync.set({'KnurkdVerificationSecret':data["verificationSecret"]},function()
          { 
              alert(JSON.stringify(data["words"]));
          });
        }
          // failure: //Network error
      });
  });
  // Render username in HTML
  chrome.storage.sync.get('KnurkdLoginUsername', function (obj) {
    document.getElementById("uname").innerHTML = obj['KnurkdLoginUsername'];
  });
  // Define source of iframe dynamically
  chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
    var token = obj['KnurkdLoginToken'];
    var source = "http://localhost:3000/?token=" + token.toString();
    var iframeButton = document.getElementById('eyeframe').src = source;
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
}, false);
