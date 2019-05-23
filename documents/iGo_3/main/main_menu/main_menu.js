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

function main_menu_update_notifications()
{
	let num_notifications = iGroup_count_new_notifications();

	let notifications_element = document.getElementById("main_menu_notification_icon");
	if (num_notifications > 0)
	{
		notifications_element.style.display = "block";
		notifications_element.innerHTML = num_notifications;
	}
	else
		notifications_element.style.display = "none";
}

SCREENS["main_menu"].on_load = main_menu_update_notifications;
