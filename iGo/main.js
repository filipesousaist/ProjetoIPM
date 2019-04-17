const MAX_POS = {x: 1000, y: 750};
const SPEED_FAST = 15;
const SPEED_SLOW = 5;
const POSITION_UPDATE_INTERVAL = 50; // Milisegundos
const NEAR_DISTANCE = 500;

// Geral
var power;
var current_screen;
var new_screen;
// Mapa
var current_location;
var current_position;
var current_speed;
var move_directions;
// Relógio
var clock = {blink: false, timeout: null};
// Teclado
var upper_on = false;
var current_input_id;
// Pagamentos
var saved_payment_methods = 0;
// iGuide
var iGuide_current_place;
// iGroup
var iGroup_groups = [];
var current_group;



////////////////////
// Inicializações //
////////////////////

function init()
{
	init_ppi();
	init_locations();
	init_ratings();

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

	// Adicionar localizações à lista
	for (let l in LOCATIONS)
	{
		document.getElementById("map_locations").innerHTML +=
			"<option value='" + l + "'>" + l + "</option>";
	}

	// Inicializar mapa e posições
	update_map();
	current_position = {x: MAX_POS.x / 2, y: MAX_POS.y / 2};
	current_speed = SPEED_FAST;
	move_directions = {up: false, left: false, down: false, right: false};

	let position_element = document.getElementById("your_position");
	let pixel_coords = map_to_pixel_coords(current_position, position_element);
	position_element.style.left = pixel_coords.x;
	position_element.style.top = pixel_coords.y;
	update_position();
	setInterval(update_position, POSITION_UPDATE_INTERVAL);
}

