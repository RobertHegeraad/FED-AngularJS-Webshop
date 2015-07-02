app.factory('Cart', ['$cookieStore', '$http', '$notice', function($cookieStore, $http, $notice) {
	return {

		products: [],

		orders: [],

		/*
		 * Add a product to the cart cookie
		 */
		add: function(id, title, price) {
	 		// Add a new product or update the quantity
	 		if(this.products[id] == undefined) {
	 			this.products[id] = { id: id, title: title, price: price, quantity: 1 };
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
		  	$notice.show('Removed ' + this.products[id].title + ' from your cart');
		  	
		  	this.products[id] = null;
		  	$cookieStore.put('cart', this.products);

		  	return this.products;
		},

		/*
		 * Clear the cart cookie
		 */
		clear: function() {
			$cookieStore.put('cart', []);
			return this.products = [];
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

		/*
		 * Get all the previous orders for the user
		 */
		getOrders: function(successCB, errorCB) {
			$http({
		      method: 'get',
		      url: 'http://student.cmi.hro.nl/0880145/jaar2/kw4/fed/database/?orders=true&user_id=1',
		    })
		    .success(function(data) {
				this.orders = data;
				successCB(data);
		    })
		    .error(function(data) {
		    	console.log(data);
		    });
		},

		getTotal: function() {
			var total = 0;

			for(var i=0; i<this.products.length; i++) {
				if(this.isNotNull(this.products[i])) {
					total += this.products[i].price * this.products[i].quantity;
				}
			}

			return parseInt(total).toFixed(2);
		},

		/*
		 * Returns the product count in the cart
		 */
		getProductCount: function() {
			return this.products.filter(this.isNotNull).length;
		},

		/*
		 * Place an order
		 */
		order: function() {
			console.log(this.products);

			var products = this.products.filter(this.isNotNull);

			$http({
		      method: 'post',
		      data: $.param({ user_id: 1, products: products }),
		      url: 'http://student.cmi.hro.nl/0880145/jaar2/kw4/fed/database/?order=true',
		      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .success(function(data) {
		    	console.log(data);

		    	$notice.show("You've successfully placed an order");
		    })
		    .error(function(data) {
		    	console.log(data);
		    });
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