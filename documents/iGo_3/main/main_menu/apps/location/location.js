/****************/
/****************/
/*** LOCATION ***/
/****************/
/****************/

const POS_MAX = {x: 1000, y: 750};
const POSITION_UPDATE_INTERVAL = 50; // Milisegundos
const SPEED_FAST = 15;
const SPEED_SLOW = 5;

const ZOOM_FACTOR = 1.2;
const MIN_ZOOM_TIMES = -2;
const MAX_ZOOM_TIMES = 4;


var current_speed;
var move_directions;
var position_interval = null;
var maps = {"sidebar_map": {location_name: null},
						"location_map": {location_name: null}}
var zoom_times = 0;

function init_locations()
{
	// Adicionar localizações à lista
	let locations_element = document.getElementById("map_locations");
	locations_element.innerHTML = "";
	for (let l in LOCATIONS)
		locations_element.innerHTML += "<option value='" + l + "'>" + l + "</option>";

	// Atualizar localização no mapa da sidebar e na app Localização
	document.getElementById("location_name_text").innerHTML =
		locations_element.value = people[current_person_name].location_name;

	// Inicializar mapas e posições
	current_speed = SPEED_FAST;
	move_directions = {up: false, left: false, down: false, right: false};

	update_maps();
	document.getElementById("location_map").style.zoom = 1;

	update_position();
	position_interval = setInterval(update_position, POSITION_UPDATE_INTERVAL);

	iGuide_update_places();
	main_menu_update_location();
}

function map_move_fast()
{
  current_speed = SPEED_FAST;
}

function map_move_slow()
{
  current_speed = SPEED_SLOW;
}

function update_position()
{
	let moved = false;

	let current_person = people[current_person_name];

	if (move_directions.up)
		current_person.position.y -= current_speed;
	if (move_directions.left)
		current_person.position.x -= current_speed;
	if (move_directions.down)
		current_person.position.y += current_speed;
	if (move_directions.right)
		current_person.position.x += current_speed;

	if ((move_directions.up ^ move_directions.down) ||
			(move_directions.right ^ move_directions.left))
		moved = true;

	if (moved)
	{
		if (current_person.position.x > POS_MAX.x - 25)
			current_person.position.x = POS_MAX.x - 25;
		else if (current_person.position.x < 25)
			current_person.position.x = 25;

		if (current_person.position.y > POS_MAX.y - 25)
			current_person.position.y = POS_MAX.y - 25;
		else if (current_person.position.y < 25)
			current_person.position.y = 25;

		// Atualizar todos os mapas
		for (let map_id in maps)
		{
			let map_element = document.getElementById(map_id);
			let position_element = map_element.getElementsByClassName("position_" + current_person.id)[0];
			if (position_element)
			{
				let pixel_coords = map_to_pixel_coords(map_element, position_element, current_person.position);
				position_element.style.left = pixel_coords.x;
				position_element.style.top = pixel_coords.y;
			}
		}

		iGuide_update_places();

		if (current_screen.id == "location" &&
			maps["location_map"].location_name == current_person.location_name &&
			screens_stack.length >= 2 &&
			screens_stack[screens_stack.length - 2].id != "iGroup_group_member_info")
		{
			let person_position = people[current_person_name].position;
			center_location_map(current_person_name, person_position);
		}
	}
}

function change_location()
{
	let new_location_name = document.getElementById("map_locations").value;
	if (new_location_name != people[current_person_name].location_name)
	{
		document.getElementById("location_name_text").innerHTML =
			people[current_person_name].location_name = new_location_name;
		update_maps();
		main_menu_update_location(); /* Menu inicial */
		iGuide_update_places(); /* iGuide */
	}
}

