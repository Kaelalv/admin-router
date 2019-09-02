import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/promission.js";
import store from "./store/index";
import {
  Button,
  Radio,
  RadioGroup,
  RadioButton,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.component(Button.name, Button);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(RadioButton.name, RadioButton);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItemGroup.name, MenuItemGroup);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
