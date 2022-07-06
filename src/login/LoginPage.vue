<template>
  <v-container class="fill-height fluid">
    <v-card class="justify-center row ma-0 elevation-10" height="570">
      <v-col cols="6" md="4" sm="4" class="pa-0">
        <v-card
          class="text-center d-flex flex-column align-center justify-center"
          height="100%"
          color="green"
          tile
        >
          <div>
            <v-icon size="70">mdi-clipboard-list</v-icon>
            <v-card-title class="justify-center">TodoApp</v-card-title>
            <v-card-subtitle class="text-center">Lists & Tasks</v-card-subtitle>
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

          <form width="400">
            <h3 class="mt-4">Username</h3>
            <v-text-field
              v-model="name"
              :counter="20"
              label="Example..."
              class="mt-4"
            ></v-text-field>

            <v-btn class="mr-4 mt-4" @click="submit" color="green" block>
              submit
            </v-btn>
          </form>
        </v-card>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

import colors from "../Configs/colors";

console.log({ ...colors });

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
    // eslint-disable-next-line no-unused-vars
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
