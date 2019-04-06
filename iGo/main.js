const MAX_POS = {x: 1000, y: 750};
const SPEED_FAST = 15;
const SPEED_SLOW = 5;
const MAP_UPDATE_INTERVAL = 50; // Milisegundos

var power;
var current_screen;
var current_location;

var current_position;
var current_speed;
var move_directions;


//////////////////////
// Funções diversas //
//////////////////////


function handle_key_up(e)
{
	if (e == undefined)
		return;

	switch (e.key)
	{
	case "x":
		turn_off_on();
		break;

	case "w":
	case "ArrowUp":
		move_directions.up = false;
		break;

	case "a":
	case "ArrowLeft":
		move_directions.left = false;
		break;

	case "s":
	case "ArrowDown":
		move_directions.down = false;
		break;

	case "d":
	case "ArrowRight":
		move_directions.right = false;
		break;

	case "Shift":
		current_speed = SPEED_FAST;
		break;
	}
}

function handle_key_down(e)
{
	if (e == undefined)
		return;

	// Mapa
	switch (e.key)
	{
	case "w":
	case "ArrowUp":
		move_directions.up = true;
		break;

	case "a":
	case "ArrowLeft":
		move_directions.left = true;
		break;

	case "s":
	case "ArrowDown":
		move_directions.down = true;
		break;

	case "d":
	case "ArrowRight":
		move_directions.right = true;
		break;

	case "Shift":
		current_speed = SPEED_SLOW;
		break;
	}
}

function update_map()
{
	let map_element = document.getElementById("map");
	let position_element = document.getElementById("your_position");

	if (move_directions.up)
		current_position.y -= current_speed;
	if (move_directions.left)
		current_position.x -= current_speed;
	if (move_directions.down)
		current_position.y += current_speed;
	if (move_directions.right)
		current_position.x += current_speed;

	if (current_position.x > MAX_POS.x)
		current_position.x = MAX_POS.x;
	else if (current_position.x < 0)
		current_position.x = 0;

	if (current_position.y > MAX_POS.y)
		current_position.y = MAX_POS.y;
	else if (current_position.y < 0)
		current_position.y = 0;

	position_element.style.left = (current_position.x / MAX_POS.x) * map_element.offsetWidth - position_element.offsetWidth / 2 + "px";
	position_element.style.top = (current_position.y / MAX_POS.y) * map_element.offsetHeight - position_element.offsetHeight / 2 + "px";
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
	localStorage.setItem("ppi", -1); // Valor inválido
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
	init_ppi();
	init_locations();

	document.getElementById("off").style.display = "block";

	init_screens();

	current_screen = SCREENS["off"];
	current_screen.on_load();

	power = false;
	turn_off_on();

	init_keyboard_events();
}

function init_ppi()
{
	let ppi = localStorage.getItem("ppi");

	if (ppi == undefined)
		localStorage.setItem("ppi", -1);
	else if (ppi != -1)
	{
		document.getElementById("ppi_input").value = ppi;
		document.getElementById("iGo").style.zoom = ppi / (96 * window.devicePixelRatio);
	}
}

function init_locations()
{
	// Obter localização atual (variável global)
	current_location = localStorage.getItem("current_location");
	if (current_location == undefined)
		current_location = DEFAULT_LOCATION;

	// Obter informações para o menu inicial
	document.getElementById("city_name").innerHTML = current_location;
	document.getElementById("degrees").innerHTML = LOCATIONS[current_location].temperature + "&deg;"

	// Atualizar mapa
	for (let l in LOCATIONS)
	{
		document.getElementById("map_locations").innerHTML +=
			"<option value='" + l + "'>" + l + "</option>";
	}
	current_position = {x: MAX_POS.x / 2, y: MAX_POS.y / 2};
	current_speed = SPEED_FAST;
	move_directions = {up: false, left: false, down: false, right: false};
	update_map();
	setInterval(update_map, MAP_UPDATE_INTERVAL);
}


function init_screens()
{
	for (let s in SCREENS)
		if (SCREENS[s].on_init != undefined)
			SCREENS[s].on_init();
}

function init_keyboard_events()
{
	document.body.addEventListener("keyup", handle_key_up);
	document.body.addEventListener("keydown", handle_key_down);
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


function changeInfoScreen(place_name)
{
	let place = LOCATIONS[current_location].places[place_name];
	document.getElementById("iGuide_info_icon").src = PLACE_TYPE_IMG[place.type];
	document.getElementById("iGuide_info_title").innerHTML = place.name;
	document.getElementById("iGuide_info_container").innerHTML = place.info;
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
	for (let place in LOCATIONS[current_location].places)
	{
		let info_img = "<img class='info_icon' src='img/infoicon.png' onclick='changeInfoScreen(\""+ place +"\");'>";
		places_element.innerHTML += "<li class='iGuide_place_frame'><div class='iGuide_place'>" +
			place + "</div>" + info_img + "</li>";
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
