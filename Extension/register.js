document.addEventListener('DOMContentLoaded', function() {
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventer(messageEvent,function(e) {
      var key = e.message ? "message" : "data";
      var link = e[key];
      var k = {};
      k["username"] = $("#un").val();
      k["password"] = $("#pw").val();
      k["audioUrl"] = link;
      $.ajax({
        type: 'GET',
        url: "https://voice5-byld.rhcloud.com/register",
        data: k,
        success: function(data) {
          alert(JSON.stringify(data));
          if(data["at"]) 
          {
            console.log("Registered!");
              location.href = 'home.html';
          }
      else {alert("Error in registration");location.href = 'home.html'}
    },
    error: function(data) {alert("Error in registration");location.href = 'home.html'}
  });
    
  });
   // Set iFrame source for voice recording
    var source = "https://voice5-byld.rhcloud.com/";
    var iframeButton = document.getElementById('eyeframe').src = source;

}, false);
