<template>
  <div class="app">
    <el-table :data="list" border style="width: 100%;">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>

      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>

      <el-table-column prop="phone" label="手机号"> </el-table-column>

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
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      list: 'vip/list'
    })
  },
  data() { return {} },
  methods: {
    ...mapActions({
      requestList: 'vip/requestList'
    }),
    //编辑
    edit(id) {
      this.$emit('edit', id)
    }
  },
  mounted() {
    this.requestList()
  }

}
</script>

<style scoped>
.app {
  margin: 30px 0px 0px 0px;
}
</style>