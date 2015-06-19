app.factory('Admin', function(User) {
	function Admin(user) {
		this.id = user.id;
		this.username = user.username;
	}

	// betere overerving

	Admin.prototype = {
		getUsername: function() {
			return this.username;
		}
	};

	return Admin;
});