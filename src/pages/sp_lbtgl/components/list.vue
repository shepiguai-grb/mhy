<template>
  <div>
    <el-table :data="list" border style="width: 100%;">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>

      <el-table-column prop="title" label="轮播图标题" width="180">
      </el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
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
import { mapGetters, mapActions } from 'vuex'
import { requestLbtDel } from '../../../util/request'
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: 'banner/list'
    })
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      requestList: 'banner/requestList'
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
        requestLbtDel({ id: id }).then((res) => {
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