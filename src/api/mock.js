import Mock from "mockjs";
import homeApi from "./mockServerData/home";
import useApi from "../api/mockServerData/user";
import permissionApi from "./mockServerData/permission";

Mock.mock("/home/getData", homeApi.getStatisticalData);
Mock.mock(/user\/add/, "post", useApi.createUser);
Mock.mock(/user\/edit/, "post", useApi.updateUser);

Mock.mock(/user\/getUser/, "get", useApi.getUserList);
Mock.mock(/user\/del/, "get", useApi.deleteUser);

Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);
