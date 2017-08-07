<template>
<div id="changePasswd">
    <el-row>
    <p>{{"当前用户：" + currentUser}}</p>
    </el-row>
    <el-row>
    <el-col :span="4">
    <label>登录账号</label>
    </el-col>
    <el-col :span="8">
    <el-tooltip content="注意：账号只能包含数字或者字母" placement="top">
    <el-input v-model="loginAccount"></el-input>
    </el-tooltip>
    </el-col>
    </el-row>
    <el-row>
    <el-col :span="4">
    <label>原密码</label>
    </el-col>
    <el-col :span="8">
    <el-input v-model="oldPasswd"></el-input>
    </el-col>
    </el-row>
    <el-row>
    <el-col :span="4">
    <label>新密码</label>
    </el-col>
    <el-col :span="8">
    <el-tooltip content="注意：密码长度至少为八位，包含两种以上字符" placement="top">
    <el-input v-model="newPasswd"></el-input>
    </el-tooltip>
    </el-col>
    </el-row>
    <el-row>
    <el-col :span="4">
    <label>确认密码</label>
    </el-col>
    <el-col :span="8">
    <el-input v-model="reEnterPasswd"></el-input>
    </el-col>
    </el-row>
    <el-row>
    <el-col :gutter="8">
    <el-button @click="handleSubmit">提交</el-button>
    </el-col>

    </el-row>


</div>
</template>
<script>

export default {
    data: function() {
        return {
            currentUser: 'Admin',
            loginAccount: '',
            oldPasswd: '',
            newPasswd: '',
            reEnterPasswd: '',
            isPasswdVerifed: false
        }
    },
    methods: {
        handleSubmit: function() {
            if (!this.loginAccount 
                || !this.oldPasswd
            || !this.newPasswd 
            || !this.reEnterPasswd) {
                alert('请完整填写信息！')
            } else if (!this.isPasswdVerifed) {
                alert('信息填写有误，请重新填写！')
            }
        }
    }
}
</script>
