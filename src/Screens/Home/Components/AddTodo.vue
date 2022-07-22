<template>
	<v-card>
		<v-item-group class="mt-6">
			<div class="d-flex">
				<v-text-field
					clearable
					type="text"
					placeholder="Type here..."
					@keyup.enter="Add"
					v-model.trim="newTodo"
					flat
					solo
					class="ma-0 pa-0"
					hide-details
				>
				</v-text-field>
				<div
					style="width: 20%"
					class="d-flex align-center justify-center"
				>
					<v-select
						:items="priorities"
						v-model="priority"
						:item-text="() => ``"
						item-value="id"
						class="ma-0 pa-0"
						hide-details
					>
						<template v-slot:prepend-inner>
							<v-icon :color="priorities[priority].color"
								>mdi-flag</v-icon
							>
						</template>
						<template slot="item" slot-scope="data">
							<v-icon :color="data.item.color">
								{{ data.item.icon }}
							</v-icon>
							<span class="ml-12">
								{{ data.item.name }}
							</span>
						</template>
					</v-select>
				</div>
			</div>
			<div
				class="d-flex justify-space-between pl-4 pr-8"
				style="height: 40px"
			>
				<div>
					<v-menu
						:close-on-content-click="false"
						:nudge-right="40"
						transition="scale-transition"
						offset-y
						min-width="auto"
						style="width: 20px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								icon
								color="#1f9652"
								v-bind="attrs"
								v-on="on"
							>
								<v-icon>mdi-calendar</v-icon>
							</v-btn>
						</template>
						<v-date-picker
							color="#1f9652"
							v-model="deadline"
							:allowed-dates="disablePastDates"
						></v-date-picker>
					</v-menu>
				</div>
				<button @click="Add" class="mr-0">
					<v-icon color="#1f9652"> mdi-plus-circle-outline </v-icon>
				</button>
			</div>
		</v-item-group>
	</v-card>
</template>

<script>

export default {
	props: {
		priorities: Array,
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
