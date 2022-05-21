const API =
	'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue({
	el: '#app',
	data: {
		catalogUrl: '/catalogData.json',
		products: [],
		imgCatalog: 'https://via.placeholder.com/200x150',
		cartShown: false,
		filtered: [],
		dataError: false,
	},
	components: { cart, products, filter_el, data_error },
	methods: {
		getJson(url) {
			return fetch(url)
				.then(result => result.json())
				.catch(error => {
					console.log(error, 'Ошибка подключения к серверу');
					this.dataError = true;
				});
		},
	},
});
