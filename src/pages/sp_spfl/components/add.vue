<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类" label-width="80px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 上级分类名-->
            <el-option
              v-for="v in list"
              :key="v.id"
              :label="v.catename"
              :value="v.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="80px" v-if="form.pid != 0">
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
          <el-button type="primary" @click="edit" v-else>修改</el-button>
          <el-button @click="hide">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { requestCateDetail, requestCateAdd, requestCateEdit } from '../../../util/request'
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ['info'],
  computed: {
    ...mapGetters({
      list: 'cate/list'
    })
  },
  data() {
    return {
      imageUrl: "", //上传完成的时候图片的地址（即展示图片的地址，由后面生成，见93行）
      form: {
        pid: 0,
        catename: '',
        img: null,
        status: 1,
      }
    }
  },
  methods: {
    ...mapActions({
      requestList: 'cate/requestList'
    }),
    //上传(修改)图片
    changeImg(e) {
      //设置上传图片大小
      if (e.size > 2 * 1024 * 1024) {
        warningAlert('上传的图片不能超过2MB')
      }
      //判断只能上传图片 
      var extname = e.name.slice(e.name.lastIndexOf('.'))
      var extArr = ['.png', '.jpg', '.gif', '.jpeg']
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
    },
    //取消
    hide() {
      this.info.show = false
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    //重置
    empty() {
      this.form = {
        pid: 0,  //上级分类编号
        catename: '',
        img: null,
        status: 1,
      }
      this.imageUrl = '' //重置图片路径
    },
    //添加
    add() {
      requestCateAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.hide()
          this.empty()
          this.requestList()
        } else {
          warningAlert(res.data.msg)
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      requestCateDetail({ id: id }).then((res) => {
        this.form = res.data.list
        this.form.id = id  //分类编号
        this.imageUrl = this.$imgPre + res.data.list.img;
      })
    },
    //修改
    edit(id) {
      requestCateEdit(this.form).then((res) => { 
          if(res.data.code==200){
              successAlert(res.data.msg)
              this.hide()
              this.empty()
              this.requestList()
          }else{
              warningAlert(res.data.msg)
          }
      })
    },
  },
}
</script>


<!--lang='stylus'是css预处理属性下载指令：cnpm i stylus stylus-loader --save
无需引入直接使用 -->
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