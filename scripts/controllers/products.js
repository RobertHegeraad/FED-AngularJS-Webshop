/*

User object
Admin object extend daarvan
- login

Product object
- add to cart

 */

app.controller('ProductsCtrl', ['$scope', '$http', '$cookieStore', 'Product', 'User', 'Admin', 'Cart', function($scope, $http, $cookieStore, Product, User, Admin, Cart) {
  	var shop = this;

  	$scope.products = [];

	$scope.get = function() {
	  	$http({
			method: 'GET',
			url: 'http://jsonplaceholder.typicode.com/posts'
		}).success(function(data) {

			// Add new products to the products array			
			for(var i=0; i<data.length; i++) {
				$scope.products.push(new Product(data[i].id, data[i].title));
			}
		});

		var user = new User(1, 'Robertt');
		var admin = new Admin(user);
		console.log('admin: ' + admin.getUsername());
 	}

 	$scope.addToCart = function(id, price) {

 		Cart.add(id, price);
 	}

 	$scope.get();
}]);