class Screen
{
	constructor(id, parent_id, on_load, on_exit, properties)
	{
		this.id = id;
		this.parent_id = parent_id;
		this.on_load = on_load;
		this.on_exit = on_exit;
		this.properties = properties;
	}
}

var current_screen;

var screens =
{
	// Menu inicial
	"main_menu": new Screen("main_menu", null,
		function()
		{
			this.properties["clock_blink"] = false;
			update_clock();
			this.properties["timeout"] = setInterval(update_clock, 1000);
		},
		function(){clearInterval(this.properties["timeout"]);},
		{"clock_blink": false, "timeout": null}
	),
	
	// Ecrã das aplicações
	"apps": new Screen("apps", "main_menu", null, null, null),
	
	// Ecrã da localização
	"location": new Screen("location", "main_menu", null, null, null),
	
	// Ecrã das opções
	"options": new Screen("options", "main_menu", null, null, null),
	
	// Ecrã do iGuide
	"iGuide_main": new Screen("iGuide_main", "apps", 
	function()
	{
		let places_element = document.getElementById("iGuide_places_near_you");
		let places_list = ["Parque Eduardo VII", "Shopping Amoreiras", "Instituto Gulbenkian", "Padrão dos Descobrimentos", "Torre de Belém"];
		
		for (let i = 0; i < places_list.length; i ++)
			places_element.innerHTML += "<li class='iGuide_place'><marquee behavior='alternate'>" + places_list[i] + "</marquee></li>";
	}, null, null),
	
	// Ecrã do iWay
	"iWay_main": new Screen("iWay_main", "apps", null, null, null),
	
	// Ecrã do iGroup
	"iGroup_main": new Screen("iGroup_main", "apps", null, null, null),
	
	// Ecrã de erro
	"error_screen": new Screen("error_screen", null,
		function(){this.parent_id = current_screen.id;}, null, null)
}

function init()
{
	current_screen = screens["main_menu"];
	document.getElementById("main_menu").style.display = "block";
	current_screen.on_load();
}

function replace_element(old_id, new_id)
{
	document.getElementById(new_id).style.display = "block";
	
	if (new_id == "error_screen")
		fadein(new_id);
	else
		document.getElementById(old_id).style.display = "none";

}

function change_screen(new_screen_id)
{
	if (new_screen_id != current_screen.id)
	{
		if (current_screen.on_exit != null)
			current_screen.on_exit();

		replace_element(current_screen.id, new_screen_id);
		
		let new_screen = screens[new_screen_id];
		if (new_screen.on_load != null)
			new_screen.on_load();

		current_screen = new_screen;
	}
}

function go_back()
{
	var parent_screen_id = current_screen.parent_id;
	if (parent_screen_id != null)
		change_screen(parent_screen_id);
}

// MAIN MENU

function update_clock()
{
	var date = new Date();
	var hours = add0(date.getHours());
	var minutes = add0(date.getMinutes());

	var sep;
	var main_menu = screens["main_menu"];
	if (main_menu.properties["blink"])
		sep = "&nbsp";
	else
		sep = ":";
	main_menu.properties["blink"] = ! main_menu.properties["blink"];

	document.getElementById("clock").innerHTML = hours + sep + minutes;
}

function fadein(id)
{
	document.getElementById(id).style.animation = "fade 0.3s";
	document.getElementById(id).style.opacity = "1";
}
