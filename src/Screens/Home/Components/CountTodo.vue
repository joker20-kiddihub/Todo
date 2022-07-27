<template>
	<div
		class="text-center d-flex align-center justify-center"
		style="flex-wrap: wrap"
	>
		<div class="mr-2 ml-2">Bạn có {{ allTasks }} nhiệm vụ</div>
		<div class="d-flex">
			<div
				style="background: #ff8401; border-radius: 8px"
				class="pl-4 pr-4 mr-2 ml-2 white--text"
			>
				Đang thực hiện: {{ notDone }}
			</div>

			<div
				style="background: #1f9625; border-radius: 8px"
				class="pl-4 pr-4 mr-2 ml-2 white--text"
			>
				Hoàn thành: {{ Done }}
			</div>
		</div>
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
