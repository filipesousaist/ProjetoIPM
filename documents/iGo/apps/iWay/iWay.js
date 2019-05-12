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
  this.nodes.forEach(node => {
    if (node !== startNode) {
      times[node] = Infinity
    }
  });
  pq.enqueue([startNode, 0]);
  while (!pq.isEmpty()){
    let shortestStep = pq.dequeue();
    let currentNode = shortestStep[0];
    //for each(neighbor =>) faz com o que variavel de iteração se chama neighbor
    for(let i = 0; i < this.adjacencyList[currentNode]; i++){
    	let time = times[currentNode] + adjacencyList[currentNode][i].weight;
    }
    this.adjacencyList[currentNode].forEach(neighbor => {
      	let time = times[currentNode] + neighbor.weight;
      	if (time < times[neighbor.node]) {
        	times[neighbor.node] = time;
        	backtrace[neighbor.node] = currentNode;
        	pq.enqueue([neighbor.node, time]);
      	}
    });
  }	

  let path = [endNode];
  let lastStep = endNode;
  while(lastStep !== startNode){
    path.unshift(backtrace[lastStep])
    lastStep = backtrace[lastStep]
  }
  return Path is ${path} and time is ${times[endNode]}
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
    return (this.collection.length === 0) 
  }
}

function intializeGraph(){

}