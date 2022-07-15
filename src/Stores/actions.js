export default {
	addTask({ commit }, payload) {
		commit("addTask", payload);
	},
	deleteToDo({ commit }, item) {
		commit("deleteToDo", item);
	},
	doneEdit({ commit }, item) {
		commit("doneEdit", item);
	},
};
