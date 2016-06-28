$(function() {
 var ret_pass = "",
 token = "",
 uname = "",
 pword = "",
 passwordBoxes = $("input[type=password]"),
 getToken = function(token, url, username) {
  return "access_token=" + token + "&url=" + url + "&username=" + username;
 },
 pushDetails = function() {
  return "access_token=" + token + "&url=" + location.href + "&username=" + uname + "&password=" + pword;
 },
 request_credentials = function(url, username, callback) {
  chrome.storage.local.get('KnurkdLoginToken', function (obj) {
 	token = obj['KnurkdLoginToken'];
 	if (!token)
  	{	
  		// Not logged in, do nothing
  		callback();
  	}
  	var msg = getToken(token, url, username);
  	$.ajax({
   		type: 'POST',
   		// url: 'https://potato-server.herokuapp.com/get_pass', 
   		url: 'https://potato-server.herokuapp.com/stuff', 
   		data: msg, 
   		success: function(text)
    	{
       		ret_pass = text;
       		callback();
    	}
  	});
   });
 },
 process = function(callback) {
  var uname = $("input[type=text]").not(passwordBoxes).filter(function() {
   var field = $(this);
   return field.val() || field.html();
  }).val(),
  pword = passwordBoxes.val();
  request_credentials(location.href, uname, callback);
 };

 $("form").submit(function(e) {
  var $this = $(this);
  e.preventDefault();
  process(function() {
   if(ret_pass)
   {
   	 // Fill password
     $("input[type=password]").val(ret_pass);
   }
   else if(token)
   {
   	  // Offer to save password if logged in
   	  var answer = confirm("Save password for this website?");
   	  if (answer)
   	  {
   	  	$.ajax({
   		type: 'POST',
   		url: 'https://potato-server.herokuapp.com/add_acc', 
   		data: pushDetails(), 
   		success: function(text)
    	{
    		if(text == "True")
    		{	
    			// Notify user if password saved
    			alert('Password saved!');
    		}
    	}
  		});
   	  }
   }
   $this.unbind('submit');
   $this.submit();
  });
 });
});