app.controller('AdminCtrl', ['$scope', '$cookieStore', '$http', function($scope, $cookieStore, $http) {

  /*
   * Previous orders
   */
  $scope.orders = [];

  /*
   * Get all the previous order for the user
   */
  $scope.getOrders = function() {
    $http({
      method: 'get',
      url: 'http://student.cmi.hro.nl/0880145/jaar2/kw4/fed/database/?orders=true',
    })
    .success(function(orders) {
      for(var i=0; i<orders.length; i++) {
        var d = new Date(orders[i].date * 1000);
        orders[i].fullDate = (d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear());
      }
      $scope.orders = orders;
    })
    .error(function(data) {
      console.log(data);
    });
  }

  $scope.getOrders();
}]);