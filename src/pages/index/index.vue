<template>
  <div>
    <el-container class="box">
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <!-- 以 index 作为 path 进行路由跳转 -->
          <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!--  
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/caidan">菜单管理</el-menu-item>
            <el-menu-item index="/juese">角色管理</el-menu-item>
            <el-menu-item index="/guanli">管理员管理</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/sp_spfl">商品分类</el-menu-item>
            <el-menu-item index="/sp_spgg">商品规格</el-menu-item>
            <el-menu-item index="/sp_spgl">商品管理</el-menu-item>
            <el-menu-item index="/sp_hygl">会员管理</el-menu-item>
            <el-menu-item index="/sp_lbtgl">轮播图管理</el-menu-item>
            <el-menu-item index="/sp_mshd">秒杀活动</el-menu-item>
          </el-submenu> 
-->

          <template v-for="item in user.menus">
            <el-submenu
              v-if="item.children"
              :index="item.id + ''"
              :key="item.id"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="i in item.children"
                :key="i.title"
                :index="i.url"
                >{{ i.title }}</el-menu-item
              >
            </el-submenu>

            <el-menu-item
              v-if="!item.children"
              :key="item.id"
              :index="item.url"
            >
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="top">
          <div>
            <p>{{ user.username }}</p>
            <el-button type="primary" class="btn" @click="exit">退出</el-button>
          </div>
        </el-header>

        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'login/user'
    }),
    //用来判断侧边栏是否有目录
    hasChildren() {
      return this.user.menus[0].children ? true : false;
    },
  },
  methods: {
    ...mapActions({
      changeUser: 'login/changeUser'
    }),
    //退出
    exit() {
      //退出时，置空登陆成功时vuex保存的用户信息
      this.changeUser(null)
      //返回登录页面
      this.$router.push('/login')
    }
  },

  mounted() { },
}
</script>

<style scoped>
.box {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.top {
  width: 100%;
  height: 15vh;
  background-color: #b3c0d1;
}
.top div {
  float: right;
  margin: 10px 20px 0px 0px;
}
.top p {
  float: left;
  line-height: 40px;
}
.top .btn {
  float: left;
  margin-left: 10px;
}
</style>