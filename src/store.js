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
	},
	actions: {
		saveTask({ commit }, task) {
			commit('SAVE_TASK', task);
		},
	},
	plugins: [createPersistedState()],
})
