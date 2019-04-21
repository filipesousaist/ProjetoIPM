/*******************/
/*******************/
/*** IGUIDE INFO ***/
/*******************/
/*******************/

function iGuide_info_load(place_name)
{
	iGuide_current_place = LOCATIONS[current_location].places[place_name];
	change_screen("iGuide_info");
}

function iGuide_info_change_tab(new_tab_id)
{
	let current_tab = SCREENS["iGuide_info"].current_tab;
	let current_tab_id = null;
	if (current_tab != null)
		current_tab_id = current_tab.id;

	let new_tab = SCREENS["iGuide_info"].new_tab = null;
	if (new_tab_id != null)
		new_tab = SCREENS["iGuide_info"].new_tab = IGUIDE_INFO_TABS[new_tab_id];

	// Mudar o botão selecionado
	if (current_tab != null)
	{
		iGuide_info_tabs_global_on_exit();
		if (current_tab.on_exit != undefined)
			current_tab.on_exit();
	}

	replace_element(current_tab_id, new_tab_id);

	if (new_tab != null)
	{
		iGuide_info_tabs_global_on_load();
		if (new_tab.on_load != undefined)
			new_tab.on_load();
	}

	SCREENS["iGuide_info"].current_tab = new_tab;
}

function iGuide_info_show_event(event_name)
{
	SCREENS["iGuide_info"].in_event = true;

	let current_event = EVENTS[event_name];

	document.getElementById("iGuide_event_title").innerHTML = event_name;
	document.getElementById("iGuide_event_description").innerHTML = current_event.description;

	let pay_button = document.getElementById("iGuide_event_pay_button");
	if (current_event.price > 0)
	{
		pay_button.disabled = false;
		pay_button.innerHTML = "Comprar (" + current_event.price + "€)";
	}
	else
	{
		pay_button.disabled = true;
		pay_button.innerHTML = "Gratuito";
	}

	document.getElementById("iGuide_info_events").style.display = "none";
	document.getElementById("iGuide_event_info").style.display = "block";

	document.getElementById("back_button").onclick = iGuide_info_leave_event;
}

function iGuide_info_leave_event()
{
	SCREENS["iGuide_info"].in_event = false;
	document.getElementById("iGuide_event_info").style.display = "none";
	document.getElementById("iGuide_info_events").style.display = "block";
	document.getElementById("back_button").onclick = go_back;
}


/////////////////////
// Funções on_load //
/////////////////////

function iGuide_info_tabs_global_on_load()
{
	let new_button_element =
		document.getElementById(SCREENS["iGuide_info"].new_tab.id + "_button");
	new_button_element.style.backgroundColor = "#c7c2c2";
	new_button_element.disabled = true;
}

SCREENS["iGuide_info"].on_load = function()
{
	// Mostrar ícone e nome do local
	document.getElementById("iGuide_info_place_icon").src =
		"apps/iGuide/img/place_icons/" + iGuide_current_place.type + ".png";
	document.getElementById("iGuide_info_place_name").innerHTML =
		iGuide_current_place.name;

	// Alterar botões
	let tabs = PLACE_TYPE_DATA[iGuide_current_place.type].tabs;

	let bottom = document.getElementById("iGuide_info_footer");
	bottom.innerHTML = "";
	let button_width = 100 / tabs.length;
	let button_left = 0;

	for (let i = 0; i < tabs.length; ++ i)
	{
		let button_element = document.createElement("button");

		button_element.id = tabs[i] + "_button";
		button_element.classList.add("iGuide_info_tab_button");
		button_element.onclick = function(){iGuide_info_change_tab(tabs[i]);};
		button_element.style.width = button_width + "%";
		button_element.style.left = button_left + "%";
		button_element.innerHTML = IGUIDE_INFO_TABS[tabs[i]].name;

		bottom.appendChild(button_element);
		button_left += button_width; // O próximo botão começa onde este acaba
	}

	// Mudar para a 1ª tab
	iGuide_info_change_tab(tabs[0]);
}

IGUIDE_INFO_TABS["iGuide_info_description"].on_load = function()
{
	document.getElementById("iGuide_info_description").innerHTML =
		iGuide_current_place.description;
}

IGUIDE_INFO_TABS["iGuide_info_events"].on_load = function()
{
	let events = iGuide_current_place.events;
	if (events == undefined)
	{
		document.getElementById("iGuide_info_no_events").style.display = "block";
		document.getElementById("iGuide_info_events_list").style.display = "none";
	}
	else
	{
		document.getElementById("iGuide_info_no_events").style.display = "none";
		document.getElementById("iGuide_info_events_list").style.display = "block";
		let events_list_element = document.getElementById("iGuide_info_events_list");
		events_list_element.innerHTML = "";
		for (let i = 0; i < events.length; i ++)
		{
			let info_img = "<img class='iGuide_info_icon' src='apps/iGuide/img/infoicon.png'" +
				"onclick='iGuide_info_show_event(\""+ events[i] +"\");'>";
			events_list_element.innerHTML +=
				"<li class='iGuide_list_item'><div class='iGuide_event_list_text iGuide_list_text'>" +
				events[i]+ "</div>" + info_img + "</li>";
		}
	}
}

IGUIDE_INFO_TABS["iGuide_info_shops"].on_load = function()
{
	/*let shops = iGuide_current_place.shops;
	let shops_element = document.getElementById("iGuide_info_shops_list");
	shops_element.innerHTML = "";
	for (let i = 0; i < shops.length; i ++)
		shops_element.innerHTML += "<li class='iGuide_list_item'>" +
			"<div class='iGuide_list_text'>" + shops[i] + "</div></li>";*/
}


/////////////////////
// Funções on_exit //
/////////////////////

SCREENS["iGuide_info"].on_exit = function()
{
	if (SCREENS["iGuide_info"].in_event)
		iGuide_info_leave_event();
}

function iGuide_info_tabs_global_on_exit()
{
	let current_tab = SCREENS["iGuide_info"].current_tab;
	if (PLACE_TYPE_DATA[iGuide_current_place.type].tabs.includes(current_tab.id))
	{
		let current_button_element = document.getElementById(current_tab.id + "_button");
		current_button_element.style.backgroundColor = "#a7a7a7";
		current_button_element.disabled = false;
	}
}

IGUIDE_INFO_TABS["iGuide_info_events"].on_exit = function()
{
	if (SCREENS["iGuide_info"].in_event)
		iGuide_info_leave_event();
}
