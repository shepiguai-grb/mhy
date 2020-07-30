<template>
  <div>
    <!-- 在el-table
      :data ='list'连接数据
      指定row-key来渲染数据 -->
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" width="180"></el-table-column>
      <!-- prop对应列内容的字段名，也可以使用 property 属性，用来渲染各个数据 -->
      <el-table-column
        label="菜单名称"
        width="180"
        prop="title"
      ></el-table-column>

      <el-table-column label="菜单图标">
        <!--  -->
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="菜单地址"></el-table-column>

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
import { requestdel } from '../../../util/request'  //引入删除请求
import { successAlert, warningAlert } from '../../../util/alert'  //引入成功和失败提示语
export default {
  data() {
    return {

    }
  },
  computed: {
    //...是es6里的语法，展开运算符，把对象和数组展开
    //mapGetters 获取数据
    ...mapGetters({
      list: 'menu/list'
    })
  },
  methods: {
    //mapActions 获取方法
    ...mapActions({
      requestList: 'menu/requestList'
    }),
    //编辑,通知父组件点击修改了
    edit(id) {
      this.$emit('edit', id)
    },
    //删除，
    del(id) {
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //执行删除请求
        requestdel({ id: id }).then((res) => {
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
    //触发获取的数据方法，再次渲染数据
    this.requestList()
  }

}
</script>

<style scoped>
table {
  width: 100%;
  text-align: center;
}
th,
td {
  padding: 10px;
}
</style>