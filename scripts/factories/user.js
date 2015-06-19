app.factory('User', function() {
	function User(id, username) {
		this.id = id;
		this.username = username;
	}

	User.prototype = {
		getUsername: function() {
			return this.username;
		}
	};

	return User;
});