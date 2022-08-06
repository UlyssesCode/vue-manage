<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name != 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handlerClose(tag, index)"
      >{{ tag.name }}</el-tag
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "commonTag",
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations({
      close: "closeTag",
    }),
    changeMenu(item) {
      this.$router.push(item.name);
    },
    handlerClose(tag, index) {
      const length = this.tags.length - 1;
      this.close(tag.name);
      console.log(tag.name, index);

      if (tag.name !== this.$route.name) {
        console.log("current");
        return;
      }
      if (length === index) {
        this.$router.push({ name: this.tags[index - 1].name });
        console.log("right", index - 1);
      } else {
        this.$router.push({ name: this.tags[index].name });
        console.log("left", index);
      }
    },
  },
};
</script>

<style>
.tabs {
  padding: 10px;
}
.el-tag {
  margin-right: 15px;
  cursor: pointer;
}
</style>
