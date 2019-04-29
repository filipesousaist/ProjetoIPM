/*****************/
/*****************/
/*** MAIN MENU ***/
/*****************/
/*****************/


function main_menu_update_location()
{
	let location_name = people[current_person_name].location_name;
	document.getElementById("city_name").innerHTML = location_name;
	document.getElementById("degrees").innerHTML = LOCATIONS[location_name].temperature + "&deg;";
}
