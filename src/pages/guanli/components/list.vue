<template>
  <div>
    <el-table :data="GlyList" border style="width: 100%;">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>

      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>

      <el-table-column prop="rolename" label="所属角色"> </el-table-column>

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
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cPage"
      :page-size="GlySize"
      :total="GlyTotal"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { requestGlyDel } from '../../../util/request'
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      GlyList: 'guanliyuan/list',  //获取数据
      GlyTotal: 'guanliyuan/total',  //获取数据总数量
      GlySize: 'guanliyuan/size',  //获取一页的数量
    })
  },
  data() {
    return {

    }
  },
  methods: {
    //获取列表方法
    ...mapActions({
      requestList: 'guanliyuan/requestList',
      requestTotal: 'guanliyuan/requestTotal',
      changePage: 'guanliyuan/changePage',
    }),
    //修改页码
    cPage(i) {
      this.changePage(i)
      this.requestList()
    },
    //编辑
    edit(id) {
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
        requestGlyDel({ uid: id }).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            this.requestList()  //重新获取数据
            this.requestTotal()  //
          } else {
            warningAlert(res.data.msg)
          }
        })
        //取消删除请求
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    }
  },

  mounted() {
    this.requestList()
    this.requestTotal()
  }

}
</script>

<style>
</style>