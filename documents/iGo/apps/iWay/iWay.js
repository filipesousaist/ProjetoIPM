class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
	}

   addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }

  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({node:node2, weight: weight});
    this.adjacencyList[node2].push({node:node1, weight: weight});
  }

  findPath(startNode, endNode){
  let times = {};
  let backtrace = {};
  let pq = new PriorityQueue();
  times[startNode] = 0;
  for(let i = 0; i < this.nodes; i++){
  	if(node[i] !== startNode){
  		times[node] = Infinity;
  	}
  }
  pq.enqueue([startNode, 0]);
  while (!pq.isEmpty()){
    let shortestStep = pq.dequeue();
    let currentNode = shortestStep[0];
    //for each(neighbor =>) faz com o que variavel de iteração se chama neighbor
    for(let i = 0; i < this.adjacencyList[currentNode].length; i++){
    	let neighbor = adjacencyList[currentNode][i];
    	let time = times[currentNode] + neighbor.weight;
    	if(time < times[neighbor.node]){
    		times[neighbor.node] = time;
    		backtrace[neighbor.node] = currentNode;
    		pq.enqueue([neighbor.node], time);
    	}
    }
  	let path = [endNode];
  	let lastStep = endNode;
 	while(lastStep !== startNode){
    	path.unshift(backtrace[lastStep])
    	lastStep = backtrace[lastStep]
  	}

  	var answer = {path, times[endNode]};
  	return answer;
}



class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element){
  	//Se está vazio
    if (this.isEmpty()){
      this.collection.push(element);
    }
    //Se não está vazio, o splice adicona na prioridade certa
    else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++){
        if (element[1] < this.collection[i-1][1]){
          this.collection.splice(i-1, 0, element);
          added = true;
          break;
        }
      }
      //Se não tem prioridade maior que ninguem, então por e simplesmente é adiconadoo no fim
      if (!added){
          this.collection.push(element);
      }
    }
  }

  dequeue() {
  	//Shift: Retira o primeiro elemento da lista.
    let value = this.collection.shift();
    return value;
  }

  isEmpty() {
  	//Verifica se o array está a zero.
    return this.collection.length === 0;
  }
}

function intializeGraph(){
	var mapGraph = new Graph();
	for(let i = 0; i < MAP_POINTS.length; )
}
/************/
/************/
/*** IWAY ***/
/************/
/************/



function displayPath()
{
  change_screen("location");

  let canvas = document.getElementById("map_canvas");
  canvas.style.display = "block";

  for (let i = 0; i < MAP_POINTS.length; i ++)
  {
    let point = MAP_POINTS[i];
    drawPoint(point.x, point.y);
  }
}

function drawPoint(x, y)
{
  let coords = map_to_canvas_coords({x: x, y: y});
  document.getElementById("map_canvas").getContext("2d").fillRect(coords.x, coords.y, 2, 2);
}

function drawLine(startX, startY, endX, endY)
{
  let start_coords = map_to_canvas_coords(startX, startY);
  let end_coords = map_to_canvas_coords(endX, endY);

  let context = document.getElementById("map_canvas").getContext("2d");
  context.moveTo(start_coords.x, start_coords.y);
  context.lineTo(end_coords.x, end_coords.y);
  context.stroke();
}

function drawGrid()
{
  for (let x = 10; x < POS_MAX.x / 10; x += 10)
    drawLine(x, 0, x, POS_MAX.y);
  for (let y = 10; y < POS_MAX.y / 10; y += 10)
    drawLine(0, y, POS_MAX.x, y);
}

function map_to_canvas_coords(map_coords)
{
  let canvas = document.getElementById("map_canvas");

  let newX = map_coords.x * canvas.width / POS_MAX.x;
  let newY = map_coords.y * canvas.height / POS_MAX.y;

  return {x: newX, y: newY};
}
