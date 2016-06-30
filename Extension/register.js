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
  		type: 'POST',
  		url: "http://localhost:3000/register",
 		data: JSON.stringify(k),
		success: function(data) {
			data = JSON.parse(data);
			if(data["at"]) chrome.storage.sync.set({'KnurkdLoginToken':data["at"]},function()
            		{
              			console.log("AT saved successfully");
              			location.href = 'home.html';
            		});
			else {alert("Error in registration");location.href = 'home.html'}
		},
		error: function(data) {alert("Error in registration");location.href = 'home.html'}
	});
		
  }
   // Set iFrame source for voice recording
    var source = "http://localhost:3000/?token=new";
    var iframeButton = document.getElementById('eyeframe').src = source;
  });

}, false);
