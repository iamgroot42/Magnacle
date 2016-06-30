document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    var usr = items["KnurkdLoginUsername"];
    for (i=0;i<allKeys.length();i++)
    {
    	if(allKeys[i].startsWith(usr+"%KNURLD%")) $("#url").append("<tr><td class=\"tcell\" id=\""+allKeys[i]+"\">"+items[allKeys[i]]+"</td></tr>");
    }
    });

	$(".tcell").click(function(){
		k = $(this).id;
		chrome.storage.sync.remove(k,function(){
			location.reload();
		});
	});
},false);