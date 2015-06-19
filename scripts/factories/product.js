app.factory('Product', function() {
	function Product(id, title, price) {
		this.id = id;
		this.title = title;
		this.price = (Math.random() * 100).toFixed(2);;
	}

	Product.prototype = {
		getId: function() {
			return this.id;
		},

		getTitle: function() {
			return this.title;
		},

		getPrice: function() {
			// format to .00
			return this.price;
		}
	};

	return Product;
});