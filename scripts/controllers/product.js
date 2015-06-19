app.controller('ProductCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

  	$scope.product = {};

  	$scope.get = function() {
	  	$http({
			method: 'GET',
			url: 'http://jsonplaceholder.typicode.com/posts/' + $routeParams.id
		}).success(function(data) {
			console.log(data);
			$scope.product = data;
		});
 	}

 	$scope.addToCart = function(id) {
 		console.log('add to cart ' + id);
 	}

 	$scope.get();
}]);