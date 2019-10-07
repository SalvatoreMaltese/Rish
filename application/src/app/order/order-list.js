
angular.module("app")

.component('orderList',{
    templateUrl:'order/order-list.html',
    controller: 'orderListCtrl'    
})

.controller('orderListCtrl', function($scope, $http, $rootScope){

    var $ctrl = this;

   /* $scope.$parent.$on('oerderschanged', function(evt, data) {
	    this.$broadcast('oerderschanged', data);
	});
    */
    $http.get('http://127.0.0.1:8081/order/list').then(function(res){
	alert('mm');
    });
 /*
    $scope.$on('oerderschanged', function(evt, data){
	$scope.orders = data;
    });
*/
});
