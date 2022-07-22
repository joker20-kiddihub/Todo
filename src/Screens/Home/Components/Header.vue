<template>
	<div class="white--text" style="background: #1f9652">
		<div class="text-center" style="background-color: #1F9652;">
			<h1 class="mb-2 font-weight-light">TO DO LIST</h1>
			<h3 class="mb-4">Hi {{ account.user.username }}!</h3>
		</div>
	</div>
</template>

<script>

import { mapState } from "vuex";

export default {
	computed: {
		...mapState({
			account: (state) => state.account,
		}),
	},
};
</script>
