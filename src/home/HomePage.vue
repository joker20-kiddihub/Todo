<template>
  <v-container class="fill-height fluid">
    <v-card width="100%" class="d-flex flex-column align-center elevation-0">
      <h1 class="text-md-center mb-2 font-weight-light">TO DO LIST</h1>
      <h3 class="mb-4">Hi {{ account.user.username }}!</h3>
      <v-card
        class="justify-center ma-0 elevation-20 d-flex"
        height="450"
        color="#D5D778"
        width="80%"
      >
        <v-card width="60%" class="ma-0 elevation-0" color="transparent">
          <v-item-group class="mt-6">
            <v-row class="mt-8 align-start">
              <v-text-field
                outlined
                clearable
                type="text"
                solo
                placeholder="Click Enter to add..."
                @keyup.enter="Add"
                v-model.trim="newTodo"
              >
              </v-text-field>
              <v-btn
                height="56"
                x-large
                color="blue"
                class="white--text"
                @click="Add"
              >
                ADD TASK
              </v-btn>
            </v-row>
          </v-item-group>
          <div class="m-5 text-center">
            <b> You have {{ allTasks }} task </b>
            <span style="background: orange" class="rounded-5">
              remaining task : {{ notDone }}
            </span>
            <span style="background: green">done task : {{ Done }}</span>
          </div>
          <v-list color="transparent">
            <div class="d-flex align-center">
              <table class="mt-3 listTodo">
                <p v-if="toDos.length <= 0">Empty list</p>
                <tr
                  v-for="item in toDos"
                  :key="item.id"
                  :class="{ completed: item.completed }"
                >
                  <td>
                    <v-checkbox
                      class="mark"
                      type="checkbox"
                      v-model="item.completed"
                    />
                    <span class="checkmark"> </span>
                  </td>
                  <td>
                    <div class="ok">
                      <label @click="edit(item)" style="margin-top: 10px">
                        {{ item.title }}
                      </label>
                      <input
                        v-if="editting == item && item.completed != true"
                        v-model="item.title"
                        :class="{}"
                        @keyup.escape="doneEdit"
                        @keyup.enter="doneEdit"
                      />
                    </div>
                  </td>
                  <td width="20%">
                    <a
                      @click="Delete(item)"
                      title="Xóa"
                      class="delete badge badge-danger"
                    >
                      x
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          </v-list>
        </v-card>
      </v-card>
      <p class="text-md-center mt-4 font-weight-bold">
        Click in task to edit, Enter to submit
      </p>
      <router-link to="/login">Logout</router-link>
    </v-card>
  </v-container>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      toDos: this.$store.state.toDos,
      newTodo: this.$store.state.newToDo,
      editting: this.$store.state.editting,
    };
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
<style scoped>
.completed label {
  text-decoration: line-through;
}

label {
  cursor: pointer;
}

table {
  width: 70%;
}

table,
td {
  border: 1px black;
  text-align: left;
}

table td .delete {
  display: none;
}

table tr:hover .delete {
  display: block;
}

.mark {
  width: 50px;
  height: auto;
}

.ok {
  position: relative;
}

.ok input {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
}
</style>
