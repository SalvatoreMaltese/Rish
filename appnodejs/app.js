var express = require("express");
var WH = require("../warehouse");

var app = express();


app.set("view engine", "ejs");
app.set("views",  "D:/Rish/views");

app.use("/public", express.static("public"));
app.use("/application", express.static("application"));


app.get("/", function(req, res) {
    res.render("index");
});

app.get("/products/list", function(req, res){

    console.log(WH.products);
    res.json([{ciao:"jj"}]);
});

app.listen("8081");
