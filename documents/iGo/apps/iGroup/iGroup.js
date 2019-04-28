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
			var eventDate = new Date();
			current_group["inbox"].push({
				title: member.name + " foi adicionado.",
				day: eventDate.getDate(),
				month: eventDate.getMonth(),
				year: eventDate.getFullYear(),
				new: 1,
				});
		change_screen('iGroup_group_main');

		update_maps();
	}
}

function requestMember()
{
	var member_error = document.getElementById("Member_error_message");
	var member_name = document.getElementById("iGroup_member_name_value");
	let member = people[member_name.value];
	if (member != undefined){
		member_error.style.visibility="hidden";
		addMember(member);
	}
	else
		member_error.style.visibility="visible";
	member_name.value = "";
}

function addEvent()
{
	var event_name = document.getElementById("iGroup_event_name_value");
	var event_date = document.getElementById("iGroup_event_date_value");
	var new_event =
	{
		name: event_name.value,
		date: (new Date(event_date.value)).toDateString()
	};
	var eventsList = current_group["events"];
	eventsList.push(new_event);
	var eventDate = new Date();
	var notification =
	{
		title: "Evento " + new_event.name + " adicionado.",
		day: eventDate.getDate(),
		month: eventDate.getMonth(),
		year: eventDate.getFullYear(),
		new: 1,
	};
	current_group["inbox"].push(notification);
	event_name.value = "";
	event_date.value = "";
	change_screen('iGroup_group_main');
}


function addGroup()
{
	var group_name = document.getElementById("iGroup_name_value");
	var group_location = document.getElementById("iGroup_location_value");
	var group_date = document.getElementById("iGroup_date_value");
	var name_error = document.getElementById("Name_error_message");
	var location_error = document.getElementById("Location_error_message");
	var date_error= document.getElementById("Date_error_message");
	if ((group_name.value != "") && (group_location.value != "") && (group_date.value != ""))
	{
		var departure =
		{
			name: "Partida",
			date: group_date.value
		};
		var group =
		{
			name: group_name.value,
			location: group_location.value,
			date: group_date.value,
			members: [people[current_person_name]],
			events: [departure],
			inbox: []
		};
		iGroup_groups.push(group);
		change_screen("iGroup_main");
	}
	name_error.style.visibility = (group_name.value == "" ? "visible" : "hidden");
	location_error.style.visibility = (group_location.value == "" ? "visible" : "hidden");
	date_error.style.visibility = (group_date.value == "" ? "visible" : "hidden");
	group_name.value = (name_error.style.visibility == "visible" ? "" : group_name.value);
	group_date.value = (date_error.style.visibility == "visible" ? "" : group_date.value);
	group_location.value = (location_error.style.visibility == "visible" ? "" : group_location.value);
}

function exitGroup()
{
	for(let i = 0; i < iGroup_groups.length; i++){
		if(iGroup_groups[i].name = current_group.name){
			iGroup_groups[i].members = removeObjectArray(current_group.members, people[current_person_name]);
		}
	} 
	showGroupList();
}

function removeObjectArray(list, value){
	return list.filter(function(element){
		return element.name != value.name;
	});
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
			list.innerHTML += "<li class='iGroup_list_item' onclick=showGroupScreen(\"" +
				myGroups[i].name + "\");>" + myGroups[i].name + "</li>";
	change_screen('iGroup_groups');
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
		list.innerHTML += "<li class='iGroup_list_item'>"+ membersList[i].name + "</li>";
	change_screen('iGroup_group_main_memberList');
}

function showGroupScreen(groupName){
	for (let i = 0; i < iGroup_groups.length; i ++){
		if (iGroup_groups[i].name == groupName)
		{
			current_group = iGroup_groups[i];
			break;
		}
	}
	change_screen('iGroup_group_main');
}

function findGroupIndex(groups, user_name)
{
	let i = 0;
	for (; i < groups.length; i ++)
		for (let j = 0; j < groups[i].members.length; j ++)
			if (groups[i].members[j].name == user_name)
				return i;
	return -1;
}

function showEventsList()
{
	var list = document.getElementById("iGroup_group_eventsList");
	list.innerHTML = "";
	var eventsList = current_group["events"];
	for (let i = 0; i < eventsList.length; i++)
		list.innerHTML += "<li class='iGroup_list_item'>" + eventsList[i].name +
			" - " + eventsList[i].date + "</li>";
	change_screen('iGroup_group_main_eventsList');
}

function showInbox()
{
	var list = document.getElementById("iGroup_group_inboxList");
	list.innerHTML = "";
	var inbox = current_group["inbox"];
	for (let i = inbox.length - 1; i >= 0; i --){
		list.innerHTML += "<li class='iGroup_list_item'>" + "<div class='iGroup_inbox_title'>" + inbox[i].title + 
		"</div><div class='iGroup_date'>" + inbox[i].day + "/" + inbox[i].month + "/" + inbox[i].year + 
		"</div></li>";
	}
	change_screen('iGroup_group_inbox');
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
	document.getElementById("iGroup_date_value").value = "";
}

