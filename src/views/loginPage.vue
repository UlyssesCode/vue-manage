<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login-title">System Login</h3>
    <el-form-item
      label="UserName"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        auto-complete="off"
        placeholder="UserName is 'Adimin'"
      ></el-input
    ></el-form-item>
    <el-form-item label="PassWord" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        auto-complete="off"
        placeholder="PassWord is 'Admin'"
      ></el-input
    ></el-form-item>
    <el-form-item class="login-submit"
      ><el-button type="primary" @click="login" class="login-submit"
        >Login</el-button
      ></el-form-item
    >
  </el-form>
</template>

<script>
// import Mock from "mockjs";
import { getMenu } from "../api/data";

export default {
  name: "loginPage",
  data() {
    return {
      form: {},
      rules: {
        username: [
          {
            required: true,
            message: "Pls Type Your ID",
            trigger: "blur",
          },
          {
            min: 3,
            message: "Too short(more than 3)",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Pls Type Your passWord",
            trigger: "blur",
          },
          {
            min: 5,
            message: "Too short(more than 5)",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then(({ data: res }) => {
        console.log("res", res);
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          console.log(this.$router.getRoutes());
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
      //   const token = "Mock.Random.guid()";
      //   this.$store.commit("setToken", token);
      //   this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  border: 1px solid #eaeaea;
  background-color: white;
  border-color: 0 0 25px #cacac6;
}

.login-title {
  margin: 0 auto 40px;
  text-align: center;
  color: #505458;
}

.login-submit {
  margin: 10px auto 0;
}
</style>
