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
	document.getElementById("keyboard").style.display = "block";
	document.getElementById("back_button").onclick = exit_write_mode;
}

function exit_write_mode()
{
	upper_on = false; // Desligar o shift
	document.getElementById("keyboard").style.display = "none";
	document.getElementById("back_button").onclick = go_back;
}

function do_write(w)
{
	// Nota: w vem sempre em maiúscula

	// Se o shift está ligado e foi premida uma letra, mudar para minúsculas
	if (upper_on && /^[A-Z]/.test(w))
		change_keyboard_case();

	else if (! upper_on)
		w = w.toLowerCase();

	document.getElementById(current_input_id).value += w;
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
