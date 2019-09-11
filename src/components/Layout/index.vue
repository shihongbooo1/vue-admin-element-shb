<template>
  <div class="app_wapper">
    <el-container>
      <!-- 左侧菜单 -->
        <el-menu class="sub_meuns_wapper" 
        :collapse-transition="true" 
        :collapse="$store.getters.isCollapse"
        mode="vertical" unique-opened  :default-active="$route.path" background-color="#001529" text-color="#fff" active-text-color="#2d80fc">
          <!-- 菜单组件 -->
          <div class="logo-box">
            <img src="../../assets/img/logo.jpg" alt="" v-show="!$store.getters.isCollapse">
            <img src="../../assets/img/logo-min.jpg" style="width: 60%;" v-show="$store.getters.isCollapse" alt="" :style="!$store.getters.isCollapse ? '' : 'height:35px;'">
          </div>
          <div class="nav-bar">
            <router-link v-for="(item, index) in meuns" :key="index" :to="item.path">
              <el-menu-item v-if="item.path !== ''" @click="turnColor(item.path)" :index="item.path">
                <svg-icon style="font-size:18px;margin-right: 5px;" :icon-class="item.meta.icon"></svg-icon>
                <span slot="title">{{item.meta.title ? item.meta.title : '' }}</span>
              </el-menu-item>
            </router-link>
          </div>
        </el-menu>
      <!-- 右侧内容区域 -->
      <el-container class="app_content">
        <el-header style="text-align: right; font-size: 12px">
          <i class="el-icon-user-solid" style="margin-right: 10px;font-size: 16px;"></i>
          <span>{{$store.getters.name}}</span>
          <el-button @click="outSystem" style="margin-left: 15px" size="mini" plain type="primary">退出</el-button>
          <el-switch style="float: left;margin-top: 20px;" v-model="switchValue" active-color="#2d80fc" active-text="导航栏开/关" inactive-color="#a8a8a8"></el-switch>
          <!-- <el-breadcrumb class="breadcrumb-nav">
            <el-breadcrumb-item>
              <i style="margin-right: 5px;" :class="icon"></i>
              <span style="font-weight: 600;">{{title}}</span>
            </el-breadcrumb-item>
          </el-breadcrumb> -->
        </el-header>
        <!-- 标签导航 -->
        <div class="tags-nav">
          <el-tag v-for="(tag, index) in tags" @click="turnColor(tag.path)" 
          :key="index" 
          type="info" 
          :style="colorIndex == tag.path ? color : ''"
          :closable="index >= 1"
           @close="handleClose(tag)">
            <i class="el-icon-location" style="margin-right: 5px;font-size: 15px;"></i>
            {{tag.name}}
          </el-tag>
        </div>
        <!-- 内容区域 -->
        <el-main>
          <!-- 二级路由跳转 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// 左侧菜单组件
import '@/styles/index.css'
import { permissionRouter } from '@/router'
export default {
  computed: {
    getRoutes() {
      return global.antRouter
    }

  },
  components: {
  },
  data() {
    return {
      meuns: [],
      userRole: 'Topest',
      switchValue: true,
      title: '首页', // 默认值首页
      icon: '', //图标
      tags: [], // 标签导航data
      color: 'color:#2d80fc;',
      colorIndex: this.$route.path,
    }
  },
  watch: {
    'switchValue' (val) {
      this.$store.dispatch('IsCollapseFn')
    },
    $route(val) {
      this.title = val.matched[0].meta.title
      this.icon = val.matched[0].meta.icon
      this.tags.push({
        name: this.title,
        path: val.path
      })
      let hash = {};
      this.tags = this.tags.reduce(function(item, next) {
          hash[next.name] ? '' : hash[next.name] = true && item.push(next)
          return item
      }, [])
      sessionStorage.setItem('tagsData', JSON.stringify(this.tags))
    }
  },
  methods: {
    outSystem() { //退出系统
      this.$message({
        message: '正在为您安全退出...',
        type: 'warning'
      })
      this.$store.dispatch('LoginOut')
    },
    turnColor(to) {
      this.colorIndex = to
      this.$router.push({
        path: to
      })
    },
    handleClose(tag) {
      this.$confirm('是否要关闭此页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.tags.length;i ++) {
          if (this.tags[i].path == tag.path) {
            let index = i - 1
            this.$router.push({
              path: this.tags[index].path
            })
            this.tags.splice(this.tags.indexOf(tag), 1);
            this.colorIndex = this.tags[index].path
            sessionStorage.setItem('tagsData', JSON.stringify(this.tags))
          }
        }
      }).catch(() => {
        return false        
      })
    }
  },
  mounted() {
    for (let i = 0; i < this.getRoutes.length; i ++) {
      if (!this.getRoutes[i].hidden) {
        this.meuns.push(this.getRoutes[i])
      }
    }
    this.title = this.$route.matched[0].meta.title
    this.icon = this.$route.matched[0].meta.icon
    if (sessionStorage.getItem('tagsData')) {
      this.tags = JSON.parse(sessionStorage.getItem('tagsData'))
    } else {
      this.tags.push({
        name: this.$route.matched[0].meta.title,
        path: this.$route.path
      })
      sessionStorage.setItem('tagsData', JSON.stringify(this.tags))
    }
    // console.log("菜单的展开跟路由有关系，查看elementui--el-menu  的default-active 属性")
  },
  
}

</script>
<style lang="scss" scoped>
.app_wapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.app_content {
  min-height: 500px;
  border: 1px solid #eee;
  box-sizing: border-box;
  .el-header{
    position: relative;
  }
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #d7d7d7;
  padding: 0 10px;
}
.el-menu--collapse{
  height: 100vh;
  min-width: 60px;
}
.sub_meuns_wapper:not(.el-menu--collapse) {
    min-width: 180px;
    min-height: 400px;
    height: 100vh;
  }
.breadcrumb-nav{
  position: absolute;
  bottom: 8px;
  left: 10px;
  
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner{
  font-weight: 600!important;
}

.nav-bar{
  .iconfont{
    margin-right: 10px;
    font-size: 20px;
  }
}

.tags-nav{
  box-sizing: border-box;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  height: 40px;
  background: #fafafa;
  box-shadow: #dadada 0px 0px 10px 0px inset;
  padding: 4px 10px;
  text-align: left;
  white-space:nowrap;
  .el-tag{
    cursor: pointer;
    border: 1px solid #ddd;
    background: #fff;
    color: #333;
    margin-right: 10px;
    a{
      color: #333;
    }
  }
}
.tags-nav::-webkit-scrollbar {/*滚动条整体样式*/

        width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/

        height: 5px;

    }

.tags-nav::-webkit-scrollbar-thumb {/*滚动条里面小方块*/

        border-radius: 10px;

         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);

        background: #a8a8a8;

    }

.tags-nav::-webkit-scrollbar-track {/*滚动条里面轨道*/

        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);

        border-radius: 10px;

        background: #EDEDED;

}
.logo-box{
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  position: relative;
  img{
    width: 80%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
