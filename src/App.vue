<template>
  <v-app>
    <div v-if="alert.message" :class="`alert ${alert.type}`">
      {{ alert.message }}
    </div>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
    }),
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.clearAlert();
    },
  },
};
</script>
