app.controller('LoginCtrl', ['$scope', '$cookieStore', '$http', '$location', '$authentication', '$notice', function($scope, $cookieStore, $http, $location, $authentication, $notice) {
  
  $scope.username = '';

  $scope.getUser = function() {

  }

  /*
   * Check if the user is logged in
   */
  $scope.isAuth = function() {
    var user = $authentication.isAuth();
    $scope.username = user.username;
    return user.auth;
  }

  /*
   * Check if a user is an admin
   */
  $scope.isAdmin = function() {
    return $authentication.isAdmin();
  }

  /*
   * Attemp to log the user in
   */
  $scope.attempt = function(username, password, successCB, errorCB) {
    $http({
      method: 'post',
      data: $.param({ username: username, password: password }),
      url: 'http://student.cmi.hro.nl/0880145/jaar2/kw4/fed/database/?login=true',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data) {
      if(data.length == 0) {
        errorCB(data);
      } else {
        successCB(data);
      }
    })
    .error(errorCB);
  }

  /*
   * Attempt to log in and redirect
   */
  $scope.login = function() {
    
    $scope.attempt('roberthegeraad@gmail.com', 'pass', function(data) {

      // Log the user in
      $authentication.login(data);

      if($authentication.user.auth) {

        $notice.show('logged in as ' + $authentication.user.username);
        $scope.username = $authentication.user.username;

        if($location.path() != '/products')
          $location.path('/products');
      }
    }, function(data) {
      $notice.show('Failed to login, please try again later');
    });
  }

  /*
   * Logout and redirect
   */
  $scope.logout = function() {
    $authentication.logout();

    $notice.show('Logged out');

    if($location.path() != '/products')
      $location.path('/products');
  }
}]);