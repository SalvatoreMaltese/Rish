
require("./structures.js");

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
    };

    this.storage = Array.matrix(10, 0, 0);
}

Warehouse.prototype.AddElement = function(name, amount){


    var hashIndex = this.hashF(name, this.storage.length - 1);
    
    var welement = new WarehouseElement(hashIndex, name, amount);

    this.storage[hashIndex].push(welement);
    
};


Warehouse.prototype.searchByName = function(name){
    
    var hashIndex =  this.hashF(name, this.storage.length - 1);

    var result = [];
    
    for(var h = 0; h < this.storage[hashIndex].length; h++){
	
	if(this.storage[hashIndex][h].element == name){
	    result.push(this.storage[hashIndex][h]);
	}
    }
    
    return result; 
};

Warehouse.prototype.usableItem = function(item, quantity) {

    var element = this.searchByName(item);
    if(element.amount < quantity){
	return false;
    }

    return true;
};

Warehouse.prototype.removeQuantity = function(nameItem, quantity){

    var item = this.searchByName(nameItem);
    if(item != null &&  item.length != 0){
	item[0].amount -= quantity;
    }  
};




var WH = new Warehouse();

WH.AddElement("Gorgonzola", 10);

WH.AddElement("Radicchio", 100);

WH.AddElement("Riso", 100);

WH.AddElement("Penne", 150);

WH.AddElement("Sugo", 1000);

WH.AddElement("Peperoncino", 50);

WH.AddElement("Olio", 2000);

WH.AddElement("Noci", 100);


module.exports = WH;
