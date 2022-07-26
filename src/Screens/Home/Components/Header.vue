<template>
	<div class="white--text">
		<div class="text-center pt-2 pb-2" style="background-color: #1f9652">
			<h2 class="font-weight-medium">TO DO LIST</h2>
			<span class="font-weight-medium"
				>Chào mừng {{ account.user.username }}!</span
			>
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
