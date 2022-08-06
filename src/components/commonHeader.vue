<template>
  <header>
    <div class="l-content">
      <el-button
        @click="toggleCol()"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tag"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img :src="userImg" alt="avater" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Personal</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "commonHeader",
  data() {
    return { userImg: require("../assets/images/user.png") };
  },
  methods: {
    toggleCol() {
      this.$bus.$emit("toggleCol", 666);
    },
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState({
      tag: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
