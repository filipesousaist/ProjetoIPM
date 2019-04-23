/************/
/************/
/*** MAIN ***/
/************/
/************/

// Geral
var power;
var current_screen;
var new_screen;
// Relógio
var clock = {blink: false, timeout: null};

////////////////////
// Inicializações //
////////////////////

function init()
{
	load(); // Obter valores de algumas variáveis globais

	init_auto_save();
	init_ppi();
	init_locations();
	init_ratings();

	document.getElementById("off").style.display = "block";

	init_screens();

	current_screen = SCREENS["off"];
	current_screen.on_load();

	power = false;
	turn_off_on();

	init_keyboard_events();
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

	else if (["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(e.key))
		e.preventDefault();

	switch (e.key)
	{
	case "x":
		turn_off_on();
		break;

	case "w":
	case "ArrowUp":
		move_directions.up = false;
		break;

	case "a":
	case "ArrowLeft":
		move_directions.left = false;
		break;

	case "s":
	case "ArrowDown":
		move_directions.down = false;
		break;

	case "d":
	case "ArrowRight":
		move_directions.right = false;
		break;

	case "Shift":
		map_move_fast();
		break;
	}
}

function handle_key_down(e)
{
	if (e == undefined)
		return;

	else if (["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(e.key))
		e.preventDefault();

	switch (e.key)
	{
	case "w":
	case "ArrowUp":
		move_directions.up = true;
		break;

	case "a":
	case "ArrowLeft":
		move_directions.left = true;
		break;

	case "s":
	case "ArrowDown":
		move_directions.down = true;
		break;

	case "d":
	case "ArrowRight":
		move_directions.right = true;
		break;

	case "Shift":
		current_speed = SPEED_SLOW;
		break;
	}
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
		new_screen = SCREENS[new_screen_id];

		if (current_screen.on_exit != undefined)
			current_screen.on_exit();
		global_on_exit();

		replace_element(current_screen.id, new_screen_id);

		if (new_screen.on_load != undefined)
			new_screen.on_load();
		global_on_load();

		current_screen = new_screen;
	}
}

function replace_element(old_id, new_id)
{
	if (new_id != "error_screen" && old_id != null)
		document.getElementById(old_id).style.display = "none";

	if (new_id != null)
		document.getElementById(new_id).style.display = "block";
}

function go_back()
{
	var parent_screen_id = current_screen.parent_id;
	if (parent_screen_id != undefined)
		change_screen(parent_screen_id);
}

function fadein(id, seconds)
{
	document.getElementById(id).style.opacity = 1;
	document.getElementById(id).style.animation = "fade_in " + seconds + "s";
}

function fadeout(id, seconds)
{
	document.getElementById(id).style.opacity = 0;
	document.getElementById(id).style.animation = "fade_out " + seconds + "s";
}

function update_clock(clock_element)
{
	var date = new Date();

	var hours_element = clock_element.getElementsByClassName("clock_hours")[0];
	var sep_element = clock_element.getElementsByClassName("clock_sep")[0];
	var minutes_element = clock_element.getElementsByClassName("clock_minutes")[0];

	hours_element.innerHTML = add0(date.getHours());
	sep_element.innerHTML = clock.blink ? "&nbsp" : ":";
	minutes_element.innerHTML = add0(date.getMinutes());

	clock.blink = ! clock.blink;
}


/////////////////////
// Funções on_load //
/////////////////////

function global_on_load()
{
	// Função que inclui funcionalidades diversas que tenham de ser executadas
	// sempre na saída (para não sobrecarregar a função change_screen)

	// Atualizar relógio do novo ecrã
	let clock_elements_list = document.getElementById(new_screen.id).getElementsByClassName("clock");
	if (clock_elements_list.length > 0)
	{
		clock.blink = false;
		update_clock(clock_elements_list[0]);
		clock.timeout = setInterval(function(){update_clock(clock_elements_list[0])}, 1000);
	}
}

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

/////////////////////
// Funções on_exit //
/////////////////////

function global_on_exit()
{
	// Função que inclui funcionalidades diversas que tenham de ser executadas
	// sempre na saída (para não sobrecarregar a função change_screen)

	// Eliminar timeout do relógio, se este ecrã tiver um relógio
	if (document.getElementById(current_screen.id).getElementsByClassName("clock").length > 0)
		clearInterval(clock.timeout);
}

SCREENS["off"].on_exit = function()
{
	document.getElementById("home_button").onclick = function(){ change_screen("main_menu"); }
	document.getElementById("back_button").onclick = go_back;
};

SCREENS["error_screen"].on_exit = function()
{
	document.getElementById("error_screen").style.animation = "";
};
