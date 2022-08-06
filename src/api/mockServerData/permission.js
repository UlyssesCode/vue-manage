import Mock from "mockjs";

export default {
  getMenu: (config) => {
    console.log(config);
    const { username, password } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === "admin" && password === "admin") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "HomePage",
              icon: "s-home",
              url: "homePage.vue",
            },
            {
              path: "/mall",
              name: "mall",
              label: "SellManage",
              icon: "video-play",
              url: "mallPage.vue",
            },
            {
              path: "/user",
              name: "user",
              label: "UserManage",
              icon: "user",
              url: "userPage.vue",
            },
            {
              label: "Other",
              icon: "location",
              name: "Other",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "页面1",
                  icon: "setting",
                  url: "Other/pageOne.vue",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "页面2",
                  icon: "setting",
                  url: "Other/pageTwo.vue",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "xiaoxiao" && password === "xiaoxiao") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "HomePage",
              icon: "s-home",
              url: "homePage.vue",
            },
            {
              path: "/mall",
              name: "mall",
              label: "SellManage",
              icon: "video-play",
              url: "mallPage.vue",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      };
    }
  },
};
