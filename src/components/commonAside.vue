<template>
  <el-menu
    background-color="#545c64"
    text-color="white"
    active-text-color="#ffd04b"
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    value-key="path"
  >
    <h3>通用后台管理系统</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
      :value="item"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subItem, subIndex) in item.children"
        :key="subItem.path"
      >
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      isCollapse: false,
      menu: [],
      // menu: [
      //   {
      //     path: "/home",
      //     name: "Home",
      //     label: "首页",
      //     icon: "s-home",
      //     url: "home.vue",
      //   },
      //   {
      //     path: "/mall",
      //     name: "Mall",
      //     label: "商品管理",
      //     icon: "video-play",
      //     url: "mallPage.vue",
      //   },
      //   {
      //     path: "/user",
      //     name: "User",
      //     label: "用户管理",
      //     icon: "user",
      //     url: "userPage.vue",
      //   },
      //   {
      //     path: "/other",
      //     name: "Other",
      //     label: "其他",
      //     icon: "location",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "page1",
      //         label: "页面1",
      //         icon: "setting",
      //         url: "other/pageOne.vue",
      //       },
      //       {
      //         path: "/page2",
      //         name: "page2",
      //         label: "页面2",
      //         icon: "setting",
      //         url: "other/pageTwo.vue",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        path: item.path,
      });
      store.commit("selectMenu", item);
    },
    toggleCol() {
      this.isCollapse = !this.isCollapse;
    },
  },

  mounted() {
    this.$bus.$on("toggleCol", this.toggleCol);
  },
  beforeDestroy() {
    this.$bus.$off("toggleCol");
  },

  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    asyncMenu() {
      return this.$store.state.tab.menu;
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;
}

h3 {
  color: #fff;
  text-align: center;
  line-height: 48px;
}
</style>
