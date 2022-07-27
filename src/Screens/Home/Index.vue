<template>
	<div>
		<Header />
		<v-container class="fluid justify-center pa-2 d-flex align-center">
			<v-card class="elevation-0" width="1000px">
				<div class="mt-2 d-flex justify-end">
					<router-link
						to="/login"
						style="color: #1f9652; text-decoration: none"
					>
						<v-icon color="green darken-2"> mdi-logout </v-icon>
						Đăng xuất
					</router-link>
				</div>
				<v-card
					class="justify-center ma-0 elevation-0 d-flex"
					height="100%"
					color="white"
					width="1200"
				>
					<v-card
						class="ma-0 elevation-0"
						color="transparent"
						width="100%"
					>
						<AddTodo :priorities="priorities" />
						<CountTodo />
						<v-list
							color="transparent"
							height="50vh"
							class="overflow-auto pa-0 mt-4"
						>
							<TodoList
								:headers="headers"
								:priorities="priorities"
							/>
						</v-list>
					</v-card>
				</v-card>
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
import CountTodo from "./Components/CountTodo.vue";

import colors from "../../Config/colors";

export default {
	components: { AddTodo, TodoList, Header, CountTodo },
	data() {
		return {
			toDos: this.$store.state.toDos,
			newTodo: this.$store.state.newToDo,
			editing: this.$store.state.editing,
			deadline: this.$store.state.deadlines,
			priority: this.$store.state.priorityId,
			expanded: [],
			singleExpand: false,

			headers: [
				{
					text: "Ưu tiên",
					value: "priority_id",
					align: "center",
				},

				{
					text: "Nội dung",
					value: "name",
					align: "start",
				},
				{
					text: "Hoàn thành",
					value: "completed",
					align: "center",
				},
				{
					text: "Thời hạn",
					value: "deadline",
					align: "center",
				},
				{
					text: "Hành động",
					sortable: false,
					align: "center",
				},
			],

			priorities: [
				{
					id: 0,
					name: "Cao",
					color: colors.red,
					icon: "mdi-flag",
				},
				{
					id: 1,
					name: "T.bình",
					color: colors.yellow,
					icon: "mdi-flag",
				},
				{
					id: 2,
					name: "Thấp",
					color: colors.green,
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
