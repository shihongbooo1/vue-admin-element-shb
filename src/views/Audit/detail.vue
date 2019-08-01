<template>
  <div class="detail-box">
    <el-page-header @back="$router.push({path: '/audit'})" content="订单详情">
    </el-page-header>
    <div>
      详情页面
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .detail-box{
    padding: 20px;
  }
</style>
