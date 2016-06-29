document.addEventListener('DOMContentLoaded', function() {
  // Set username in html
  chrome.storage.sync.get('KnurkdLoginUsername', function (obj) {
    document.getElementById("uname").innerHTML = obj['KnurkdLoginUsername'];
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
  authButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
          var token = obj['KnurkdLoginToken'];
          // Get audio recording
          $.ajax({
            type: 'POST',
            // url: 'https://voicetools-api.knurld-demo.com/rest/file/upload', 
            url: 'http://127.0.0.1:5001/upload', 
            // Replace with audio file
            data: "potato", 
            success: function(text)
            {
                link = text.slice(0,-1) + "1";
                // Send this link to nodeJS server
                var jayson = {};
                jayson['dropbox'] = link.toString();
                jayson['token'] = token;
                $.ajax({
                    type: 'POST',
                    url: 'http://127.0.0.1:5001/authenticate',
                    data: JSON.stringify(jayson), 
                    success: function(text)
                    {
                        // Got the key
                        if(text)
                        {
                            // Store access key
                            chrome.storage.sync.set({'KnurkdLoginKey': text}, function() {
                                alert('Authenticated!');
                                location.href = "logged_in.html";
                            });
                        }
                        else
                        {
                            // Delete user access token,username
                          chrome.storage.sync.remove('KnurkdLoginToken',function() {
                            chrome.storage.sync.remove('KnurkdLoginUsername',function() {
                              alert('Token expired. Please login again!');
                              // Redirect to login page
                              location.href = "login.html";
                              });
                          });
                        }
                    }
                }); 
            }
          });
        });
    });
  }, false);
}, false);
