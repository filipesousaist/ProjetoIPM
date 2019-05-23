/*******************/
/*******************/
/*** IGUIDE INFO ***/
/*******************/
/*******************/

var tickets = 0;

var iGuide_info_current_tab = null;
var iGuide_info_new_tab = null;
var iGuide_info_event_name = null;

function iGuide_info_load(place_name)
{
	iGuide_current_place = LOCATIONS[people[current_person_name].location_name].places[place_name];
	change_screen("iGuide_info");
}

function iGuide_info_change_tab(new_tab_id)
{
	let current_tab_id = null;
	if (iGuide_info_current_tab != null)
		current_tab_id = iGuide_info_current_tab.id;

	iGuide_info_new_tab = null;
	if (new_tab_id != null)
		iGuide_info_new_tab = IGUIDE_INFO_TABS[new_tab_id];

	// Mudar o botão selecionado
	if (iGuide_info_current_tab != null)
	{
		iGuide_info_tabs_global_on_exit();
		if (iGuide_info_current_tab.on_exit != undefined)
			iGuide_info_current_tab.on_exit();
	}

	replace_element(current_tab_id, new_tab_id);

	if (iGuide_info_new_tab != null)
	{
		iGuide_info_tabs_global_on_load();
		if (iGuide_info_new_tab.on_load != undefined)
			iGuide_info_new_tab.on_load();
	}

	iGuide_info_current_tab = iGuide_info_new_tab;
}

function iGuide_info_show_event(event_name)
{
	iGuide_info_event_name = event_name;
	change_screen("iGuide_event_info");
}

/////////////////////
// Funções on_load //
/////////////////////

function iGuide_info_tabs_global_on_load()
{
	let new_button_element =
		document.getElementById("iGuide_info").getElementsByClassName(
			iGuide_info_new_tab.id + "_button")[0];
	new_button_element.disabled = true;
}

SCREENS["iGuide_info"].on_load = function()
{
	// Mostrar ícone e nome do local
	document.getElementById("iGuide_info_place_icon").src =
		"main/main_menu/apps/location/img/place_icons/" + iGuide_current_place.type + ".png";
	document.getElementById("iGuide_info_place_name").innerHTML =
		iGuide_current_place.name;

	// Mudar para a 1ª tab
	iGuide_info_change_tab("iGuide_info_description");
}

SCREENS["iGuide_event_info"].on_load = function()
{
	let current_event = EVENTS[iGuide_info_event_name];

	document.getElementById("iGuide_event_img_container").innerHTML =
		"<img class='iGuide_event_img' src=" + current_event.image + ">";
	document.getElementById("iGuide_event_time").innerHTML = current_event.time;
	document.getElementById("iGuide_event_loc").innerHTML = current_event.loc;
	document.getElementById("iGuide_event_price").innerHTML = current_event.price;

	document.getElementById("iGuide_event_title").innerHTML = iGuide_info_event_name;

	let pay_button = document.getElementById("iGuide_event_pay_button");
	if (current_event.price != "Grátis")
	{
		pay_button.disabled = false;
		pay_button.innerHTML = "Comprar Bilhete";
		document.getElementById("iGuide_event_ticket_count").innerHTML = tickets;
	}
	else
	{
		pay_button.disabled = true;
		pay_button.innerHTML = "Gratuito";
		document.getElementById("iGuide_event_ticket_count").innerHTML = "-";
	}
}

IGUIDE_INFO_TABS["iGuide_info_description"].on_load = function()
{
	document.getElementById("iGuide_info_description").innerHTML =
		 iGuide_current_place.bg + iGuide_current_place.description;
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
			let repr_img = "<img class='iGuide_list_repr_img' src='" +
				EVENTS[events[i]].wallpaper + "'>";
			let event_name = "<div class='iGuide_event_list_text iGuide_list_text'>" +
				EVENTS[events[i]].name + "</div>";
			let info_img = "<img class='iGuide_event_info_icon' src='apps/iGuide/img/infoicon.png'" +
				"onclick='iGuide_info_show_event(\""+ events[i] +"\");'>";

			events_list_element.innerHTML += "<li class='iGuide_list_item'>" +
				repr_img + event_name + info_img + "</li>";
		}
	}
}

IGUIDE_INFO_TABS["iGuide_info_gallery"].on_load = function()
{
	let gallery = iGuide_current_place.gallery;
	let gallery_element = document.getElementById("iGuide_info_img_list");
	gallery_element.innerHTML = "";
	for (let i = 0; i < gallery.length; i ++)
		gallery_element.innerHTML += "<li>" + gallery[i] + "</li>";
}


/////////////////////
// Funções on_exit //
/////////////////////

SCREENS["iGuide_event_info"].on_exit = function()
{
	iGuide_info_event_name = null;
}

function iGuide_info_tabs_global_on_exit()
{
	let current_button_element =
		document.getElementById("iGuide_info").getElementsByClassName(
			iGuide_info_current_tab.id + "_button")[0];
	current_button_element.disabled = false;
}

IGUIDE_INFO_TABS["iGuide_info_events"].on_exit = function()
{
	if (iGuide_info_event_name != null)
		go_back();
}
