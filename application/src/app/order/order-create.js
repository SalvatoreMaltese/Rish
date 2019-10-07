
angular.module("app")

.component('createOrder', {
    templateUrl:'order/order-create.html',
    bindings : { $router: '<' },
    controller: 'createOrderController'
})

.controller('createOrderController', function($scope, $http, $rootScope){

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
