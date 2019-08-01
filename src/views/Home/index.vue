<template>
  <div>
    首页
    <button @click="messageFn">message</button>
  </div>
</template>

<script>
import { Login } from '@/api/user'
export default {
  methods: {
    messageFn() {
      Login({name: 'admin'}).then(res => {
        console.log(11)
      })
    }
  },
  mounted() {
    
  }
}
</script>

<style>

</style>
