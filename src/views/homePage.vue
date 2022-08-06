<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">SuperAdmin</p>
          </div>
        </div>
        <div class="login-info">
          <p>LastLoginTime:<span>2022-7-19</span></p>
          <p>LastLoginAddre:<span>CongQing</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <div class="num">¥{{ item.value }}</div>
            <div class="txt">{{ item.name }}</div>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <echart :chartData="chartData.order" style="height: 280px" />
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <echart :chartData="chartData.user" style="height: 280px" />
        </el-card>
        <el-card style="height: 260px">
          <echart
            :chartData="chartData.video"
            :isAxisChar="false"
            style="height: 280px"
          />
          ></el-card
        >
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api/data";
import echart from "../components/echart.vue";

export default {
  name: "homePage",
  components: {
    echart,
  },
  data() {
    return {
      userImg: require("../assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "Course",
        todayBuy: "DailyBuy",
        monthBuy: "MonthlyBuy",
        totalBuy: "TotallyBuy",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      chartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        this.chartData.order.xData = xData;
        this.chartData.order.series = series;

        this.chartData.user.xData = data.userData.map((item) => item.date);
        this.chartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];
        this.chartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
    });
  },
};
</script>

<style></style>
