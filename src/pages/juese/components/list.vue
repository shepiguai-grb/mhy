<template>
  <div>
    <el-table :data="jueseList" style="width: 100%;">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>

      <!-- <el-table-column prop="menus" label="权限" width="180"> </el-table-column> -->

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { requestJsDel } from '../../../util/request' //删除请求
import { warningAlert, successAlert } from '../../../util/alert'
export default {
  computed: {
    ...mapGetters({
      jueseList: 'juese/list'
    })
  },
  data() {
    return {}
  },
  methods: {
    //获取列表方法
    ...mapActions({
      requestList: 'juese/requestList'
    }),
    //编辑
    edit(id) {
      //告诉父组件，点击编辑了
      this.$emit('edit', id)
    },
    //删除
    del(id) {
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //执行删除请求
        requestJsDel({ id: id }).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)  //成功提示语
            this.requestList()  //请求数据列表，再次渲染
          } else {
            warningAlert(res.data.msg)  //失败提示语
          }
        });
        //取消删除请求
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  },

  //挂载完成直接渲染数据
  mounted() {
    this.requestList()
  }
}
</script>

<style>
</style>