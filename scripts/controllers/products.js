app.controller('ProductsCtrl', ['$scope', '$http', '$cookieStore', '$notice', 'Product', 'User', 'Admin', 'Cart', function($scope, $http, $cookieStore, $notice, Product, User, Admin, Cart) {
  	var shop = this;

  	$scope.products = [];

	$scope.get = function() {
	  	$http({
			method: 'GET',
			// url: 'http://jsonplaceholder.typicode.com/posts'
			url: 'http://student.cmi.hro.nl/0880145/jaar2/kw4/fed/database/?products=true'
		}).success(function(data) {

			// Add new products to the products array			
			for(var i=0; i<data.length; i++) {
				$scope.products.push(new Product(data[i]));
			}
		});
 	}

 	$scope.addToCart = function(id, title, price) {

 		Cart.add(id, title, price);

 		$notice.show('Added ' + title + ' to your cart');
 	}

 	$scope.get();
}]);