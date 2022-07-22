<template>
	<div>
		<Header />
		<v-container class="fill-height fluid justify-center pa-0">
			<v-card class="elevation-0" width="1000px">
				<v-card class="justify-center ma-0 elevation-0 d-flex" height="500" color="white" width="1200">
					<v-card class="ma-0 elevation-0" color="transparent" width="95%">
							<AddTodo :priorities="priorities"/>
						<v-list color="transparent" height="340" class="overflow-auto">
							<TodoList :priorityHeaders="priorityHeaders" :priorities="priorities" />
						</v-list>
					</v-card>
				</v-card>
				<Footer />
			</v-card>
		</v-container>
	</div>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo";
import { mapState, mapActions } from "vuex";

import AddTodo from "./Components/AddTodo.vue";
import TodoList from "./Components/TodoList.vue";
import Header from "./Components/Header.vue";
import Footer from "./Components/Footer.vue";

export default {
	components: { AddTodo, TodoList, Header, Footer },
	data() {
		return {
			toDos: this.$store.state.toDos,
			newTodo: this.$store.state.newToDo,
			editing: this.$store.state.editing,
			deadline: this.$store.state.deadlines,
			priority: this.$store.state.priorityId,
			expanded: [],
			singleExpand: false,
			priorityHeaders: [
				{
					text: "Complete",
					align: "start",
					value: "completed",
				},
				{
					text: "Deadlines",
					value: "deadline",
					align: "",
				},
				{
					text: "Priorities",
					value: "priority_id",
					value: "start",
				},
			],

			priorities: [
				{
					id: 0,
					name: "High",
					color: "red",
					icon: "mdi-flag",
				},
				{
					id: 1,
					name: "Medium",
					color: "orange",
					icon: "mdi-flag",
				},
				{
					id: 2,
					name: "Low",
					color: "#1F9652",
					icon: "mdi-flag",
				},
			],
		};
	},
	computed: {
		...mapState({
			account: (state) => state.account,
			users: (state) => state.users.all,
		}),
		notDone() {
			return this.$store.getters.notDone;
		},
		Done() {
			return this.$store.getters.Done;
		},
		allTasks() {
			return this.$store.getters.allTasks;
		},
		count() {
			return this.$store.getters.count;
		},
	},
	created() {
		this.getAllUsers();
	},
	methods: {
		...mapActions("users", {
			getAllUsers: "getAll",
			deleteUser: "delete",
		}),
		Add() {
			const payload = {
				newToDo: this.newTodo,
				priorityId: this.priority.id || this.priority,
				deadlines: this.deadline,
			};

			this.$store.dispatch("addTask", payload);
			this.newTodo = "";
		},
		Delete(item) {
			this.$store.dispatch("deleteToDo", item);
		},
		edit(item) {
			this.editing = item;
		},
		doneEdit() {
			this.editing = null;
		},
		disablePastDates(val) {
			return val >= new Date().toISOString().substr(0, 10);
		},
	},
	watch: {
		toDos: {
			deep: true,
			handler(newValue) {
				localStorage.setItem(
					LOCAL_STORAGE_KEY,
					JSON.stringify(newValue)
				);
			},
		},
	},
};
</script>