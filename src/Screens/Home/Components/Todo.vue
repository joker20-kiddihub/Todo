<template>
	<tr
		style="border-bottom: thin solid rgba(0, 0, 0, 0.12) !important"
		class="pt-4 pb-4"
	>
		<td :class="isMobile ? 'is-mobile' : 'priority'">
			<div :class="!isMobile ? 'mobile-header' : ''">Ưu tiên</div>
			<div class="d-flex align-center">
				<div
					style="height: 40px; width: 9px"
					:style="{
						backgroundColor: priorities[item.priority_id].color,
					}"
					class="rounded-xl ml-2"
				></div>
				<h4
					:style="{ color: priorities[item.priority_id].color }"
					class="pl-2"
				>
					{{ priorities[item.priority_id].name }}
				</h4>
			</div>
		</td>

		<td :class="isMobile ? 'is-mobile' : ''" style="width: 35%">
			<div :class="!isMobile ? 'mobile-header' : ''">Nội dung</div>
			<div style="max-width: 270px">
				<h2
					style="line-height: 1.3rem"
					:style="isMobile ? { 'margin-left': '40px' } : ''"
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
				</h2>
				<v-text-field
					v-if="editing == item && item.completed != true"
					v-model="item.name"
					hide-details
					@keyup.escape="doneEdit"
					@keyup.enter="doneEdit"
				/>
			</div>
		</td>

		<td :class="isMobile ? 'is-mobile' : ''" class="mr-0 pr-0">
			<div :class="!isMobile ? 'mobile-header' : ''">Hoàn thành</div>
			<div class="d-flex justify-center ml-2" style="width: 160px">
				<v-select
					:items="complete"
					v-model="item.completed"
					item-text="name"
					item-value="id"
					style="font-size: 0.9rem"
					hide-details
					class="rounded-lg"
					dense
					flat
					solo
					background-color="body"
					append-icon=""
				>
					<template v-slot:selection="{ item }">
						<span
							class="d-flex justify-center white--text rounded-lg align-center font-weight-medium"
							style="width: 120px; height: 20px"
							:style="{
								backgroundColor: item.color,
							}"
						>
							{{ item.name }}
						</span>
						<v-icon>mdi-menu-down</v-icon>
					</template>
				</v-select>
			</div>
		</td>

		<td
			:class="isMobile ? 'is-mobile' : ''"
			style="text-align: center; vertical-align: middle; height: 60px"
		>
			<div :class="!isMobile ? 'mobile-header' : ''">Thời hạn</div>
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
							style="width: 105px"
							placeholder="Thời hạn"
							v-model="item.deadline"
							readonly
							v-bind="attrs"
							v-on="on"
							hide-details
							outlined
							class="rounded-lg mr-4"
							dense
						></v-text-field>
					</template>

					<v-date-picker
						color="green"
						scrollable
						year-icon="mdi-calendar-blank"
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
		</td>

		<td :class="isMobile ? 'is-mobile' : ''">
			<div :class="!isMobile ? 'mobile-header' : ''">Hành động</div>
			<div class="d-flex align-center justify-center">
				<v-icon
					@click="edit(item)"
					size="22"
					class="white--text pa-1 rounded-lg ma-1a"
					style="background-color: orange"
					>mdi-pencil-outline
				</v-icon>
				<v-icon
					@click="Delete(item)"
					size="22"
					class="white--text pa-1 rounded-lg ma-1"
					style="background-color: red"
					>mdi-trash-can-outline
				</v-icon>
			</div>
		</td>
	</tr>
</template>

<script>
import colors from "../../../Config/colors";

const LOCAL_STORAGE_KEY = "todo";

export default {
	props: {
		item: Object,
		priorities: Array,
		isMobile: Boolean,
	},
	data() {
		return {
			toDos: this.$store.state.toDos,
			editing: this.$store.state.editing,
			deadline: this.$store.state.deadlines,
			modal: false,

			complete: [
				{
					id: 0,
					name: "Đang thực hiện",
					color: colors.orange,
				},
				{
					id: 1,
					name: "Hoàn thành",
					color: colors.green,
				},
			],
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
<style scoped>
.mobile-header {
	display: none;
}
.is-mobile {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: none !important;
	width: unset !important;
}
.priority {
	width: 15%;
}
</style>
