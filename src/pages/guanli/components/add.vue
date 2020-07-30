<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form label-width="80px" v-if="info.show">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 该项内容格式角色管理里面的数据 -->
            <el-option
              v-for="v in JueseList"
              :key="v.id"
              :label="v.rolename"
              :value="v.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
import { mapGetters, mapActions } from "vuex";
import { requestGlyAdd, requestGlyDetail, requestGlyEdit } from '../../../util/request'
import { successAlert, warningAlert } from '../../../util/alert'
export default {
  props: ['info'],
  computed: {
    ...mapGetters({
      JueseList: 'juese/list'
    })
  },
  data() {
    return {
      form: {
        roleid: '',
        username: '',
        password: '',
        status: 1,
      },
    }
  },
  methods: {
    ...mapActions({
      requestJsList: 'juese/requestList',
      requestGlyList: 'guanliyuan/requestList',
      requestTotal: 'guanliyuan/requestTotal',
    }),
    //重置
    empty() {
      this.form = {
        roleid: 1,
        username: '',
        password: '',
        status: 1,
      }
    },
    //取消
    hide() {
      this.info.show = false
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    //添加
    add() {
      requestGlyAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)   //成功提示语
          this.empty()  //置空
          this.hide()  //添加框消失
          this.requestTotal()  //获取数据总数量
        } else {
          warningAlert(res.data.msg)  //失败提示语
        }
      })
    },
    //获取一条数据
    getDetail(id) {
      requestGlyDetail({ uid: id }).then((res) => {
        this.form = res.data.list
        this.form.password = ''   //置空密码
      })
    },
    //编辑
    edit() {
      //编辑请求
      requestGlyEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.info.show = false
          this.empty()
          this.requestGlyList()
        } else {
          warningAlert(res.data.msg)
        }

      })
    }
  },
  mounted() {
    //判断添加(修改)框里所属角色是否有值，若没有就发送请求一次
    if (this.JueseList.length == 0) {
      this.requestJsList()
    }
  }
}
</script>

<style>
</style>