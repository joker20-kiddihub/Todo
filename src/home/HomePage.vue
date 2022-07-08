<template>
  <v-container class="fill-height fluid">
    <v-card width="100%" class="d-flex flex-column align-center elevation-0">
      <h1>Hi {{ account.user.username }}!</h1>
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
                class="form-control"
                v-model.trim="newTodo"
                @keyup.enter="Add"
                placeholder="Click Enter to add..."
              >
              </v-text-field>
              <v-btn
                height="50"
                x-large
                color="green"
                class="white--text"
                @click="Add"
                style="color: green"
              >
                ADD TASK
              </v-btn>
            </v-row>
          </v-item-group>
          <div class="m-5 text-center">
            <b> You have {{ allTasks }} task </b>
            <span class="badge badge-warning">
              remaining task : {{ notDone }}
            </span>
            <span class="badge badge-success"> done task : {{ Done }} </span>
          </div>
          <v-list color="main">
            <div>
              <table class="mt-3 listTodo">
                <p v-if="toDos.length <= 0">Empty list</p>
                <tr
                  v-for="item in toDos"
                  :key="item.id"
                  :class="{ completed: item.completed }"
                >
                  <td>
                    <input
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
      <p class="text-md-center mt-12 font-weight-bold">
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
