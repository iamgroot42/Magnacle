document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://127.0.0.1:5000?potato=Anshuman';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      // This ain't working: (in fact,GET requests not working either wtf :|)
      i.name = 'potato';
      i.value = 'Anshuman';
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);
}, false);