<template>
    <div id="indexContent">
        <el-row class="header">
            <!-- Header Part -->
            <index-header></index-header>
        </el-row>   
        <!-- Row for the main index part-->
        <el-row :gutter="20" class="main">
            <!-- Left for the navigation bar -->
            <el-col :span="5" id="navBar" class="menu">     
                <nav-bar></nav-bar>
            </el-col>
            <!-- Right part for the view offerred by the router,
                     with the transition effects-->
            <el-col :span="18" class="content">
                <el-row>
                    <view-header></view-header>
                </el-row>
                <el-row>
                    <transition name="el-fade-in">
                        <router-view></router-view>
                    </transition>
                </el-row>
            </el-col>
        </el-row>
        <!--Footer Part
            The push div used to prevent overlaping when the content is full-->
        <el-row class="footer">
            <index-footer></index-footer>
        </el-row>
    </div>    
</template>

<script>
import navBar from './navBar.vue'
import indexFooter from './footer.vue'
import indexHeader from './header.vue'
import viewHeader from './viewHeader.vue'
export default {
    data: function() {
        return{
        } 
    },  
    components: {
        indexFooter,
        indexHeader,
        navBar,
        viewHeader
    },
    methods: {
    }
}


</script>

<style>
html,body{
    height:100%;
    margin:0;
    padding:0;
}

.el-row {
    margin-right: 0;
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
#indexContent {
    overflow-x: hidden;
     
}
.header{
    width: 100%;
    height: 80px;
    position:absolute;
    z-index:5;
    top:0;
    /*background-color:#475669;*/
}

.main{
    width:100%;
    overflow:auto;
    top:80px;
    bottom: 50px;
    position:absolute;
    z-index:10;
}
.menu{
    position:fixed;
    height: 77%;
    background-color:#475669;
}
.content{
    margin-left: 280px;
}
.footer{
    background-color:#1F2D3D;  
    height:50px;
    width:100%;
    position:absolute;
    bottom: 0px;
    left: 0px;
}
</style>
