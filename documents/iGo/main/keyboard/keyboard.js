/****************/
/****************/
/*** KEYBOARD ***/
/****************/
/****************/

var upper_on = false;
var current_input_id;

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
}

function do_write(w)
{
	// Nota: w vem sempre em maiúscula

	// Se o shift está ligado e foi premida uma letra, mudar para minúsculas
	if (upper_on && /^[A-Z]/.test(w))
		change_keyboard_case();

	else if (! upper_on)
		w = w.toLowerCase();

	document.getElementById("keyboard_input").innerHTML += w;
}

function do_delete()
{
	let input = document.getElementById("keyboard_input");

	if (input.innerHTML.length > 0)
		input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
}

function go_to_next_input()
{
	let inputs = document.getElementById(current_screen.id).getElementsByTagName("input");

	for (let i = 0; i < inputs.length - 1; i ++)
		if (inputs[i].id == current_input_id)
		{
			current_input_id = inputs[i + 1].id;
			document.getElementById("keyboard_input").innerHTML = inputs[i + 1].value;
			return;
		}
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
