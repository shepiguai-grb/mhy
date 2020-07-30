<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <!-- prop对应列内容的字段名，也可以使用 property 属性，用来渲染各个数据 -->
      <el-table-column
        label="分类名称"
        width="180"
        prop="catename"
      ></el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt />
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

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requestCateDel } from '../../../util/request'
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: 'cate/list'
    })
  },
  methods: {
    ...mapActions({
      requestList: 'cate/requestList'
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
        requestCateDel({ id: id }).then((res) => {
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
    },
  },
  mounted() {
    this.requestList()
  },

}
</script>

<style scoped>
img {
  width: 80px;
}
</style>