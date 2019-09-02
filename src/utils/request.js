import axios from "axios";
import store from "../store/index";
import { getToken } from "./auth";
import Qs from "qs";
const service = axios.create({
  baseURL: process.env.BASE_API,
  transformRequest: [
    function(data) {
      data = Qs.stringify(data);
      return data;
    }
  ],
  headers: { "content-type": "application/x-www-form-urlencode" }
});
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["token"] = getToken();
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.data.code !== 0) {
      alert("error");
    } else {
      return response.data.data;
    }
  },
  error => {
    alert("error-response" + error);
  }
);

export default service;
