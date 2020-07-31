<template>
  <div class="box">
    <div class="con">
      <h3>登录</h3>
      <el-input
        class="inp"
        placeholder="请输入内容"
        v-model="user.username"
        clearable
      >
      </el-input>
      <el-input
        class="inp"
        placeholder="请输入密码"
        v-model="user.password"
        show-password
      ></el-input>
      <el-button type="primary" class="btn" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { requestLogin } from '../../util/request'
import { successAlert, warningAlert } from "../../util/alert"
import { mapActions, mapGetters } from "vuex"
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    ...mapActions({
      changeUser: 'login/changeUser'
    }),
    login() {
      requestLogin(this.user).then((res) => {
        // console.log(res)
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          //登录成功就用vuex保存用户信息
          this.changeUser(res.data.list)
          //  console.log(this.$store)  //没有引入
          //跳转到首页
          this.$router.push('/home')
        } else {
          warningAlert(res.data.msg)
        }
      })
    }
  }

}
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553444, #303d60);
}
.con {
  width: 400px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  /* 左右垂直居中 */
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  text-align: center;
  padding-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
}
.inp {
  margin-bottom: 20px;
}
.btn {
  display: block;
  margin: 0 auto;
}
</style>