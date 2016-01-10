document.addEventListener( 'DOMContentLoaded', function () {
	var range = document.getElementById('expire'), input = document.getElementById('range-value');
	document.getElementById('expire').addEventListener("change", updateNum);
function updateNum(){
	if(range.valueAsNumber == 1)
		input.innerHTML = range.valueAsNumber + " minute";
	else if(range.valueAsNumber == 262800)
		input.innerHTML = "forever";
	else if(range.valueAsNumber > 20160)
		input.innerHTML = Math.floor(range.valueAsNumber/60/24) + " days";
	else if(range.valueAsNumber > 5760)
		input.innerHTML = Math.floor(range.valueAsNumber/60) + " hours";
	else
		input.innerHTML = Math.floor(range.valueAsNumber) + " minutes";
	}; 
}, false );

document.addEventListener( 'DOMContentLoaded', function () {
	var range = document.getElementById('latestPastesDisplaySize'), input = document.getElementById('range-value-display');
	document.getElementById('latestPastesDisplaySize').addEventListener("change", updateNum);
function updateNum(){
		input.innerHTML = Math.floor(range.valueAsNumber) + " rows";
	}; 
}, false );
