/**************/
/**************/
/*** IGROUP ***/
/**************/
/**************/

var iGroup_groups = [];
var current_group;
var loggedUser = MYWEBMEMBERS["Ambrosio Santos"];

function addMember(member){
	var member_error = document.getElementById("Memeber_error_message");
	if(!current_group["members"].includes(member)){
		current_group["members"].push(member);
		if(member != loggedUser){
			current_group["inbox"].push({title: member.name + "foi adicionado.", date: new Date() });
		}
		change_screen('iGroup_group_main');
	}
}

function requestMember(){
	var member_error = document.getElementById("Member_error_message");
	var member_name = document.getElementById("iGroup_member_name_value");
	let member = MYWEBMEMBERS[member_name.value];
	if (member != undefined){
		member_error.style.visibility="hidden";
		addMember(member);
	}
	else{
		member_error.style.visibility="visible";
	}
	member_name.value = "";
}

function addEvent(){
	var event_name = document.getElementById("iGroup_event_name_value");
	var event_date = document.getElementById("iGroup_event_date_value");
	var event = {name: event_name.value, date: event_date.value};
	var eventsList = current_group["events"];
	eventsList.push(event);
	var Notification = {title: "Evento " + event_name.value + " adicionado.", date: new Date() };
	current_group["inbox"].push(Notification);
	console.log(current_group["inbox"]);
	event_name.value = "";
	event_date.value = "";
	change_screen('iGroup_group_main');
}



function addGroup(){
	var group_name = document.getElementById("iGroup_name_value");
	var group_location = document.getElementById("iGroup_location_value");
	var group_date = document.getElementById("iGroup_date_value");
	var name_error = document.getElementById("Name_error_message");
	var location_error = document.getElementById("Location_error_message");
	var date_error= document.getElementById("Date_error_message");
	if((group_name.value != "") && (group_location.value != "") && (group_date.value != "")){
		var departure = {name: "partida" , date: group_date.value};
		var group = {name: group_name.value, location: group_location.value, date: group_date.value, members:[loggedUser], events: [departure], inbox: []};
		iGroup_groups.push(group);
		change_screen("iGroup_main");
		name_error.style.visibility = "hidden";
		location_error.style.visibility="hidden";
		date_error.style.visibility="hidden";
	}
	(group_name.value == "") ? name_error.style.visibility="visible" : name_error.style.visibility="hidden";
	(group_location.value == "") ? location_error.style.visibility="visible" : location_error.style.visibility="hidden";
	(group_date.value == "") ? date_error.style.visibility="visible" : date_error.style.visibility="hidden";
	group_name.value="";
	group_date.value="";
	group_location.value="";
}

function showGroupList(){
	var list = document.getElementById('iGroup_group_list');
	list.innerHTML = "";
	if(iGroup_groups.length == 0){
		list.innerHTML = "Não tens nenhum grupo.";
		list.innerHTML += "<button onclick=change_screen('iGroup_create')>Criar grupo</button>";
	}
	else{
		for(let i = 0; i < iGroup_groups.length; i++){
		list.innerHTML += "<li onclick=showGroupScreen(\""+ iGroup_groups[i].name +"\");>"+ iGroup_groups[i].name + "</li>";
		}
	}
	change_screen('iGroup_groups');
}

function showMembersList(){
	var list = document.getElementById("iGroup_group_memberList");
	list.innerHTML = "";
	var membersList = current_group["members"];
	for(let i = 0; i < membersList.length; i++){
		console.log(membersList.length);
		list.innerHTML += "<li>"+ membersList[i].name + "</li>";
	}
	change_screen('iGroup_group_main_memberList');
}

function showGroupScreen(groupName){
	for (let i = 0; i < iGroup_groups.length ; i++){
		if(iGroup_groups[i].name == groupName){
			current_group = iGroup_groups[i];
			break;
		}
	}
	change_screen('iGroup_group_main');
}

function showEventsList(){
	var list = document.getElementById("iGroup_group_eventsList");
	list.innerHTML = "";
	var eventsList = current_group["events"];
	for(let i = 0; i < eventsList.length; i++){
		list.innerHTML += "<li>"+ eventsList[i].name + " - " + eventsList[i].date + "</li>";
	}
	change_screen('iGroup_group_main_eventsList');
}



function showInbox(){
	var list = document.getElementById("iGroup_group_inboxList");
	list.innerHTML = "";
	var inbox = current_group["inbox"];
	for(let i = inbox.length - 1; i >= 0; i--){
		list.innerHTML += "<li>"+ inbox[i].title + " - " + inbox[i].date + "</li>";
	}
	change_screen('iGroup_group_inbox');
}
