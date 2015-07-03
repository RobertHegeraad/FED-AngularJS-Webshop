app.factory('User', function() {
	function User(user) {}

	User.prototype = {
		/*
		 * Set the user properties with the passed user information
		 */
		set: function(user) {
			this.id = user.id;
			this.username = user.username;
			this.auth = user.auth;
			this.admin = user.admin;
		},

		/*
		 * Return the user ID
		 */
		getUserId: function() {
			return this.id;
		},

		/*
		 * Return the username
		 */
		getUsername: function() {
			return this.username;
		}
	};

	return User;
});