app.factory('User', function() {
	function User(user) {}

	User.prototype = {
		set: function(user) {
			this.id = user.id;
			this.username = user.username;
			this.auth = user.auth;
			this.admin = user.admin;
		},

		getUserId: function() {
			return this.id;
		},

		getUsername: function() {
			return this.username;
		}
	};

	return User;
});