
require("./structures.js");


function Graph(){

    this.Vertex = function(rcontent_node){
	
	this.id = 0;
	this.content = content_node;
    };

    this.Edge = function( vertex_one, vertex_two, content_edge){
	this.vertex_one = vertex_one;
	this.vertex_two = vertex_two;
	this.content = content_edge;
    };
    
    this.adj_matrix =  Array.matrix(0,0,0);
    
    this.V = [];
    this.E = [];
};

Graph.prototype.addNode = function(new_node){
    
    var new_index  = this.adj_matrix.length;

    //vertex
    var new_vertex = new this.Vertex(new_node);
    new_vertex.id = new_index;     
    this.V.push(new_vertex);

    //adjacency
    Array.augment(this.adj_matrix, 1, 0);
};

Graph.prototype.addEdge = function(vertex_one, vertex_two, content){

    var search_a = function(v){
	if(v.id == vertex_one || v.content == vertex_one)
	    return true;

	return false;
    };

    var search_b = function(v){
	if(v.id == vertex_two || v.content == vertex_two)
	    return true;

	return false;
    };

    
    var vertex_a =  this.V.filter(search_a)[0];
    var vertex_b =  this.V.filter(search_b)[0];

    
    var new_edge = new this.Edge( vertex_a ,  vertex_b, content);
    this.E.push(new_edge);

    this.adj_matrix[vertex_a.id][vertex_b.id] = 1;
    this.adj_matrix[vertex_b.id][vertex_a.id] = 1;
};


var prova = new Graph();

prova.addNode("ciao");
prova.addNode("boh");
prova.addNode("altro");
console.log(prova);

prova.addEdge("ciao", "altro", "sono un arco");
console.log(prova);

