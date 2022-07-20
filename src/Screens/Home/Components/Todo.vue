<template>
	<tr>
		<td style="width: 110px">
			<v-checkbox class="mark" type="checkbox" v-model="item.completed" />
		</td>
		<td>
			<label
				@click="edit(item)"
				class="font-weight-medium mt-1 black--text"
				:class="{
					'text-decoration-line-through': item.completed,
				}"
			>
				{{
					(editing == item) & (item.completed == false)
						? ""
						: item.name
				}}
			</label>
			<v-text-field
				v-if="editing == item && item.completed != true"
				v-model="item.name"
				:class="{}"
				@keyup.escape="doneEdit"
				@keyup.enter="doneEdit"
			/>
		</td>
		<td>
			<v-list-item-action style="padding: 10px 10px 0 0; width: 100px">
				<v-dialog
					ref="dialog"
          			v-model="modal"
          			:return-value.sync="deadline"
          			persistent
          			width="290px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="item.deadline"
							readonly
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker
						color="green"
						scrollable
						year-icon="mdi-calendar-blank"
      					prev-icon="mdi-skip-previous"
      					next-icon="mdi-skip-next"
						v-model="item.deadline"
						:allowed-dates="disablePastDates"
					>
					<v-spacer></v-spacer>
            		<v-btn
              		text
              		color="#1F9652"
              		@click="modal = false"
            		>
              			Cancel
            		</v-btn>
            		<v-btn
              		text
              		color="#1F9652"
              		@click="$refs.dialog.save(deadline)"
            		>
              			OK
            		</v-btn>
					</v-date-picker>
				</v-dialog>
			</v-list-item-action>
		</td>
		<td>
			<v-select
				class="pt-8"
				v-model="item.priority_id"
				:items="priorities"
				item-text="name"
				item-value="id"
				solo
				style="width: 120px"
				:background-color="
					priorities[item.priority_id]
						? priorities[item.priority_id].backgroundColor
						: 0
				"
			></v-select>
		</td>
		<td style="width: 90px">
			<a @click="Delete(item)" class="delete badge badge-danger">
				<v-icon size="30">mdi-trash-can-outline</v-icon>
			</a>
		</td>
	</tr>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo";

export default {
	props: {
		item: Object,
		priorities: Array,
	},
	data() {
		return {
			toDos: this.$store.state.toDos,
			editing: this.$store.state.editing,
			deadline: this.$store.state.deadlines,
			modal: false,
		};
	},

	methods: {
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
