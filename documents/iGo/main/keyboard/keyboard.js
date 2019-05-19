/****************/
/****************/
/*** KEYBOARD ***/
/****************/
/****************/

const CHAR_TABLE =
{
	"acute":
	{
		"A": "Á",
		"E": "É",
		"I": "Í",
		"O": "Ó",
		"U": "Ú",
		"a": "á",
		"e": "é",
		"i": "í",
		"o": "ó",
		"u": "ú"
	},

	"tilde":
	{
		"A": "Ã",
		"O": "Õ",
		"a": "ã",
		"o": "õ"
	}
}

var upper_on = false;
var current_input_id;
var current_keyboard_id;
var next_symbol = null;

function write_mode(id)
{
	current_input_id = id;
	display_popup("keyboard");
}

function update_keyboard()
{
	let current_input = document.getElementById(current_input_id);

	document.getElementById("keyboard_input_title").innerHTML = current_input.name;
	document.getElementById("keyboard_input").innerHTML = current_input.value;

	change_keyboard_type();
}

function change_keyboard_type()
{
	if (current_keyboard_id != null)
		document.getElementById(current_keyboard_id).style.display = "none";

	let current_input = document.getElementById(current_input_id);
	if (current_input.classList.contains("text_input"))
		current_keyboard_id = "full_keyboard";
	else if (current_input.classList.contains("number_input"))
		current_keyboard_id = "number_keyboard";
	document.getElementById(current_keyboard_id).style.display = "block";
}

function do_write(w)
{
	// Nota: w vem sempre em maiúscula

	// Se o shift está ligado e foi premida uma letra, mudar para minúsculas
	if (upper_on && /^[A-Z]/.test(w))
		change_keyboard_case();

	else if (! upper_on)
		w = w.toLowerCase();

	if (next_symbol != null) // Adicionar ~ ou ´
	{
		let table = CHAR_TABLE[next_symbol];
		if (table.hasOwnProperty(w))
			w = table[w];
	}

	document.getElementById("keyboard_input").innerHTML += w;

	write_next(null);
}

function write_next(symbol)
{
	next_symbol = symbol;
}

function do_delete()
{
	let input = document.getElementById("keyboard_input");

	if (input.innerHTML.length > 0)
		input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
}

function go_to_next_input()
{
	write_next(null);
	current_input_id = FORMS_NEXT_ID[current_input_id];

	if (current_input_id != null)
		update_keyboard();
	else
		hide_popup();
}

function confirm_input()
{
	document.getElementById(current_input_id).value =
		document.getElementById("keyboard_input").innerHTML;
	go_to_next_input();
}

function change_keyboard_case()
{
	let all_keys = document.querySelectorAll(".keyboard_button");

	if (upper_on)
		for (let i = 0; i < all_keys.length; i++)
			all_keys[i].innerHTML = all_keys[i].innerHTML.toLowerCase();
	else
		for (let i = 0; i < all_keys.length; i++)
			all_keys[i].innerHTML = all_keys[i].innerHTML.toUpperCase();

	upper_on = ! upper_on;
}

POPUPS["keyboard"].on_load = update_keyboard;

POPUPS["keyboard"].on_exit = function()
{
	upper_on = false; // Desligar o shift
}
