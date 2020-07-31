<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 把菜单选择作为动态数据，还有后面的图标和地址，便于后面角色管理，树形节点的选择 -->
            <el-option
              v-for="v in list"
              :key="v.id"
              :label="v.title"
              :value="v.id"
            ></el-option>

            <!-- <el-option label="系统设置" :value="1"></el-option>
            <el-option label="商城管理" :value="2"></el-option> -->
          </el-select>
        </el-form-item>

        <!-- 目录：有图标，没有地址
             菜单：没有图标，有地址 -->
        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" label-width="80px" v-if="form.type == 1">
          <el-select v-model="form.icon">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="v in icons"
              :key="v"
              :label="v"
              :value="v"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="80px" v-else>
          <el-select v-model="form.url">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="v in urls"
              :key="v"
              :label="v"
              :value="v"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <!-- active-value和inactive-value 判断是否选中，注意后端需要的数据类型发送错误会失效-->
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
          <el-button type="primary" @click="update" v-else>修 改</el-button>
          <el-button @click="hide">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//引入添加请求
import { requestadd, requestMenuList, requestDetail, requestedit } from '../../../util/request'
//引入成功和失败提示语
import { successAlert, warningAlert } from '../../../util/alert'
import { mapGetters, mapActions } from "vuex";
export default {
  props: ['info'],
  computed: {
    //从状态层取数据
    ...mapGetters({
      list: 'menu/list'
    })
  },
  data() {
    return {
      //返回后端的数据
      form: {
        title: '',
        pid: 0,
        type: 1,
        icon: '',
        url: '',
        status: 1,
      },
      //地址集合
      urls: [
        '/home',
        '/caidan',
        '/guanli',
        '/juese',
        '/hygl',
        '/lbtgl',
        '/mshd',
        '/spfl',
        '/spgg',
        '/spgl'
      ],
      //图标集合
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ]
    }
  },
  //从状态层取方法
  methods: {
    ...mapActions({
      requestList: 'menu/requestList'
    }),
    //重置内容
    empty() {
      this.form = {
        title: '',
        pid: 0,
        type: 1,
        icon: '',
        url: '',
        status: 1,
      }
    },
    //取消
    hide() {
      this.info.show = false;
      //判断是否置空添加框里的数据，和判断点击的是添加还是编辑按钮
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    //添加
    add() {
      if (!this.form.title) {
        warningAlert('菜单名称不能为空')
        return
      }
      //添加请求
      requestadd(this.form).then((res) => {
        //后端返回的该数据为200，则添加成功
        if (res.data.code == 200) {
          successAlert(res.data.msg);  //成功弹框
          this.empty();  //重置form数据
          this.hide();  //弹框消失
          this.requestList();  //再次请求数据，渲染到列表
        } else {
          //失败弹框
          warningAlert(res.data.msg)
        }
      })

    },
    //获取要改数据，渲染到添加框
    getDetail(id) {
      requestDetail({ id: id }).then((res) => {
        //把获取到的数据赋给form，在给form加个id
        this.form = res.data.list
        this.form.id = id
      })
    },
    //修改
    update() {
      if (!this.form.title) {
        warningAlert('菜单名称不能为空')
        return
      }
      //修改请求，this.form是传给数据库的参数，即修改好的值
      requestedit(this.form).then((res) => {
        // console.log(this.form)
        if (res.data.code == 200) {
          successAlert(res.data.msg);  //成功提示语
          this.empty();  //添加和修改使用的一个框，所以每次用了得置空
          this.hide();  //弹框消失
          this.requestList();  //再次请求数据,渲染列表
        } else {
          warningAlert(res.data.msg);  //失败提示语
        }
      })
    }

  },
  //挂载完成
  mounted() { },


}
</script>

<style scoped>
</style>