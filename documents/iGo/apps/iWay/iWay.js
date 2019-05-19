/************/
/************/
/*** IWAY ***/
/************/
/************/

var mapGraph;
var shortestPath;

var trains_tickets = [];

function init_graph(){
	mapGraph = new Graph();
	for(let i = 0; i < MAP_POINTS.length; i++){
		mapGraph.addNode(i);
	}
	for(let j = 0; j < MAP_EDGES.length;j++){
		let typemultiplier = 1;
		if (MAP_EDGES[j].type == "walk")
			typemultiplier = 20;
		let src = MAP_EDGES[j].src;
		let dst = MAP_EDGES[j].dst;
		let srcVertex = MAP_POINTS[src];
		let dstVertex = MAP_POINTS[dst];
		let weight = distance(srcVertex.x , srcVertex.y, dstVertex.x , dstVertex.y) * typemultiplier;
		mapGraph.addEdge(MAP_EDGES[j].src, MAP_EDGES[j].dst, weight);
	}
}

function displayNetwork() {
	drawAllPoints();
  displayAllEdges();
}


function showInvalidLocation(where){
	if(where == "start"){
		let input = document.getElementById("iWay_starting_point");
		input.value = "";
		input.classList.add("placeholderred");
		input.placeholder = "Local inválido!";
	} else if(where == "end"){
		let input = document.getElementById("iWay_destination");
		input.value = "";
		input.classList.add("placeholderred");
		input.placeholder = "Local inválido!";
	}
}

function searchPath()
{
	let start = parsePlaceName(document.getElementById("iWay_starting_point").value);
	let dest = parsePlaceName(document.getElementById("iWay_destination").value);
	let starterror = document.getElementById("iWay_starting_point_error");
	let desterror = document.getElementById("iWay_destination_error");

	let isValidStart = MAP_PLACES.hasOwnProperty(start) || start == "LOCAL ATUAL";
	if(! isValidStart)
		showInvalidLocation("start");

	let isValidDest = MAP_PLACES.hasOwnProperty(dest);
	if (! isValidDest)
		showInvalidLocation("end");

	if (isValidStart && isValidDest)
	{
		change_screen("location");

		if (start == "LOCAL ATUAL")
			displayShortestPath(getNearestPointIndex(), MAP_PLACES[dest], true);
		else
			displayShortestPath(MAP_PLACES[start], MAP_PLACES[dest], false);
	}
}

function displayShortestPath(src, dst, useCurrentPosition)
{
	shortestPath = mapGraph.findPath(src, dst)[0];

	if (useCurrentPosition)
	{
		// Adicionar um ponto no local atual e uma aresta
		// entre o local atual e o ponto mais próximo
		let position = people[current_person_name].position;
		MAP_POINTS.push({x: position.x, y: position.y});

		let newEdge = {src: MAP_POINTS.length - 1, dst: src, type: "walk"}

		shortestPath.unshift(newEdge);
	}

	displayPath(shortestPath);
	showSteps();

	if (useCurrentPosition)
		MAP_POINTS.pop();
}

function getNearestPointIndex()
{
	let position = people[current_person_name].position;

	let minD = Infinity;
	let minI = -1;
	for (let i = 0; i < MAP_POINTS.length; i ++)
	{
		let point = MAP_POINTS[i];
		if (point.accessible)
		{
			let dist = distance(point.x, point.y, position.x, position.y);

			if (dist < minD)
			{
				minD = dist;
				minI = i;
			}
		}
	}

	return minI;
}

function displayPath(path) {
	clearCanvas();

	for (let i = 0; i < path.length; i ++)
		displayEdge(path[i]);
}

function displayEdge(edge)
{
	let src = MAP_POINTS[edge.src];
	let dst = MAP_POINTS[edge.dst];

	let color = edge.type == "walk" ? "#000000" : "#4444FF";

	drawLine(src.x, src.y, dst.x, dst.y, color);
}

