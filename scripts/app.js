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
});