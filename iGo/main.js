var power;
var current_screen;

//////////////////////
// Funções diversas //
//////////////////////


function handle_keyboard(e)
{
	if (e != undefined && e.which == 'X'.charCodeAt(0))
		turn_off_on();
}


function resize_screen()
{
	let ppi_input = document.getElementById("ppi_input");
	if (ppi_input.value != "")
	{
		if (ppi_input.value > ppi_input.max)
			ppi_input.value = ppi_input.max;
		else if (ppi_input.value < ppi_input.min)
			ppi_input.value = ppi_input.min;

		localStorage.setItem("ppi", ppi_input.value);
		document.getElementById("iGo").style.zoom = ppi_input.value / (96 * window.devicePixelRatio);
	}
}

function reset_screen_size()
{
	localStorage.setItem("ppi", -1); // Invalid value
	document.getElementById("ppi_input").value = "";
	document.getElementById("iGo").style.zoom = 1;
}


function turn_off_on()
{
	if (power)
	{
		document.getElementById("screen_logo_container").style.animation = "";
		change_screen("off");
	}
	else
	{
		document.getElementById("screen_logo_container").style.animation = "fade_in_out 1.5s";
		setTimeout(function(){change_screen("main_menu");}, 1600);
	}
	power = !power;
}


function init()
{
	let ppi = localStorage.getItem("ppi");

	if (ppi != -1)
	{
		document.getElementById("ppi_input").value = ppi;
		document.getElementById("iGo").style.zoom = ppi / (96 * window.devicePixelRatio);
	}

	document.getElementById("off").style.display = "block";

	init_screens();

	current_screen = SCREENS["off"];
	current_screen.on_load();

	power = false;
	turn_off_on();

	document.body.addEventListener("keyup", handle_keyboard);
}


function init_screens()
{
	for (let s in SCREENS)
		if (SCREENS[s].on_init != undefined)
			SCREENS[s].on_init();
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

	sep = main_menu.blink ? "&nbsp" : ":";

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
	document.getElementById("screen_logo_container").style.opacity = 0;
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
