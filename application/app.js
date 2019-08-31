var app = angular.module("app", []);

app.controller("productsController", function($scope, $http){

    $http.get("products/list").then(function(res){
	console.log(res);
    });
    
});
