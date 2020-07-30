<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <el-button type="primary" class="btn" @click="add">添加</el-button>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加框和修改框 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      info: {
        show: false,
        title: '',
        isAdd: true
      },
    }
  },
  methods: {
    //添加
    add() {
      this.info.show = true
      this.info.title = '分类添加'
      this.info.isAdd = true
    },
    //编辑
    edit(id) {
      this.info.show = true
      this.info.title = '分类修改'
      this.info.isAdd = false
      this.$refs.add.getDetail(id)
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 20px 0px;
}
</style>