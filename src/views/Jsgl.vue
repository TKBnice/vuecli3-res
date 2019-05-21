<template>
  <div id="Jsgl">
    角色管理
    <p class="title">
      <!---->
      <button class="el-button el-button--success el-button--mini" type="button">
        <!---->
        <!---->
        <span>仅看有效</span>
      </button>
      <button
        class="el-button el-button--primary el-button--mini"
        type="button"
        @click="dialogFormVisible2 = true"
      >
        <!---->
        <i class="el-icon-plus"></i>
        <!---->
      </button>
      <button class="el-button el-button--danger el-button--mini" type="button">
        <!---->
        <i class="el-icon-delete"></i>
        <!---->
      </button>
    </p>
    <el-tabs :tab-position="tabPosition" v-model="rolesId" @tab-click="change_menu">
      <el-tab-pane
        :name="item.id"
        :label="item.rolesName"
        v-for="(item,key) in menu"
        
        :id1="item.id"
      >
        <div class="infosBox" >
          <p class="title">
            角色信息
            <button
              class="el-button el-button--primary el-button--mini"
              type="button"
              :roleid="item.id"
              :rolename="item.rolesName"
              :details="item.details"
              @click="update_roles(item.id,item.rolesName,item.details)"
            >
              <!---->
              <i class="el-icon-edit"></i>
              <!---->
            </button>
          </p>
          <div class="data">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                角色名称：
                <span class="dataNum">{{item.rolesName}}</span>
              </el-col>
              <el-col :span="6">
                角色ID：
                <span class="dataNum">{{item.id}}</span>
              </el-col>
              <el-col :span="6">
                角色描述：
                <span class="dataNum">{{item.details}}</span>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <el-switch
                  v-model="item.enable"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="是否启用"
                  @change="change_enable(item.id,item.enable)"
                ></el-switch>
              </el-col>
              <el-col :span="6">
                创建时间：
                <span class="dataNum">{{item.createTime.substr(0,10)}}</span>
              </el-col>
              <el-col :span="6">
                修改时间：
                <span class="dataNum">{{item.modifyTime.substr(0,10)}}</span>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <el-switch
                  v-model="item.deleted"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="是否删除"
                  @change="change_deleted(item.id,item.deleted)"
                ></el-switch>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="更新角色" :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-input v-model="form1.id" auto-complete="off" style="display:none"></el-input>
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form1.rolesName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form1.details" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="roles_update">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible2">
      <el-form :model="form1">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form1.rolesName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form1.details" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="add_roles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";
export default {
  name: "Jsgl",
  data() {
    return {
      tabPosition: "left",
      menu: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      form1: {
        rolesName: "",
        details: ""
      },
      formLabelWidth: "100px",
      enable: "",
      rolesId: ""
    };
  },
  beforeMount() {
    this.getList();
  },
  created() {
    var _this = this;
  },
  methods: {
    getList() {
      // this.$axios.post()

      var _this = this;
      axios
        .post("/api/api/private/sys/list/roles", {
          pageSize: 10,
          pageIndex: 1,
          all: true
        })
        .then(function(data) {
          console.log(data.data.data.result);
          _this.menu = data.data.data.result; //所有用户信息？
          _this.rolesId = _this.menu[0].id;
          console.log('_this.rolesId',_this.rolesId);
          
          _this.get_permission(_this.rolesId)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    get_permission(rolesId) {
      // var _this = this;//这里不需要
      axios
        .post("/api/api/private/sys/all/roles/permission", {
          rolesId
        })
        .then(function(data) {
          console.log(data); //这里呢

          // _this.menu = data.data.data.result;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    add_roles() {
      console.log(this.form1.rolesName, this.form1.details);
      var _this = this;
      axios
        .post("/api/api/private/sys/save/roles", {
          rolesName: this.form1.rolesName,
          details: this.form1.details
        })
        .then(function(data) {
          _this.dialogFormVisible2 = false;
          _this.$message("更新成功");
          _this.getList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update_roles(id, rolesName, details) {
      this.dialogFormVisible1 = true;
      this.form1.id = id;
      this.form1.rolesName = rolesName;
      this.form1.details = details;
    },
    roles_update() {
      var _this = this;
      axios
        .post("/api/api/private/sys/update/roles", {
          id: this.form1.id,
          rolesName: this.form1.rolesName,
          details: this.form1.details
        })
        .then(function(data) {
          console.log(data);
          _this.dialogFormVisible1 = false;
          _this.$message("更新成功");
          _this.getList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    change_enable(id, obj) {
      var _this = this;
      var ids = [];
      ids.push(id);
      axios
        .post("/api/api/private/sys/update/roles/enable", {
          ids: ids,
          enable: obj
        })
        .then(function(data) {
          //   console.log(data);
          _this.$message("已更新");
          _this.getList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    change_deleted(id, deleted) {
      var _this = this;
      var ids = [];
      ids.push(id);
      axios
        .post("/api/api/private/sys/update/roles/deleted", {
          ids: ids,
          deleted: deleted
        })
        .then(function(data) {
          //   console.log(data);
          _this.$message("已更新");
          _this.getList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    change_menu(id) {
      // _this.rolesId = id;
      console.log("4444", id);
    }
  }
};
</script>

<style>
#Jsgl {
  flex: 1;
}
div.infosBox,
div.operateBox {
  margin: 0px 40px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
#Jsgl .el-tabs__header {
  width: 150px;
}
.data .row-bg {
  margin: 20px 0;
}
</style>

