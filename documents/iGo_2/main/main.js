/************/
/************/
/*** MAIN ***/
/************/
/************/

// Ligado/desligado
var power;
// Ecrãs
var current_screen;
var new_screen;
var going_back = false;
// Popups
var popup_ids = [];
// Relógio
var clock = {blink: false, interval: null};
const CLOCK_UPDATE_INTERVAL = 1000; // Milisegundos

////////////////////
// Inicializações //
////////////////////

function init()
{
	load(); // Obter valores de algumas variáveis globais

	// Inicializar uma série de coisas
	init_auto_save();
	init_ppi();
	init_locations();
	init_user();
	init_ratings();
	init_screens();

	turn_on();

	init_keyboard_events();
}

function exit()
{
	home();

	clearInterval(clock.interval);
	clearInterval(position_interval);
	reset_keyboard_events();

	turn_off();
}

function reload()
{
	exit();
	init();
}


function init_screens()
{
	document.getElementById("off").style.display = "block";

	for (let s in SCREENS)
	{
		if (SCREENS[s].on_init != undefined)
			SCREENS[s].on_init();
		if (SCREENS[s].parent_id == "auto")
			SCREENS[s].current_parent_id = null;
	}

	// Inicializar ecrã atual
	current_screen = new_screen = SCREENS["off"];
	current_screen.on_load();

	// Inicializar relógio
	clock.interval = setInterval(update_clock, CLOCK_UPDATE_INTERVAL);
}

function init_keyboard_events()
{
	document.body.addEventListener("keyup", handle_key_up);
	document.body.addEventListener("keydown", handle_key_down);
}

function reset_keyboard_events()
{
	document.body.removeEventListener("keyup", handle_key_up);
	document.body.removeEventListener("keydown", handle_key_down);
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
		map_move_slow();
		break;
	}
}


//////////////////
// Ecrãs do iGo //
//////////////////

function turn_off_on()
{
	if (! power)
		turn_on();
	else
		turn_off();
}

function turn_on()
{
	document.getElementById("screen_logo_container").style.animation = "fade_in_out 1.5s";
	setTimeout(function(){change_screen("main_menu");}, 1600);
	power = true;
}

function turn_off()
{
	document.getElementById("screen_logo_container").style.animation = "";
	change_screen("off");
	power = false;
}

function replace_element(old_id, new_id)
{
	if (old_id != null)
		document.getElementById(old_id).style.display = "none";

	if (new_id != null)
		document.getElementById(new_id).style.display = "block";
}

function change_screen(new_screen_id)
{
	if (power && new_screen_id != current_screen.id)
	{
		new_screen = SCREENS[new_screen_id];

		if (going_back)
		{
			global_on_exit();
			if (current_screen.on_exit != undefined)
				current_screen.on_exit();
		}

		replace_element(current_screen.id, new_screen_id);

		if (! going_back)
		{
			if (new_screen.on_load != undefined)
				new_screen.on_load();
			global_on_load();
		}

		if (new_screen.parent_id == "auto" && new_screen.current_parent_id == null)
			new_screen.current_parent_id = current_screen.id;

		current_screen = new_screen;
	}
}

function display_popup(popup_id)
{
	popup_ids.push(popup_id);
	POPUPS[popup_id].on_load();
	document.getElementById(popup_id).style.display = "block";
}

function hide_popup()
{
	let popup_id = popup_ids.pop();
	POPUPS[popup_id].on_exit();
	document.getElementById(popup_id).style.display = "none";
}


function go_back()
{
	if (power)
	{
		going_back = true;

		if (popup_ids.length > 0) // Dá prioridade a fechar popups
			hide_popup();
		else // Se não houver popups, vai para o ecrã anterior
		{
			if (current_screen.parent_id == "auto")
			{
				let current_parent_id = current_screen.current_parent_id;
				current_screen.current_parent_id = null;
				change_screen(current_parent_id);
			}
			else if (current_screen.parent_id != undefined)
				change_screen(current_screen.parent_id);
		}

		going_back = false;
	}
}

function home()
{
	if (power)
		while (current_screen.id != "main_menu")
			go_back();
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

function update_clock()
{
	let clock_elements_list =
		document.getElementById(new_screen.id).getElementsByClassName("clock");

	if (clock_elements_list.length > 0)
	{
		let clock_element = clock_elements_list[0];
		let hours_element = clock_element.getElementsByClassName("clock_hours")[0];
		let sep_element = clock_element.getElementsByClassName("clock_sep")[0];
		let minutes_element = clock_element.getElementsByClassName("clock_minutes")[0];

		let date = new Date();

		hours_element.innerHTML = add0(date.getHours());
		minutes_element.innerHTML = add0(date.getMinutes());
		if (current_screen == new_screen)
		{
			sep_element.innerHTML = clock.blink ? "&nbsp" : ":";
			clock.blink = ! clock.blink;
		}
	}
}


/////////////////////
// Funções on_load //
/////////////////////

function global_on_load()
{
	update_clock();
}

SCREENS["off"].on_load = function()
{
	document.getElementById("screen_logo_container").style.opacity = 0;
};

POPUPS["error_window"].on_load = function()
{
	fadein("error_window", 0.3);
};

/////////////////////
// Funções on_exit //
/////////////////////

function global_on_exit()
{
	update_clock();
}

POPUPS["error_window"].on_exit = function()
{
	document.getElementById("error_window").style.animation = "";
};
