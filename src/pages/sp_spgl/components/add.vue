<template>
  <div class="add">
    <!-- @opened="createEditor()"创建商品描述的编辑器 -->
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      @opened="createEditor()"
    >
      <el-form label-width="80px" v-if="info.show">
        <el-form-item label="一级分类">
          <!--  @change="changeFirstCateId()"设置一级分类和二级分类联动 -->
          <el-select v-model="form.first_cateid" @change="changeFirstCateId()">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据，该数据是商品分类里的 -->
            <el-option
              v-for="v in cateList"
              :key="v.id"
              :label="v.catename"
              :value="v.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据，该数据是商品分类里的  -->
            <el-option
              v-for="v in secondCateArr"
              :key="v.id"
              :label="v.catename"
              :value="v.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" label-width="80px">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price"></el-input>
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

        <el-form-item label="商品规格">
          <!--  @change="changeSpecsId"设置商品规格发生改变时 -->
          <el-select v-model="form.specsid" @change="changeSpecsId">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据，该数据是商品规格里的 -->
            <el-option
              v-for="v in specList"
              :key="v.id"
              :label="v.specsname"
              :value="v.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性">
          <!-- multiple设置属性可以多选 -->
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="v in attrsArr"
              :key="v"
              :label="v"
              :value="v"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
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
import { successAlert, warningAlert } from "../../../util/alert";
import E from "wangeditor";  //下载指令：cnpm i wangeditor --save  不需要全局引入，需要100行的div节点和169行的创建编辑器一起使用
import { requestGoodsAdd, requestGoodsDetail, requestGoodsEdit } from '../../../util/request'
export default {
  props: ['info'],
  computed: {
    ...mapGetters({
      //获取一级分类列表,是商品分类里的
      cateList: 'cate/list',
      //商品规格列表，商品规格里的
      specList: 'spec/list'
    })
  },
  data() {
    return {
      //编辑器对象，即添加里的商品描述框
      editor: null,
      //二级分类数组
      secondCateArr: [],
      //规格属性值
      attrsArr: [],
      //图片地址
      imageUrl: '',
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      },
    }
  },
  methods: {
    ...mapActions({
      //获取分类列表,在商品分类里
      requestCateList: 'cate/requestList',
      //获取规格列表，在商品规格里
      requestSpecList: 'spec/requestList',
      //获取商品总数
      requestGoodsAll: 'goods/requestTotal',
      //获取商品列表数据
      requestGoodsList: 'goods/requestList'
    }),

    //设置若修改了一级分类，就联动二级分类
    changeFirstCateId(bool) {
      //查找选的一级分类的下标
      let index = this.cateList.findIndex((v) => { return v.id == this.form.first_cateid })
      // console.log(this.cateList[index+1])
      this.secondCateArr = this.cateList[index].children
      //若传了参数true就不置空二级分类，设置切换一级分类就清空二级分类
      if (!bool) { this.form.second_cateid = '' }
    },

    //图片改变时
    changeImg(e) {
      let file = e.raw   //获取图片文件
      this.imageUrl = URL.createObjectURL(file)  //获取在设置图片路径
      this.form.img = file  //后端要的数据是文件
    },
    //商品规格改变时
    changeSpecsId(bool) {
      //数组.findindex(函数)  返回符合测试条件的元素下标位置，这里测试条件为v.id
      let index = this.specList.findIndex((v) => { return v.id == this.form.specsid })
      this.attrsArr = this.specList[index].attrs
      //  console.log(index)
      if (!bool) { this.form.specsattr = [] }
    },
    //创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      //设置富文本编辑框的头部菜单，由于不能让菜单换行，就只能减少菜单里的工具数量
      this.editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        // 'list',  // 列表
        // 'justify',  // 对齐方式
        // 'quote',  // 引用
        // 'emoticon',  // 表情
        // 'image',  // 插入图片
        // 'table',  // 表格
        // 'video',  // 插入视频
      ]
      this.editor.create();
      //设置富文本编辑框的值
      this.editor.txt.html(this.form.description)
    },
    //取消
    hide() {
      this.info.show = false
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    //置空
    empty() {
      //二级分类的数组
      this.secondCateArr = []
      //商品规格属性值
      this.attrsArr = []
      //图片地址
      this.imageUrl = ""
      //提交给后端的数据
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      }
      //置空商品描述编辑框
      this.editor.txt.html('')
    },
    //添加
    add() {
      this.form.description = this.editor.txt.html()  //获取商品描述编辑框的值
      this.form.specsattr = JSON.stringify(this.form.specsattr)   //把规格属性转换成，后端要的字符串类型的数组
      //添加请求
      requestGoodsAdd(this.form).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.empty()
          this.hide()
          this.requestGoodsList()   //获取数据列表
          this.requestGoodsAll()   //获取数据总数
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    //获取一条数据
    getDetail(id) {
      requestGoodsDetail({ id: id }).then((res) => {
        // console.log(res)
        this.form = res.data.list
        this.form.id = id
        this.imageUrl = this.$imgPre + this.form.img
        //根据一级分类计算出二级分类,在调用一次一级分类和二级分类联动
        this.changeFirstCateId(true)
        //根据商品规格计算出商品属性，再调用一次商品规格和属性联动
        this.changeSpecsId(true)
        //把规格属性转换成数组渲染
        this.form.specsattr = JSON.parse(this.form.specsattr)
      })
    },
    //编辑
    edit() {
      this.form.description = this.editor.txt.html()  //获取商品描述编辑框的值
      this.form.specsattr = JSON.stringify(this.form.specsattr)   //把规格属性转换成，后端要的字符串类型的数组
      //编辑请求
      requestGoodsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.empty()
          this.hide()
          this.requestGoodsList()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
  },
  mounted() {
    //判断一级分类里是否有值，没有就获取一下
    if (this.cateList.length == 0) {
      this.requestCateList()
    }
    //直接获取商品规格列表数据
    this.requestSpecList(true)
  },

}
</script>

<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex !important;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
}

// 穿透
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border: 1px dashed #409eff !important;
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

#desc {
  width: 100%;
}
</style>