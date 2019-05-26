const MAX_POS = {x: 1000, y: 750};
const SPEED_FAST = 15;
const SPEED_SLOW = 5;
const POSITION_UPDATE_INTERVAL = 50; // Milisegundos
const NEAR_DISTANCE = 200;

var power;
var current_screen;
var current_location;
var current_position;
var current_speed;
var move_directions;
var keyboard_row;
var saved_payment_methods = 0;

////////////////////
// Inicializações //
////////////////////

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

	switch (e.key)
	{
	case "x":
		turn_off_on();
		break;

	case "w":
	case "ArrowUp":
		e.preventDefault();
		move_directions.up = false;
		break;

	case "a":
	case "ArrowLeft":
		e.preventDefault();
		move_directions.left = false;
		break;

	case "s":
	case "ArrowDown":
		e.preventDefault();
		move_directions.down = false;
		break;

	case "d":
	case "ArrowRight":
		e.preventDefault();
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

	switch (e.key)
	{
	case "w":
	case "ArrowUp":
		e.preventDefault();
		move_directions.up = true;
		break;

	case "a":
	case "ArrowLeft":
		e.preventDefault();
		move_directions.left = true;
		break;

	case "s":
	case "ArrowDown":
		e.preventDefault();
		move_directions.down = true;
		break;

	case "d":
	case "ArrowRight":
		e.preventDefault();
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

function fadein(id, seconds)
{
	document.getElementById(id).style.opacity = "1";
	document.getElementById(id).style.animation = "fade_in " + seconds + "s";
}

function fadeout(id, seconds)
{
	document.getElementById(id).style.opacity = "0";
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

////////////
// iGuide //
////////////

function iGuide_update_places()
{
	let sorted_places = [];
	for (let place in LOCATIONS[current_location].places)
		if (distance(place) <= NEAR_DISTANCE)
		{
			let i = 0;
			while (i < sorted_places.length)
			{
				if (distance(place) < distance(sorted_places[i]))
				{
					sorted_places.splice(i, 0, place);
					break;
				}
				i ++;
			}
			if (i == sorted_places.length)
				sorted_places.push(place);
		}

	let places_element = document.getElementById("iGuide_places_near_you");
	places_element.innerHTML = "";
	for (let i = 0; i < sorted_places.length; i ++)
	{
		let info_img = "<img class='info_icon' src='img/infoicon.png' onclick='changeInfoScreen(\""+ sorted_places[i] +"\");'>";
		places_element.innerHTML += "<li class='iGuide_place_frame'><div class='iGuide_place'>" +
			sorted_places[i] + "</div>" + info_img + "</li>";
	}
}

function loadEventList(place_name){
	let events = LOCATIONS[current_location].places[place_name].events;
	let events_element = document.getElementById("iGuide_events_list");
	if (events.includes("EMPTY")){
		events_element.innerHTML= "Não há eventos a decorrer...";
	}
	else{
		events_element.innerHTML = "";
		for(let i = 0; i < events.length; i ++){
		let info_img = "<img class='info_icon' src='img/infoicon.png' onclick='changeEvent(\""+ events[i] +"\" , \"" + place_name +"\");'>";
		events_element.innerHTML += "<li class='iGuide_place_frame'><div class='iGuide_event'>" +
			events[i]+ "</div>" + info_img + "</li>";
		}
	}
}

function loadShopList(place_name){
	let shops = LOCATIONS[current_location].places[place_name].shops;
	let shops_element = document.getElementById("iGuide_shops_list");
	shops_element.innerHTML = "";
	for(let i = 0; i < shops.length; i ++){
		let info_img = "<img class='info_icon' src='img/infoicon.png''>";
		shops_element.innerHTML += "<li class='iGuide_place_frame'><div class='iGuide_event'>" +
		shops[i]+ "</div>" + info_img + "</li>";
	}
}

function changeShopScreen(place_name){
	let place = LOCATIONS[current_location].places[place_name];
	document.getElementById("iGuide_shops_location").innerHTML = place.name;
	loadShopList(place_name);
	let bottom = document.getElementById("iGuide_shops_bottom_container");
	let eventsButton = "<button type='button' class='infobutton'onclick='changeEventsScreen(\""+ place_name +"\");'>Eventos</button>";
	let infoButton = "<button type='button' class='infobutton' onclick='changeInfoScreen(\""+ place_name +"\");'>Descrição</button>";
	bottom.innerHTML = infoButton + eventsButton + "<button class='infobutton' type='button'>Lojas</button>";
	change_screen("iGuide_shops");
}

function distance(place_name)
{
	let place_pos = LOCATIONS[current_location].places[place_name].position;
	let x_diff = place_pos.x - current_position.x;
	let y_diff = place_pos.y - current_position.y;
	return Math.sqrt(Math.pow(x_diff, 2) + Math.pow(y_diff, 2));
}

function changeInfoScreen(place_name)
{
	let place = LOCATIONS[current_location].places[place_name];
	document.getElementById("iGuide_info_icon").src = PLACE_TYPE_IMG[place.type];
	document.getElementById("iGuide_info_title").innerHTML = place.name;
	document.getElementById("iGuide_info_container").innerHTML = place.info;
	let bottom = document.getElementById("iGuide_info_bottom_container");
	let eventsButton = "<button type='button' class='infobutton'onclick='changeEventsScreen(\""+ place_name +"\");'>Eventos</button>";
	let emptyButton = "<button type='button' class='infobutton'>------</button>";
	let infoButton = "<button type='button' class='infobutton'>Descrição</button>";
	let shopButton = "<button class='infobutton' onclick='changeShopScreen(\""+ place_name+"\");' type='button'>Lojas</button>";
	switch(place.type){
		case("park"):
			bottom.innerHTML = infoButton + eventsButton + emptyButton;
			break;
		case("shop"):
			bottom.innerHTML = infoButton + eventsButton + shopButton;
			break;
		case("monument"):
			bottom.innerHTML = infoButton + emptyButton + emptyButton;
			break;
		case("museum"):
			bottom.innerHTML = infoButton + emptyButton + emptyButton;
			break;
	}
	change_screen("iGuide_info");
}

function changeEventsScreen(place_name){
	let place = LOCATIONS[current_location].places[place_name];
	document.getElementById("iGuide_events_location").innerHTML = place.name;
	loadEventList(place_name);
	let bottom = document.getElementById("iGuide_events_bottom_container");
	let infoButton = "<button type='button' class='infobutton' onclick='changeInfoScreen(\""+ place_name +"\");'>Descrição</button>";
	let shopButton = "<button class='infobutton' onclick='changeShopScreen(\""+ place_name+"\");' type='button'>Lojas</button>";
	switch(place.type){
		case("park"):
			bottom.innerHTML = infoButton + "<button type='button' class='infobutton'>Eventos</button>" + "<button class='infobutton' type='button'>------</button>";
			break;
		case("shop"):
			bottom.innerHTML = infoButton + "<button type='button' class='infobutton'>Eventos</button>" + shopButton;
			break;
	}
	change_screen("iGuide_events");
}

function changeEvent(event_name, place_name){
	let event = EVENTS[event_name];
	let place = LOCATIONS[current_location].places[place_name];
	document.getElementById("iGuide_event_title").innerHTML = event.name;
	document.getElementById("iGuide_event_info_container").innerHTML = event.info + "<button id='payButton' onclick='change_screen(\"payment_methods\");'> Comprar " + event.price + "</button>";
	let bottom = document.getElementById("iGuide_events_info_bottom_container");
	let infoButton = "<button type='button' class='infobutton' onclick='changeInfoScreen(\""+ place_name +"\");'>Descrição</button>";
	let shopButton = "<button class='infobutton' onclick='changeShopScreen(\""+ place_name+"\");' type='button'>Lojas</button>";
	switch(place.type){
		case("park"):
			bottom.innerHTML = infoButton + "<button type='button' class='infobutton'>Eventos</button>" + "<button class='infobutton' type='button'>------</button>";
			break;
		case("shop"):
			bottom.innerHTML = infoButton + "<button type='button' class='infobutton'>Eventos</button>" + shopButton;
			break;
	}
	change_screen("iGuide_event_info");
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
		saved_payment_methods++;
		break;

	case "card":
		let cardno = document.getElementById("card_number").value;
		let card4dig = cardno[12] + cardno[12] + cardno[14] + cardno[15];
		let payment_list_element_c = document.getElementById("payment_list");
		payment_list_element_c.innerHTML +=
			"<li class='payment_box_c' id='"+ saved_payment_methods +"'>" +
				"<div class='payment_type'>Cartão de Crédito</div>" +
				"<div class='hidden_card'>" + "XXXX-XXXX-XXXX-" + card4dig + "</div>" +
				"<img class='p_info_img' src='img/visa.png' onclick='complete_payment();'>" +
				"<img id='delete_b' src='img/delete.png' onclick='delete_pm(\""+ saved_payment_methods +"\");'>" +
			"</li>";
		saved_payment_methods++;
		break;
	}

}

function show_delete_option()
{
	let ul = document.getElementById("payment_list");
	let items = ul.getElementsByTagName("li");
	for (let i = 0; i < items.length; ++ i)
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

 function complete_payment(){
	change_screen("payment_complete");
	setTimeout(function(){
		document.getElementById("payment_before").style.opacity = "0";
		document.getElementById("payment_after").style.opacity = "1";
	}, 2000);

	setTimeout(function(){
		change_screen("payment_methods");
		document.getElementById("payment_before").style.opacity = "1";
		document.getElementById("payment_after").style.opacity = "0";
	}, 3000);

	change_screen(SCREENS["payment_complete"].parent_screen_id);
}

/////////////
// Teclado //
/////////////

var current_input_id;

function change_keyboard_row(direction)
{
	let old_row_element = document.getElementById("keyboard_row" + keyboard_row);
	old_row_element.classList.remove("keyboard_active");
	old_row_element.classList.add("keyboard_inactive");

	if (direction == "up")
		keyboard_row = keyboard_row - 1 >= 0 ? keyboard_row - 1 : 3;
	else if (direction == "down")
		keyboard_row = keyboard_row + 1 <= 3 ? keyboard_row + 1 : 0;

	let new_row_element = document.getElementById("keyboard_row" + keyboard_row);
	new_row_element.classList.remove("keyboard_inactive");
	new_row_element.classList.add("keyboard_active");
}

function write_mode(id){
	current_input_id = id;
	document.getElementById("keyboard").style.display = "block";
}

function do_write(w)
{
	document.getElementById(current_input_id).value += w;
}

function exit_write_mode()
{
	while (keyboard_row != 1)
		change_keyboard_row("up"); // TODO: Arranjar forma melhor de fazer isto!
	document.getElementById("keyboard").style.display = "none";
}

/////////////////////
// Funções on_init //
/////////////////////

SCREENS["main_menu"].on_init = function()
{
	update_location();
};

/////////////////////
// Funções on_load //
/////////////////////

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

SCREENS["main_menu"].on_load = function()
{
	SCREENS["main_menu"].clock_blink = false;
	update_clock();
	SCREENS["main_menu"].timeout = setInterval(update_clock, 1000);
};

SCREENS["add_payment"].on_load = function()
{
	// Keyboard
	keyboard_row = 1;
	document.getElementById("keyboard_row1").classList.remove("keyboard_inactive");
	document.getElementById("keyboard_row1").classList.add("keyboard_active");
}

/////////////////////
// Funções on_exit //
/////////////////////

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
