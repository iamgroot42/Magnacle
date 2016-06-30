document.addEventListener('DOMContentLoaded', function() {
  // Set username in html

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
        k["token"] = token; 
        k["dropbox"] = link;
        $.ajax(
        {
          type: 'POST',
          url: "http://127.0.0.1:5001/authenticate"
         data: JSON.stringify(k);
         success: function(data)
         {
            data = JSON.parse(data);
            chrome.storage.sync.set({'KnurkdLoginKey':data["key"]},function()
            {
              console.log("Key saved successfully");
              location.href = 'home.html';
            });
         }
         failure: //Network error
        })
      });
  },false);

  chrome.storage.sync.get('KnurkdLoginUsername', function (obj) {
    document.getElementById("uname").innerHTML = obj['KnurkdLoginUsername'];
  });
  // Define source of iframe dynamically
  chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
    token = obj['KnurkdLoginToken'];
    var source = "http://localhost:8000/?token=" + token.toString();
    var iframeButton = document.getElementById('eyeframe').src = source;
  });
  var logoutButton = document.getElementById('logout');
  var authButton = document.getElementById('auth');
  logoutButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
          var token = obj['KnurkdLoginToken']; 
          chrome.storage.sync.remove('KnurkdLoginToken',function() {
            chrome.storage.sync.remove('KnurkdLoginUsername',function() {
              // Redirect to login page
              alert('Logged out!');
              location.href = "login.html";
            });
          });
        });
    });
  }, false);
}, false);