function clearCanvas()
{
	let canvas = document.getElementById("map_canvas");
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

function drawAllPoints()
{
  for (let i = 0; i < MAP_POINTS.length; i ++)
  {
    let point = MAP_POINTS[i];
    drawPoint(point.x, point.y);
  }
}

function displayAllEdges()
{
  for (let i = 0; i < MAP_EDGES.length; i ++)
    displayEdge(MAP_EDGES[i]);
}


function drawPoint(x, y){
  let coords = map_to_canvas_coords({x: x, y: y});
  document.getElementById("map_canvas").getContext("2d").fillRect(Math.round(coords.x), Math.round(coords.y), 2, 2);
}

function drawLine(startX, startY, endX, endY, color)
{
  let start_coords = map_to_canvas_coords({x: startX, y: startY});
  let end_coords = map_to_canvas_coords({x: endX, y: endY});

  let context = document.getElementById("map_canvas").getContext("2d");
	context.strokeStyle = color;
	context.lineWidth = 3;
	context.beginPath();
  context.moveTo(Math.round(start_coords.x), Math.round(start_coords.y));
  context.lineTo(Math.round(end_coords.x), Math.round(end_coords.y));
  context.stroke(); context.stroke();
}

function drawGrid()
{
  for (let x = 50; x < POS_MAX.x; x += 50)
    drawLine(x, 0, x, POS_MAX.y, "#000000");
  for (let y = 50; y < POS_MAX.y; y += 50)
    drawLine(0, y, POS_MAX.x, y, "#000000");
}

function map_to_canvas_coords(map_coords)
{
  let canvas = document.getElementById("map_canvas");

  let newX = map_coords.x * canvas.width / POS_MAX.x;
  let newY = map_coords.y * canvas.height / POS_MAX.y;

  return {x: newX, y: newY};
}

function parsePlaceName(name)
{
	name = name.toUpperCase();
	let newName = "";
	for (let i = 0; i < name.length; i ++)
	{
		let c = name.charAt(i);
		switch (c)
		{
		case "Á": case "À": case "Â": case "Ã":
			newName += "A";	break;
		case "É": case "Ê":
			newName += "E"; break;
		case "Í":
			newName += "I"; break;
		case "Ó": case "Ô": case "Õ":
			newName += "O"; break;
		case "Ú":
			newName += "U"; break;
		case "Ç":
			newName += "C"; break;
		default:
			newName += c;
		}
	}
	return newName;
}

/********************************/
/* LISTA DETALHADA DOS CAMINHOS */
/********************************/

function showSteps(){

	let i = 0;
	let aux = 0;
	let steps = [];
	let ac_minutes = 0;
	for(i = 0; i < shortestPath.length; i++){

		if(shortestPath[i]["type"] == "walk"){
			if(steps[aux] == undefined)
				steps[aux] = [];
			steps[aux].push(shortestPath[i]);
			if( i != shortestPath.length-1)
				if(shortestPath[i+1]["type"] != "walk") aux++;
		} else if(shortestPath[i]["type"] == "train") {
			if(steps[aux] == undefined)
				steps[aux] = [];
			steps[aux].push(shortestPath[i]);
			if( i != shortestPath.length-1)
				if(shortestPath[i+1]["type"] != "train") aux++;
		}
	}

	let list = document.getElementById("iWay_steps_list");

	for (i = 0; i < steps.length; i ++) {

		let minutes = 0;
		let ac_station = 0;
		let dst_station = 0;

		for( aux = 0; aux < steps[i].length; aux++){

			if (steps[i][aux]["type"] == "walk"){
				let source = MAP_POINTS[steps[i][aux]["src"]];
				let destination = MAP_POINTS[steps[i][aux]["dst"]];
				let min = distance(source["x"],source["y"],destination["x"],destination["y"]);
				minutes += Math.round(min / 4);
				ac_minutes += Math.round(min / 4);
			}

		    else if(steps[i][aux]["type"] == "train"){

				let source = MAP_POINTS[steps[i][aux]["src"]];
				let destination = MAP_POINTS[steps[i][aux]["dst"]];
				let min = distance(source["x"],source["y"],destination["x"],destination["y"]);
				
				if(aux == 0){
					if(source["accessible"])
						ac_station = steps[i][aux]["src"];
					else if(destination["accessible"])
						ac_station = steps[i][aux]["dst"];
				}  
				
				if(aux == steps[i].length-1){
					if(source["accessible"])
						dst_station = steps[i][aux]["src"];
					else if(destination["accessible"])
						dst_station = steps[i][aux]["dst"];
				}

				minutes += Math.round(min / 23);
				ac_minutes += Math.round(min / 23);
			}
		}
		
		let init_train_time = ac_minutes - minutes + 20;
		let item = "<li class='iWay_steps_list_item' ";
		item+= steps[i][0]["type"] == "walk" ? ">Caminhada<br>" : "onclick ='showsteptrain(" + dst_station + "," + ac_station + "," + init_train_time + "," + minutes + ");'>Viagem de Comboio<br>";

		item += "Tempo estimado: " + minutes + "min";
		item += "<img class='iWay_list_item_img' src='";
		item += steps[i][0]["type"] == "walk" ?  "apps/iWay/walk_icon.png'>" : "apps/iWay/train_icon.png'>";

		if(i != steps.length -1)
			item += "<li class='iWay_list_item_direction'> <img class='iWay_list_item_direction_arrow' src='apps/iWay/arrow.png'> </li>";

		item += "</li>";

		list.innerHTML += item;
	}
}

function parsePlaceName(name)
{
	name = name.toUpperCase();
	let newName = "";
	for (let i = 0; i < name.length; i ++)
	{
		let c = name.charAt(i);
		switch (c)
		{
		case "Á": case "À": case "Â": case "Ã":
			newName += "A";	break;
		case "É": case "Ê":
			newName += "E"; break;
		case "Í":
			newName += "I"; break;
		case "Ó": case "Ô": case "Õ":
			newName += "O"; break;
		case "Ú":
			newName += "U"; break;
		case "Ç":
			newName += "C"; break;
		default:
			newName += c;
		}
	}
	return newName;
}

function buyTicket(min){
	trains_tickets[min]["tickets"]++;
	document.getElementById("train_tickets_num").innerHTML = "Possui " + trains_tickets[min]["tickets"] + " bilhete(s).";
	change_screen('payment_methods');
}


function showsteptrain(dst,station,init_time,min){

	let d = new Date();

	document.getElementById("iWay_path_info_hd").src = "apps/iWay/train.png";

	document.getElementById("iWay_path_info_container_icon").src = "apps/iWay/train_icon.png";
	document.getElementById("iWay_path_info_container_title").innerHTML = "Comboio - " + min + " min.";

	if((trains_tickets[min] == undefined)){

		trains_tickets[min] =
		{
			preco: (min*0.15).toFixed(2),
			tickets: 0,
			time: d.getTime(),
			partida: "",
			chegada: "",
			trainNo: Math.floor((200*Math.random())%200)
		};

		let hours = d.getHours();
		let minutes = d.getMinutes();


		document.getElementById("train_price").innerHTML = "€" + trains_tickets[min]["preco"];


		hours += Math.floor(init_time / 60);
		minutes +=  init_time > 60 ? Math.floor(init_time % 60) : init_time;

		if(minutes >= 60){
			hours += Math.floor(( minutes - (minutes % 60) ) / 60);
			minutes = minutes % 60;
		}

		trains_tickets[min]["partida"] = "Hora prevista: " + ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2);
		document.getElementById("train_source").innerHTML = trains_tickets[min]["partida"];

		hours += Math.floor(min / 60);
		minutes +=  min > 60 ? Math.floor(min % 60) : min;

		if(minutes >= 60){
			hours += Math.floor(( minutes - (minutes % 60) ) / 60);
			minutes = minutes % 60;
		}

		trains_tickets[min]["chegada"] = "Hora prevista: " + ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2);

		document.getElementById("train_dest").innerHTML = trains_tickets[min]["chegada"];

	} else {

		if( (trains_tickets[min]["time"] - d.getTime()) >= (20*60000) ){

			let hours = d.getHours();
			let minutes = d.getMinutes();

			hours += Math.floor(init_time / 60);
			minutes +=  init_time > 60 ? Math.floor(init_time % 60) : init_time;

			if(minutes >= 60){
				hours += Math.floor(( minutes - (minutes % 60) ) / 60);
				minutes = minutes % 60;
			}

			trains_tickets[min]["partida"] = "Partida: " + ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2);

			hours += Math.floor(min / 60);
			minutes +=  min > 60 ? Math.floor(min % 60) : min;

			if(minutes >= 60){
				hours += Math.floor(( minutes - (minutes % 60) ) / 60);
				minutes = minutes % 60;
			}

			trains_tickets[min]["chegada"] = "Chegada: " + ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2);

		}

		document.getElementById("train_source").innerHTML = trains_tickets[min]["partida"];
		document.getElementById("train_dest").innerHTML = trains_tickets[min]["chegada"];
		document.getElementById("train_price").innerHTML = "€" + trains_tickets[min]["preco"];
	}

	document.getElementById("train_title").innerHTML = "Comboio: CP-Regional " + trains_tickets[min]["trainNo"];

	document.getElementById("train_station").innerHTML = "Estação: " + STATIONS[station];
	
	document.getElementById("train_station_dst").innerHTML = "Estação: " + STATIONS[dst];
	
	document.getElementById("train_tickets_num").innerHTML = "Possui " + trains_tickets[min]["tickets"] + " bilhete(s).";

	document.getElementById("iWay_path_info_container").style.display = "block";

	document.getElementById("iWay_path_info_train_container_descr").style.display = "block";

	document.getElementById("train_buy_ticket").onclick = function(){ buyTicket(min); };

	change_screen("iWay_path_info_main");

}

