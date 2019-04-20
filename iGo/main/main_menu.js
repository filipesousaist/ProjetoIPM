/*****************/
/*****************/
/*** MAIN MENU ***/
/*****************/
/*****************/


function update_location()
{
	document.getElementById("city_name").innerHTML = current_location;
	document.getElementById("degrees").innerHTML = LOCATIONS[current_location].temperature + "&deg;";
}

SCREENS["main_menu"].on_init = update_location;

SCREENS["main_menu"].on_exit = function()
{
	clearInterval(SCREENS["main_menu"].timeout);
};
