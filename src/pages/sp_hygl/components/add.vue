<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号" label-width="80px">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="80px">
          <el-input
            v-model="form.nickname"
            autocomplete="off"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="80px">
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入密码"
            show-password
          ></el-input>
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
          <el-button type="primary" @click="edit" v-else>修 改</el-button>
          <el-button @click="hide">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { requestVipDetail, requestVipEdit } from '../../../util/request'
import { successAlert, warningAlert } from '../../../util/alert'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['info'],
  data() {
    return {
      form: {
        uid: '',
        nickname: "",
        phone: '',
        password: '',
        status: 1,
      }
    }
  },
  methods: {
    ...mapActions({
      requestList: 'vip/requestList'
    }),
    //获取一条数据
    getDetail(id) {
      requestVipDetail({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list
          this.form.password = ''
        }
      })
    },
    //编辑
    edit() {
      requestVipEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.empty()
          this.hide()
          this.requestList()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    //取消
    hide() {
      this.info.show = false
    },
    //置空
    empty() {
      this.form = {
        uid: '',
        nickname: "",
        phone: '',
        password: '',
        status: 1,
      }
    }
  },

}
</script>

<style>
</style>