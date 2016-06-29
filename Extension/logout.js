document.addEventListener('DOMContentLoaded', function() {
  // Set username in html
  chrome.storage.sync.get('KnurkdLoginUsername', function (obj) {
    document.getElementById("uname").innerHTML = obj['KnurkdLoginUsername'];
  });
  var logoutButton = document.getElementById('logout');
  var getMessage = function(token) {
      return "token=" + token;
      };
  logoutButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
          var token = obj['KnurkdLoginToken']; 
          chrome.storage.sync.remove('KnurkdLoginToken',function() {
            chrome.storage.sync.remove('KnurkdLoginUsername',function() {
              // Redirect to login page
              location.href = "login.html";
            });
          });
        });
    });
  }, false);
}, false);
