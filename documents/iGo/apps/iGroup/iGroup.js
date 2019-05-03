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
			current_group["inbox"].push({
				title: member.name + " foi adicionado.",
				date: convertToDate(new Date()),
				type: "add_member",
				new: 1,
				});
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
		description: ""
	};
	let eventsList = current_group["events"];
	eventsList.push(new_event);
	let notification =
	{
		title: "Evento " + new_event.name + " adicionado.",
		date: convertToDate(new Date()),
		type: "add_event",
		new: 1,
	};
	current_group["inbox"].push(notification);
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
			description: "In&iacute;cio da viagem a " + group_location.value + "."
		};
		let group =
		{
			name: group_name.value,
			location: group_location.value,
			date: group_date_str,
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
	/*group_name.value = (name_error.style.visibility == "visible" ? "" : group_name.value);
	group_date.value = (date_error.style.visibility == "visible" ? "" : group_date.value);
	group_location.value = (location_error.style.visibility == "visible" ? "" : group_location.value);*/
}

function exitGroup()
{
	for (let i = 0; i < iGroup_groups.length; i++)
	{
		if (iGroup_groups[i].name == current_group.name)
		{
			iGroup_groups[i].members =
				removeObjectArray(current_group.members, people[current_person_name]);

			let notification =
			{
				title: current_person_name + " saiu do grupo.",
				date: convertToDate(new Date()),
				type: "remove",
				new: 1,
			};

			current_group["inbox"].push(notification);

			if (current_group.members.length == 0)
				iGroup_groups = removeObjectArray(iGroup_groups, current_group);
		}

	}
	update_maps();
	showGroupList();
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
	for (let i = 0; i < membersList.length; i ++)
		list.innerHTML += "<li class='iGroup_list_item' style='background-color:limegreen;' onclick='showMemberInfo(\""+ membersList[i].name + "\");'>"+ membersList[i].name + "</li>";
	change_screen('iGroup_group_main_memberList');
}

function showMemberInfo(memberName){
	var photo = document.getElementById("iGroup_member_photo");
	var name = document.getElementById("iGroup_group_member_name");
	name.innerHTML = "";
	photo.src = people[memberName].image;
	name.innerHTML = memberName;
	change_screen('iGroup_group_member_info');
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
		for (let j = 0; j < groups[i].members.length; j ++)
			if (groups[i].members[j].name == user_name)
				return i;
	return -1;
}

function showEventsList()
{
	var list = document.getElementById("iGroup_group_eventsList");
	list.innerHTML = "";
	var eventsList = current_group.events;
	for (let i = 0; i < eventsList.length; i++)
		list.innerHTML += "<li class='iGroup_list_item' style='background-color:limegreen;' onclick='showEventInfo(\"" + eventsList[i].name + "\");'>" + "<div class='iGroup_event_name'>" + eventsList[i].name +
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
	name.innerHTML = current_event.name;
	date.innerHTML = current_event.date;
	description.innerHTML = current_event.description;
	change_screen('iGroup_group_event_info');
}

function showInbox()
{
	var list = document.getElementById("iGroup_group_inboxList");
	list.innerHTML = "";
	var inbox = current_group["inbox"];
	for (let i = inbox.length - 1; i >= 0; i --){
		if(inbox[i].type == "add_event"){
			list.innerHTML += "<li class='iGroup_list_item iGroup_notification_item_addevent'>" + "<div class='iGroup_inbox_title'>" + inbox[i].title +
			"</div><div class='iGroup_date'>" + inbox[i].date +
			"</div></li>";
		} else if(inbox[i].type == "add_member") {
			list.innerHTML += "<li class='iGroup_list_item iGroup_notification_item_addmember'>" + "<div class='iGroup_inbox_title'>" + inbox[i].title +
			"</div><div class='iGroup_date'>" + inbox[i].date +
			"</div></li>";
		} else if(inbox[i].type == "remove") {
			list.innerHTML += "<li class='iGroup_list_item iGroup_notification_item_remove'>" + "<div class='iGroup_inbox_title'>" + inbox[i].title +
			"</div><div class='iGroup_date'>" + inbox[i].date +
			"</div></li>";
		}
	}

	change_screen('iGroup_group_inbox');
}

function convertToDate(date)
{
	/*var c = 0;
	var year = "";
	var month = "";
	var day = "";
	for(var i = 0; i < date.length ;i++){
		if(c == 0 && date[i] != '-'){
			year += date[i];
		}
		else if(c == 1 && date[i] != '-'){
			month += date[i];
		}
		else if(c == 2){
			day += date[i];
		}
		else if( date[i] == '-'){
			c++;
		}
	}*/
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

SCREENS["iGroup_group_inbox"].on_load = function()
{
	document.getElementById("igroup_title_not_name").innerHTML = current_group.name + " - Notifica&ccedil;&otilde;es";

	if (current_group["inbox"].length == 0)
		document.getElementById("iGroup_not_empty").style.display = "block";
	else
		document.getElementById("iGroup_not_empty").style.display = "none";
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
