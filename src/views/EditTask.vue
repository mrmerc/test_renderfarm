<template>
	<div class="edit-task-container">
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
</template>

<script>
import { mapActions } from 'vuex'

export default {

	data() {
		return {
			task: {},
			task_description: '',
			task_deadline: 0,
			task_status: -1,
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
			this.task.description = this.task_description;
			this.task.deadline = this.task_deadline;
			this.task.status = this.task_status;

			this.replaceTask(this.task);
		},
	},
}
</script>

<style lang="scss" scoped>
	.edit-task-container {

		max-width: 800px;
		margin: 0 auto;
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

		#title {
			grid-area: title;
			justify-self: left;
			align-self: center;
			font-weight: bold;
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
		}

		.radio-wrapper-1 {
			grid-area: radio-1;
		}

		.radio-wrapper-2 {
			grid-area: radio-2;
		}

		#create {
			grid-area: create;
			height: 32px;
		}
	}
</style>