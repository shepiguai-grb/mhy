<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form label-width="80px" v-if="info.show">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item label="规格属性" v-for="(v, i) in attrArr" :key="i">
          <el-input v-model="v.value"></el-input>
          <el-button type="primary" v-if="i == 0" @click="attrArrAdd"
            >新增规格属性</el-button
          >
          <el-button type="danger" v-else @click="attrArrDel(i)"
            >删除</el-button
          >
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
import { warningAlert, successAlert } from '../../../util/alert'
import { requestSpecAdd, requestSpecDetail, requestSpecEdit } from '../../../util/request'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['info'],
  computed: {
    ...mapGetters({

    })
  },
  data() {
    return {
      attrArr: [
        {
          value: '',
        },
      ],
      form: {
        specsname: '',
        attrs: '',
        status: 1
      },
    }
  },
  methods: {
    ...mapActions({
      requestList: 'spec/requestList',  //获取列表数据
      requestTotal: 'spec/requestTotal',  //获取数据总数量
    }),
    //置空
    empty() {
      this.form = {
        specsname: '',
        attrs: '',
        status: 1
      }
      this.attrArr = [{ value: '' },]
    },
    //取消
    hide() {
      this.info.show = false
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    //新增规格属性，直接往数组里加一个值
    attrArrAdd() {
      this.attrArr.push({ value: '' })
    },
    //删除规格属性，删除数组里得值
    attrArrDel(i) {
      this.attrArr.splice(i, 1)
    },
    //添加
    add() {
      //some用法:数组.some(函数)  some让数组里的每个值都执行一次函数，直到第一个返回true则停止返回true，如果全是false就返回false
      //判断规格框内是否为空
      if (this.attrArr.some((v) => { return v.value == '' })) {
        warningAlert('属性规格不能为空');
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((v) => { return v.value }))
      //发送添加请求
      requestSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.empty()
          this.hide()
          this.requestList()
          this.requestTotal()
        } else {
          warningAlert(res.data.msg)
        }
      })

    },
    //获取一条数据
    getDetail(id) {
      requestSpecDetail({ id: id }).then((res) => {
        this.form = res.data.list[0]
        this.attrArr = JSON.parse(res.data.list[0].attrs).map((v) => ({ value: v }))
      })
    },

    //编辑
    edit() {
      //判断规格框内是否为空
      if (this.attrArr.some((v) => { return v.value == '' })) {
        warningAlert('属性规格不能为空');
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((v) => { return v.value }))
      //修改请求
      requestSpecEdit(this.form).then((res) => {
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
  },
}
</script>

<style scoped lang='stylus'>
.add >>> .el-form-item__content {
  display: flex !important;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
}
</style>