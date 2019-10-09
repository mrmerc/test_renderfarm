import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tasks: [],
	},
	getters: {

	},
	mutations: {
		SAVE_TASK(state, task) {
			state.tasks.push(task);
		},

		REPLACE_TASK(state, task) {
			state.tasks.forEach(value => {
				if (value.id === task.id)
					value = task;
			});
		},
	},
	actions: {
		saveTask({ commit }, task) {
			commit('SAVE_TASK', task);
		},

		replaceTask({ commit }, task) {
			commit('REPLACE_TASK', task);
		},
	},
	plugins: [createPersistedState()],
})
