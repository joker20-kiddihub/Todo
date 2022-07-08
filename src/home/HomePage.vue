<template>
  <v-container class="fill-height fluid">
    <v-card width="100%" class="d-flex flex-column align-center elevation-0">
      <h1 class="text-md-center mb-12 font-weight-light">TO DO LIST</h1>
      <v-card
        class="justify-center ma-0 elevation-20 d-flex"
        height="450"
        color="main"
        width="80%"
      >
        <v-card width="60%" class="ma-0 elevation-0" color="transparent">
          <v-item-group class="mt-6">
            <v-row class="mt-8 align-start">
              <v-text-field
                outlined
                clearable
                placeholder="Todo..."
                type="text"
                solo
              >
              </v-text-field>
              <v-btn height="56" x-large color="blue" class="white--text">
                ADD TASK
              </v-btn>
            </v-row>
          </v-item-group>
          <v-list color="main">
            <div class="d-flex align-center" style="height: 30px">
              <v-checkbox class="pt-0"></v-checkbox>

              <v-list-item->Notifications</v-list-item->
            </div>
            <div class="d-flex align-center" style="height: 30px">
              <v-checkbox class="pt-0"></v-checkbox>

              <v-list-item->Notifications</v-list-item->
            </div>
            <div class="d-flex align-center" style="height: 30px">
              <v-checkbox class="pt-0"></v-checkbox>

              <v-list-item->Notifications</v-list-item->
            </div>
          </v-list>
          <p class="text-md-center font-weight-bold mt-auto" bottom>
            You have 3 task
            <span style="background: yellow" class="rounded-5"
              >remaining task: 2
            </span>
            <span style="background: blue"> done task: 1 </span>
          </p>
        </v-card>
      </v-card>
      <p class="text-md-center mt-12 font-weight-bold">
        Click in task to edit, Enter to submit
      </p>
    </v-card>
  </v-container>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo";
import Datepicker from "vuejs-datepicker";
import { vi } from "vuejs-datepicker/dist/locale";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      toDos: this.$store.state.toDos,
      firstTodo: this.$store.state.account.user.id,
      newTodo: this.$store.state.newToDo,
      editting: this.$store.state.editting,
      vi: vi,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Datepicker,
  },
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users.all,
    }),
    notDone() {
      return this.$store.getters.notDone;
    },
    Done() {
      return this.$store.getters.Done;
    },
    allTasks() {
      return this.$store.getters.allTasks;
    },
    count() {
      return this.$store.getters.count;
    },
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete",
    }),
    Add() {
      this.$store.dispatch("addTask", this.newTodo);
    },
    Delete(item) {
      this.$store.dispatch("deleteToDo", item);
    },
    edit(item) {
      this.editting = item;
    },
    doneEdit() {
      this.editting = null;
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  watch: {
    toDos: {
      deep: true,
      handler(newValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
      },
    },
  },
};
</script>
