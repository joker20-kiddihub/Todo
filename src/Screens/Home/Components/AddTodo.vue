<template>
		<v-card elevation="0" class="rounded-lg mb-4" >
			<v-card class="mt-6" color="body"   elevation="0">
				<div class="d-flex align-center " >
					<v-text-field
						type="text"
						placeholder="Nhập ở đây..."
						@keyup.enter="Add"
						v-model.trim="newTodo"
						outlined
						dense
						class=" rounded-lg pa-2"
						hide-details
						background-color="white"
					>
						<v-icon slot="prepend-inner" color="green">
							mdi-keyboard-outline
						</v-icon>
					</v-text-field>
					
				</div>
				<div class="d-flex justify-space-between align-center pa-2 mt-4">
					  <v-item-group class="d-flex align-center">
						<div style="width: 140px" class="d-flex align-center ">
						<v-dialog
							ref="dialog"
							v-model="modal"
							:return-value.sync="deadline"
							persistent
							width="290px"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									style=" font-size: 0.8em;"
									v-model="deadline"
									readonly
									v-bind="attrs"
									v-on="on"
									placeholder="Thời hạn"
									hide-details
									outlined
									class="rounded-lg mr-4"
									dense
									background-color="white"
								>
									<v-icon slot="prepend-inner" color="green" >
										mdi-calendar
									</v-icon>
								</v-text-field>
							</template>
							<v-date-picker
								color="green"
								scrollable
								year-icon="mdi-calendar-blank"
								prev-icon="mdi-skip-previous"
								next-icon="mdi-skip-next"
								v-model="deadline"
								:allowed-dates="disablePastDates"
								><v-spacer></v-spacer>
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
					</div>
					<div
						style="width: 120px"
						class="d-flex align-center justify-center"
					>
						<v-select
							:items="priorities"
							v-model="priority"
							item-text="name"
							item-value="id"
							label="Ưu tiên"
							style="font-size: 0.8em"
							hide-details
							outlined
							class="rounded-lg "
							dense
							background-color="white"
						>
							<template slot="append">
								<v-icon color="green">mdi-arrow-down-drop-circle-outline</v-icon>
							</template>

							<template slot="item" slot-scope="data">
								<v-icon :color="data.item.color">
									mdi-rectangle
								</v-icon>

								<span class="ml-4">
									{{ data.item.name }}
								</span>
							</template>
						</v-select>
					</div>
					</v-item-group>
					<div>
						<v-btn
						@click="Add"
						class="white--text"
						color="green rounded-lg"
					>
						Thêm
					</v-btn>
					</div>
				</div>
			</v-card>
		</v-card>
	</v-container>
</template>

<script>



export default {
	props: {
		priorities: Array,
		item: Object,
	},
	data() {
		return {
			newTodo: this.$store.state.newToDo,
			priority: this.$store.state.priorityId,
			deadline: this.$store.state.deadlines,
			date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
				.toISOString()
				.substr(0, 10),

			modal: false,
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
			this.deadline = null;
		},
		disablePastDates(val) {
			return val >= new Date().toISOString().substr(0, 10);
		},
	},
};
</script>
