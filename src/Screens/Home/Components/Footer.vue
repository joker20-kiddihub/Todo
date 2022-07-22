<template>
	<div class="justify-space-around text-center">
		<b> YOU HAVE {{ allTasks }} TASK </b>
		<br/>
		<span style="background: orange; border-radius: 8px">
			Remaining task : {{ notDone }}
		</span>

		<span
			style="background: #1f9625; border-radius: 8px"
			class="white--text">
			Done task : {{ Done }}
		</span>
		<br>
		<router-link to="/login" class="text-center">Logout</router-link>
	</div>
</template>
<script>

export default {
	computed: {
		notDone() {
			return this.$store.getters.notDone;
		},
		Done() {
			return this.$store.getters.Done;
		},
		allTasks() {
			return this.$store.getters.allTasks;
		},
	},
};
</script>
