app.controller('LoginCtrl', ['$scope', '$cookieStore', '$http', '$location', '$authentication', function($scope, $cookieStore, $http, $location, $authentication) {
  
  // wegstoppen in user object en gebruiken via authentication service

  $scope.username = 'robert';
  $scope.password = '';

  $scope.getUser = function() {

  }

  $scope.isAuth = function() {
    return $authentication.isAuth();
  }

  $scope.attempt = function(username, password, callback) {
      $http({
      method: 'GET',
      url: 'http://graph.facebook.com/robert.hegeraad'
    }).success(callback);
  }

  $scope.login = function() {
    
    // validate username (validate service?)

    $scope.attempt($scope.username, $scope.password, function(data) {
      console.log(data);

      // Log the user in
      $authentication.login(data.first_name);

      if($authentication.user.auth) {
        console.log('logged in as ' + $authentication.user.username);

        if($location.path() != '/products')
          $location.path('/products');
      }
    });
  }

  $scope.logout = function() {
    $authentication.logout();

    if($location.path() != '/products')
          $location.path('/products');
  }
}]);