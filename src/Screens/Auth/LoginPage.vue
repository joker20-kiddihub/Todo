<template>
	<v-container class="fill-height justify-center">
		<v-card
			class="justify-center row ma-0 elevation-10 d-flex"
			height="570"
			max-width="1200"
		>
			<v-col cols="6" md="4" sm="4" class="pa-0">
				<v-card
					class="text-center d-flex flex-column align-center justify-center"
					height="100%"
					color="green"
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
				sm="8"
				class="d-flex flex-column align-center justify-center pa-0"
			>
				<v-card class="flex-column elevation-0" width="400">
					<v-card-title class="justify-center">Login</v-card-title>
					<form width="400" @submit.prevent="handleSubmit">
						<div class="form-group">
							<label for="username">Username</label>
							<br />
							<v-text-field
								type="text"
								v-model="username"
								name="username"
								class="form-control"
								placeholder="Example..."
								:class="{
									'is-invalid': submitted && !username,
								}"
							></v-text-field>
							<div
								v-show="submitted && !username"
								class="invalid-feedback"
							>
								Username is required
							</div>
						</div>
						<div class="form-group">
							<v-btn
								class="mr-4 mt-4; white--text"
								color="green"
								block
								:disabled="status.loggingIn"
								@click="handleSubmit"
							>
								<a href="http://localhost:8080/login"></a>
								submit
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
