app.controller('ProductCtrl', ['$scope', '$routeParams', '$http', '$notice', 'Cart', 'Product', function($scope, $routeParams, $http, $notice, Cart, Product) {

  	$scope.product = {};

  	/*
  	 * Get a single product from the database
  	 */
  	$scope.get = function() {
	  	$http({
			method: 'GET',
			url: 'http://student.cmi.hro.nl/0880145/jaar2/kw4/fed/database/?products=true&id=' + $routeParams.id
		}).success(function(data) {
			$scope.product = new Product(data);
			console.log($scope.product);
		});
 	}

 	/*
 	 * Add a product to the cart by passing information to the Cart factory
 	 */
 	$scope.addToCart = function(id, title, price) {

 		Cart.add(id, title, price);

 		$notice.show('Added ' + title + ' to your cart');
 	}


 	// Get products when the page loads
 	$scope.get();
}]);