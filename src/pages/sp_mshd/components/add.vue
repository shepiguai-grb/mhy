<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form label-width="80px" v-if="info.show">
        <el-form-item label="活动名称">
          <el-input
            v-model="form.title"
            placeholder="请输入活动名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="活动时间">
          <el-date-picker
            v-model="times"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" label-width="80px">
          <!-- @change="changeFirstCateId()"设置一级分类和二级分类联动 -->
          <el-select v-model="form.first_cateid" @change="changeFirstCateId()">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 一级分类-->
            <el-option
              v-for="v in cateList"
              :key="v.id"
              :label="v.catename"
              :value="v.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" @change="changeTwoCateId()">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 二级分类-->
            <el-option
              v-for="v in secondCateArr"
              :key="v.id"
              :label="v.catename"
              :value="v.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 商品-->
            <el-option
              v-for="v in tree"
              :key="v.id"
              :label="v.goodsname"
              :value="v.id"
            ></el-option>
          </el-select>
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
//获取商品列表接口
import { requestMsAdd, requestMsDetail, requestMsEdit, requestGoodsList } from '../../../util/request'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['info'],
  computed: {
    ...mapGetters({
      list: 'ms/list',
      //获取一级分类和二级分类列表,是商品分类里的
      cateList: 'cate/list',
      //获取商品设置三级联动
      goodsList: 'goods/list'
    })
  },
  data() {
    return {
      //页面展示的活动时间
      times: [],
      //二级分类数组,通过一级分类下标获取
      secondCateArr: [],
      //一级分类和二级分类的id，用来发送请求获取相应的商品数据
      l: {},
      //商品(三级)数据数组，通过一级分类id和二级分类id发送数据请求获取
      tree: [],
      form: {
        title: '',             // 活动名                 
        begintime: '',         // 开始时间      
        endtime: '',           // 结束时间    
        first_cateid: '',      // 商品一级分类，在商品分类里         
        second_cateid: '',     // 商品二级分类，在商品分类里          
        goodsid: '',           // 商品编号    
        status: 1              // 状态
      },
    }
  },
  methods: {
    ...mapActions({
      //获取列表数据
      requestList: 'ms/requestList',
      //获取分类列表,在商品分类里(用于判断更新一级分类和二级分类)
      requestCateList: 'cate/requestList',
      //获取商品设置判断更新商品三级联动
      requestGoodsList: 'goods/requestList'
    }),
    //取消
    hide() {
      this.info.show = false
      this.empty()
    },
    //置空
    empty() {
      this.form = {
        title: '',
        begintime: '',
        endtime: '',
        first_cateid: '',
        second_cateid: '',
        goodsid: '',
        status: 1
      }
      this.times = []
      this.tree = []
      this.secondCateArr = ''
      this.l = {}
    },

    //设置一级分类和二级分类联动(即一级分类和二级分类)
    changeFirstCateId(bool) {
      //查找选的一级分类的下标
      let index = this.cateList.findIndex((v) => { return v.id == this.form.first_cateid })
      this.secondCateArr = this.cateList[index].children
      //一级分类发生变化就置空三级商品，以免商品保留之前的数据
      // this.tree = []
      //若传了参数true就不置空二级分类，设置切换一级分类就清空二级分类和商品
      if (!bool) {
        this.form.second_cateid = ''
        this.form.goodsid = ''
      }
    },
    //设置三级联动(即商品、一级分类、二级分类)
    changeTwoCateId(bool) {
      this.l.fid = this.form.first_cateid
      this.l.sid = this.form.second_cateid

      if (this.l.fid == null || this.l.sid == null) { return }
      //发送一级分类和二级分类id，获取指定商品
      requestGoodsList(this.l).then((res) => {
        if (res.data.code == 200) {
          this.tree = res.data.list
          if (!bool) { this.form.goodsid = '' }
        }
      })
    },
    //添加····
    add() {
      this.form.begintime = Date.parse(this.times[0])
      this.form.endtime = Date.parse(this.times[1])
      //发送添加请求
      requestMsAdd(this.form).then((res) => {
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
    //获取一条数据
    getDetail(id) {
      requestMsDetail({ id: id }).then((res) => {
        this.form = res.data.list
        this.form.id = id
        //把时间戳转换成标准时间添加到times里
        this.times.push(new Date(JSON.parse(res.data.list.begintime)))
        this.times.push(new Date(JSON.parse(res.data.list.endtime)))
        this.changeFirstCateId(true)
        this.changeTwoCateId(true)
      })
    },
    //编辑
    edit() {
      this.form.begintime = Date.parse(this.times[0])
      this.form.endtime = Date.parse(this.times[1])
      requestMsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.empty()
          this.hide()
          this.requestList()
        } else {
          warningAlert(res.data.msg)
        }

      })
    }
  },

  mounted() {
    //判断一级分类和二级分类列表里是否有值，没有就获取一下
    if (this.cateList.length == 0) {
      this.requestCateList()
    }
    //判断商品里是否有值，没有就获取一下
    if (this.goodsList.length == 0) {
      this.requestGoodsList()
    }
  }
}
</script>

<style>
</style>