function init()
{
	var prefs = JSON.parse(window.localStorage.getItem("prefs"));
	if( prefs === null ) prefs = {expire:10080,privacy:1,api_token:'',latestPastesDisplaySize:5};
	
	var expire = prefs.expire; // determine the expiration
	var privacy = prefs.privacy; // determine paste privacy
	var api_token = prefs.api_token; // determine if user account
	var latestPastesDisplaySize = prefs.latestPastesDisplaySize;
	
	saveOptions(expire, privacy, api_token, latestPastesDisplaySize);
	
	document.getElementById("expire").addEventListener("change", update);
	document.getElementById("privacy").addEventListener("change", update);
	document.getElementById("api_token").addEventListener("change", update);
	document.getElementById("latestPastesDisplaySize").addEventListener("change", update);
	
	// Set initial data options page
	document.getElementById("expire").value = expire;
	document.getElementById("range-value").innerHTML = getExpirationLabel(expire);
	document.getElementById("privacy").value = privacy;
	document.getElementById("api_token").value = api_token;
	document.getElementById("latestPastesDisplaySize").value = latestPastesDisplaySize;
	document.getElementById("range-value-display").innerHTML = getDisplayLabel(latestPastesDisplaySize);
	
}

function getExpirationLabel(expire)
{
	if(expire == 1)
		return expire + " minute";
	else if(expire == 262800)
		return "forever";
	else if(expire > 20160)
		return Math.floor(expire/60/24) + " days";
	else if(expire > 5760)
		return Math.floor(expire/60) + " hours";
	else
		return Math.floor(expire) + " minutes";
}

function getDisplayLabel(size)
{
	return size + " rows";
}

function getExpiration()
{
	return document.getElementById("expire").value;
}

function getPrivacy()
{
	return document.getElementById("privacy").value;
}

function getAPI()
{
	return document.getElementById("api_token").value;
}

function getLatestPastesDisplaySize()
{
	return document.getElementById("latestPastesDisplaySize").value;
}

function update()
{
	saveOptions(getExpiration(), getPrivacy(), getAPI(), getLatestPastesDisplaySize());
}

function saveOptions(expire, privacy, api_token, latestPastesDisplaySize)
{
	window.localStorage.setItem("prefs", JSON.stringify({expire: expire, privacy: privacy, api_token: api_token, latestPastesDisplaySize: latestPastesDisplaySize}));
}

window.onload = init;
