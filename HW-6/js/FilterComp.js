const filter_el = {
	data() {
		return {
			userSearch: '',
		};
	},
	template: `
<form class="search-form" action="#" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
	<input class="search-field" type="text" v-model='userSearch'>
	<button class="btn-search" type='submit'>
		<i class="fa fa-search"></i>
	</button>
</form>
`,
};
