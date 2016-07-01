document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get('KnurkdLoginUsername', function (obj) {
    document.getElementById("uname").innerHTML = obj['KnurkdLoginUsername'];
  });
  var logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.storage.sync.get('KnurkdLoginToken', function(obj) {
          var token = obj['KnurkdLoginToken']; 
          // Explicit logout; delete everything
          chrome.storage.sync.remove('KnurkdLoginToken',function() {
            chrome.storage.sync.remove('KnurkdLoginKey',function() {
              chrome.storage.sync.remove('KnurkdLoginUsername',function() {
                  chrome.storage.sync.remove('KnurkdVerificationSecret',function() {
                    chrome.storage.sync.remove('KnurkdVerificationWords',function() {
                      // Redirect to login page
                      console.log("Logged out!");
                      location.href = "login.html";
                  });
                });
              });
            });
          });
        });
    });
  }, false);
}, false);
