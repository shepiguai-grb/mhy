<template>
  <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" class="btn" @click="add">添加</el-button>

    <!-- 列表,接收修改 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加框、修改框 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info: {
        show: false,
        title: '',
        // 判断是否置空添加框里的数据，和判断点击的是添加还是编辑按钮
        isAdd: true
      },

    }
  },
  methods: {
    //注意：修改弹框和添加弹框是一样的
    //添加
    add() {
      this.info.show = true;
      this.info.title = '菜单添加'
      this.info.isAdd = true
    },
    //修改
    edit(id) {
      this.info.show = true;
      this.info.title = '菜单编辑'
      this.info.isAdd = false
      // $refs获取当前组件子组件的所有方法和值，但是必须在当前组件定义ref='子组件'，用法见13行
      //但是得用this.$refs来获取
      this.$refs.add.getDetail(id)
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 20px 0px;
}
.box {
  position: relative;
}
</style>