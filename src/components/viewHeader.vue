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
    data: function() {
        return {
            currentUser: 'Admin'
        }
    }
}
</script>
