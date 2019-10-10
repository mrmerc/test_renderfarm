<template>
	<div class="edit-task-container">
		<Notifications :errors="validation_errors" :success="updated"/>
		<div class="grid-wrapper">
			<p id="title">{{ task.title }}</p>
			<input :value="setTaskDateTime(task_deadline)" @change="setDeadline" type="datetime-local" name="deadline" id="deadline" placeholder="Дедлайн" :min="getCurrentDateTime">
			<textarea v-model="task_description" name="description" id="description" placeholder="Описание" maxlength="2048"></textarea>
			<p v-if="task['tags']" id="tags">{{ task.tags.join(' ') }}</p>
			<div class="radio-wrapper-1">
				<label for="inprogress_flag">В работе</label>
				<input v-model="task_status" value="0" type="radio" id="done_flag">
			</div>
			<div class="radio-wrapper-2">
				<label for="done_flag">Завершено</label>
				<input v-model="task_status" value="1" type="radio" id="inprogress_flag">
			</div>
			<input @click.prevent="updateTask" type="button" value="Изменить задачу" id="create">
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Notifications from '../components/Notifications.vue'

export default {

	data() {
		return {
			task: {},
			task_description: '',
			task_deadline: 0,
			task_status: -1,
			validation_errors: [],
			updated: false,
		}
	},

	mounted() {
		const tasks = this.$store.state.tasks;
		const id = parseInt(this.$route.params.id);
		tasks.forEach(task => {
			if (task.id === id)
				this.task = task;
		});
		
		this.task_description = this.task.description;
		this.task_deadline = this.task.deadline;
		this.task_status = this.task.status;
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
			'replaceTask',
		]),

		setDeadline(event) {
			this.task_deadline = Date.parse(event.target.value);
		},

		setTaskDateTime(timestamp) {
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
			return `${ year }-${ month }-${ day }T${ hour }:${ minute }`;
		},

		updateTask() {
			if (this.validateFields()) {
				this.task.description = this.task_description;
				this.task.deadline = this.task_deadline;
				this.task.status = parseInt(this.task_status);
				this.replaceTask(this.task);
				this.updated = true;
			}
		},

		validateFields() {
			this.validation_errors = [];
			const deadLine = document.getElementById('deadline').value;

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
		}
	},

	components: { Notifications },
}
</script>

<style lang="scss" scoped>
	$inputBg: rgba(184, 208, 255, 0.45);
	$buttonBg: rgb(21, 24, 29);
	$buttonShadow: rgba(21, 24, 29, 0.5);

	.edit-task-container {
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
				"radio-1 radio-2"
				"create create";
			grid-column-gap: 24px;
			grid-row-gap: 16px;
			padding: 12px;

			#deadline, #description, #create {
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
				justify-self: left;
				align-self: center;
				font-weight: bold;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
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

			#tags {
				grid-area: tags;
				justify-self: left;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.radio-wrapper-1 {
				grid-area: radio-1;
			}

			.radio-wrapper-2 {
				grid-area: radio-2;
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
					"radio-1 radio-2"
					"create create";
			}
		}
	}
</style>