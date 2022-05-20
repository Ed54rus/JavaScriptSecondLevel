<template>
	<div class="post">
		<div>
			<div><strong>Название:</strong>{{ post.body }}</div>
			<div><strong>Название:</strong>{{ post.title }}</div>
		</div>
		<div class="post__buttons">
			<my-button @click="$emit('remove', post)">Удалить</my-button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		post: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped>
.post {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	border: 2px solid teal;
	margin-top: 15px;
}
</style>
