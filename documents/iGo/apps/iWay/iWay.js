/************/
/************/
/*** IWAY ***/
/************/
/************/

var mapGraph;
var shortestPath;

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

function searchPath()
{
	let start = parsePlaceName(document.getElementById("iWay_starting_point").value);
	let dest = parsePlaceName(document.getElementById("iWay_destination").value);

	let isValidStart = MAP_PLACES.hasOwnProperty(start);
	let isValidDest = MAP_PLACES.hasOwnProperty(dest);

	// TODO: Mensagens de erro

	if (isValidStart && isValidDest)
	{
		change_screen("location");
		displayShortestPath(MAP_PLACES[start], MAP_PLACES[dest]);
	}
}

function displayShortestPath(src, dst)
{
	let result = mapGraph.findPath(src, dst);
	shortestPath = result[0];
	displayPath(shortestPath);
	showSteps();
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
	context.lineWidth = "0.05mm";
	context.beginPath();
  context.moveTo(Math.round(start_coords.x), Math.round(start_coords.y));
  context.lineTo(Math.round(end_coords.x), Math.round(end_coords.y));
  context.stroke();
	context.stroke();
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

/********************************/
/* LISTA DETALHADA DOS CAMINHOS */
/********************************/

function showSteps(){

	let i = 0;
	let aux = 0;
	let steps = [];
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

	for( i = 0; i < steps.length; i ++){

		let minutes = 0;

		for( aux = 0; aux < steps[i].length; aux++){

			if(steps[i][aux]["type"] == "walk"){

				let source = MAP_POINTS[steps[i][aux]["src"]];
				let destination = MAP_POINTS[steps[i][aux]["dst"]];
				let min = distance(source["x"],source["y"],destination["x"],destination["y"]);
				minutes += Math.round(min / 4);

			} else if(steps[i][aux]["type"] == "train"){
				let source = MAP_POINTS[steps[i][aux]["src"]];
				let destination = MAP_POINTS[steps[i][aux]["dst"]];
				let min = distance(source["x"],source["y"],destination["x"],destination["y"]);
				minutes += Math.round(min / 23);
			}
		}

		let item = "<li class='iWay_steps_list_item' ";
		item+= steps[i][0]["type"] == "walk" ? ">Caminhada<br>" : "onclick ='showsteptrain(" + minutes + ");'>Viagem de Comboio<br>";

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

var num_train_tickets = 0;

function buyTicket(){
	num_train_tickets++;
	document.getElementById("train_tickets_num").innerHTML = num_train_tickets;
	change_screen('payment_methods');
}

function showstepwalk(min){

	document.getElementById("iWay_path_info_hd").src = "apps/iWay/walk.png";

	document.getElementById("iWay_path_info_walk_container_icon").src = "apps/iWay/walk_icon.png";
	document.getElementById("iWay_path_info_walk_container_title").innerHTML = "Caminhada - " + min + " min.";

	document.getElementById("iWay_path_info_container").style.display = "none";
	document.getElementById("iWay_path_info_walk_container_descr").style.display = "block";

	document.getElementById("iWay_path_info_train_container_descr").style.display = "none";

	change_screen("iWay_path_info_main");
}

function showsteptrain(min){

	document.getElementById("iWay_path_info_hd").src = "apps/iWay/train.png";

	document.getElementById("iWay_path_info_container_icon").src = "apps/iWay/train_icon.png";
	document.getElementById("iWay_path_info_container_title").innerHTML = "Comboio - " + min + " min.";

	document.getElementById("iWay_path_info_container").style.display = "block";
	document.getElementById("iWay_path_info_walk_container_descr").style.display = "none";

	document.getElementById("iWay_path_info_train_container_descr").style.display = "block";

	change_screen("iWay_path_info_main");

}

SCREENS["iWay_path_info_main"].on_exit = function() {

	document.getElementById("iWay_path_info_walk_container_icon").src = "";
	document.getElementById("iWay_path_info_walk_container_title").innerHTML = "";

	document.getElementById("iWay_path_info_container_icon").src = "";
	document.getElementById("iWay_path_info_container_title").innerHTML = "";

	document.getElementById("iWay_path_info_container").style.display = "none";
	document.getElementById("iWay_path_info_walk_container_descr").style.display = "none";

	document.getElementById("iWay_path_info_train_container_descr").style.display = "none";
}
