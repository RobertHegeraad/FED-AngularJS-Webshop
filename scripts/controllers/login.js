app.controller('LoginCtrl', ['$scope', '$cookieStore', '$http', '$location', '$authentication', '$notice', function($scope, $cookieStore, $http, $location, $authentication, $notice) {
  
  $scope.username = '';

  /*
   * Omdat ik geen login formulier heb verwerkt in de opdracht wordt er altijd ingelogt met 'roberthegeraad@gmail.com', deze user is ook direct een admin.
   * Om in te loggen met een user zonder admin privileges kan de user 'dannyhegeraad@gmail.com' gebruikt worden met hetzelfde wachtwoord.
   */
  var username = 'roberthegeraad@gmail.com',
      password = 'pass';

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
   *
   * Omdat ik geen login formulier heb verwerkt in de opdracht wordt er altijd ingelogt met 'roberthegeraad@gmail.com', deze user is ook direct een admin.
   * Om in te loggen met een user zonder admin privileges kan de user 'dannyhegeraad@gmail.com' gebruikt worden met hetzelfde wachtwoord.
   */
  $scope.login = function() {
    
    $scope.attempt(username, password, function(data) {

      // Log the user in
      $authentication.login(data);

      // If logged in
      if($authentication.user.auth) {

        $notice.show('logged in as ' + $authentication.user.username);
        $scope.username = $authentication.user.username;

        // Redirect to products
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

    // Redirect to products
    if($location.path() != '/products')
      $location.path('/products');
  }
}]);