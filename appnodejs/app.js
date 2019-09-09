var express = require("express");
var prods = require("../warehouse.js");
var business =  require("../business.js");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.set("views",  "D:/Rish/views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use("/public", express.static("public"));
app.use("/application", express.static("application"));


app.get("/", function(req, res) {
    res.render("index");
});

app.get("/products/list", function(req, res){

    res.json(prods);
});

app.post("/order/set", (req, res) => {

    console.log(req.body);

    var id_order = req.body.id;

    var current_order = business.addOrder(id_order);

    res.json(current_order);
});

app.listen("8081");
