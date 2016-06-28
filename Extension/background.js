$(function() {
 // Useless variables
 var ret_pass = "",
 token = "",
 uname = "",
 pword = "",
 not_login = false,
 passwordBoxes = null;
 var request_credentials = function(url, username, callback) {
  chrome.storage.local.get('KnurkdLoginToken', function (obj) {
    // alert(JSON.stringify(obj));
 	  token = obj['KnurkdLoginToken'];
 	  if (!token)
  	{	
  		// Not logged in, do nothing
  		callback();
  	}
    chrome.storage.local.get('potaato', function (obj) {
      site_accounts = obj['potaato'];
      if(!site_accounts)
      {
        // Doesn't exist, callback
        // alert(JSON.stringify(obj));
        callback();
      }
      // alert(JSON.stringify(site_accounts));
      if(username in site_accounts)
      {
        // Decrypt them before setting values
        uname = username;
        ret_pass = site_accounts[username];
        callback();
      }
      else
      {
        // Let callback handle addition of account to database
        callback();
      }
    });
   });
 },
 process = function(callback) {
  uname = $("input[type=text]").not(passwordBoxes).filter(function() {
  var field = $(this);
   return field.val() || field.html();
  }).val(),
  pword = passwordBoxes.val();
  // No 'text' entry, try 'email' entry
  if(!uname){
    uname = $("input[type=email]").not(passwordBoxes).filter(function() {
      var field = $(this);
      return field.val() || field.html();
      }).val();
  }
  request_credentials(location.href, uname, callback);
 };

 $("form").submit(function(e) {
  var $this = $(this);
  passwordBoxes = $("input[type=password]");
  e.preventDefault();
  process(function() {
   if(not_login)
   {
     $this.unbind('submit');
     $this.submit();
     return;
   }
   // Password loaded from memory
   if(ret_pass)
   {
   	 // Fill password
     $("input[type=password]").val(ret_pass);
   }
   // Password not saved yet,offer to save
   else if(token)
   {
      // Not a login form
      if((!uname) || (!pword))
      {
        $this.unbind('submit');
        $this.submit();
        return;
      }
   	  // Offer to save password if logged in
      var answer = false;
      // swal({
      //   title: "Are you sure?",
      //   text: "You will not be able to recover this imaginary file!",
      //   type: "warning",
      //   showCancelButton: true,
      //   confirmButtonColor: '#DD6B55',
      //   confirmButtonText: 'Yes, I am sure!',
      //   cancelButtonText: "No, cancel it!",
      //   closeOnConfirm: false,
      //   closeOnCancel: false
      //   },
      //   function(isConfirm){
      //     if(isConfirm)
      //     {
      //         chrome.storage.local.get('potaato', function (obj) {
      //         var theValue = {};
      //         // Initialize DB if doesn't exist
      //         if(!obj['potaato'])
      //         {
      //           chrome.storage.local.set({'potaato' : {}});
      //         }
      //         // Update storage
      //         theValue = obj['potaato'];
      //         theValue[uname] = pword;
      //         chrome.storage.local.set({'potaato' : theValue}, function() {
      //           // Notify user if password saved: SweetJS
      //           // swal({title: "Password saved!",timer: 500,showConfirmButton: false, type: "success"});
      //           });
      //       });
      //     }
      //   }
      // );
      answer = confirm('Are you sure?');
   	  // if(answer)
   	  // {
      //   chrome.storage.local.get('potaato', function (obj) {
      //     var theValue = {};
      //     // Initialize DB if doesn't exist
      //     if(!obj['potaato'])
      //     {
      //       chrome.storage.local.set({'potaato' : {}});
      //     }
      //     // Update storage
      //     theValue = obj['potaato'];
      //     theValue[uname] = pword;
      //     chrome.storage.local.set({'potaato' : theValue}, function() {
      //       // Notify user if password saved: SweetJS
      //       // swal({title: "Password saved!",timer: 500,showConfirmButton: false, type: "success"});
      //   });
      // });
   	// }
   }
   $this.unbind('submit');
   // swal({title: "Password saved!",timer: 1000,showConfirmButton: false, type: "success"});
   $this.submit();
  });
 });
});