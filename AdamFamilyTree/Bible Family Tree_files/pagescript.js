$(document).ready(function() {
	$("#aboutLink").bind("click", function(){
		about();
	});

	$("#helpLink").bind("click", function(){
		pageHelp();
	});

	$("#expandLink").bind("click", function(){
		expandAll();
	});

	$("#expandYes").bind("click", function(){
		// close the expand dialog window
		$("#expand").dialog("close");

		// open the expandInProgress dialog window
		if ($("#expandInProgress").dialog("isOpen")){$("#expandInProgress").dialog("close");}
		$("#expandInProgress").dialog("open");
		
		timeoutID = window.setTimeout(expandAllNodes, 500);
		$("#expandLinkSection").css("display","none");
	});

	$("#expandNo").bind("click", function(){
		$("#expand").dialog("close");
	});
	
	$("#expandCompleteOK").bind("click", function(){
		$("#expandComplete").dialog("close");
	});
	

	var winWidth = ($(window).width() > 800) ? 800 : $(window).width()*0.8;
	var winHeight = ($(window).height() > 600) ? 600 : $(window).height()*0.6;
	
	$("#about").dialog({
		autoOpen: false,
		show: "puff",
		hide: "puff",
		width: winWidth,
		height: winHeight
	});

	$("#help").dialog({
		autoOpen: false,
		show: "puff",
		hide: "puff",
		width: (winWidth),
		height: (winHeight)
	});
	
	$("#expand").dialog({
		autoOpen: false,
		show: "puff",
		hide: "puff",
		width: (winWidth/2),
		height: (winHeight/2)
	});
	
	$("#expandInProgress").dialog({
		autoOpen: false,
		show: "puff",
		hide: "puff",
		width: (winWidth/3),
		height: (winHeight/3)
	});

	$("#expandComplete").dialog({
		autoOpen: false,
		show: "puff",
		hide: "puff",
		width: (winWidth/3),
		height: (winHeight/3)
	});
	
	$("#remindScroll").dialog({
		autoOpen: false,
		show: "puff",
		hide: "puff",
		width: (winWidth/3),
		height: (winHeight/3)
	});
});

function about() {
	if ($("#help").dialog("isOpen")){$("#help").dialog("close");}
    $("#about").dialog("open");
}

function pageHelp() {
	if ($("#about").dialog("isOpen")){$("#about").dialog("close");}
	$("#help").dialog("open");
}

function expandAll() {
	if ($("#help").dialog("isOpen")){$("#help").dialog("close");}
	if ($("#about").dialog("isOpen")){$("#about").dialog("close");}
    $("#expand").dialog("open");
}

function remindScroll() {
	var reminderCount = parseInt(getCookie("remindedAboutScroll"));
	if (isNaN(reminderCount) == true) { reminderCount = 0;}
	
	if (reminderCount < 2){
		$("#remindScroll").dialog("open");
		reminderCount++;
		
		setCookie("remindedAboutScroll", reminderCount, 365);
	}
}

// cookie functions from https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var username = getCookie("username");
  if (username != "") {
   alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}