<template>
	<div class="white--text" style="background: #1f9652">
		<div class="d-flex align-center justify-space-between">
			<div></div>
			<h1 class="mb-2 font-weight-light ml-14">TO DO LIST</h1>
			<h3 class="mr-8">Hi {{ account.user.username }}!</h3>
		</div>
	</div>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo";

import { mapState } from "vuex";

export default {
	computed: {
		...mapState({
			account: (state) => state.account,
		}),
	},
};
</script>
