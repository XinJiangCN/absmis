<template>
<div id="header">
    <div class="headerContent">
    	<p>装配式建筑信息系统</p>
    </div>
    <div style="width:20%;float:left">
    	<p>{{ "当前用户：" + currentUser}}</p>
    </div>
</div>
</template>

<script>
export default{
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
<style type="text/css">
	#header{
		width: 100%;
		/* margin: 0 auto; */
	}
  .headerContent{
    font-size: 29px;
    width: 70%;
    float: left;
    padding-top: 5px !important;
    padding-left: 20px !important;
    padding-bottom: 10px !important;
  }
</style>
