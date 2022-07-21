<template>
	<div>
		<Header />
		<v-container class="fill-height fluid justify-center pa-0">
			<v-card class="elevation-0" width="1000px">
				<v-card
					class="justify-center ma-0 elevation-0 d-flex"
					height="500"
					color="white"
					width="1200"
				>
					<v-card
						class="ma-0 elevation-0"
						color="transparent"
						width="95%"
					>
						<AddTodo :priorities="priorities" />

						<div class="m-5 text-center mb-4">
							<CountTodo />
						</div>
						<v-list
							color="transparent"
							height="340"
							class="overflow-auto"
						>
							<TodoList
								:priorityHeaders="priorityHeaders"
								:priorities="priorities"
							/>
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
import CountTodo from "./Components/CountTodo.vue";
import Header from "./Components/Header.vue";
import Footer from "./Components/Footer.vue";

export default {
	components: { AddTodo, TodoList, CountTodo, Header, Footer },

	data() {
		return {
			expanded: [],
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
					color: "yellow",
					icon: "mdi-flag",
				},
				{
					id: 3,
					name: "Low",
					color: "gray",
					icon: "mdi-flag",
				},
			],
		};
	},
};
</script>
