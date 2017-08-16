<template>
<div id="changePasswd">
    <el-row>
        <el-col :span="4">
            <label>原密码</label>
        </el-col>

        <el-col :span="8">
            <el-input v-model="oldPasswd" type="password"></el-input>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="4">
            <label>新密码</label>
        </el-col>

        <el-col :span="8">
            <el-tooltip 
                content="注意：密码长度至少为八位，包含两种以上字符" placement="top">
                <el-input v-model="newPasswd" type="password"></el-input>
            </el-tooltip>
        </el-col>

        <el-col :span="5" v-if="isPasswdFormatWrong">
            <p>格式错误！</p>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="4">
            <label>确认密码</label>
        </el-col>

        <el-col :span="8">
            <el-input v-model="reEnterPasswd" type="password"></el-input>
        </el-col>

        <el-col :span="5" v-if="isReEnterDiffrent">
            <p>两次输入不一致！</p>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="9">
            <el-button @click="handleSubmit">提交</el-button>
        </el-col>
    </el-row>
    <!-- 调用组件，利用ref调用子组件方法，实际无显示效果 -->
    <msg-dialog ref="updatePassword"></msg-dialog>
</div>
</template>

<script>
import msgDialog from '../common/msgDialog'
export default {
    data: function() {
        return {
            loginAccount: '',
            oldPasswd: '',
            newPasswd: '',
            reEnterPasswd: '',
            isPasswdFormatWrong: false,
            isReEnterDiffrent: false
        }
    },
    methods: {
        handleSubmit(){
            if (!this.oldPasswd
            || !this.newPasswd 
            || !this.reEnterPasswd) {
                alert('请完整填写信息！')
            } else if (this.isPasswdFormatWrong || this.isReEnterDiffrent) {
                alert('信息填写有误，请重新填写！')
            } else {
                //TODO POST THE DATA TO THE SERVER
                this.updatePassword()
            }

        },
        //将填写好的修改密码的数据提交给后台
        updatePassword(){
            var url = this.HOST + "/changePsd?oldPassword="+this.oldPasswd+"&newPassword="+this.newPasswd
            this.$http.post(url).then(response=>{
                if(response.data.success==true){
                    this.$refs.updatePassword.notify("密码修改成功")
                }else{
                    this.$refs.updatePassword.confirm("原密码错误！修改失败！")
                }
                this.oldPasswd=''
                this.newPasswd=''
                this.reEnterPasswd=''
            }).catch(error=>{
                this.$refs.updatePassword.confirm("修改失败！")
                this.oldPasswd=''
                this.newPasswd=''
                this.reEnterPasswd=''
            })

        }
    },
    watch: {
        reEnterPasswd: function() {
            setTimeout(() => { 
                if (this.reEnterPasswd != this.newPasswd)
                    this.isReEnterDiffrent = true
                else
                    this.isReEnterDiffrent = false
            },1000)
        },
        newPasswd: function() {
            this.isPasswdFormatWrong = false
            setTimeout(() => {
                if (this.newPasswd.length < 8)
                    this.isPasswdFormatWrong = true
                var patrn=/^[0-9]{1,20}$/;  
                if (patrn.exec(this.newPasswd)) 
                    this.isPasswdFormatWrong = true
                else 
                    this.isPasswdFormatWrong = false
            },1000)
        },
    },
    components:{
        msgDialog
    }
}
</script>
