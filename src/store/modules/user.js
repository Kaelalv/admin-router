import { getToken } from "@/utils/auth";
const user = {
  state: {
    token: getToken() ? getToken() : "",
    avatar: "",
    name: ""
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      // error 的时候直接重置
      state.token = token;
      state.avatar = "";
      state.name = "";
    }
  }
};

export default user;
