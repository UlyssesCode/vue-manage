import Vue from "vue";
import App from "./App.vue";
import {
  Button,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Radio,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Row,
  Card,
  Col,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  DatePicker,
  Option,
  Dialog,
  Message,
  Pagination,
  MessageBox,
} from "element-ui";

import router from "./router";
import "./assets/less/index.less";
import http from "axios";
import "./api/mock";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Radio);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Row);
Vue.use(Card);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Option);
Vue.use(Select);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Pagination);

Vue.prototype.$http = http;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  store.commit("getToken");
  const token = store.state.user.token;
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (token && to.name == "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
