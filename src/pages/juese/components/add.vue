<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form label-width="80px" v-if="info.show">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="80px">
          <!-- default-expanded-keys设置默认展开，[]里填要展开的id -->
          <!-- :props="defaultProps"设置要展示的节点，和那些是子节点 -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultKey"
            :props="defaultProps"
            ref="tree"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add" v-if="info.isAdd"
            >添加</el-button
          >
          <el-button type="primary" @click="edit" v-else>编辑</el-button>
          <el-button @click="hide">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//添加请求、列表、指定一条数据
import { requestJsAdd, requestJsEdit, requestJsDetail } from '../../../util/request'
//失败和成功提示语
import { successAlert, warningAlert } from '../../../util/alert'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: 'menu/list'
    })
  },
  data() {
    return {
      form: {
        rolename: '',
        menus: '',
        status: 1,
      },
      defaultKey: [],
      //树形结构
      defaultProps: {
        children: "children",  //要展示的子节点
        label: "title",   //要展示的节点
      },
    }
  },
  mounted() {
    //判断menuList的长度来判断之前是否发过请求，若没有就发一次请求
    if (this.menuList.length == 0) {
      this.requestMenuList()
    }
  },
  methods: {
    ...mapActions({
      requestMenuList: 'menu/requestList',  //引入菜单管理数据，来设置权限
      requestJsList: 'juese/requestList'
    }),
    //取消
    hide() {
      this.info.show = false
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    //置空
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //将树形结构的数据，选中的key置空
      this.$refs.tree.setCheckedKeys([]);
      this.defaultKey = []
    },
    //添加
    add() {
      //在树形标签上加个ref='tree',用this.$refs.tree.getCheckedKeys()可以获取当前选中的节点的值
      //JSON.stringify把数据转换成字符串，后端要的格式是字符串类型的数组
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())


      if (!this.form.rolename) {
        warningAlert('请填写角色名称')
        return
      }
      if (this.form.menus == '[]') {
        warningAlert('请设置角色权限')
        return
      }

      //发送添加请求
      requestJsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.list)  //成功提示语
          this.empty()  //置空弹框内容
          this.hide()  //弹框消失
          this.requestJsList()  //重新获取数据列表渲染
        } else {
          //失败提示语
          warningAlert(res.data.msg)
        }
      })
    },
    //获取指定数据，触发该事件是有父级通知触发
    getDetail(id) {
      requestJsDetail({ id: id }).then((res) => {
        this.form = res.data.list    //把数据赋给form
        this.form.id = id   //把后端返回的id给form加上
        this.defaultKey = JSON.parse(res.data.list.menus)  //把角色原有的权限转换成数组，赋给defaultKey渲染到修改框
      })
    },
    //编辑
    edit() {
      //获取修改的tree的key赋给form.menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())

      if (!this.form.rolename) {
        warningAlert('请填写角色名称')
        return
      }
      if (this.form.menus == '[]') {
        warningAlert('请设置角色权限')
        return
      }

      //发送修改请求
      requestJsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.empty()
          this.hide()
          this.requestJsList()
        } else {
          warningAlert(res.data.msg)
        }
      })
    }
  }
}
</script>

<style>
</style>