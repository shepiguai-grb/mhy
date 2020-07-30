<template>
  <div>
    <el-table :data="list" border style="width: 100%;">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>

      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>

      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="(v, i) in scope.row.attrs" :key="i">{{ v }}</el-tag>
        </template>
      </el-table-column>

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
    <!-- 分页功能 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cPage"
      :page-size="size"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requestSpecDel } from '../../../util/request'
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: 'spec/list',  //获取数据
      total: 'spec/total',  //获取数据总数
      size: 'spec/size'  //获取一页数据数量
    })
  },
  data() { return {} },
  methods: {
    ...mapActions({
      requestList: 'spec/requestList',
      requestTotal: 'spec/requestTotal',
      changePage: 'spec/changePage'
    }),
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
        requestSpecDel({ id: id }).then((res) => {
          // console.log(res)
          if (res.data.code == 200) {
            successAlert(res.data.msg)  //成功提示语
            this.requestList()  //请求数据列表，再次渲染
            this.requestTotal()  //请求总数
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
    },
    //修改页码
    cPage(e) {
      this.changePage(e)
      this.requestList()
    },
  },

  mounted() {
    this.requestList()
    this.requestTotal()
  },
}
</script>

<style>
</style>