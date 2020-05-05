<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div class="container">
      <div class="row">
        <div class="col-12 tableCol d-flex justify-content-center">
          <table v-if="outputTasks.lenght!==0" class="table table-bordered">
            <thead>
              <tr>
                <!-- <th scope="col">#</th> -->
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">date</th>
                <th scope="col">Done</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody v-for="todo in outputTasks" :key="todo.id">
              <tr>
                <td>{{todo.id}}</td>
                <td>{{todo.title}}</td>
                <td>{{todo.status}}</td>
                <td>{{todo.date}}</td>
                <td v-if="todo.status==`nDone`">
                  <button class="btn btn-primary table text-center" @click="doTodo(todo.id)">done</button>
                </td>
                <td v-if="todo.status=='done'">
                  <button class="btn btn-primary table text-center" @click="undoTodo(todo.id)">Undo</button>
                </td>
                <td>
                  <button
                    class="btn btn-primary table text-center"
                    @click="deleteTodo(todo.id)"
                  >Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <P class="h1">YOU HAVE NOTHING TO DO</P>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center">
          <button
            type="button"
            class="btn addUser btn-primary w-25 border"
            id="addtaskr"
            data-toggle="modal"
            data-target="#addTaskModal"
          >
            <span></span>
            Add Task
          </button>
        </div>
      </div>

      <!-- model -->

      <div
        class="modal fade"
        id="addTaskModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <h5 class="pb-4 pt-1 mx-auto d-inline-block">Add Task</h5>
              <button
                type="button"
                class="close d-inline-block"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <form class="pb-4 w-75 mx-auto" @submit.prevent="addTask()">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Todo Title"
                    v-model="form.title"
                    required
                  />
                </div>

                <div class="form-group">
                  <input
                    type="date"
                    class="form-control"
                    placeholder="date"
                    v-model="form.date"
                    required
                  />
                </div>

                <button type="submit" class="btn btn-primary w-100 submitForm">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- model -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/myTable.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      myTasks: [],
      outputTasks: [],
      form: {
        title: null,
        date: null
      }
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("tasks"))) {
      this.$store.commit("SET_TASKS", {
        myTasks: JSON.parse(localStorage.getItem("tasks"))
      });
    }

    this.getTasksFromStore();
    this.updatedOutput();
  },

  computed: {
    ...mapGetters(["getTasks", "getLastId"])
  },
  methods: {
    getTasksFromStore() {
      this.myTasks = this.getTasks;
      this.outputTasks = this.myTasks;
    },
    updatedOutput() {
      this.outputTasks = this.myTasks;
    },
    doTodo(id) {
      for (const todo of this.myTasks) {
        if (todo.id == id) {
          todo.status = "done";
        }
      }

      this.$store.commit("SET_TASKS", {
        myTasks: this.myTasks
      });
      this.updatedOutput();
    },
    undoTodo(id) {
      for (const todo of this.myTasks) {
        if (todo.id == id) {
          todo.status = "nDone";
        }
      }

      this.$store.commit("SET_TASKS", {
        myTasks: this.myTasks
      });
      this.updatedOutput();
    },

    addTask() {
      let task = {
        id: this.getLastId,
        title: this.form.title,
        status: "nDone",
        date: this.form.date
      };

      this.myTasks.push(task);

      this.$store.commit("SET_TASKS", {
        myTasks: this.myTasks
      });
      this.updatedOutput();

      // $(function() {
      //   $("#modal").modal("toggle");
      // });
    },
    deleteTodo(id) {
      this.myTasks = this.myTasks.filter(todo => todo.id !== id);

      this.$store.commit("SET_TASKS", {
        myTasks: this.myTasks
      });
      this.updatedOutput();
    }
  }
};
</script>
