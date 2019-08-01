<template>
  <div class="login-box">
    <h1>欢迎登录后台管理系统</h1>
    <div class="input-item">
      <span class="iconfont icon-ai-user"></span>
      <input type="text" v-model.trim="userData.name" placeholder="请输入用户名">
      <p v-if="user_error_text != ''">{{user_error_text}}</p>
    </div>
    <div class="input-item">
      <i class="iconfont icon-mima"></i>
      <input type="text" v-model.trim="userData.password" placeholder="请输入密码">
      <p v-if="pwd_error_text !=''">{{pwd_error_text}}</p>
    </div>
    <div class="input-item">
      <input type="text" v-model.trim="userData.code" placeholder="请输入验证码">
      <a href="javascript::">789456</a>
      <p v-if="code_error_text">{{code_error_text}}</p>
    </div>
    <el-button type="primary" @click="subimtForm" :loading="loading" :disabled="loading" round>欢迎登录</el-button>
  </div>
</template>

<script>
import { Login } from '@/api/user'
export default {
  data () {
    return {
      loading: false,
      user_error_text: '',
      pwd_error_text: '',
      code_error_text: '',
      userData: {
        name: 'admin',
        password: '111',
        code: 789456
      }
    }
  },
  mounted () {

  },
  methods: {
    subimtForm() {
      this.loading = true
      Login({name: this.userData.name, password: this.userData.password}).then(res => {
        if (res.data.code == '0') {
          localStorage.setItem('X-Token', res.data.data.token)
          this.$store.dispatch('GetUserInfo', res.data.data.token).then(res => {
            this.$router.push({
              path: '/home'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .login-box{
    width: 380px;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-sizing: border-box;
    h1{
      font-size: 20px;
      margin: 20px 0;
    }
    .input-item:nth-child(4) {
      input{
        text-indent: 0;
        width: 50%;
      }
    }
    .input-item{
      height: 45px;
      line-height: 45px;
      text-align: left;
      padding: 0 20px;
      box-sizing: border-box;
      margin: 0 20px 20px 20px;
      border-bottom: 1px solid #f0f2f5;
      position: relative;
      .iconfont{
        color: #999999;
        font-size: 20px;
      }
      a{
        float: right;
      }
      input{
        outline: none;
        border: none;
        background: transparent;
        text-indent: 15px;
        height: 45px;
        font-size: 15px;
        color: #999999;
        width: 90%;
      }
      p{
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: red;
      } 
    }
  }
</style>
