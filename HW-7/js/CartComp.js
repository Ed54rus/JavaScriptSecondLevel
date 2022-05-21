const cartItem = {
	props: ['cart_item', 'img'],
	template: `
<div class="cart-item">
	<div class="product-bio">
		<img :src="img" alt="Product picture">
		<div class="product-desc">
			<p class="product-title">{{cart_item.product_name}}</p>
			<p class="product-quantity">{{cart_item.quantity}}</p>
			<p class="product-single-price">{{cart_item.price}} руб. за шт.</p>
		</div>
	</div>
	<div class="right-block">
		<p class="product-price">{{cart_item.price*cart_item.quantity}}</p>
		<button class="del-btn" @click="$parent.remove(cart_item)">x</button>
	</div>
</div>
`,
};

const cart = {
	components: { 'cart-item': cartItem },
	data() {
		return {
			cartUrl: '/getBasket.json',
			imgCart: 'https://via.placeholder.com/50x100',
			cartShown: false,
			cartItems: [],
		};
	},
	methods: {
		addProduct(product) {
			this.$parent.getJson(`${API}/addToBasket.json`).then(data => {
				if (data.result) {
					let find = this.cartItems.find(
						el => el.id_product === product.id_product
					);
					if (find) {
						find.quantity++;
					} else {
						let prod = Object.assign({ quantity: 1 }, product);
						this.cartItems.push(prod);
					}
				} else {
					console.log('Ошибка при добавлении товара в корзину');
				}
			});
		},
		remove(product) {
			this.$root.getJson(`${API}/deleteFromBasket.json`).then(data => {
				if (data.result) {
					if (product.quantity > 1) {
						product.quantity--;
					} else {
						this.cartItems.splice(this.cartItems.indexOf(product), 1);
					}
				}
			});
		},
	},
	mounted() {
		this.$parent.getJson(`${API + this.cartUrl}`).then(data => {
			for (let el of data.contents) {
				this.cartItems.push(el);
			}
		});
	},
	template: `
    <div>
        <button class="btn-cart" type="button" @click="cartShown = !cartShown">Корзина</button>
        <div class="cart-block" v-show="cartShown">
				<p v-if="!cartItems.length">Корзина пуста!</p>
            <cart-item v-for="product of cartItems"
            :key="product.id_product"
            :img="imgCart"
            :cart_item="product"></cart-item>
        </div>
    </div>
    `,
};
