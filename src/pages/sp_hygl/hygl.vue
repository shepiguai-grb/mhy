<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 会员列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 编辑框 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vList from './components/list'
import vAdd from './components/add'
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
      }
    }
  },
  methods: {
    //编辑
    edit(id) {
      this.info.show = true
      this.info.title = '会员编辑'
      this.$refs.add.getDetail(id)
    }
  },
}
</script>

<style>
</style>