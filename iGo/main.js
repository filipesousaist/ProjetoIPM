var power;
var current_screen;


//////////////////////
// Funções diversas //
//////////////////////


function turn_off_on()
{
	if (power)
	{
		document.getElementById("iGo_logo").style.animation = "";
		power = false;
		change_screen("off");
	}
	else
	{
		document.getElementById("iGo_logo").style.animation = "fade_in_out 1.5s";
		setTimeout(function()
		{
			power = true;
			change_screen("main_menu");
		}, 1600);
	}
}


function init()
{
	power = false;
	current_screen = SCREENS["off"];
	document.getElementById("off").style.display = "block";

	for (let s in SCREENS)
		if (SCREENS[s].on_init != undefined)
			SCREENS[s].on_init();

	current_screen.on_load();
	turn_off_on();
}


function change_screen(new_screen_id)
{
	if (new_screen_id != current_screen.id)
	{
		if (current_screen.on_exit != undefined)
			current_screen.on_exit();

		replace_element(current_screen.id, new_screen_id);

		let new_screen = SCREENS[new_screen_id];
		if (new_screen.on_load != undefined)
			new_screen.on_load();

		current_screen = new_screen;
	}
}


function replace_element(old_id, new_id)
{
	document.getElementById(new_id).style.display = "block";

	if (new_id != "error_screen")
		document.getElementById(old_id).style.display = "none";

}


function go_back()
{
	var parent_screen_id = current_screen.parent_id;
	if (parent_screen_id != undefined)
		change_screen(parent_screen_id);
}


function changeInfoScreen(location_name)
{
	let location = LOCATIONS[location_name];
	document.getElementById("iGuide_info_icon").src = LOCATION_TIME_IMG[location.type];
	document.getElementById("iGuide_info_title").innerHTML = location.title;
	document.getElementById("iGuide_info_container").innerHTML = location.info;
	change_screen("iGuide_info");
}


function update_clock()
{
	var date = new Date();
	var hours = add0(date.getHours());
	var minutes = add0(date.getMinutes());

	var sep;
	var main_menu = SCREENS["main_menu"];
	if (main_menu.blink)
		sep = "&nbsp";
	else
		sep = ":";
	main_menu.blink = ! main_menu.blink;

	document.getElementById("clock").innerHTML = hours + sep + minutes;
}


function fadein(id, seconds)
{
	document.getElementById(id).style.opacity = "1";
	document.getElementById(id).style.animation = "fade_in " + seconds + "s";
}

//////////////////////
// Funções de ecrãs //
//////////////////////

SCREENS["off"].on_load = function()
{
	document.getElementById("home_button").onclick = null;
	document.getElementById("back_button").onclick = null;
	document.getElementById("iGo_logo").style.opacity = 0;
};


SCREENS["off"].on_exit = function()
{
	document.getElementById("home_button").onclick = function(){ change_screen("main_menu"); }
	document.getElementById("back_button").onclick = go_back;
};


SCREENS["main_menu"].on_load = function()
{
	SCREENS["main_menu"].clock_blink = false;
	update_clock();
	SCREENS["main_menu"].timeout = setInterval(update_clock, 1000);
};


SCREENS["main_menu"].on_exit = function()
{
	clearInterval(SCREENS["main_menu"].timeout);
};


SCREENS["iGuide_main"].on_init = function()
{
	let places_element = document.getElementById("iGuide_places_near_you");
	for (let l in LOCATIONS)
	{
		let info_img = "<img class='info_icon' src='img/infoicon.png' onclick='changeInfoScreen(\""+ l +"\");'>";
		places_element.innerHTML += "<li class='iGuide_place_frame'><div class='iGuide_place'>" +
			LOCATIONS[l].title + "</div>" + info_img + "</li>";
	}
}


SCREENS["error_screen"].on_load = function()
{
	SCREENS["error_screen"].parent_id = current_screen.id;
	fadein("error_screen", 0.3);
}

SCREENS["error_screen"].on_exit = function()
{
	document.getElementById("error_screen").style.animation = "";
}
