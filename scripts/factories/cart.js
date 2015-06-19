app.factory('Cart', ['$cookieStore', function($cookieStore) {
	return {

		products: [],

		/*
		 * Add a product to the cart cookie
		 */
		add: function(id, price) {
	 		// Add a new product or update the quantity
	 		if(this.products[id] == undefined) {
	 			this.products[id] = { id: id, price: price, quantity: 1 };
	 		} else {
	 			this.products[id].quantity++;
	 		}

	 		$cookieStore.put('cart', this.products);

	 		return this.products;
		},

		/*
		 * Remove a product from the cart cookie
		 */
		remove: function(id) {
		  	this.products[id] = null;
		  	$cookieStore.put('cart', this.products);

		  	return this.products;
		},

		/*
		 * Increment quantity for a product
		 */
		addQuantity: function(id) {
			if(this.products[id] != undefined) {
				this.products[id].quantity++;
			}
			$cookieStore.put('cart', this.products);
		},

		/*
		 * Decrement quantity for a product and remove if it will become 0
		 */
		removeQuantity: function(id) {
			if(this.products[id] != undefined) {
				if(this.products[id].quantity == 1) {
					this.remove(id);
				} else {
					this.products[id].quantity--;
				}
			}
			$cookieStore.put('cart', this.products);
		},

		/*
		 * Get products from localstorage
		 */
		getProducts: function() {
  			return this.products = $cookieStore.get('cart') || [];
		},

		getTotal: function() {
			var total = 0;

			for(var i=0; i<this.products.length; i++) {
				if(this.isNotNull(this.products[i])) {
					total += this.products[i].price * this.products[i].quantity;
				}
			}

			return total;
		},

		/*
		 * Returns the product count in the cart
		 */
		getProductCount: function() {
			return this.products.filter(this.isNotNull).length;
		},

		/*
		 * Return true if the length of the cart array is 0 (ignoring null values)
		 */
		isEmpty: function() {
			return this.getProductCount() == 0;
		},

		/*
		 * Filter out null values from the cart products array
		 *
		 * Returns false is item is null
		 */
		isNotNull: function(item) {
			return !(item === null);
		}
	};
}]);