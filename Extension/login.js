document.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.getElementById('submit');
  var registerButton = document.getElementById('register');
  var getMessage = function(username, password) {
      return "username=" + username + "&password=" + password;
      }
  registerButton.addEventListener('click', function() {
      var register_url = "https://github.com/";
      chrome.tabs.create({ url: register_url });
  });
  submitButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      var username = document.getElementById("un").value;
      // Replace with audio input:
      var password = document.getElementById("pw").value;
      if(!username)
      {
          // swal({title: 'Auto close alert!',type: 'warning',timer: 1000});
          alert('Username cannot be empty!');
          return;
      }
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5001/login', 
        data: getMessage(username,password), 
        success: function(text)
         {
            if(text)
            {
              // Store access key
              chrome.storage.sync.set({'KnurkdLoginToken': text}, function() {
                chrome.storage.sync.set({'KnurkdLoginUsername': username}, function() {
                  location.href = "logged_in.html";
                });
              });
            }
            else
            {
                // Invalid user+voice combination
                alert('Not authenticated!');
                return;
            }
         }
      });
    });
  }, false);
}, false);
