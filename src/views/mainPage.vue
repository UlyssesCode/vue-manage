<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header><common-header></common-header></el-header>
      <commonTag></commonTag>
      <el-main> <router-view> </router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import commonAside from "../components/commonAside.vue";
import commonHeader from "../components/commonHeader.vue";
import commonTag from "../components/commonTag.vue";

export default {
  name: "mainPage",
  components: { commonAside, commonHeader, commonTag },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: gray;
}
.el-main {
  padding-top: 0;
}
</style>
