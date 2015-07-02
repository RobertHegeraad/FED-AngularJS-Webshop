app.factory('Product', function() {
	function Product(data) {
		this.id = data.product_id;
		this.title = data.title;
		this.description = data.description;
		this.price = data.price;
		this.quantity = data.quantity || 1;
	}

	Product.prototype = {
		getId: function() {
			return this.id;
		},

		getTitle: function() {
			return this.title;
		},

		getDescription: function() {
			return this.description;
		},

		getPrice: function() {
			// format to .00
			return parseInt(this.price).toFixed(2);
		}
	};

	return Product;
});