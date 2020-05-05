import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myTasks: []
  },
  mutations: {

    SET_TASKS(state, payload) {
      state.myTasks = payload.myTasks
      localStorage.setItem("tasks", JSON.stringify(state.myTasks))
    },

  },
  actions: {},
  modules: {},
  getters: {
    // get all tasks
    getTasks: state => {
      return state.myTasks
    },

    // return last id
    getLastId(state) {
      if (state.myTasks.length > 0) {
        return state.myTasks[state.myTasks.length - 1].id + 1;
      }
      return 1;
    },
  }
});