/**************/
/**************/
/*** IGROUP ***/
/**************/
/**************/

var iGroup_groups = [];
var current_group;

function addMember(member){
	if(!current_group["Members"].includes(member)){
		current_group["Members"].push(member);
	}
}

function requestMember(memberName){
	let member = MYWEBMEMBERS[memberName];
	addMember(member);
}

function addGroup(){
	var group_name = document.getElementById("iGroup_name_value");
	var group_location = document.getElementById("iGroup_location_value");
	var group_date = document.getElementById("iGroup_date_value");
	var name_error = document.getElementById("Name_error_message");
	var location_error = document.getElementById("Location_error_message");
	var date_error= document.getElementById("Date_error_message");
	if((group_name.value != "") && (group_location.value != "") && (group_date.value != "")){
		var group = {name: group_name.value, location: group_location.value, date: group_date.value};
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
	console.log(iGroup_groups.length);
	if(iGroup_groups.length == 0){
		list.innerHTML = "Não tens nenhum grupo.";
		list.innerHTML += "<button onclick='change_screen(iGroup_create)'>Criar grupo</button>";
	}
	else{
		for(let i = 0; i < iGroup_groups.length; i++){
		console.log(iGroup_groups[i]);
		list.innerHTML += "<li>"+ iGroup_groups[i].name + "</li>";
		}
	}
	change_screen('iGroup_groups');
}

function showGroupScreen(groupName){
	for (let i = 0; i < iGroup_groups.length ; i++){
		if(iGroup_groups[i].name == groupName){
			current_group = iGroup_groups[i];
			break;
		}
	}
}