function init_ratings()
{
	for (let location_name in LOCATIONS)
	{
		let location = LOCATIONS[location_name];
		for (let place_name in location.places)
		{
			let place = location.places[place_name];
			place.rating = Math.floor(Math.random() * 5) + 1;
		}
	}
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


/////////////
// Teclado //
/////////////

function handle_key_up(e)
{
	if (e == undefined)
		return;

	else if (["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(e.key))
		e.preventDefault();

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

	else if (["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(e.key))
		e.preventDefault();

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


//////////
// Mapa //
//////////

function update_position()
{
	let map_element = document.getElementById("map");
	let position_element = document.getElementById("your_position");
	let moved = false;

	if (move_directions.up)
		current_position.y -= current_speed;
	if (move_directions.left)
		current_position.x -= current_speed;
	if (move_directions.down)
		current_position.y += current_speed;
	if (move_directions.right)
		current_position.x += current_speed;

	if ((move_directions.up ^ move_directions.down) ||
			(move_directions.right ^ move_directions.left))
		moved = true;

	if (moved)
	{
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

		iGuide_update_places();
	}
}

function change_location()
{
	let new_location = document.getElementById("map_locations").value;
	if (new_location != current_location)
	{
		current_location = new_location;
		localStorage.setItem("current_location", new_location);
		update_map();
		update_location(); /* Menu inicial */
		iGuide_update_places(); /* iGuide */
	}
}

function update_map()
{
	let map_element = document.getElementById("map");
	let places = LOCATIONS[current_location].places;

	let children = map_element.children;
	for (let i = children.length - 1; i >= 0; i --)
		if (children[i].class == "map_place_img")
			map_element.removeChild(children[i]);

	for (let p in places)
	{
		location_img = document.createElement("img");
		location_img.src = "img/location.png";
		location_img.class = "map_place_img";
		location_img.title = p;
		location_img.style.position = "absolute";
		location_img.style.width = location_img.style.height = "5mm";
		let pixel_coords = map_to_pixel_coords(places[p].position, location_img);
		location_img.style.left = pixel_coords.x;
		location_img.style.top = pixel_coords.y;
		location_img.style.transform = "translate(-50%, -50%)";
		map_element.appendChild(location_img);
	}
}

function map_to_pixel_coords(map_coords, element)
{
	let map_element = document.getElementById("map");
	let pixel_x = (map_coords.x / MAX_POS.x) * map_element.offsetWidth - element.offsetWidth / 2 + "px";
	let pixel_y = (map_coords.y / MAX_POS.y) * map_element.offsetHeight - element.offsetHeight / 2 + "px";

	return {x: pixel_x, y: pixel_y};
}

/////////////////////
// Tamanho do ecrã //
/////////////////////

function resize_screen()
{
	let ppi_input = document.getElementById("ppi_input");
	if (ppi_input.value != "")
	{
		let value = parseFloat(ppi_input.value);
		let minValue = parseFloat(ppi_input.min), maxValue = parseFloat(ppi_input.max);

		if (value > maxValue)
			ppi_input.value = maxValue;
		else if (value < minValue)
			ppi_input.value = minValue;

		localStorage.setItem("ppi", value);
		document.getElementById("iGo").style.zoom = value / (96 * window.devicePixelRatio);
	}
}

function reset_screen_size()
{
	localStorage.setItem("ppi", -1); // Valor inválido
	document.getElementById("ppi_input").value = "";
	document.getElementById("iGo").style.zoom = 1;
}


//////////////////
// Ecrãs do iGo //
//////////////////

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

function change_screen(new_screen_id)
{
	if (new_screen_id != current_screen.id)
	{
		new_screen = SCREENS[new_screen_id];

		if (current_screen.on_exit != undefined)
			current_screen.on_exit();
		global_on_exit();

		replace_element(current_screen.id, new_screen_id);

		if (new_screen.on_load != undefined)
			new_screen.on_load();
		global_on_load();

		current_screen = new_screen;
	}
}

function replace_element(old_id, new_id)
{
	if (new_id != "error_screen" && old_id != null)
		document.getElementById(old_id).style.display = "none";

	if (new_id != null)
		document.getElementById(new_id).style.display = "block";
}

function go_back()
{
	var parent_screen_id = current_screen.parent_id;
	if (parent_screen_id != undefined)
		change_screen(parent_screen_id);
}

function fadein(id, seconds)
{
	document.getElementById(id).style.opacity = 1;
	document.getElementById(id).style.animation = "fade_in " + seconds + "s";
}

function fadeout(id, seconds)
{
	document.getElementById(id).style.opacity = 0;
	document.getElementById(id).style.animation = "fade_out " + seconds + "s";
}

//////////////////
// Menu inicial //
//////////////////

function update_location()
{
	document.getElementById("city_name").innerHTML = current_location;
	document.getElementById("degrees").innerHTML = LOCATIONS[current_location].temperature + "&deg;";
}

function update_clock(clock_element)
{
	var date = new Date();
	var hours = add0(date.getHours());
	var minutes = add0(date.getMinutes());

	var sep = clock.blink ? "&nbsp" : ":";

	clock.blink = ! clock.blink;

	clock_element.innerHTML = hours + sep + minutes;
}

////////////
// iGuide //
////////////

function iGuide_update_places()
{
	let places = LOCATIONS[current_location].places;

	// Calcular todas as distâncias, ângulos e orientações
	let distances = {};
	let angles = {};
	let orientations = {};
	for (let place_name in places)
	{
		distances[place_name] = get_distance(place_name);
		angles[place_name] = get_angle(place_name);
		orientations[place_name] = get_orientation(angles[place_name]);
	}

	// Ordenar lugares por distância
	let sorted_places = [];
	for (let place_name in places)
	{
		let i;
		for (i = 0; i < sorted_places.length; i ++)
			if (distances[place_name] < distances[sorted_places[i]])
			{
				sorted_places.splice(i, 0, place_name);
				break;
			}
		if (i == sorted_places.length)
			sorted_places.push(place_name);
	}

	// Mostrar a lista de lugares
	let places_element = document.getElementById("iGuide_places_list");
	places_element.innerHTML = "";
	for (let i = 0; i < sorted_places.length; i ++)
	{
		let place = places[sorted_places[i]];

		let orientation = "<div class='iGuide_compass_orientation'>" +
			orientations[place.name] + "</div>";
		let arrow = "<image class='iGuide_compass_arrow' src='img/arrow_white.png'" +
			"style='transform: rotate(" + -angles[place.name] + "rad);'>";
		let distance = "<div class='iGuide_compass_distance'>" +
			Math.round(distances[place.name]) + "m</div>";
		let compass = "<div class='iGuide_compass'>" +
			orientation + arrow + distance +"</div>";
		let place_name = "<div class='iGuide_list_text'>" +
			place.name + "</div>";
		let place_icon = "<image class='iGuide_info_icon' src='" +
			PLACE_TYPE_DATA[place.type].img +
			"' onclick='iGuide_info_load(\""+ place.name +"\");'></div>";

		let stars = "<div class='rating_stars'>" +
		 	"<span>★</span>".repeat(place.rating) + "</div>";

		let repr_img = "<img class='iGuide_list_repr_img' src='" + place.wallpaper + "'>";

		places_element.innerHTML += "<li class='iGuide_list_item'>" + repr_img +
			place_icon + compass + place_name + stars + "</li>";
	}
}

function get_distance(place_name)
{
	let place_pos = LOCATIONS[current_location].places[place_name].position;
	let x_diff = place_pos.x - current_position.x;
	let y_diff = place_pos.y - current_position.y;
	return Math.sqrt(Math.pow(x_diff, 2) + Math.pow(y_diff, 2));
}

function get_angle(place_name)
{
	let place_pos = LOCATIONS[current_location].places[place_name].position;
	let x_diff = place_pos.x - current_position.x;
	let y_diff = place_pos.y - current_position.y;
	return Math.atan2(-y_diff, x_diff);
}

function get_orientation(angle)
{
	return ["O", "SO", "S", "SE", "E", "NE", "N", "NO", "O"][Math.round(4 * angle / Math.PI + 4)];
}

/////////////////////////
// iGuide: informações //
/////////////////////////

function iGuide_info_load(place_name)
{
	iGuide_current_place = LOCATIONS[current_location].places[place_name];
	change_screen("iGuide_info");
}

function iGuide_info_change_tab(new_tab_id)
{
	let current_tab = SCREENS["iGuide_info"].current_tab;
	let current_tab_id = null;
	if (current_tab != null)
		current_tab_id = current_tab.id;

	let new_tab = SCREENS["iGuide_info"].new_tab = null;
	if (new_tab_id != null)
		new_tab = SCREENS["iGuide_info"].new_tab = IGUIDE_INFO_TABS[new_tab_id];

	// Mudar o botão selecionado
	if (current_tab != null)
	{
		iGuide_info_tabs_global_on_exit();
		if (current_tab.on_exit != undefined)
			current_tab.on_exit();
	}

	replace_element(current_tab_id, new_tab_id);

	if (new_tab != null)
	{
		iGuide_info_tabs_global_on_load();
		if (new_tab.on_load != undefined)
			new_tab.on_load();
	}

	SCREENS["iGuide_info"].current_tab = new_tab;
}

function iGuide_info_show_event(event_name)
{
	SCREENS["iGuide_info"].in_event = true;

	let current_event = EVENTS[event_name];

	document.getElementById("iGuide_event_title").innerHTML = event_name;
	document.getElementById("iGuide_event_description").innerHTML = current_event.description;

	let pay_button = document.getElementById("iGuide_event_pay_button");
	if (current_event.price > 0)
	{
		pay_button.disabled = false;
		pay_button.innerHTML = "Comprar (" + current_event.price + "€)";
	}
	else
	{
		pay_button.disabled = true;
		pay_button.innerHTML = "Gratuito";
	}

	document.getElementById("iGuide_info_events").style.display = "none";
	document.getElementById("iGuide_event_info").style.display = "block";

	document.getElementById("back_button").onclick = iGuide_info_leave_event;
}

function iGuide_info_leave_event()
{
	SCREENS["iGuide_info"].in_event = false;
	document.getElementById("iGuide_event_info").style.display = "none";
	document.getElementById("iGuide_info_events").style.display = "block";
	document.getElementById("back_button").onclick = go_back;
}


////////////////
// Pagamentos //
////////////////

function add_payment(type)
{
	document.getElementById("empty_pm").style.display = "none";

	switch(type)
	{
	case "paypal":
		let payment_list_element = document.getElementById("payment_list");
		payment_list_element.innerHTML +=
			"<li class='payment_box_p' id=\"" + saved_payment_methods + "\">" +
				"<div class='payment_type'>Paypal</div>" +
				"<div class='hidden_card'>" + document.getElementById("paypal_email").value + "</div>" +
				"<img class='p_info_img' src='img/paypal.png' onclick='complete_payment();'>" +
				"<img id='delete_b' src='img/delete.png' onclick='delete_pm(\""+ saved_payment_methods +"\");'>" +
			"</li>";
		saved_payment_methods ++;
		break;

	case "card":
		let cardno = document.getElementById("card_number").value;
		let card4dig = cardno[12] + cardno[13] + cardno[14] + cardno[15];
		let payment_list_element_c = document.getElementById("payment_list");
		payment_list_element_c.innerHTML +=
			"<li class='payment_box_c' id='"+ saved_payment_methods +"'>" +
				"<div class='payment_type'>Cartão de Crédito</div>" +
				"<div class='hidden_card'>" + "XXXX-XXXX-XXXX-" + card4dig + "</div>" +
				"<img class='p_info_img' src='img/visa.png' onclick='complete_payment();'>" +
				"<img id='delete_b' src='img/delete.png' onclick='delete_pm(\""+ saved_payment_methods +"\");'>" +
			"</li>";
		saved_payment_methods ++;
		break;
	}
}

function show_delete_option()
{
	let ul = document.getElementById("payment_list");
	let items = ul.getElementsByTagName("li");
	for (let i = 0; i < items.length; i ++)
	{
		if (items[i].getElementsByTagName("img")[1].style.zIndex == "-1")
		{
			items[i].getElementsByTagName("img")[0].style.zIndex = "-1";
			items[i].getElementsByTagName("img")[1].style.zIndex = "1";
		}
		else
		{
			items[i].getElementsByTagName("img")[1].style.zIndex = "-1";
			items[i].getElementsByTagName("img")[0].style.zIndex = "1";
		}
	}
}

function delete_pm(id)
{
	let elem = document.getElementById(id);
	elem.parentNode.removeChild(elem);
	if (document.querySelectorAll("#payment_list li").length == 0)
		document.getElementById("empty_pm").style.display = "block";
}

function payment_form(id)
{
	if (current_screen.id == "add_payment")
	{
		document.getElementById(id).style.animation = "increase_size 1s";
		document.getElementById(id).style.height = "4.1cm";
		if (id == "add_payment_list_paypal")
			fadein('add_payment_form_paypal',1.5);
		else
			fadein('add_payment_form_card',1.5);
	}
}

function fill_paypal()
{
	document.getElementById("paypal_email").value = "exemplo@gmail.com";
	document.getElementById("paypal_pw").value = "123abc";
}

function fill_card()
{
	document.getElementById("card_number").value = "1234 5678 1234 1234";
	document.getElementById("card_date").value = "12/09";
	document.getElementById("card_cvv").value = "123";
}

function complete_payment()
{
	change_screen("payment_complete");
	setTimeout(function()
	{
		document.getElementById("payment_before").style.opacity = "0";
		document.getElementById("payment_after").style.opacity = "1";
	}, 2000);

	setTimeout(function()
	{
		change_screen("payment_methods");
		document.getElementById("payment_before").style.opacity = "1";
		document.getElementById("payment_after").style.opacity = "0";
	}, 3000);

	change_screen(SCREENS["payment_complete"].parent_screen_id);
}

/////////////
// Teclado //
/////////////

function write_mode(id)
{
	current_input_id = id;
	document.getElementById("keyboard").style.display = "block";
	document.getElementById("back_button").onclick = exit_write_mode;
}

function exit_write_mode()
{
	upper_on = false; // Desligar o shift
	document.getElementById("keyboard").style.display = "none";
	document.getElementById("back_button").onclick = go_back;
}

function do_write(w)
{
	// Nota: w vem sempre em maiúscula

	// Se o shift está ligado e foi premida uma letra, mudar para minúsculas
	if (upper_on && /^[A-Z]/.test(w))
		change_keyboard_case();

	else if (! upper_on)
		w = w.toLowerCase();

	document.getElementById(current_input_id).value += w;
}

function change_keyboard_case()
{
	let all_keys = document.querySelectorAll(".keyboard_button");

	if (upper_on)
		for (let i = 0; i < all_keys.length; i++)
			all_keys[i].innerHTML = all_keys[i].innerHTML.toLowerCase();
	else
		for (let i = 0; i < all_keys.length; i++)
			all_keys[i].innerHTML = all_keys[i].innerHTML.toUpperCase();

	upper_on = ! upper_on;
}


/////////////////////
// Funções on_init //
/////////////////////

SCREENS["main_menu"].on_init = update_location;

SCREENS["iGuide_main"].on_init = iGuide_update_places;

/////////////////////
// Funções on_load //
/////////////////////


function global_on_load()
{
	// Função que inclui funcionalidades diversas que tenham de ser executadas
	// sempre na saída (para não sobrecarregar a função change_screen)

	// Atualizar relógio do novo ecrã
	let clock_elements_list = document.getElementById(new_screen.id).getElementsByClassName("clock");
	if (clock_elements_list.length > 0)
	{
		clock.blink = false;
		update_clock(clock_elements_list[0]);
		clock.timeout = setInterval(function(){update_clock(clock_elements_list[0])}, 1000);
	}
}

SCREENS["off"].on_load = function()
{
	document.getElementById("home_button").onclick = null;
	document.getElementById("back_button").onclick = null;
	document.getElementById("screen_logo_container").style.opacity = 0;
};

SCREENS["error_screen"].on_load = function()
{
	SCREENS["error_screen"].parent_id = current_screen.id;
	fadein("error_screen", 0.3);
};


SCREENS["iGuide_info"].on_load = function()
{
	// Mostrar ícone e nome do local
	document.getElementById("iGuide_info_place_icon").src =
		PLACE_TYPE_DATA[iGuide_current_place.type].img;
	document.getElementById("iGuide_info_place_name").innerHTML =
		iGuide_current_place.name;

	// Alterar botões
	let tabs = PLACE_TYPE_DATA[iGuide_current_place.type].tabs;

	let bottom = document.getElementById("iGuide_info_footer");
	bottom.innerHTML = "";
	let button_width = 100 / tabs.length;
	let button_left = 0;

	for (let i = 0; i < tabs.length; ++ i)
	{
		let button_element = document.createElement("button");

		button_element.id = tabs[i] + "_button";
		button_element.classList.add("iGuide_info_tab_button");
		button_element.onclick = function(){iGuide_info_change_tab(tabs[i]);};
		button_element.style.width = button_width + "%";
		button_element.style.left = button_left + "%";
		button_element.innerHTML = IGUIDE_INFO_TABS[tabs[i]].name;

		bottom.appendChild(button_element);
		button_left += button_width; // O próximo botão começa onde este acaba
	}

	// Mudar para a 1ª tab
	iGuide_info_change_tab(tabs[0]);
}

function iGuide_info_tabs_global_on_load()
{
	let new_button_element =
		document.getElementById(SCREENS["iGuide_info"].new_tab.id + "_button");
	new_button_element.style.backgroundColor = "#383838";
	new_button_element.disabled = true;
}

IGUIDE_INFO_TABS["iGuide_info_description"].on_load = function()
{
	document.getElementById("iGuide_info_description").innerHTML =
		iGuide_current_place.description;
}

IGUIDE_INFO_TABS["iGuide_info_events"].on_load = function()
{
	let events = iGuide_current_place.events;
	if (events == undefined)
	{
		document.getElementById("iGuide_info_no_events").style.display = "block";
		document.getElementById("iGuide_info_events_list").style.display = "none";
	}
	else
	{
		document.getElementById("iGuide_info_no_events").style.display = "none";
		document.getElementById("iGuide_info_events_list").style.display = "block";
		let events_list_element = document.getElementById("iGuide_info_events_list");
		events_list_element.innerHTML = "";
		for (let i = 0; i < events.length; i ++)
		{
			let info_img = "<img class='iGuide_info_icon' src='img/infoicon.png'" +
				"onclick='iGuide_info_show_event(\""+ events[i] +"\");'>";
			events_list_element.innerHTML +=
				"<li class='iGuide_list_item'><div class='iGuide_event_list_text iGuide_list_text'>" +
				events[i]+ "</div>" + info_img + "</li>";
		}
	}
}

IGUIDE_INFO_TABS["iGuide_info_shops"].on_load = function()
{
	let shops = iGuide_current_place.shops;
	let shops_element = document.getElementById("iGuide_info_shops_list");
	shops_element.innerHTML = "";
	for (let i = 0; i < shops.length; i ++)
		shops_element.innerHTML += "<li class='iGuide_list_item'>" +
			"<div class='iGuide_list_text'>" + shops[i] + "</div></li>";
}

/////////////////////
// Funções on_exit //
/////////////////////

function global_on_exit()
{
	// Função que inclui funcionalidades diversas que tenham de ser executadas
	// sempre na saída (para não sobrecarregar a função change_screen)

	// Eliminar timeout do relógio, se este ecrã tiver um relógio
	if (document.getElementById(current_screen.id).getElementsByClassName("clock").length > 0)
		clearInterval(clock.timeout);
}

SCREENS["off"].on_exit = function()
{
	document.getElementById("home_button").onclick = function(){ change_screen("main_menu"); }
	document.getElementById("back_button").onclick = go_back;
};

SCREENS["error_screen"].on_exit = function()
{
	document.getElementById("error_screen").style.animation = "";
};

SCREENS["main_menu"].on_exit = function()
{
	clearInterval(SCREENS["main_menu"].timeout);
};

SCREENS["add_payment"].on_exit = function()
{
	document.getElementById("add_payment_list_paypal").style.height = "1cm";
	document.getElementById("add_payment_list_paypal").style.animation = "";
	document.getElementById("add_payment_form_paypal").style.opacity = "0";
	document.getElementById("add_payment_form_paypal").style.animation = "";

	document.getElementById("add_payment_list_card").style.height = "1cm";
	document.getElementById("add_payment_list_card").style.animation = "";
	document.getElementById("add_payment_form_card").style.opacity = "0";
	document.getElementById("add_payment_form_card").style.animation = "";

	document.getElementById("add_payment").scrollTop = 0;

	document.getElementById("paypal_email").value = "";
	document.getElementById("paypal_pw").value = "";

	document.getElementById("card_number").value = "";
	document.getElementById("card_date").value = "";
	document.getElementById("card_cvv").value = "";

	exit_write_mode(); // TODO: Arranjar forma melhor de fazer isto!
};

SCREENS["iGuide_info"].on_exit = function()
{
	if (SCREENS["iGuide_info"].in_event)
		iGuide_info_leave_event();
}

function iGuide_info_tabs_global_on_exit()
{
	let current_tab = SCREENS["iGuide_info"].current_tab;
	if (PLACE_TYPE_DATA[iGuide_current_place.type].tabs.includes(current_tab.id))
	{
		let current_button_element = document.getElementById(current_tab.id + "_button");
		current_button_element.style.backgroundColor = "gray";
		current_button_element.disabled = false;
	}
}

IGUIDE_INFO_TABS["iGuide_info_events"].on_exit = function()
{
	if (SCREENS["iGuide_info"].in_event)
		iGuide_info_leave_event();
}


////////////
// iGroup //
////////////

function addMember(member){
	if(!current_group["Members"].includes(member)){
		current_group["Members"].push(member);
	}
}

function requestMember(memberName){
	let member = MYWEBMEMBERS[memberName];
	addMember(member);
}

function addGroup(){
	var group_name = document.getElementById("iGroup_name_value");
	var group_location = document.getElementById("iGroup_location_value");
	var group_date = document.getElementById("iGroup_date_value");
	var name_error = document.getElementById("Name_error_message");
	var location_error = document.getElementById("Location_error_message");
	var date_error= document.getElementById("Date_error_message");
	if((group_name.value != "") && (group_location.value != "") && (group_date.value != "")){
		var group = {name: group_name.value, location: group_location.value, date: group_date.value};
		iGroup_groups.push(group);
		change_screen("iGroup_main");
		name_error.style.visibility = "hidden";
		location_error.style.visibility="hidden";
		date_error.style.visibility="hidden";
	}
	(group_name.value == "") ? name_error.style.visibility="visible" : name_error.style.visibility="hidden";
	(group_location.value == "") ? location_error.style.visibility="visible" : location_error.style.visibility="hidden";
	(group_date.value == "") ? date_error.style.visibility="visible" : date_error.style.visibility="hidden";
	group_name.value="";
	group_date.value="";
	group_location.value="";
}

function showGroupList(){
	var list = document.getElementById('iGroup_group_list');
	list.innerHTML = "";
	console.log(iGroup_groups.length);
	if(iGroup_groups.length == 0){
		list.innerHTML = "Não tens nenhum grupo.";
		list.innerHTML += "<button onclick='change_screen(iGroup_create)'>Criar grupo</button>";
	}
	else{
		for(let i = 0; i < iGroup_groups.length; i++){
		console.log(iGroup_groups[i]);
		list.innerHTML += "<li>"+ iGroup_groups[i].name + "</li>";
		}
	}
	change_screen('iGroup_groups');
}

function showGroupScreen(groupName){
	for (let i = 0; i < iGroup_groups.length ; i++){
		if(iGroup_groups[i].name == groupName){
			current_group = iGroup_groups[i];
			break;
		}
	}
}
