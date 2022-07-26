<template>
	<v-container class="fill-height justify-center pr-6 pl-6">
		<v-card
			class="justify-center row ma-0 elevation-10 d-flex rounded-xl"
			height="60vh"
			max-width="1100"
			style="overflow: hidden"
		>
			<v-col cols="12" md="4" sm="12" class="pa-0">
				<v-card
					class="text-center d-flex flex-column align-center justify-center"
					height="100%"
					color="#1F9652"
					tile
				>
					<div>
						<v-icon size="70">mdi-clipboard-list</v-icon>
						<v-card-title class="justify-center; white--text"
							>TodoApp</v-card-title
						>
						<v-card-subtitle class="text-center; white--text"
							>Lists & Tasks</v-card-subtitle
						>
					</div>
				</v-card>
			</v-col>

			<v-col
				cols="12"
				md="8"
				sm="12"
				class="d-flex flex-column align-center justify-center pr-4 pl-4"
			>
				<v-card class="flex-column elevation-0" min-width="310">
					<v-card-title class="justify-center pa-0"
						>Đăng nhập</v-card-title
					>
					<form @submit.prevent="handleSubmit" class="pr-4 pl-4">
						<div class="form-group">
							<br />

							<v-text-field
								type="text"
								v-model="username"
								name="username"
								class="form-control"
								placeholder="Tên người dùng..."
								:class="{
									'is-invalid': submitted && !username,
								}"
								required
							></v-text-field>
							<div
								v-show="submitted && !username"
								class="invalid-feedback mb-2"
								style="color: red"
							>
								Tên người dùng không được để trống
							</div>
						</div>
						<div class="form-group">
							<v-btn
								class="mr-4 mt-4; white--text rounded-lg"
								color="#1F9652"
								block
								:disabled="status.loggingIn"
								@click="handleSubmit"
							>
								<a href="http://localhost:8080/login"></a>
								Đăng nhập
							</v-btn>
							<img
								v-show="status.loggingIn"
								src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
							/>
							<br />
						</div>
					</form>
				</v-card>
			</v-col>
		</v-card>
	</v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			username: "",
			submitted: false,
		};
	},
	computed: {
		...mapState("account", ["status"]),
	},
	created() {
		this.logout();
	},
	methods: {
		...mapActions("account", ["login", "logout"]),
		handleSubmit(e) {
			this.submitted = true;
			const { username } = this;
			if (username) {
				this.login({ username });
			}
		},
	},
};
</script>
