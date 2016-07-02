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
      console.log('Process started');
      $.ajax({
        type: 'GET',
        url: "http://localhost:8080/register?username="+k["username"]+"&password="+k["password"]
        +"&audioUrl="+k["audioUrl"],
        success: function(data) {
          if(data["at"]) 
          {
              alert("Regsitered! You may sign in now");
              location.href = 'home.html';
          }
         else {
          alert("Error in registration");
          location.href = 'home.html'}
    },
    error: function(data) {
    alert("Error in registration");
    location.href = 'home.html'}
  });
    
  });
   // Set iFrame source for voice recording
    var source = "http://localhost:8080/";
    var iframeButton = document.getElementById('eyeframe').src = source;

}, false);
