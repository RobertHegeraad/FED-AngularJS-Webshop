app.controller('CartCtrl', ['$scope', '$cookieStore', 'Cart', 'Product', function($scope, $cookieStore, Cart, Product) {

  /*
   * Products to be shown on the page
   */
  $scope.products = [];

  /*
   * Previous orders
   */
  $scope.orders = [];

  /*
   * Get all the products from the cart
   */
  $scope.getProducts = function() {
    $scope.products = Cart.getProducts();
  }

  /*
   * Get all the previous order for the user
   */
  $scope.getOrders = function() {
    Cart.getOrders(function(orders) {

      for(var i=0; i<orders.length; i++) {
        var d = new Date(orders[i].date * 1000);
        orders[i].fullDate = (d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear());

        for(var j=0; j<orders[i].products.length; j++) {
          orders[i].products[j] = new Product(orders[i].products[j]);
        }
      }
      console.log(orders);

      $scope.orders = orders;
    });
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

  /*
   * Place an order
   */
  $scope.order = function() {

    Cart.order();

    // Clear the cart
    this.products = Cart.clear();
  }

  $scope.getProducts();
  $scope.getOrders();
}]);