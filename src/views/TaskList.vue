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
					<router-link :to="{ name: 'edit', params: { id: task.id } }">{{ task.title }}</router-link>
					<p>{{ task.status ? 'Завершено' : 'В работе' }}</p>
				</div>
				<p>{{ task.description }}</p>
				<div :class="`tag-deadline-wrapper ${ task.tags.length ? '' : 'notags' }`">
					<p v-if="task.tags.length">Теги: {{ task.tags.join(' ') }}</p>
					<p>Дедлайн: {{ getTaskDateTime(task.deadline) }}</p>
				</div>
			</li>
		</ul>
		<p v-else>Заданий нет</p>
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
				background: transparent;
				border: 1px solid rgba(184, 208, 255, 0.45);
				border-radius: 2px;
				color: rgb(32, 30, 30);
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
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;

						@media screen and (min-width: 360px) {
							max-width: 50%;
						}

						@media screen and (max-width: 748px) {
							max-width: 70%;
						}
					}
				}

				p {
					padding: 0 16px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text-align: left;
				}

				.tag-deadline-wrapper {
					display: flex;
					justify-content: space-between;
					align-items: center;

					p {
						padding: 16px;
					}

					@media screen and (max-width: 420px) {
						font-size: 12px;
					}
				}

				.notags {
					justify-content: flex-end;
				}
			}
		}
	}
</style>