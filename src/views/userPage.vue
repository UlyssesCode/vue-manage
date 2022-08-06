<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? 'AddUser' : 'UpdateUser'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">Cancel</el-button>
        <el-button @click="confirm()" type="primary">Confirm</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser()">Add</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
        ><el-button
          type="primary"
          @keyup.enter.native="getList(searchForm.keyword)"
          @click="getList(searchForm.keyword)"
          >Search</el-button
        ></common-form
      >
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import commonForm from "../components/commonForm.vue";
import commonTable from "../components/commonTable";
import { getUser } from "../api/data";

export default {
  components: { commonForm, commonTable },
  name: "userPage",
  data() {
    return {
      operateType: "add",
      isShow: false,

      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "生日",
          width: 120,
        },
        {
          prop: "addr",
          label: "地址",
          width: 280,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          console.log(res);
          this.getList();
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          this.isShow = false;
          console.log("Done confirm", res);
          this.getList();
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateForm = { name: "", addr: "", age: "", birth: "", sex: "" };
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        console.log("res", res);
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "Femal" : "Man";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("This operate will delete forever", "Tips", {
        confirmButtonText: "Sure",
        cancelButtonText: "No",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({ type: "success", message: "Del Successfully" });
          });
        this.getList();
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
