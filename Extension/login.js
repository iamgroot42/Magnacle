document.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.getElementById('submit');
  var registerButton = document.getElementById('register');
  var getMessage = function(username, password) {
      return "username=" + username + "&password=" + password;
      }
  registerButton.addEventListener('click', function() {
      location.href = "register.html";
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
        type: 'GET',
        url: 'https://voice4-byld.rhcloud.com/getAT?' + getMessage(username,password),
        success: function(tezt)
         {
            if(tezt['at'])
            {
              // till Divam fixes this:
              text = tezt['at'];
              $.ajax({
                type: 'GET',
                url: "https://voice4-byld.rhcloud.com/getVerifyInstructions?at="+text.toString(),
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
                            submitButton.classList.remove("signing_in");
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
                submitButton.classList.remove("signing_in");
                return;
            }
         },
         error: function(data) {alert("Invalid credentials! Try again");location.href = 'login.html'}
      });
    });
  }, false);
}, false);
