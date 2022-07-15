<template>
	<v-container class="fill-height fluid justify-center">
		<v-card class="d-flex flex-column align-center elevation-0">
			<h1 class="text-md-center mb-2 font-weight-light">TO DO LIST</h1>
			<h3 class="mb-4">Hi {{ account.user.username }}!</h3>
			<v-card
				class="justify-center ma-0 elevation-20 d-flex"
				height="500"
				color="green"
				width="1000"
			>
				<v-card
					width="60%"
					class="ma-0 elevation-0"
					color="transparent"
				>
					<v-item-group class="mt-6">
						<v-row class="mt-8 align-start">
							<v-text-field
								outlined
								clearable
								type="text"
								solo
								placeholder="Click Enter to add..."
								@keyup.enter="Add"
								v-model.trim="newTodo"
							>
							</v-text-field>
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
						<b class="white--text"> You have {{ allTasks }} task </b>
						<span style="background: orange; border-radius: 8px">
							remaining task : {{ notDone }}
						</span>

						<span style="background: green; border-radius: 8px" class="white--text"
							>done task : {{ Done }}
						</span
						>
					</div>
					<v-list
						color="transparent"
						height="340"
						class="overflow-auto"
						dense
					>
						<p v-if="toDos.length <= 0">Empty list</p>
						<v-list-item-group>
							<v-list-item
								v-for="item in toDos"
								:key="item.id"
								class="d-flex align-center"
							>
								<v-list-item-action class="mr-4 mt-4">
									<v-checkbox
										class="mark"
										type="checkbox"
										v-model="item.completed"
									/>
								</v-list-item-action>
								<v-list-item-content class="pa-0">
									<label
										width="380"
										@click="edit(item)"
										class="font-weight-medium mt-2; white--text"
										:class="{
											'text-decoration-line-through':
												item.completed,
										}"
									>
										{{
											(editting == item) &
											(item.completed == false)
												? ""
												: item.title
										}}
									</label>
									<v-text-field
										v-if="
											editting == item &&
											item.completed != true
										"
										v-model="item.title"
										:class="{}"
										@keyup.escape="doneEdit"
										@keyup.enter="doneEdit"
									/>
								</v-list-item-content>
								<v-list-item-action>
									<a
										@click="Delete(item)"
										title="Xóa"
										class="delete badge badge-danger"
									>
										<v-icon size="30"
											>mdi-trash-can-outline</v-icon
										>
									</a>
								</v-list-item-action>
								<v-list-item-action>
                  					<v-menu>
                    					<template v-slot:activator="{ on, attrs }">
                      						<v-text-field
												:value="date"
												class="white--text" 
												label="Deadlines" 
												prepend-icon="mdi-calendar" 
												readonly
                        						v-bind="attrs" 
												v-on="on"
											></v-text-field>
                    					</template>
                    					<v-date-picker color="green" v-model="date" :allowed-dates="disablePastDates"></v-date-picker>
                  					</v-menu>
                				</v-list-item-action>
							</v-list-item>
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
			editting: this.$store.state.editting,
			date: this.$store.state.deadlines,
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
			this.$store.dispatch("addTask", this.newTodo);
			this.newTodo = "";
		},
		Delete(item) {
			this.$store.dispatch("deleteToDo", item);
		},
		edit(item) {
			this.editting = item;
		},
		doneEdit() {
			this.editting = null;
		},
		disablePastDates(val) {
       	return val >= new Date().toISOString().substr(0, 10)
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
