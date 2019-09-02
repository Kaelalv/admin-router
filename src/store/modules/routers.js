const myRouter = {
  state: {
    routers: ""
  },
  mutations: {
    SET_ROUTER: (state, routers) => {
      // error 的时候直接重置
      state.routers = routers;
    }
  }
};

export default myRouter;
