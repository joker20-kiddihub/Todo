<template>
	<div class="text-center">
		<b> Bạn có {{ allTasks }} nhiệm vụ </b>
		<br />
		<span
			style="background: orange; border-radius: 8px"
			class="pl-4 pr-4 mr-4"
		>
			Đang chờ : {{ notDone }}
		</span>

		<span
			style="background: #1f9625; border-radius: 8px"
			class="white--text pl-4 pr-4"
		>
			Hoàn thành : {{ Done }}
		</span>

		<br />
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
