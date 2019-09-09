var app = angular.module("app", []);

app.controller("productsController", function($scope, $http){

    var ctrl = this;
    $scope.productSelected = [];
    $scope.total = 0;
    
    $http.get("products/list").then(function(res){
	$scope.products = res.data
    });

    ctrl.startOrder = function(id_order){
	console.log(id_order);
	
	$http.post("order/set", { id : id_order}).then((res) => {

	    $scope.current_order = res;
	    
	},(err)=> {console.log(err);}
					       
	);
    };

    ctrl.selectProduct = function(id_prod){

	var selected = $scope.products.find((elem)=>{
	    return elem.name === id_prod;
	});

	var indexFound = -1;
	$scope.total = 0;
	$scope.productSelected.forEach((item, index)=>{
	    if(item.name === id_prod){
		item.times++;
		item.total += item.price;
		indexFound = index;
	    }

	    $scope.total += item.total;
	});

	
	if(indexFound == -1){
	    $scope.productSelected.push({name : id_prod,
					 times : 1,
					 price: selected.price,
					 total: selected.price
					});
	    $scope.total += selected.price;
	}
    };
    
});
