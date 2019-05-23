class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = [];
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
  let times = [];
  let backtrace = [];
  let pq = new PriorityQueue();
  times[startNode] = 0;
  for(let i = 0; i < this.nodes.length; i++){
  	if(this.nodes[i] != startNode){
  	 	times[this.nodes[i]] = Infinity;
  	}
  }
  pq.enqueue([startNode, 0]);
  while (!pq.isEmpty()){
    let shortestStep = pq.dequeue();
    let currentNode = shortestStep[0];
    let currentEdge;
    //Percorre a lista de adjacencias do vertice
    for(let i = 0; i < this.adjacencyList[currentNode].length; i++){
      //Neighbor é o node atual da lista de adjacencias
    	let neighbor = this.adjacencyList[currentNode][i];
      currentEdge = {currentNode, neighbor};
      //Time é igual ao tempo atual
    	let time = times[currentNode] + neighbor.weight;
    	if(time < times[neighbor.node]){
    		times[neighbor.node] = time;
    		backtrace[neighbor.node] = currentNode;
    		pq.enqueue([neighbor.node], time);
    	}
    }
  }
  let path = [endNode];
  let lastStep = endNode;
 	while(lastStep != startNode){
    path.unshift(backtrace[lastStep])
    lastStep = backtrace[lastStep]
  }
  var edgePath = [];
  for(let k = 1; k < path.length; k++)
    for(let l = 0; l < MAP_EDGES.length; l++)
      if((MAP_EDGES[l].src == path[k-1] && MAP_EDGES[l].dst == path[k]) || (MAP_EDGES[l].dst == path[k-1] && MAP_EDGES[l].src == path[k])){
        edgePath.push(MAP_EDGES[l]);
        break;
      }
  return [edgePath, times[endNode]];
  }
};

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
};
