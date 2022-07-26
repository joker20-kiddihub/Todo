<template>
	<div>
		<p v-if="toDos.length <= 0" class="text-center">Không có nhiệm vụ!</p>
		<v-list-item-group>
			<v-layout v-resize="onResize" column class="mt-4">
				<v-data-table
					:headers="headers"
					:items="toDos"
					disable-pagination
					class="elevation-1 body"
					hide-default-footer
					:hide-default-headers="isMobile"
					:class="{ mobile: isMobile }"
				>
					>
					<template v-slot:item="{ item, index }">
						<Todo
							:item="item"
							:priorities="priorities"
							:isMobile="isMobile"
						/>
					</template>
				</v-data-table>
			</v-layout>
		</v-list-item-group>
	</div>
</template>

<script>
import Todo from "./Todo.vue";

export default {
	components: { Todo },

	props: {
		priorities: Array,
		headers: Array,
	},

	data() {
		return {
			toDos: this.$store.state.toDos,
			selected: [],
			search: "",
			isMobile: false,
		};
	},

	methods: {
		onResize() {
			if (window.innerWidth < 376) this.isMobile = true;
			else this.isMobile = false;
		},
		toggleAll() {
			if (this.selected.length) this.selected = [];
			else this.selected = this.desserts.slice();
		},
		changeSort(column) {
			console.log(column);
			if (this.pagination.sortBy === column) {
				this.pagination.descending = !this.pagination.descending;
			} else {
				this.pagination.sortBy = column;
				this.pagination.descending = false;
			}
		},
	},
};
</script>
