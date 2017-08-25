<template>
<div id="viewHeader">
    <el-row>
    <el-col :span="5"> 
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    </el-col>
    <el-col :span="5">
    <p>{{ "当前用户：" + currentUser}}</p>
    </el-col>
    </el-row>

</div>
</template>

<script>
export default {
    data() {
      return {
        currentUser: ''
      }
    },
    methods: {
      //查询所要显示的表格，或者刷新该表格使用
      findUser() {
        //初始显示表格用的查询数据
        //当前多少页 一页多少条
        this.$http.get(this.HOST + "/userInfo").then(response => {
          this.currentUser = response.data.userType;
        }).catch(error => {
          
        })
      }
    },
    //watch负责监听，当监听对象发生变化时，运行对应的方法
    watch: {},
    //页面加载时运行
    created() {
      this.findUser()
    }
  }
</script>
