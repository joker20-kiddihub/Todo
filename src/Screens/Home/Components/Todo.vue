<template>
	<tr>
		<td style="width: 15%">
			<v-checkbox
				on-icon="mdi-check-circle-outline"
				off-icon="mdi-checkbox-blank-circle-outline"
				type="checkbox"
				v-model="item.completed"
				color="#1f9652"
			>
			</v-checkbox>
		</td>
		<td>
			<div class="d-flex align-center">
				<v-icon
					:color="priorities[item.priority_id].color"
					class="mr-4"
					style="font-size: 18px"
					>mdi-circle</v-icon
				>

				<label
					class="mt-1 black--text font-weight-regular subtitle-1"
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
					hide-details
					@keyup.escape="doneEdit"
					@keyup.enter="doneEdit"
				/>
			</div>
			<div>
				<v-list-item-action style="" class="ma-0">
					<v-dialog
						ref="dialog"
						v-model="modal"
						:return-value.sync="deadline"
						persistent
						width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								style="font-size: 0.8rem"
								v-model="item.deadline"
								readonly
								v-bind="attrs"
								v-on="on"
								prepend-inner-icon="mdi-calendar"
								hide-details
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
							><v-spacer></v-spacer>
							<v-btn text color="#1F9652" @click="modal = false">
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
			</div>
		</td>
		<td style="width: 20px" class="ma-0 pa-0">
			<v-icon @click="edit(item)" size="30" class="mr-2"
				>mdi-pencil-outline</v-icon
			>
			<v-icon @click="Delete(item)" size="30"
				>mdi-trash-can-outline</v-icon
			>
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
