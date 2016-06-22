document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://127.0.0.1:5000/test';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'potato';
      i.value = 'Anshuman'
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();	
      var options = {
      body: "How's life?",
      icon: "icon.png"
  		};
      var n = new Notification("Hi, " + i.name, options);

    });
  }, false);
}, false);