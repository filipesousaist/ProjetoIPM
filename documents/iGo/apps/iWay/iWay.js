/************/
/************/
/*** IWAY ***/
/************/
/************/

function intializeGraph(){
	var mapGraph = new Graph();
	for(let i = 0; i < MAP_POINTS.length; i++){
		mapGraph.addNode(i);
	}
	for(let j = 0; j < MAP_EDGES.length;j++){
		let typemultiplier = 1;
		if(MAP_EDGES[j].type == "walk"){
			typemultiplier = 2;
		}
		let src = MAP_EDGES[j].src;
		let dst = MAP_EDGES[j].dst;
		let srcVertex = MAP_POINTS[src];
		let dstVertex = MAP_POINTS[dst];
		let weight = distance(srcVertex.x , srcVertex.y, dstVertex.x , dstVertex.y) * typemultiplier;
		mapGraph.addEdge(MAP_EDGES[j].src, MAP_EDGES[j].dst, weight);
	}
}

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
