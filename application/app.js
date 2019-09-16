//var app = angular.module("app", ['ui.router']);

var app = angular.module("app", ['ngComponentRouter']);


app.config(function($locationProvider){

   $locationProvider.html5Mode(true);
            
});

/* app.config(function($stateProvider, $locationProvider){

   $locationProvider.html5Mode(true);
    
   var helloState = {
    name: 'createOrder',
    url: '/createOrder',
       // template: '<h3>hello world!</h3>'
       component: 'createOrder'
  }
    
  $stateProvider.state(helloState);  
      
});
*/

app.value('$routerRootComponent', 'app')

app.component('app',  {
    template:'<ng-outlet></ng-outlet>',
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
app.component('createOrder', {
    templateUrl:'views/createOrder.html',
    bindings : { $router: '<' },
    controller: 'createOrderController'
});
app.controller('createOrderController', function($scope, $http){

    var $ctrl = this;
    
    $scope.create = function(name){
	
	$http.post("order/create", {id: name}).then((res) => {
	    //$scope.result = res.data;
	    var id_order = res.data.id;
	    $ctrl.$router.navigate(['OrderModification', {id: id_order}]);
	    
	},(err) => {console.log(err);});
	
    };
    
});


//----------------------------------------------------------------------------
app.component('orderModification', {
    templateUrl:'views/orderModification.html',
    bindings : { $router: '<' },
    controller: 'orderModificationCtrl'
});

app.controller("orderModificationCtrl", function($scope, $http){

    var ctrl = this;
    $scope.productSelected = [];
    $scope.total = 0;
    
    $http.get("products/list").then(function(res){
	$scope.products = res.data
    });

    /*ctrl.startOrder = function(id_order){
	console.log(id_order);
	
	$http.post("order/set", { id : id_order}).then((res) => {

	    $scope.current_order = res;
	    
	},(err)=> {console.log(err);}
					       
	);
    };*/

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
