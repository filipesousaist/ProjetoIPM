/***********/
/***********/
/*** MAP ***/
/***********/
/***********/

const POS_MAX = {x: 1000, y: 750};
const POSITION_UPDATE_INTERVAL = 50; // Milisegundos
const SPEED_FAST = 15;
const SPEED_SLOW = 5;

var current_location_name; /* SAVE */
var current_position;
var current_speed;
var move_directions;


function init_locations()
{
	// Adicionar localizações à lista
	let locations_element = document.getElementById("map_locations");
	for (let l in LOCATIONS)
		locations_element.innerHTML += "<option value='" + l + "'>" + l + "</option>";
	locations_element.value = current_location_name;

	// Inicializar mapa e posições
	update_map();
	current_position = {x: POS_MAX.x / 2, y: POS_MAX.y / 2};
	current_speed = SPEED_FAST;
	move_directions = {up: false, left: false, down: false, right: false};

	let position_element = document.getElementById("your_position");
	let pixel_coords = map_to_pixel_coords(current_position, position_element);
	position_element.style.left = pixel_coords.x;
	position_element.style.top = pixel_coords.y;
	update_position();
	setInterval(update_position, POSITION_UPDATE_INTERVAL);
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
		if (current_position.x > POS_MAX.x)
			current_position.x = POS_MAX.x;
		else if (current_position.x < 0)
			current_position.x = 0;

		if (current_position.y > POS_MAX.y)
			current_position.y = POS_MAX.y;
		else if (current_position.y < 0)
			current_position.y = 0;

		position_element.style.left = (current_position.x / POS_MAX.x) * map_element.offsetWidth - position_element.offsetWidth / 2 + "px";
		position_element.style.top = (current_position.y / POS_MAX.y) * map_element.offsetHeight - position_element.offsetHeight / 2 + "px";

		iGuide_update_places();
	}
}

function change_location()
{
	let new_location_name = document.getElementById("map_locations").value;
	if (new_location_name != current_location_name)
	{
		current_location_name = new_location_name;
		update_map();
		update_location(); /* Menu inicial */
		iGuide_update_places(); /* iGuide */
	}
}

function update_map()
{
	let map_element = document.getElementById("map");
	let places = LOCATIONS[current_location_name].places;

	let children = map_element.children;
	for (let i = children.length - 1; i >= 0; i --)
		if (children[i].class == "map_place_img")
			map_element.removeChild(children[i]);

	for (let p in places)
	{
		location_img = document.createElement("img");
		location_img.src = "sidebars/map/img/location.png";
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
	let pixel_x = (map_coords.x / POS_MAX.x) * map_element.offsetWidth - element.offsetWidth / 2 + "px";
	let pixel_y = (map_coords.y / POS_MAX.y) * map_element.offsetHeight - element.offsetHeight / 2 + "px";

	return {x: pixel_x, y: pixel_y};
}
