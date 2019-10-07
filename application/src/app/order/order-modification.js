
angular.module("app")

.component('orderModification', {
    templateUrl:'order/order-modification.html',
    bindings : { $router: '<' },
    controller: 'orderModificationCtrl'
})

.controller("orderModificationCtrl", function($scope, $http){

    var $ctrl = this;
    var id_order = null;
    
    $scope.productSelected = [];
    $scope.total = 0;
    
    $http.get("products/list").then(function(res){
	$scope.products = res.data;
    });

    this.$routerOnActivate = function(next, prev){   
	id_order = next.params.id;
    };
    
    $ctrl.selectProduct = function(id_prod){

	var selectedQuantity;
	var selected;
	var prodSelected;
	var quantityact = 1;
	
	selected = $scope.products.find((elem)=>{
	    return elem.name === id_prod;
	});

	prodSelected = $scope.productSelected.find((elem) =>{
	    return elem.name === id_prod;
	});

	if(prodSelected){
	    quantityact = prodSelected.times + 1;
	}
	else{
	    prodSelected = {
		name : id_prod,
		times : quantityact,
		price: selected.price,
		total: selected.price
	    };
	}
	 
	$http.post("order/addProduct", {

	    order_id : id_order,
	    name : id_prod,
	    quantity : quantityact
	    
	}).then((res) => {
	    
	    if(res.data.state == 0){
		
		if(quantityact === 1){		    
		    $scope.productSelected.push(prodSelected);
		    
		}else{
		    prodSelected.times = quantityact; 
		    prodSelected.total += prodSelected.price;		
		}
		
		$scope.total += prodSelected.price;
		
		
	    }else{
		console.log(res.msg);
	    }
	});

    };
    
});
