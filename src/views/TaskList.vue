<template>
	<div class="task-list-container">
		<div class="filter-container">
			<label for="filter_options">Фильтр</label>
			<select @input="filterBy" name="filter_options" id="">
				<option value="3">Все</option>
				<option value="0">В работе</option>
				<option value="1">Завершено</option>
				<option value="2">Просроченные</option>
			</select>
		</div>
		<ul v-if="tasks.length">
			<li v-for="task in tasks" :key="task.id">
				<div class="title-wrapper">
					<router-link :to="{ name: 'task', params: { id: task.id } }" href="">{{ task.title }}</router-link>
					<p>{{ task.status ? 'Завершено' : 'В работе' }}</p>
				</div>
				<p>{{ task.description }}</p>
				<div class="tag-deadline-wrapper">
					<p>Теги: {{ task.tags.join(' ') }}</p>
					<p>Дедлайн: {{ getTaskDateTime(task.deadline) }}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tasks: [],
		}
	},

	mounted() {
		this.tasks = this.$store.state.tasks;
		console.log(this.tasks);
	},

	methods: {
		filterBy(event) {
			const option = parseInt(event.target.value);
			this.tasks = this.$store.state.tasks;
			switch(option) {
				case 0:
					this.tasks = this.tasks.filter(task => task.status === 0);
					break;
				case 1:
					this.tasks = this.tasks.filter(task => task.status === 1);
					break;
				case 2:
					const date = Date.now();
					this.tasks = this.tasks.filter(task => date >= task.deadline);
					break;
			}
		},

		getTaskDateTime(timestamp) {
			const date = new Date(timestamp);
			const year = date.getFullYear();
			const month = (date.getMonth() + 1 < 10) 
				? `0${date.getMonth() + 1}`
				: date.getMonth() + 1;
			const day = (date.getDate() < 10) 
				? `0${date.getDate()}`
				: date.getDate();
			const hour = (date.getHours() < 10) 
				? `0${date.getHours()}`
				: date.getHours();
			const minute = (date.getMinutes() < 10) 
				? `0${date.getMinutes()}`
				: date.getMinutes();
			return `${ day }.${ month }.${ year } ${ hour }:${ minute }`;
		},
	},
}
</script>

<style lang="scss" scoped>
	.task-list-container {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		.filter-container {
			align-self: flex-start;
			margin: 16px 0;

			label {
				margin-right: 8px;
			}
		}

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			width: 100%;

			li {
				background: #eee;
				border-radius: 5px;
				height: 120px;
				margin-bottom: 24px;

				.title-wrapper {
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					a {
						text-decoration: none;
						color: #000;
						font-weight: bold;
						margin: 0;
						padding: 16px;
					}
				}

				p {
					padding: 0 16px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.tag-deadline-wrapper {
					display: flex;
					justify-content: space-between;
					align-items: center;

					p {
						padding: 16px;
					}
				}
			}
		}
	}
</style>