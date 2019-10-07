//var app = angular.module("app", ['ui.router']);

angular.module("app", ['ngComponentRouter'])

.config(function($locationProvider){

   $locationProvider.html5Mode(true);
            
})

.value('$routerRootComponent', 'app')

//----------------------------------------------------

.component('app',  {
    templateUrl:'./app.html',
    $routeConfig: [	
	{
	    path: '/NewOrder/...',
	    name:'NewOrder',
	    component: 'createOrder',
	    useAsDefault: true
	},
	{
	    path: '/OrderModification/:id',
	    name:'OrderModification',
	    component: 'orderModification'
	}
    ]
});

//----------------------------------------------------------------------------
/*app.component('createOrder', {
    templateUrl:'views/createOrder.html',
    bindings : { $router: '<' },
    controller: 'createOrderController'
});
app.controller('createOrderController', function($scope, $http, $rootScope){

    var $ctrl = this;
    
    $scope.create = function(name){
	
	$http.post("order/create", {id: name}).then((res) => {

	    var id_order = res.data.id;

	    var scope = $scope;
	    $http.get('order/list').then(function(res){
	
	       // $rootScope.orders = {list: res.data};
		scope.$emit('orderschanged', "hhh");
	    });
	scope.$emit('orderschanged', "hhh");
	    $ctrl.$router.navigate(['OrderModification', {id: id_order}]);
	},
	(err) => {console.log(err);
	});
	
    };
    
});
*/
//-------------------------------------------------------------------------
/*app.component('orderList',{
    templateUrl:'views/orderList.html',
    controller: 'orderListCtrl'    
});

app.controller('orderListCtrl', function($scope, $http, $rootScope){

    var $ctrl = this;

    $scope.$parent.$on('oerderschanged', function(evt, data) {
	    this.$broadcast('oerderschanged', data);
	});
    
    $http.get('order/list').then(function(res){

    });

    $scope.$on('oerderschanged', function(evt, data){
	$scope.orders = data;
    });
});*/
//----------------------------------------------------------------------------
/*
app.component('orderModification', {
    templateUrl:'views/orderModification.html',
    bindings : { $router: '<' },
    controller: 'orderModificationCtrl'
});

app.controller("orderModificationCtrl", function($scope, $http){

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
*/
