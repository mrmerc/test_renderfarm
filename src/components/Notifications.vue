<template>
	<div class="notifications-container">
		<div v-for="error in errors" :key="error.id" class="notification error">
			<p>{{ error }}</p>
		</div>
		<div v-if="success" class="notification success">
			<p>Успешно</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		errors: {
			type: Array,
		},
		success: {
			type: Boolean,
		}
	}
}
</script>

<style lang="scss" scoped>
	.notifications-container {
		max-width: 800px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 12px;
		margin-top: 16px;

		.notification {
			width: 100%;
			height: 36px;
			margin-bottom: 8px;
			border-radius: 5px;
			color: #FFF;
			display: flex;
			align-items: center;
			justify-content: center;

			&.error {
				background: rgb(189, 66, 50);
			}

			&.success {
				background: rgb(121, 204, 69);
			}
		}
	}
</style>