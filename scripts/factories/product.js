app.factory('Product', function() {
	function Product(data) {
		this.id = data.product_id;
		this.title = data.title;
		this.description = data.description;
		this.price = data.price;
		this.quantity = data.quantity || 1;
	}

	Product.prototype = {

		/*
		 * Return the product ID
		 */
		getId: function() {
			return this.id;
		},

		/*
		 * Return the product title
		 */
		getTitle: function() {
			return this.title;
		},

		/*
		 * Return the product description
		 */
		getDescription: function() {
			return this.description;
		},

		/*
		 * Return the formatted price for a product
		 *
		 * 32 becomes 32.00
		 */
		getPrice: function() {
			return parseInt(this.price).toFixed(2);
		}
	};

	return Product;
});