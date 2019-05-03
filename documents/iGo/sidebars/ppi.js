/***********/
/***********/
/*** PPI ***/
/***********/
/***********/

function init_ppi()
{
	let ppi = localStorage.getItem("ppi");

	if (ppi == undefined)
		localStorage.setItem("ppi", "");
	else if (ppi != "")
	{
		document.getElementById("ppi_input").value = ppi;
		document.getElementById("iGo").style.zoom = ppi / (96 * window.devicePixelRatio);
	}
}

function resize_screen()
{
	let ppi_input = document.getElementById("ppi_input");
	if (ppi_input.value != "")
	{
		let value = parseFloat(ppi_input.value);
		let minValue = parseFloat(ppi_input.min), maxValue = parseFloat(ppi_input.max);

		if (value > maxValue)
			ppi_input.value = maxValue;
		else if (value < minValue)
			ppi_input.value = minValue;

		localStorage.setItem("ppi", value);
		document.getElementById("iGo").style.zoom = value / (96 * window.devicePixelRatio);
	}
}

function reset_screen_size()
{
	localStorage.setItem("ppi", -1); // Valor inv&aacute;lido
	document.getElementById("ppi_input").value = "";
	document.getElementById("iGo").style.zoom = 1;
}
