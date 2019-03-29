var current_screen;
var parent_screen =
{
	"main_menu": null,
	"apps": "main_menu",
	"location": "main_menu",
	"options": "main_menu"
}

var main_menu_obj =
{
	clock_blink: null,
	timeout: null
}

function init()
{
	current_screen = "main_menu";
	document.getElementById("main_menu").style.display = "block";
	main_menu_load();
}

function replace_element(old_element, new_element)
{
	document.getElementById(old_element).style.display = "none";
	document.getElementById(new_element).style.display = "block";
}

function change_screen(new_screen)
{
	if (new_screen != current_screen)
	{
		switch (current_screen)
		{
		case "main_menu":
			main_menu_exit();
			break;
		}
		
		replace_element(current_screen, new_screen);
		current_screen = new_screen;
		
		switch (new_screen)
		{
		case "main_menu":
			main_menu_load();
			break;
		}
	}
}

function go_back()
{
	var previous_screen = parent_screen[current_screen];
	if (previous_screen != null)
		change_screen(previous_screen);
}

// MAIN MENU

function main_menu_load()
{
	main_menu_obj.clock_blink = false;
	update_clock();
	main_menu_obj.timeout = setInterval(update_clock, 1000);
}

function main_menu_exit()
{
	clearInterval(main_menu_obj.timeout);
}

function update_clock()
{
	var date = new Date();
	var hours = add0(date.getHours());
	var minutes = add0(date.getMinutes());
	
	var sep;
	if (main_menu_obj.blink)
		sep = "&nbsp";
	else
		sep = ":";
	main_menu_obj.blink = ! main_menu_obj.blink;
	
	document.getElementById("clock").innerHTML = hours + sep + minutes;
}