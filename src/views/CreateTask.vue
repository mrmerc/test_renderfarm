<template>
	<div class="create-task-container">
		<input v-model="task_title" type="text" name="title" id="title" placeholder="Заголовок" maxlength="64">
		<input @change="setDeadline" type="datetime-local" name="deadline" id="deadline" placeholder="Дедлайн" :min="getCurrentDateTime">
		<textarea v-model="task_description" name="description" id="description" placeholder="Описание" maxlength="2048"></textarea>
		<div class="tags-wrapper">
			<ul @click.prevent="removeTag" v-if="task_tags.length > 0">
				<li v-for="tag in task_tags" :key="tag.id">{{ tag }}</li>
			</ul>
			<input @change="pushTag" type="text" name="tags" id="tags" placeholder="Тэги">
		</div>
		<input type="button" value="Добавить задачу" id="create">
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	data() {
		return {
			task_title: '',
			task_description: '',
			task_deadline: 0,
			task_tags: [],
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
				title: this.task_title,
				description: this.task_description,
				deadline: this.task_deadline,
				tags: this.task_tags,
			}

			this.saveTask(task);
		}
	}
}
</script>

<style lang="scss" scoped>
	.create-task-container {
		max-width: 1200px;
		margin: 0 auto;
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
			}
		}

		#create {
			grid-area: create;
			height: 32px;
		}
	}
</style>