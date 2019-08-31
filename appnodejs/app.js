var express = require("express");

var prods = require("../warehouse.js");

var app = express();


app.set("view engine", "ejs");
app.set("views",  "D:/Rish/views");

app.use("/public", express.static("public"));
app.use("/application", express.static("application"));


app.get("/", function(req, res) {
    res.render("index");
});

app.get("/products/list", function(req, res){

    res.json(prods);
});

app.listen("8081");
