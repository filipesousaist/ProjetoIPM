/**************/
/**************/
/*** IGUIDE ***/
/**************/
/**************/

var iGuide_current_place;

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

/////////////////////
// Funções on_init //
/////////////////////

SCREENS["iGuide_main"].on_init = iGuide_update_places;
