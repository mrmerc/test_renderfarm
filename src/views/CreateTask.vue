<template>
	<div class="create-task-container">
		<Notifications :errors="validation_errors" :success="created"/>
		<div class="grid-wrapper">
			<input v-model="task_title" type="text" name="title" id="title" placeholder="Заголовок" maxlength="32">
			<input @change="setDeadline" type="datetime-local" name="deadline" id="deadline" placeholder="Дедлайн" :min="getCurrentDateTime">
			<textarea v-model="task_description" name="description" id="description" placeholder="Описание" maxlength="2048"></textarea>
			<div class="tags-wrapper">
				<ul @click.prevent="removeTag" v-if="task_tags.length">
					<li v-for="tag in task_tags" :key="tag.id">{{ tag }}</li>
				</ul>
				<input @change="pushTag" type="text" name="tags" id="tags" placeholder="Теги">
			</div>
			<input @click.prevent="createTask" type="button" value="Добавить задачу" id="create">
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Notifications from '../components/Notifications.vue'

export default {
	data() {
		return {
			task_title: '',
			task_description: '',
			task_deadline: 0,
			task_tags: [],
			validation_errors: [],
			created: false,
		}
	},

	computed: {
		getCurrentDateTime() {
			const date = new Date();
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
			return `${ year }-${ month }-${ day }T${ hour }:${ minute }`;
		}
	},

	methods: {

		...mapActions([
			'saveTask',
		]),
		
		setDeadline(event) {
			this.task_deadline = Date.parse(event.target.value);
		},
		
		pushTag(event) {
			const tags = event.target.value;
			if (tags.length) {
				tags.split(' ').forEach(tag => {
					tag.replace(/\s/g, '');
					if (tag.length) {
						this.task_tags.push(tag)
					}
				});

				this.task_tags = this.task_tags.filter((v, i, a) => a.indexOf(v) === i);

				event.target.value = '';
			}
		},

		removeTag(event) {
			const value = event.target.innerHTML;
			this.task_tags = this.task_tags.filter(tag => tag !== value);
		},

		createTask() {
			const task = {
				id: this.$store.state.tasks.length + 1,
				title: this.task_title,
				description: this.task_description,
				deadline: this.task_deadline,
				tags: this.task_tags,
				status: 0, /* 0 - В работе, 1 - Завершено */
			}

			if (this.validateFields()) {
				this.saveTask(task);
				this.created = true;
			}
		},

		validateFields() {
			this.validation_errors = [];
			const deadLine = document.getElementById('deadline').value;

			if (this.task_title.length < 1) {
				this.validation_errors.push('Заполните заголовок');
			}

			if (this.task_deadline === 0 || !deadLine.length) {
				this.validation_errors.push('Заполните дедлайн');
			}

			if (this.task_description.length < 1) {
				this.validation_errors.push('Заполните описание');
			}

			if ( this.validation_errors.length ) {
				return false;
			} else {
				return true;
			}
		},
	},

	components: { Notifications },
}
</script>

<style lang="scss" scoped>
	$inputBg: rgba(184, 208, 255, 0.45);
	$buttonBg: rgb(21, 24, 29);
	$buttonShadow: rgba(21, 24, 29, 0.5);

	.create-task-container {
		max-width: 800px;
		margin: 0 auto;

		.grid-wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr;	
			grid-template-rows: auto;
			grid-template-areas: 
				"title deadline"
				"description description"
				"tags tags"
				"create create";
			grid-column-gap: 24px;
			grid-row-gap: 16px;
			padding: 12px;

			#title, #deadline, #description, #create, .tags-wrapper {
				background: transparent;
				border: 1px solid $inputBg;
				border-radius: 2px;
				color: rgb(32, 30, 30);
				outline: none;

				&::placeholder {
					color: rgb(73, 79, 91);
				}
			}

			#title {
				grid-area: title;
				height: 32px;
				padding-left: 8px;
			}

			#deadline {
				grid-area: deadline;
				height: 32px;
				padding-left: 8px;
			}

			#description {
				grid-area: description;
				height: 300px;
				resize: none;
				padding: 8px;
			}

			.tags-wrapper {
				grid-area: tags;
				overflow: auto;
				display: flex;
				align-items: center;

				ul {
					list-style: none; 
					padding: 0;
					margin: 0;
					display: flex;

					li {
						margin: 0 4px;
						padding: 8px;
						background: #000;
						font-size: 14px;
						color: #FFF;
						border-radius: 5px;
					}
				}

				#tags {
					padding-left: 8px;
					height: 32px;
					width: 100%;
					background: transparent;
					border: none;
					border-radius: 2px;
					color: rgb(32, 30, 30);
					outline: none;

					&::placeholder {
						color: rgb(73, 79, 91);
					}
				}
			}

			#create {
				grid-area: create;
				height: 48px;
				background: $buttonBg;
				box-shadow: 6px 0 12px $buttonShadow;
				color: rgb(252, 252, 252);
			}

			@media screen and (max-width: 420px) {
				grid-template-areas: 
					"title title"
					"deadline deadline"
					"description description"
					"tags tags"
					"create create";
			}
		}
	}
</style>