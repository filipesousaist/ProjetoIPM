/**************/
/**************/
/*** IGROUP ***/
/**************/
/**************/

var iGroup_groups; /* SAVE */
var current_group;

function addMember(member)
{
	var member_error = document.getElementById("Memeber_error_message");
	if (!current_group["members"].includes(member))
	{
		current_group["members"].push(member);
		if (member.name != current_person_name)
		{
			current_group["inbox"].push(create_notification(
				member.name + " foi adicionado.",
				convertToDate(new Date()),
				"add_member"));
			iGroup_update_notifications();
		}
		showGroupList();
		change_screen('iGroup_group_main');


		update_maps();
	}
}

function requestMember()
{
	let member_error = document.getElementById("Member_error_message");
	let member_name = document.getElementById("iGroup_member_name_value");
	let member = people[member_name.value];
	if (member != undefined){
		member_error.style.visibility="hidden";
		addMember(member);
	}
	else{
		member_error.style.visibility="visible";
		document.getElementById("igroup_addmember_submit").style.top = "6mm";
	}
	member_name.value = "";
}

function addEvent()
{
	let event_name = document.getElementById("iGroup_event_name_value");
	let event_year = document.getElementById("iGroup_event_year_value");
	let event_month = document.getElementById("iGroup_event_month_value");
	let event_day = document.getElementById("iGroup_event_day_value");
	let new_event =
	{
		name: event_name.value,
		date: convertToDate(new Date(event_year.value, parseInt(event_month.value) - 1, event_day.value)),
		author: current_person_name,
		description: ""
	};
	let eventsList = current_group["events"];
	eventsList.push(new_event);

	let notification = create_notification(
		"Evento " + new_event.name + " adicionado.",
		convertToDate(new Date()),
		"add_event");
	current_group["inbox"].push(notification);
	iGroup_update_notifications();

	event_name.value = "";
	event_year.value = "";
	event_month.value = "";
	event_day.value = "";
	change_screen('iGroup_group_main');
}


function addGroup()
{
	let group_name = document.getElementById("iGroup_name_value");
	let group_location = document.getElementById("iGroup_location_value");
	let group_year = document.getElementById("iGroup_year_value");
	let group_month = document.getElementById("iGroup_month_value");
	let group_day = document.getElementById("iGroup_day_value");
	let name_error = document.getElementById("Name_error_message");
	let location_error = document.getElementById("Location_error_message");
	let date_error = document.getElementById("Date_error_message");

	let is_valid_group = group_name.value != "";
	if (is_valid_group)
		for (let i = 0; i < iGroup_groups.length; i ++)
			if (iGroup_groups[i].name == group_name.value)
				is_valid_group = false;

	let is_valid_date = group_year.value != "" && group_month.value != "" && group_day.value != "";
	let group_date;
	if (is_valid_date)
	{
		let today_date = new Date();
		group_date = new Date(group_year.value, parseInt(group_month.value) - 1, group_day.value);
		if (isNaN(group_date) || group_date < today_date)
			is_valid_date = false;
	}

	if (is_valid_group && (group_location.value != "") && is_valid_date)
	{
		let group_date_str = convertToDate(group_date);
		let departure =
		{
			name: "Inicio da viagem",
			date: group_date_str,
			author: current_person_name,
			description: "Início da viagem a " + group_location.value + "."
		};
		let group =
		{
			name: group_name.value,
			location: group_location.value,
			date: group_date_str,
			owner: current_person_name,
			members: [people[current_person_name]],
			events: [departure],
			inbox: []
		};
		iGroup_groups.push(group);
		change_screen("iGroup_main");
	}
	name_error.style.visibility = (!is_valid_group ? "visible" : "hidden");
	location_error.style.visibility = (group_location.value == "" ? "visible" : "hidden");
	date_error.style.visibility = (!is_valid_date ? "visible" : "hidden");
}

function exitGroup()
{
	for (let i = 0; i < iGroup_groups.length; i++)
	{
		if (iGroup_groups[i].name == current_group.name)
		{
			iGroup_groups[i].members =
				removeObjectArray(current_group.members, people[current_person_name]);

			let notification = create_notification(
				current_person_name + " saiu do grupo.",
				convertToDate(new Date()),
				"remove");
			current_group["inbox"].push(notification);
			iGroup_update_notifications();

			if (current_group.members.length == 0)
				iGroup_groups = removeObjectArray(iGroup_groups, current_group);
			else current_group.owner = current_group.members[0].name;
		}

	}
	update_maps();
	showGroupList();
	showMembersList();
	iGroup_update_notifications();
	change_screen("iGroup_groups");
}

function removeObjectArray(list, value)
{
	return list.filter(
		function(element) {return element.name != value.name;}
	);
}


