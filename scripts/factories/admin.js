app.factory('Admin', function(User) {
	function Admin(user) {}

	// Extend the User object
	Admin.prototype = new User();

	Admin.prototype.isAdmin = function() {
		return true;
	}

	return Admin;
});