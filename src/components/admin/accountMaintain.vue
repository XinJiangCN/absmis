<template>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="设计单位" name="designerAccountMaintain">
            <designer-account-maintain></designer-account-maintain>
        </el-tab-pane>

        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>

        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>

        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>

        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>

        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
</template>

<script>
import designerAccountMaintain from './designerAccountMaintain'
export default{
    components:{
        designerAccountMaintain
    }
}
</script>