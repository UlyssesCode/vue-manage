import Cookie from "js-cookie";

export default {
  state: {
    isCollapse: false,
    tabsList: [
      {
        path: "/",
        name: "Home",
        label: "Home",
        icon: "home",
      },
    ],
    currentMenu: null,
    menu: [],
  },
  mutations: {
    CollapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, val) {
      if (val.name != "home") {
        state.currentMenu = val;
        const result = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        if (result === -1) {
          state.tabsList.push(val);
        } else {
          state.currentMenu = null;
        }
      }
    },
    closeTag(state, val) {
      const tmp = state.tabsList.findIndex((item) => item.name === val);
      state.tabsList.splice(tmp, 1);
    },
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    addMenu(state, router) {
      if (!Cookie.get("menu")) {
        return;
      }
      const menu = JSON.parse(Cookie.get("menu"));
      console.log("Menu", menu);
      state.menu = menu;
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
      });
      //路由动态添加
      menuArray.forEach((item) => {
        router.addRoute("mainPage", item);
      });
    },
  },
};
