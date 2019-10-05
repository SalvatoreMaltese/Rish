
var express = require("express");
var warehouse = require("../warehouse.js");
var business =  require("../business.js");
var bodyParser = require("body-parser");
var products = require("../products");
var app = express();

app.set("view engine", "ejs");
app.set("views",  "D:/Rish/views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));
app.use("/application", express.static("application"));
app.use("/nm", express.static("node_modules"));
app.use("/views", express.static("views"));


app.get("/", function(req, res) {

    res.render("index");
   
});

app.get('/createOrder', function(req, res) {

   
    res.render("index");    
});

app.get("/products/list", function(req, res){
    
    res.json(products.repository.list);
});

app.post("/order/create", (req, res) => {

    var name_order = req.body.id;

    var current_order = business.addOrder(name_order);

    res.json(current_order);
});


app.post("/order/addProduct", (req, res) => {

    var order_id = req.body.order_id;
    var product_name = req.body.name;
    var product_quantity = req.body.quantity;

    var order = business.getOrder(order_id);
    var o_product = order.getProduct(product_name);
    var product = products.repository.getProduct(product_name);

    //check quantity available
    var ended_ingredients = [];
    product.ingredients.forEach( (elem, index) =>{
	if(!warehouse.usableItem(elem.ingr, elem.quantity * product_quantity))
	    ended_ingredients.push(elem);
    });

    //response
    if(ended_ingredients.length === 0){

	order.addProduct( product_name,  product_quantity );
	
	res.json(
	    {
		state : 0,
		msg : 'added'
	    }
	);
	
    }else{
	res.json(
	    {
		state : 1,
		msg : 'resource exahusted'
	    }
	);
    }
});

app.get("/order/list", (req, res) => {

    var order_list = business.orderList();
    console.log(order_list);
    res.json(order_list);
    
});


app.listen("8081", function(){

    var WH = warehouse;
  
    var p1 = new products.Product("Penne Arrabbiata", 8.50);
    p1.addIngredient("Penne", WH,  1);
    p1.addIngredient("Sugo",  WH, 10);
    p1.addIngredient("Peperoncino", WH, 2);


    var p2 = new products.Product("Risotto noci e gorgonzola", 15);
    p2.addIngredient("Riso", WH, 2);
    p2.addIngredient("Gorgonzola", WH, 4);
    p2.addIngredient("Noci", WH, 5);
    p2.addIngredient("Radicchio", WH, 2);

    products.repository.addProduct(p1);
    products.repository.addProduct(p2);
    
});
