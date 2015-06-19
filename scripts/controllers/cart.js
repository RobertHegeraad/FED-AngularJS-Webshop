app.controller('CartCtrl', ['$scope', '$cookieStore', 'Cart', function($scope, $cookieStore, Cart) {

  /*
   * Products to be shown on the page
   */
  $scope.products = [];

  /*
   * Get all the products from the cart
   */
  $scope.getProducts = function() {
    $scope.products = Cart.getProducts();
  }

  /*
   * Get the total cost for the cart
   */
  $scope.getTotal = function() {
    return Cart.getTotal();
  }

  /*
   * Remove a product from the cart
   */
  $scope.removeFromCart = function(id) {
    $scope.products = Cart.remove(id);
  }

  /*
   * Increment quantity for a product
   */
  $scope.addQuantity = function(id) {
    Cart.addQuantity(id);
  }

  /*
   * Decrement quantity for a product
   */
  $scope.removeQuantity = function(id) {
    Cart.removeQuantity(id);
  }

  /*
   * Returns the product count in the cart
   */
  $scope.getProductCount = function() {
    return Cart.getProductCount();
  }

  /*
   * Return true if the length of the cart array is 0 (ignoring null values)
   */
  $scope.isCartEmpty = function() {
  	return Cart.isEmpty();
  }

  /*
   * Filter out null values from the cart products array
   *
   * Returns false is item is null
   */
  $scope.isNotNull = function(item) {
    return !(item === null);
  }

  $scope.getProducts();
}]);