function showGroupList()
{
	var list = document.getElementById('iGroup_group_list');
	list.innerHTML = "";

	// Ver a que grupos o utilizador pertence
	let myGroups = getMyGroups();
	if (myGroups.length == 0)
	{

		list.innerHTML += "<h1>Sem grupo(s).</h1>";
		list.innerHTML += "<div class='iGroup_mainButton' id='iGroup_createGroup' style='top:0.7cm;background-color:limegreen;'" +
			"onclick='change_screen(\"iGroup_create\")'>" +
			"<img class='iGroup_main_icon' src='apps/iGroup/img/plus.png'>" +
			"<div class='iGroup_main_text'>Criar Grupo</div></div>";
	}
	else
		for (let i = 0; i < myGroups.length; i++)
		{
			let icon_img = MAP_PERSON_ICONS[i];
			list.innerHTML += "<li class='iGroup_list_item' style='background-color:whitesmoke;border:0.3mm solid #3834348c;' onclick='showGroupScreen(\""+ myGroups[i].name +"\");'>" +
				"<img src='" + icon_img + "' class='igroup_group_img_repr'>" +
				"<div class='igroup_grouplist_name'>" + myGroups[i].name + "</div>" +
				"<div class='igroup_grouplist_desc'>Nº membros: " + myGroups[i].members.length + "</div>" +
			    "</li>";
		}
}

function getMyGroups()
{
	let myGroups = [];
	for (let i = 0; i < iGroup_groups.length; i ++)
		for (let j = 0; j < iGroup_groups[i].members.length; j ++)
			if (iGroup_groups[i].members[j].name == current_person_name)
			{
				myGroups.push(iGroup_groups[i]);
				break;
			}
	return myGroups;
}

function showMembersList()
{
	var list = document.getElementById("iGroup_group_memberList");
	list.innerHTML = "";
	var membersList = current_group.members;

	for (let i = 0; i < membersList.length; i ++){
		list.innerHTML += "<li class='iGroup_list_item igroup_list_item_simple' id='igroup_person_div' style='background-color:limegreen;' onclick='showMemberInfo(\""+ membersList[i].name + "\");'>"+ membersList[i].name +
						  "<img class='igroup_person_photo' src='" + people[membersList[i].name].image + "'>";

		if(membersList[i].name == current_group.owner) document.getElementById("igroup_person_div").innerHTML += "<img class='igroup_owner_img' src='apps/iGroup/img/crown.svg'>";
		list.innerHTML+= "</li>";
	}
	change_screen('iGroup_group_main_memberList');
}

function showMemberInfo(memberName){
	var photo = document.getElementById("iGroup_member_photo");
	var name = document.getElementById("iGroup_group_member_name_p");
	photo.src = people[memberName].image;
	name.innerHTML = memberName;
	change_screen('iGroup_group_member_info');
}

function iGroup_see_member_location()
{
	let member_name = document.getElementById("iGroup_group_member_name_p").innerHTML;
	maps["location_map"].location_name = people[member_name].location_name;

	update_map("location_map");

	change_screen("location");

	center_location_map(member_name, people[member_name].position);
}

function showGroupScreen(groupName)
{
	for (let i = 0; i < iGroup_groups.length; i ++)
		if (iGroup_groups[i].name == groupName)
		{
			current_group = iGroup_groups[i];
			break;
		}

	document.getElementById("igroup_title_group_name").innerHTML = groupName + " - Menu";
	change_screen('iGroup_group_main');
}

function findGroupIndex(groups, user_name)
{
	for (let i = 0; i < groups.length; i ++)
		if (iGroup_is_in_group(groups[i], user_name))
			return i;
	return -1;
}

function iGroup_is_in_group(group, user_name)
{
	for (let i = 0; i < group.members.length; i ++)
		if (group.members[i].name == user_name)
			return true;
	return false;
}

function showEventsList()
{
	var list = document.getElementById("iGroup_group_eventsList");
	list.innerHTML = "";
	var eventsList = current_group.events;
	for (let i = 0; i < eventsList.length; i++)
		list.innerHTML += "<li class='iGroup_list_item igroup_list_item_simple' style='background-color:limegreen;' onclick='showEventInfo(\"" + eventsList[i].name + "\");'>" + "<div class='iGroup_event_name'>" + eventsList[i].name +
		"</div><div class='iGroup_date' style='right:-5.5mm'>" + eventsList[i].date + "</div></li>";

	change_screen('iGroup_group_main_eventsList');
}

function showEventInfo(event_name)
{
	var current_event = null;
	for (let i = 0; i < current_group.events.length; i ++)
		if (current_group.events[i].name == event_name)
		{
			current_event = current_group.events[i];
			break;
		}

	var name = document.getElementById("iGroup_event_name");
	var date = document.getElementById("iGroup_event_date");
	var description = document.getElementById("iGroup_event_description");
	var author = document.getElementById("iGroup_event_author");
	name.innerHTML = current_event.name;
	date.innerHTML = "Data: " + current_event.date;
	author.innerHTML = "Autor: " + current_event.author;
	description.innerHTML = current_event.description;
	change_screen('iGroup_group_event_info');
}

