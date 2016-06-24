document.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.getElementById('submit');
  var getMessage = function(username, password, url) {
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
              chrome.storage.sync.set({'KnurkdLoginToken': text}, function() {
                // Notify that we saved.
                alert('Access token saved!');
                });
             alert(text);
             chrome.storage.sync.get('KnurkdLoginToken', function (obj) {
               alert(obj['KnurkdLoginToken']);
              });
         }
      });
    });
  }, false);
}, false);