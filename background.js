var latestPastes = [];

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	if(message.method == "latestPastes")
	{
		sendResponse(JSON.stringify(latestPastes));
		return true;
	}
});

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse){
		if(request.action === "prefs") {
			var prefsString = localStorage.prefs;
			if(prefsString === undefined) {
				sendResponse(undefined);
			} else {
				sendResponse(JSON.parse(localStorage.prefs));
			}
		}
	}
);

function upload_to_upaste()
{
	chrome.tabs.executeScript(null, {code:"var stored = window.getSelection().toString(); stored"}, function(stored){
		var prefs = JSON.parse(window.localStorage.getItem("prefs"));
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://upaste.me/api", true);
		xhr.responseType = "json";
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() {
		    if(xhr.readyState == 4 && xhr.status == 200 && xhr.response.status != "error") {
				var url = document.createElement('textarea');
				document.body.appendChild(url);
				url.value = xhr.response.paste.link;
				url.focus();
				url.select();
				latestPastes.push(url.value);
				document.execCommand("Copy");
				url.remove();
				if(latestPastes.length >= prefs.latestPastesDisplaySize)
					latestPastes.shift();
		    }
			else if(xhr.readyState == 4 && xhr.status == 200 && xhr.response.status == "error") {
				alert("Hold your horses, you're a bit too quick with all that uploading.");
			}
		}
		xhr.send("expire="+(prefs.expire == 262800 ? 0 : prefs.expire)+"&privacy="+prefs.privacy+"&api_key="+prefs.api_token+"&json=true&paste="+stored);
	});
}

chrome.contextMenus.create({
	title: "Upload to uPaste",
	contexts:["selection"],
	onclick: upload_to_upaste
});

chrome.browserAction.setPopup({popup: "popup.html"});
