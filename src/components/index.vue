<template>
<!DOCTYPE html>
<div id="index">
    <div id="indexContent">
        <!-- Header Part -->
        <index-header></index-header>
        <!-- Row for the main index part-->
        <el-row :gutter="20">
            <!-- Left for the navigation bar -->
            <el-col :span="6">
            <div id="navBar">
                <nav-bar></nav-bar>
            </div>
            </el-col>
             <!-- Right part for the view offerred by the router,
                 with the transition effects-->
             <el-col :span="18">

             <div id="view">
                 <transition name="el-fade-in">
                 <router-view></router-view>
                 </transition>
             </div>
             </el-col>
        </el-row>
    </div>
    <!--Footer Part
        The push div used to prevent overlaping when the content is full-->
    <div id="push"></div>
    <index-footer></index-footer>
</div>
</template>

<script>
import navBar from './navBar.vue'
import indexFooter from './footer.vue'
import indexHeader from './header.vue'
export default {
    data: function() {
        return{} 
    },
    components: {
        indexFooter,
        indexHeader,
        navBar
    },
    methods: {
    }
}


</script>

<style>
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
    min-height:100vh;         
    margin-bottom:-70px; 
}
#push {
    height:60px;
}
</style>
