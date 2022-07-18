<template>
	<v-container class="fill-height fluid justify-center">
		<v-card
			class="d-flex flex-column align-center elevation-0"
			width="1000px"
		>
			<h1 class="text-md-center mb-2 font-weight-light">TO DO LIST</h1>
			<h3 class="mb-4">Hi {{ account.user.username }}!</h3>
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
						<v-row class="mt-8 align-start ma-0" width="60%">
							<v-text-field
								outlined
								clearable
								type="text"
								solo
								placeholder="Content of task..."
								@keyup.enter="Add"
								v-model.trim="newTodo"
							>
							</v-text-field>
							<v-select
								v-model="priority"
								:items="priorities"
								item-text="name"
								item-value="id"
								height="56"
								style="width: 10px"
								solo
								:background-color="
									priorities[priority].backgroundColor
								"
							></v-select>
							<v-btn
								height="56"
								x-large
								color="blue"
								class="white--text"
								@click="Add"
							>
								ADD TASK
							</v-btn>
						</v-row>
					</v-item-group>
					<div class="m-5 text-center mb-4">
						<b class="white--text">
							You have {{ allTasks }} task
						</b>
						<span style="background: orange; border-radius: 8px">
							remaining task : {{ notDone }}
						</span>

						<span
							style="background: green; border-radius: 8px"
							class="white--text"
							>done task : {{ Done }}
						</span>
					</div>
					<v-list
						color="transparent"
						height="340"
						class="overflow-auto"
					>
						<p v-if="toDos.length <= 0">Empty list</p>
						<v-list-item-group>
							<v-data-table
								:headers="priorityHeaders"
								:items="toDos"
								:items-per-page="5"
								class="elevation-1 green"
							>
								<template v-slot:item="{ item }">
									<tr>
										<td style="width: 110px">
											<v-checkbox
												class="mark"
												type="checkbox"
												v-model="item.completed"
											/>
										</td>
										<td>
											<label
												@click="edit(item)"
												class="font-weight-medium mt-1 black--text"
												:class="{
													'text-decoration-line-through':
														item.completed,
												}"
											>
												{{
													(editing == item) &
													(item.completed == false)
														? ""
														: item.name
												}}
											</label>
											<v-text-field
												v-if="
													editing == item &&
													item.completed != true
												"
												v-model="item.name"
												:class="{}"
												@keyup.escape="doneEdit"
												@keyup.enter="doneEdit"
											/>
										</td>
										<td>
											<v-list-item-action
												style="
													padding: 10px 10px 0 0;
													width: 100px;
												"
											>
												<v-menu
													:close-on-content-click="false"
          											:nudge-right="40"
          											transition="scale-transition"
          											offset-y
          											min-width="auto"
												>
													<template
														v-slot:activator="{
															on,
															attrs,
														}"
													>
														<v-text-field
															:value="
																item.deadline
															"
															readonly
															v-bind="attrs"
															v-on="on"
														></v-text-field>
													</template>
													<v-date-picker
														color="green"
														v-model="item.deadline"
														:allowed-dates="
															disablePastDates
														"
													></v-date-picker>
												</v-menu>
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
														.backgroundColor
												"
											></v-select>
										</td>
										<td style="width: 90px">
											<a
												@click="Delete(item)"
												class="delete badge badge-danger"
											>
												<v-icon size="30"
													>mdi-trash-can-outline</v-icon
												>
											</a>
										</td>
									</tr>
								</template>
							</v-data-table>
						</v-list-item-group>
					</v-list>
				</v-card>
			</v-card>
			<p class="text-md-center mt-4 font-weight-bold">
				Click in task to edit, Enter to submit
			</p>
			<router-link to="/login">Logout</router-link>
		</v-card>
	</v-container>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo";
import { mapState, mapActions } from "vuex";

export default {
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
