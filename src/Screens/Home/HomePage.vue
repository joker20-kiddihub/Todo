<template>
	<v-container class="fill-height fluid justify-center">
		<v-card class="elevation-0" width="1000px">
			<Header />
			<v-card
				class="justify-center ma-0 elevation-20 d-flex"
				height="500"
				color="green"
				width="1200"
			>
				<v-card
					class="ma-0 elevation-0"
					color="transparent"
					width="80%"
				>
					<v-item-group class="mt-6">
						<AddTodo :priorities="priorities" />
					</v-item-group>

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
					text: "Todo",
					value: "name",
				},
				{
					text: "Deadlines",
					value: "deadline",
				},
				{
					text: "Priorities",
					value: "priority_id",
				},
				{
					text: "Delete",
				},
			],

			priorities: [
				{
					id: 0,
					name: "High",
					backgroundColor: "red",
				},
				{
					id: 1,
					name: "Medium",
					backgroundColor: "orange",
				},
				{
					id: 2,
					name: "Low",
					backgroundColor: "yellow",
				},
			],
		};
	},
};
</script>
