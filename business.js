
var uuidv4 = require("uuid/v4");

function Order(name, id){

    this.name = name;
    this.id = id;
    this.products = [];
    this.state = 0;
    this.datetime_creation = null;
}

Order.prototype.addProduct = function(name, quantity){
   var selected =  this.products.find((elem) =>{
	return elem.name = name;
   });

    if(!selected){
	selected = {
	    p_name : name,
	    p_quantity: quantity 
	};
    }else{
	selected.p_quantity = quantity;
    }

};

Order.prototype.getProduct = function(name){
    return this.products.find((elem) =>{
	return elem.name = name;
   });
};

function OrderFactory(){
    
    this.orders = [];
}

OrderFactory.prototype.addOrder = function(name){

    var order = this.orders.find((elem) => {
	return elem.name === name;
    });

    if(order != undefined && order.state != 0){
	throw "order already exist";
    }

    var newOrder = new Order(name, uuidv4());
    newOrder.datetime_creation = new Date();

    this.orders.push(newOrder);
  
    return newOrder;
};

OrderFactory.prototype.getOrder = function(id){

    return this.orders.find((elem) => {
	return elem.id === id;
    });
};


OrderFactory.prototype.orderList = function(){
    
    return this.orders;
};

module.exports = new OrderFactory();

