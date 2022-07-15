import { account } from "./account.module";

export default {
	addTask(state, newToDo, deadlines) {
		if (newToDo.length) {
			state.toDos.push({
				id: Math.floor(Math.random() * 100),
				title: newToDo,
				completed: false,
				deadlines: deadlines,
				user_id: account.state.user.id,
				create_at: Date().toString(),
			});
		}
		state.newTodo = null;
	},
	deleteToDo(state, item) {
		const index = state.toDos.indexOf(item);
		state.toDos.splice(index, 1);
	},
	doneEdit(state) {
		state.editting = null;
	},
};