function update_map(map_id)
{
	let map_element = document.getElementById(map_id);
	let children = map_element.children;
	for (let i = children.length - 1; i >= 0; i --)
		if (children[i].id != "map_canvas")
			map_element.removeChild(children[i]);

	let places = LOCATIONS[maps[map_id].location_name].places;
	for (let place in places)
	{
		let location_img = document.createElement("img");
		map_element.appendChild(location_img);
		location_img.src = PLACE_TYPE_DATA[places[place].type].img;
		location_img.classList.add("map_place_img");
		location_img.title = place;
		let pixel_coords = map_to_pixel_coords(map_element, location_img, places[place].position);
		location_img.style.left = pixel_coords.x;
		location_img.style.top = pixel_coords.y;
		location_img.style.zoom = 1;
	}

	let my_groups = getMyGroups();

	for (let person_name in people)
	{
		let group_index = findGroupIndex(my_groups, person_name);
		if ((person_name == current_person_name || group_index != -1) &&
			people[person_name].location_name == maps[map_id].location_name)
		{
			let person_img = document.createElement("img");
			map_element.appendChild(person_img);
			person_img.classList.add("your_position");
			person_img.classList.add("position_" + people[person_name].id); // Adicionar uma classe com o nome da pessoa
			let pixel_coords = map_to_pixel_coords(map_element, person_img, people[person_name].position);
			person_img.style.left = pixel_coords.x;
			person_img.style.top = pixel_coords.y;
			person_img.style.zoom = 1;

			if (person_name == current_person_name)
			{
				person_img.style.width = person_img.style.height = "5mm";
				person_img.src = "main/main_menu/apps/location/img/position.png";
			}
			else
				person_img.src = MAP_PERSON_ICONS[group_index];
		}
	}
}

function update_maps()
{
	for (let map_id in maps)
	{
		maps[map_id].location_name = people[current_person_name].location_name;
		update_map(map_id);
	}
}

function map_to_pixel_coords(map_element, element, map_coords)
{
	let map_style = window.getComputedStyle(map_element);
	let element_style = window.getComputedStyle(element);

	let map_width = parseFloat(map_style.getPropertyValue("width"));
	let map_height = parseFloat(map_style.getPropertyValue("height"));
	let element_width = parseFloat(element_style.getPropertyValue("width"));
	let element_height = parseFloat(element_style.getPropertyValue("height"));

	let pixel_x = (map_coords.x / POS_MAX.x) * map_width - element_width / 2 + "px";
	let pixel_y = (map_coords.y / POS_MAX.y) * map_height - element_height / 2 + "px";
	return {x: pixel_x, y: pixel_y};
}

function center_location_map(person_name, element_position)
{
	let person_img = document.getElementsByClassName("position_" + people[person_name].id)[0];
	let map_element = document.getElementById("location_map");
	let element_coords = map_to_pixel_coords(map_element, person_img, element_position);

	let element_style = window.getComputedStyle(person_img);
	let element_width = parseFloat(element_style.getPropertyValue("width"));
	let element_height = parseFloat(element_style.getPropertyValue("height"));

	let screen_element = document.getElementById("location_screen_body");
	let screen_style = window.getComputedStyle(screen_element);
	let screen_width = parseFloat(screen_style.getPropertyValue("width"));
	let screen_height = parseFloat(screen_style.getPropertyValue("height"));

	let zoom = parseFloat(document.getElementById("location_map").style.zoom);

	screen_element.scrollLeft = parseFloat(element_coords.x) * zoom - screen_width / 2 + element_width / 2;
	screen_element.scrollTop = parseFloat(element_coords.y) * zoom - screen_height / 2 + element_height / 2;
}

function zoom_location_map(mode)
{
	let location_map = document.getElementById("location_map");
	if (mode == "in")
	{
		if (zoom_times >= MAX_ZOOM_TIMES)
			return;
		location_map.style.zoom *= ZOOM_FACTOR;
		zoom_times ++;
	}
	else // mode == "out"
	{
		if (zoom_times <= MIN_ZOOM_TIMES)
			return;
		location_map.style.zoom /= ZOOM_FACTOR;
		zoom_times --;
	}

	if (screens_stack.length >= 2 && screens_stack[screens_stack.length - 2].id != "iGroup_group_member_info")
		center_location_map(current_person_name, people[current_person_name].position);
}

SCREENS["location"].on_load = function()
{
	document.getElementById("location_name_text").innerHTML =
		maps["location_map"].location_name;
	if (current_screen.id != "iGroup_group_member_info")
	{
		let person_position = people[current_person_name].position;
		center_location_map(current_person_name, person_position);
	}
	if (current_screen.id == "iWay_main"){
		document.getElementById("map_canvas").style.display = "block";
		document.getElementById("iway_path_global").style.display = "block";
	}
}

SCREENS["location"].on_exit = function()
{
	document.getElementById("iWay_steps_list").innerHTML = "";
	maps["location_map"].location = people[current_person_name].location_name;
	if (new_screen.id == "iWay_main"){
		document.getElementById("map_canvas").style.display = "none";
		document.getElementById("iway_path_global").style.display = "none";
	}
}
