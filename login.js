document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get('KnurkdLoginUsername', function (obj) {
    // alert(obj['KnurkdLoginUsername']);
    if(obj['KnurkdLoginUsername'])
    {
      location.href = "logged_in.html";
    }
  });
  var submitButton = document.getElementById('submit');
  var getMessage = function(username, password) {
      return "username=" + username + "&password=" + password;
      };
  submitButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      var username = document.getElementById("un").value;
      var password = document.getElementById("pw").value;
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5001/login', 
        data: getMessage(username,password), 
        success: function(text)
         {
              // Store access token
              chrome.storage.local.set({'KnurkdLoginToken': text}, function() {
                chrome.storage.local.set({'KnurkdLoginUsername': username}, function() {
                  location.href = "logged_in.html";
                });
              });
         }
      });
    });
  }, false);
}, false);