<template>
	<v-row class="mt-8 align-start ma-0" width="60%">
		<v-text-field
			outlined
			clearable
			type="text"
			solo
			placeholder="Type here..."
			@keyup.enter="Add"
			v-model.trim="newTodo"
			style="width: 40%"
		>
		</v-text-field>
		<v-select
			v-model="priority"
			:items="priorities"
			item-text="name"
			item-value="id"
			height="56"
			style="width: 10%"
			solo
			:background-color="priorities[priority].backgroundColor"
		></v-select>
		<v-btn
			height="56"
			x-large
			color="#1F9652"
			class="white--text"
			@click="Add"
		>
			ADD TASK
		</v-btn>
	</v-row>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo";
import { mapState, mapActions } from "vuex";

export default {
	props: {
		priorities: Array,
	},
	data() {
		return {
			newTodo: this.$store.state.newToDo,
			priority: this.$store.state.priorityId,
			deadline: this.$store.state.deadlines,
		};
	},

	methods: {
		Add() {
			const payload = {
				newToDo: this.newTodo,
				priorityId: this.priority.id || this.priority,
				deadlines: this.deadline,
			};

			this.$store.dispatch("addTask", payload);
			this.newTodo = "";
		},
	},
};
</script>
