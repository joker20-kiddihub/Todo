<template>
	<div>
		<p v-if="toDos.length <= 0">All clear</p>
		<v-list-item-group>
			<v-data-table
				:headers="priorityHeaders"
				:items="toDos"
				:items-per-page="15"
			>
				<template v-slot:item="{ item }">
					<Todo :item="item" :priorities="priorities" />
				</template>
			</v-data-table>
		</v-list-item-group>
	</div>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo";
import Todo from "./Todo.vue";

export default {
	components: { Todo },

	props: {
		priorities: Array,
		priorityHeaders: Array,
	},
	data() {
		return {
			toDos: this.$store.state.toDos,
		};
	},
};
</script>
