<template>
  <div>
    <el-table :data="list" border style="width: 100%;">
      <el-table-column prop="id" label="商品编号" width="100">
      </el-table-column>

      <el-table-column prop="goodsname" label="商品名称" width="150">
      </el-table-column>

      <el-table-column prop="price" label="商品价格"> </el-table-column>

      <el-table-column prop="market_price" label="市场价格"> </el-table-column>

      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column label="是否新品" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew == 1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="是否热卖" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew == 1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作" width="200">
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
import { requestGoodsDel } from '../../../util/request'
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: 'goods/list',
      total: 'goods/total',
      size: 'goods/size'
    })
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions({
      requestList: 'goods/requestList',
      requestTotal: 'goods/requestTotal',
      changePage: 'goods/changePage'
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
        requestGoodsDel({ id: id }).then((res) => {
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
  }
}
</script>

<style scoped>
img {
  width: 80px;
}
</style>