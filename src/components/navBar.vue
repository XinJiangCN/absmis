<template>
<div id="navBar">
    <el-menu default-active="2" class="el-menu-vertical-demo" theme="light" :router=true>
    <!-- submenu label indicates a folder name. Should not linked to a view-->
    <el-menu-item-group>  
    <template slot="title"></template> 
    </el-menu-item-group>
    <el-menu-item index="/changepasswd">更改密码</el-menu-item>
    <el-menu-item index="/accountmaintain">账户维护</el-menu-item>
    <el-submenu>
    <template slot="title">基本信息</template>
    <el-menu-item-group>
    <template slot="title"></template>
    <el-menu-item index="/designcompanyinfo">设计企业</el-menu-item>
    <el-menu-item index="/buildcompanyinfo">施工企业</el-menu-item>
    <el-menu-item index="/estatecompanyinfo">房地产企业</el-menu-item>
     <el-menu-item index="/componentcompanyinfo">构件部品生成企业及其他</el-menu-item>

    </el-menu-item-group>
    </el-submenu>



    </el-menu>
</div>
</template>
<script>
export default {
    methods: {
        //Default methods for the navBar
        //TODO remove them and add $http function to require the menu from server
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    //TODO include a update property here for update the menu when the data was updated
    data: function() {
        return {
            //menu data for showing in the nav bar
            //TODO should be linked to the navBar content after the update methods was built
            naiveMenu: '',
            secondClassMenu: [],
            thirdClassMenu:[],

            //determine the menu type
            menuController: false
        }
    }
}
</script>
