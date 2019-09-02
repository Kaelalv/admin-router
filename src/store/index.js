import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import myRouter from "./modules/routers";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    myRouter
  },
  getters
});

export default store;
