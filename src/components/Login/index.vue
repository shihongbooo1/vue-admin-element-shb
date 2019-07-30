<template>
  <div>
    <input type="text" placeholder="请输入用户名" v-model="userData.name">
    <input type="text" placeholder="请输入密码" v-model="userData.password">
    <button @click="subimtForm">登录</button>
  </div>
</template>

<script>
import { Login } from '@/api/user'
export default {
  data () {
    return {
      userData: {
        name: 'admin',
        password: '111'
      }
    }
  },
  mounted () {
    console.log(process.env.VUE_APP_BASEURL)
  },
  methods: {
    subimtForm() {
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

<style>

</style>
