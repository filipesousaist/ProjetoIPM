/****************/
/****************/
/*** LOCATION ***/
/****************/
/****************/

const POS_MAX = {x: 1000, y: 750};
const POSITION_UPDATE_INTERVAL = 50; // Milisegundos
const SPEED_FAST = 15;
const SPEED_SLOW = 5;

var current_speed;
var move_directions;
var position_interval = null;


function init_locations()
{
	// Adicionar localiza&ccedil;&otilde;es &agrave; lista
	let locations_element = document.getElementById("map_locations");
	locations_element.innerHTML = "";
	for (let l in LOCATIONS)
		locations_element.innerHTML += "<option value='" + l + "'>" + l + "</option>";

	// Atualizar localiza&ccedil;&atilde;o no mapa da sidebar e na app Localiza&ccedil;&atilde;o
	document.getElementById("location_name_text").innerHTML =
		locations_element.value = people[current_person_name].location_name;

	// Inicializar mapas e posi&ccedil;&otilde;es
	current_speed = SPEED_FAST;
	move_directions = {up: false, left: false, down: false, right: false};

	update_maps();

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
		if (current_person.position.x > POS_MAX.x)
			current_person.position.x = POS_MAX.x;
		else if (current_person.position.x < 0)
			current_person.position.x = 0;

		if (current_person.position.y > POS_MAX.y)
			current_person.position.y = POS_MAX.y;
		else if (current_person.position.y < 0)
			current_person.position.y = 0;

		// Atualizar todos os mapas
		let map_elements = document.getElementsByClassName("map");
		for (let i = 0; i < map_elements.length; i ++)
		{
			let position_element = map_elements[i].getElementsByClassName("position_" + current_person.id)[0];
			let pixel_coords = map_to_pixel_coords(map_elements[i], position_element, current_person.position);
			position_element.style.left = pixel_coords.x;
			position_element.style.top = pixel_coords.y;
		}

		iGuide_update_places();
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

function update_map(map_element)
{
	let children = map_element.children;
	for (let i = children.length - 1; i >= 0; i --)
		map_element.removeChild(children[i]);

	let current_location_name = people[current_person_name].location_name;
	let places = LOCATIONS[current_location_name].places;
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
	}

	let my_groups = getMyGroups();

	for (let person_name in people)
	{
		let group_index = findGroupIndex(my_groups, person_name);
		if (person_name == current_person_name ||
			(group_index != -1 && people[person_name].location_name == current_location_name))
		{
			let person_img = document.createElement("img");
			map_element.appendChild(person_img);
			person_img.classList.add("your_position");
			person_img.classList.add("position_" + people[person_name].id); // Adicionar uma classe com o nome da pessoa
			let pixel_coords = map_to_pixel_coords(map_element, person_img, people[person_name].position);
			person_img.style.left = pixel_coords.x;
			person_img.style.top = pixel_coords.y;

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
	let map_elements = document.getElementsByClassName("map");

	for (let i = 0; i < map_elements.length; i ++)
		update_map(map_elements[i]);
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