function showInbox()
{
	var list = document.getElementById("iGroup_group_inboxList");
	list.innerHTML = "";
	var inbox = current_group["inbox"];
	for (let i = inbox.length - 1; i >= 0; i --)
	{
		let new_item;
		if (inbox[i].type == "add_event")
			new_item = "<li class='iGroup_list_item iGroup_notification_item_addevent igroup_list_item_simple'>";
		else if (inbox[i].type == "add_member")
			new_item = "<li class='iGroup_list_item iGroup_notification_item_addmember igroup_list_item_simple'>";
		else if (inbox[i].type == "remove")
			new_item = "<li class='iGroup_list_item iGroup_notification_item_remove igroup_list_item_simple'>";

		new_item += "<div class='iGroup_inbox_title'>" + inbox[i].title +
		"</div><div class='iGroup_date'>" + inbox[i].date + "</div></li>";

		list.innerHTML += new_item;

		inbox[i].new_for = removeObjectArray(inbox[i].new_for, people[current_person_name]);
	}

	iGroup_update_notifications();

	change_screen('iGroup_group_inbox');
}

function create_notification(title, date, type)
{
	let notification = {title: title, date: date, type: type, new_for: []}
	for (let i = 0; i < current_group.members.length; i ++)
		notification.new_for.push(current_group.members[i]);

	return notification;
}

function iGroup_count_new_notifications()
{
	let count = 0;
	for (let i = 0; i < iGroup_groups.length; i ++)
	{
		if (iGroup_is_in_group(iGroup_groups[i], current_person_name))
		{
			let inbox = iGroup_groups[i]["inbox"];
			for (let j = 0; j < inbox.length; j ++)
				for (let k = 0; k < inbox[j].new_for.length; k ++)
					if (inbox[j].new_for[k].name == current_person_name)
					{
						count ++;
						break;
					}
		}
	}

	return count;
}

function iGroup_main_update_notifications()
{
	let num_notifications = iGroup_count_new_notifications();

	let notifications_element = document.getElementById("iGroup_main_notification_icon");
	if (num_notifications > 0)
	{
		notifications_element.style.display = "block";
		notifications_element.innerHTML = num_notifications;
	}
	else
		notifications_element.style.display = "none";
}

function iGroup_update_notifications()
{
	main_menu_update_notifications();
	apps_menu_update_notifications();
	iGroup_main_update_notifications();
}

function convertToDate(date)
{
	return date.getFullYear() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getDate();
}

/**************/
/**************/
/** ON_EXIT ***/
/**************/
/**************/

SCREENS["iGroup_create"].on_exit = function()
{
	document.getElementById("Name_error_message").style.visibility = "hidden";
	document.getElementById("Location_error_message").style.visibility = "hidden";
	document.getElementById("Date_error_message").style.visibility = "hidden";

	document.getElementById("iGroup_name_value").value = "";
	document.getElementById("iGroup_location_value").value = "";
	document.getElementById("iGroup_year_value").value = "";
	document.getElementById("iGroup_month_value").value = "";
	document.getElementById("iGroup_day_value").value = "";
}

SCREENS["iGroup_group_inbox"].on_exit = function()
{
	document.getElementById("iGroup_not_empty").style.display = "hidden";
}

SCREENS["iGroup_group_addMember"].on_exit = function()
{
	document.getElementById("igroup_addmember_submit").style.top = "3mm";
	document.getElementById("Member_error_message").style.visibility="hidden";
}

/**************/
/**************/
/** ON_LOAD ***/
/**************/
/**************/

SCREENS["iGroup_main"].on_load = iGroup_update_notifications;

SCREENS["iGroup_group_inbox"].on_load = function()
{
	document.getElementById("igroup_title_not_name").innerHTML = current_group.name + " - Notificações";

	if (current_group["inbox"].length == 0)
		document.getElementById("iGroup_not_empty").style.display = "block";
	else
		document.getElementById("iGroup_not_empty").style.display = "none";

	let inbox = current_group["inbox"];
	for (let i = 0; i < inbox.length; i ++)
		arrayRemove(inbox[i].new_for, "current_person_name");
}

SCREENS['iGroup_group_main_eventsList'].on_load = function()
{
	document.getElementById("igroup_title_event_name").innerHTML = current_group.name + " - Eventos";
}

SCREENS['iGroup_group_main_memberList'].on_load = function()
{
	document.getElementById("igroup_title_members_name").innerHTML = current_group.name + " - Membros";
}

SCREENS["iGroup_group_addMember"].on_load = function()
{
	document.getElementById("igroup_title_addmembers_name").innerHTML = current_group.name + " - Ad. Membro";
}

SCREENS["iGroup_group_addEvent"].on_load = function()
{
	document.getElementById("igroup_title_addevent_name").innerHTML = current_group.name + " - Ad. Evento";
}
