
function Product(name, price){
    this.name = name;
    this.ingredients = [];
    this.price = price;
}

Product.prototype.addIngredient = function(name, wharehouse,  quantity){
    var item = wharehouse.searchByName(name)[0];
    if(item)
	this.ingredients.push({ingr:name, quantity:quantity});
};


function Products(){
    this.list = [];
}

Products.prototype.addProduct = function(product){

    if(product instanceof Product)
	this.list.push(product);
    else
	throw "mismatch type";
};

Products.prototype.getProduct = function(name){
    return this.list.find((elem)=>{
	return elem.name === name;
    });
};


module.exports = {
    Product : Product,
    repository : new Products()
};


