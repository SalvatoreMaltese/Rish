
require("./structures.js");

function Item(name){
    this.name = name;
    this.ingredients = [];
}

function WarehouseElement(id, element, amount){
    this.id = id;
    this.element = element;
    this.amount = amount;
}

function Warehouse(){

    this.hashF = function(name, len){

	var hashIndex = 0;

	for(var i = 0 ; i < name.length; i++){
	    hashIndex = hashIndex + name.charCodeAt(i) + i;  
	}

	hashIndex = (hashIndex + name.length)  % len ;

	return hashIndex;
    }

    this.storage = Array.matrix(10, 0, 0);
}

Warehouse.prototype.AddElement = function(name, amount){


    var hashIndex = this.hashF(name, this.storage.length - 1)
    
    var welement = new WarehouseElement(hashIndex, name, amount);

    this.storage[hashIndex].push(welement);
    
}


Warehouse.prototype.searchByName = function(name){
    
    var hashIndex =  this.hashF(name, this.storage.length - 1)

    var result = [];
    
    for(var h = 0; h < this.storage[hashIndex].length; h++){
	
	if(this.storage[hashIndex][h].element == name){
	    result.push(this.storage[hashIndex][h]);
	}
    }
    
    return result; 
}

Warehouse.prototype.removeQuantity = function(nameItem, quantity){

    var item = this.searchByName(nameItem);
    if(item != null &&  item.length != 0){
	item[0].amount -= quantity;
    }
    
}



var WH = new Warehouse();

WH.AddElement("Gorgonzola", 10);

WH.AddElement("Radicchio", 100);

WH.AddElement("Riso", 100);

WH.AddElement("Penne", 150);

WH.AddElement("Sugo", 1000);

WH.AddElement("Peperoncino", 50);

WH.AddElement("Olio", 2000);

WH.AddElement("Noci", 100);



function Product(name, warehouse){
    this.name = name;
    this.wh = warehouse;
    this.ingredients = [];
}

Product.prototype.addIngredient = function(name, quantity){
    var item = this.wh.searchByName("name")[0];
    this.ingredients.push({ingr:item, quantity:quantity});
}


var p1 = new Product("Penne Arrabbiata", WH);
p1.addIngredient("Penne",  1);
p1.addIngredient("Sugo",  10);
p1.addIngredient("Peporoncino",  2);

var p2 = new Product("Risotto noci e gorgonzola", WH);
p2.addIngredient("Riso", 2);
p2.addIngredient("Gorgonzola",  4);
p2.addIngredient("Noci", 5);
p2.addIngredient("Radicchio", 2);

var products = [];

products.push(p1);
products.push(p2);

module.exports = products;
