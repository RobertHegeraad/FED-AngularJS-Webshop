app.controller('HeaderCtrl', ['$scope', '$cookieStore', 'Cart', function($scope, $cookieStore, Cart) {

  $scope.getProductCount = function() {
    return Cart.getProductCount();
  }
}]);