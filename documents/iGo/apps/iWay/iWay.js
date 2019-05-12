function intializeGraph(){
	var mapGraph = new Graph();
	for(let i = 0; i < MAP_POINTS.length; i++){

	}
}
/************/
/************/
/*** IWAY ***/
/************/
/************/



function displayPath(){
  change_screen("location");

  let canvas = document.getElementById("map_canvas");
  canvas.style.display = "block";

  drawAllPoints();
  drawAllEdges();
}

function drawAllPoints()
{
  for (let i = 0; i < MAP_POINTS.length; i ++)
  {
    let point = MAP_POINTS[i];
    drawPoint(point.x, point.y);
  }
}

function drawAllEdges()
{
  for (let i = 0; i < MAP_EDGES.length; i ++)
  {
    let src = MAP_POINTS[MAP_EDGES[i].src];
    let dst = MAP_POINTS[MAP_EDGES[i].dst];
    drawLine(src.x, src.y, dst.x, dst.y);
  }
}


function drawPoint(x, y){
  let coords = map_to_canvas_coords({x: x, y: y});
  document.getElementById("map_canvas").getContext("2d").fillRect(Math.round(coords.x), Math.round(coords.y), 2, 2);
}

function drawLine(startX, startY, endX, endY)
{
  let start_coords = map_to_canvas_coords({x: startX, y: startY});
  let end_coords = map_to_canvas_coords({x: endX, y: endY});

  let context = document.getElementById("map_canvas").getContext("2d");
  context.moveTo(Math.round(start_coords.x) + 0.5, Math.round(start_coords.y) + 0.5);
  context.lineTo(Math.round(end_coords.x) + 0.5, Math.round(end_coords.y) + 0.5);
  context.stroke();
}

function drawGrid()
{
  for (let x = 50; x < POS_MAX.x; x += 50)
    drawLine(x, 0, x, POS_MAX.y);
  for (let y = 50; y < POS_MAX.y; y += 50)
    drawLine(0, y, POS_MAX.x, y);
}

function map_to_canvas_coords(map_coords)
{
  let canvas = document.getElementById("map_canvas");

  let newX = map_coords.x * canvas.width / POS_MAX.x;
  let newY = map_coords.y * canvas.height / POS_MAX.y;

  return {x: newX, y: newY};
}



/********************/
/* LISTA DETALHADA DOS CAMINHOS */
/**********************/

function showSteps(path){
	
	let i = 0;
	let aux = 0;
	let steps = [];
	for(i = 0; i < path.length; i++){
		
		if(path[i]["type"] == "walk"){
			if(steps[aux] == undefined)
				steps[aux] = [];
			steps[aux].push(path[i]);
			if( i != path.length-1)
				if(path[i+1]["type"] != "walk") aux++;
		} else if(path[i]["type"] == "train") {
			if(steps[aux] == undefined)
				steps[aux] = [];
			steps[aux].push(path[i]);
			if( i != path.length-1)
				if(path[i+1]["type"] != "train") aux++;
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
				minutes += Math.round(min / 1.5);
				
			} else if(steps[i][aux]["type"] == "train"){
				let source = MAP_POINTS[steps[i][aux]["src"]];
				let destination = MAP_POINTS[steps[i][aux]["dst"]];
				let min = distance(source["x"],source["y"],destination["x"],destination["y"]);
				minutes += Math.round(min / 23);
			}
		}
		
		let item = "<li class='iWay_steps_list_item' ";
		item+= steps[i][0]["type"] == "walk" ? "onclick ='showstepwalk(" + minutes + ");'>Caminhada<br>" : "onclick ='showsteptrain(" + minutes + ");'>Viagem de Comboio<br>";
		
		item += "Tempo estimado: " + minutes + "min";
		item += "<img class='iWay_list_item_img' src='";
		item += steps[i][0]["type"] == "walk" ?  "apps/iWay/walk_icon.png'>" : "apps/iWay/train_icon.png'>";
		
		if(i != steps.length -1)
			item += "<li class='iWay_list_item_direction'> <img class='iWay_list_item_direction_arrow' src='apps/iWay/arrow.png'> </li>"
		
		item += "</li>";
		
		list.innerHTML += item;
	}
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














