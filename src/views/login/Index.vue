<template>
  <div>
    登录
    <input type="text" v-model="account" placeholder="账号" />
    <input type="password" v-model="passsword" placeholder="密码" />
    <button type="button" @click="login">登录</button>
    <button type="button" @click="clear">清除</button>
  </div>
</template>

<script>
import service from "../../utils/request";
import { setToken, removeToken } from "@/utils/auth";
export default {
  name: "login",
  data() {
    return {
      account: "",
      passsword: "",
      response: ""
    };
  },
  created() {},
  methods: {
    login() {
      removeToken();
      service({
        url: "/api/login",
        method: "post",
        data: {
          phonenumber: this.account,
          password: this.passsword
        }
      }).then(res => {
        this.response = res;
        setToken("admin");
        this.$store.commit("SET_TOKEN", "admin");
        this.$router.push("/index/index");
      });
    },
    clear() {
      // removeMyRouter();
    }
  }
};
</script>

<style></style>
