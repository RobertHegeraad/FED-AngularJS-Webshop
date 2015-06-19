app.factory('$authentication', function($rootScope, $cookieStore) {
    return {

      user: {},

      isAuth: function() {
      	var user = $cookieStore.get('user') || { auth: false };
      	return user.auth;
      },

      login: function(username) {
        // Add to cookie or localstorage

        // user object in auth opslaan
        // this.user = new User(username, ...);
        this.user = {
        	auth: true,
        	username: username
        };

        $cookieStore.put('user', this.user);
      },

      logout: function() {
        var user = $cookieStore.get('user', this.user) || {};
        user.auth = false;
        $cookieStore.put('user', user);
      }
    };
});