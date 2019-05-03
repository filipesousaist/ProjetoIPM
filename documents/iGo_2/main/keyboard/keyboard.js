/****************/
/****************/
/*** KEYBOARD ***/
/****************/
/****************/

var upper_on = false;
var current_input_id;
var current_keyboard_id;

function write_mode(id, type)
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
	// Nota: w vem sempre em mai&uacute;scula

	// Se o shift est&aacute; ligado e foi premida uma letra, mudar para min&uacute;sculas
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
			update_keyboard();
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
