app.factory('$authentication', function($rootScope, $cookieStore, User, Admin) {
    return {

      user: {},

      /*
       * Check to user cookie to see if the user is logged in
       */
      isAuth: function() {
        var user = $cookieStore.get('user') || { auth: false }

        if(user.auth === true) {
          this.user = new User();
          
          if(user.admin == true) {
            this.user = new Admin(this.user);
          }

          this.user.set({
            id: user.id,
            username: user.username,
            admin: user.admin,
            auth: true
          });

          return this.user;
        }

        return false;
      },

      /*
       * Check if the logged in user has admin privileges
       */
      isAdmin: function() {
        return ("isAdmin" in this.user);
      },

      /*
       * Log the user in by setting the user cookie
       */
      login: function(user) {

        this.user = new User();

        if(user.admin == true) {
          this.user = new Admin(this.user);
        }

        this.user.set({
          id: user.user_id,
          username: user.email,
          admin: user.admin,
          auth: true
        });
        
        console.log(this.user);

        $cookieStore.put('user', this.user);
      },

      /*
       * Log the user out
       */
      logout: function() {
        var user = $cookieStore.get('user', this.user) || {};
        user.auth = false;
        $cookieStore.put('user', user);
      }
    };
});