SCREENS["iWay_path_info_main"].on_exit = function() {

	document.getElementById("iWay_path_info_container_icon").src = "";
	document.getElementById("iWay_path_info_container_title").innerHTML = "";

	document.getElementById("iWay_path_info_container").style.display = "none";

	document.getElementById("iWay_path_info_train_container_descr").style.display = "none";
}

SCREENS["iWay_main"].on_exit = function() {

	let input_s = document.getElementById("iWay_starting_point");
	let input_d = document.getElementById("iWay_destination");

	input_s.value = "";
	input_d.value = "";

	input_s.classList.remove("placeholderred");
	input_d.classList.remove("placeholderred");

	input_s.placeholder = "Local Partida";
	input_d.placeholder = "Destino";
	
	let img = document.getElementById("iway_screen_src");
	img.src = "apps/iWay/src.png";

}

var actualLoc = 0;
function actualLocation(){
	if(actualLoc == 0){
		let img = document.getElementById("iway_screen_src");
		img.src = "apps/iWay/src_green.png";
		
		let input = document.getElementById("iWay_starting_point");
		input.value = "Local Atual";
		
		actualLoc = 1;
	} else {
		let img = document.getElementById("iway_screen_src");
		img.src = "apps/iWay/src.png";
		
		let input = document.getElementById("iWay_starting_point");
		input.value = "";
		actualLoc = 0;
	}
	
}
