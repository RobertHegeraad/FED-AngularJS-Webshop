var app = angular.module('webshop', ['ngRoute', 'ngCookies'])
.config(function($routeProvider) {
    $routeProvider
        .when('/products', {
            templateUrl: 'views/products.html',
            controller: 'ProductsCtrl'
        })
        .when('/product/:id', {
            templateUrl: 'views/product.html',
            controller: 'ProductCtrl'
        })
        .when('/cart', {
            templateUrl: 'views/cart.html',
            controller: 'CartCtrl'
        })
        // .when('/login', {
        //     templateUrl: 'views/login.html',
        //     controller: 'LoginCtrl'
        // })
        // .when('/orders', {
        //     templateUrl: 'views/orders.html',
        //     controller: 'OrdersCtrl'
        // })
        // .when('/users', {
        //     templateUrl: 'views/users.html',
        //     controller: 'UsersCtrl'
        // })
        .otherwise({
            redirectTo: '/products'
        });
})
.run(function($rootScope) {
    console.log('Running');
})

/* ----------------------------------------------------------------------------------------
 * NOTICES
 *
 * Notices for user
 */
.factory('$notice', function() {

  return {    

    /*
     * Show a notice for a few seconds
     *
     * @param A language string from the ./locale folder
     * @param The number of miliseconds the notice is visible
     */
    show: function(string, ms) {
        ms = ms || 2000;

        var $notice = $('#notice');

        $notice.html('<div>' + string + '</div>').fadeIn(400);

        setTimeout(function() {
            $notice.fadeOut(400);
        }, ms);
    },

    /*
     * Close a notice
     */
    close: function() {
        $('#notice').fadeOut(400);
    }
  };
});