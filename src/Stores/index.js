import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getter from "./getter";
import { alert } from "./alert.module";
import { account } from "./account.module";
import { users } from "./users.module";

Vue.use(Vuex);
const LOCAL_STORAGE_KEY = "todo";
// let firstTodo = [{"completed": false, "title":account.state.user.id}]
// localStorage.setItem("todo", JSON.stringify(firstTodo))
export const store = new Vuex.Store({
	modules: {
		alert,
		account,
		users,
	},
	state: {
		toDos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
		newTodo: null,
		editting: null,
		deadlines: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
		priorityId: 1,
	},
	mutations: mutations,
	getters: getter,
	actions: actions,
});
