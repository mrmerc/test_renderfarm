import Vue from 'vue'
import Router from 'vue-router'
import CreateTask from './views/CreateTask.vue'
import TaskList from './views/TaskList.vue'
import EditTask from './views/EditTask.vue'

Vue.use(Router)

export default new Router({
  routes: [
	{
		path: '/create',
		name: 'create',
		component: CreateTask
	},
	{
		path: '/',
		name: 'list',
		component: TaskList
	},
	{
		path: '/edit/:id',
		name: 'edit',
		component: EditTask
	},
  ]
})
