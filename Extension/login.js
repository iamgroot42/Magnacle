document.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.getElementById('submit');
  var registerButton = document.getElementById('register');
  var getMessage = function(username, password) {
      return "username=" + username + "&password=" + password;
      }
  registerButton.addEventListener('click', function() {
      location.href = "register.html";
      chrome.tabs.create({ url: register_url });
  });
  submitButton.addEventListener('click', function() {
    submitButton.classList.add("signing_in");
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
              // till Divam fixes this:
              text = "ecd1003f382e5a3f544d2f1dcfef12e7";
              $.ajax({
                type: 'GET',
                url: "http://127.0.0.1:3000/getVerifyInstructions?at="+text.toString(),
                success: function(data)
                {
                  chrome.storage.sync.set({'KnurkdVerificationSecret':data["verificationSecret"]},function()
                  {
                      chrome.storage.sync.set({'KnurkdVerificationWords':data["words"]},function()
                      {
                        // Store access token
                        chrome.storage.sync.set({'KnurkdLoginToken': text}, function() {
                          chrome.storage.sync.set({'KnurkdLoginUsername': username}, function() {
                            // Redirect to voice auth
                            location.href = "authenticate.html";
                          });
                        });
                      });
                  });
                }
              });
            }
            else
            {
                // Invalid login
                alert('Not authenticated!');
                return;
            }
         }
      });
    });
  }, false);
}, false);
