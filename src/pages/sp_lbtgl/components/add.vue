<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题" label-width="80px">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { successAlert, warningAlert } from '../../../util/alert'
import { requestLbtEdit, requestLbtAdd, requestLbtDetail, requestLbtList } from '../../../util/request'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['info'],
  data() {
    return {
      imageUrl: '',
      form: {
        title: '',
        img: null,
        status: 1
      }
    }
  },
  methods: {
    ...mapActions({
      requestList: 'banner/requestList'
    }),
    //取消
    hide() {
      this.info.show = false
      this.empty()
      // if ( this.info.isAdd) {

      // }
    },
    //置空
    empty() {
      this.form = {
        title: '',
        img: null,
        status: 1
      }
      this.imageUrl = ''
    },
    //添加
    add() {
      requestLbtAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.hide()
          this.empty()
          this.requestList()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    //获取一条数据
    getDetail(id) {
      requestLbtDetail({ id: id }).then((res) => {
        this.form = res.data.list
        this.form.id = id
        this.imageUrl = this.$imgPre + res.data.list.img;
      })
    },
    //编辑
    edit() {
      requestLbtEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.hide()
          this.empty()
          this.requestList()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    //图片改变时
    changeImg(e) {
      //限制上传图片大小
      if (e.size > 2 * 1024 * 1024) {
        warningAlert('上传的图片不能超过2Mb')
      }
      //判断只能上传图片文件,通过截取后缀名来判断
      var extname = e.name.slice(e.name.lastIndexOf('.'))
      var extArr = ['.png', '.jpg', '.jpeg', '.gif']
      if (extArr.some((i) => { i == extname })) {
        warningAlert('只能上传图片文件')
        return
      }

      //file是上传的文件
      var file = e.raw
      //把该文件生成一个URL地址，赋给imageUrl展示出来
      this.imageUrl = URL.createObjectURL(file)
      //后端需要的数据是文件
      this.form.img = file
    }
  },

}
</script>

<style scoped lang='stylus'>
.box >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.box >>> .avatar-uploader .el-upload:hover {
  border-color: #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>