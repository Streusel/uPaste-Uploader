function click()
{
	chrome.runtime.sendMessage({method:"latestPastes"},function(response){
		var latestPastes = JSON.parse(response);
		var prefs = JSON.parse(window.localStorage.getItem("prefs"));
		for(var i = latestPastes.length-1; i >= 0; i--)
		{
			document.getElementById("latest").innerHTML += "<td><a href='"+latestPastes[i]+"' target='_blank'>"+latestPastes[i]+"</a></td>";
		}
		
	});
}

window.onload = click();
