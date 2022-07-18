import { account } from "./account.module";

export default {
	addTask(state, payload) {
		if (payload.newToDo.length) {
			state.toDos.push({
				id: Math.floor(Math.random() * 100),
				title: payload.newToDo,
				completed: false,
				user_id: account.state.user.id,
				create_at: Date().toString(),
				priority_id: payload.priorityId,
				deadline: payload.deadlines
			});
		}
		state.newTodo = null;
	},
	deleteToDo(state, item) {
		const index = state.toDos.indexOf(item);
		state.toDos.splice(index, 1);
	},
	doneEdit(state) {
		state.editing = null;
	},
};