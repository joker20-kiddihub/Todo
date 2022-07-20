<template>
	<div>
		<b> You have {{ allTasks }} task </b>
		<span style="background: orange; border-radius: 8px">
			remaining task : {{ notDone }}
		</span>

		<span style="background: #1F9652; border-radius: 8px" class="white--text"
			>done task : {{ Done }}
		</span>
	</div>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo";
import { mapActions } from "vuex";

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
