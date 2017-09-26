<template>
  <el-form :model="formForChangePwd" :rules="rules" label-width="180px" ref="formForChangePwd">
    <el-row>
      <el-col :span='15'>
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="formForChangePwd.oldPwd"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='15'>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="formForChangePwd.newPwd">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='15'>
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input v-model="formForChangePwd.checkPwd"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="15">
        <el-form-item>
          <el-button type="primary" @click="submitForm('formForChangePwd')">提交</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <msg-dialog ref="msgDialog"></msg-dialog>
  </el-form>
</template>
<script>
import msgDialog from '../common/msgDialog'
  export default{
    data(){
      var validateOldPwd=(rule,value,callback)=>{
        if(!value){
          callback(new Error("请输入原密码"))
        }else
        callback()
      }
      var validateNewPwd=(rule,value,callback)=>{
        var patrn=/[0-9]/  
        var patrn1=/[a-zA-Z]/
        if(!value){
          callback(new Error("请输入密码"))
        }else if(!patrn.exec(value)||!patrn1.exec(value)){
          callback(new Error("至少需要含有数字和字母两种字符"))
        }else if(value.length<8){
          callback(new Error("至少需要8位字符"))
        }else {
          if(this.formForChangePwd.checkPwd!=''){
            this.$refs.formForChangePwd.validateField('checkPwd')
          }
          callback()
        }
      }
      var validateCheckPwd=(rule,value,callback)=>{
        if(!value){
          callback(new Error("请再次输入密码"))
        }else if(value!=this.formForChangePwd.newPwd){
          callback(new Error("两次输入密码不一致！"))
        }else
        callback()
      }
      return{
        formForChangePwd:{
          oldPwd:'',
          newPwd:'',
          checkPwd:''
        },
        rules:{
          oldPwd:[
            {validator:validateOldPwd,trigger:'change'&'blur'},
          ],
          newPwd:[
            {validator:validateNewPwd,trigger:'change'&'blur'},
          ],
          checkPwd:[
            {validator:validateCheckPwd,tigger:'change'&'blur'}
          ]
        }
      }
    },
    methods:{
      submitForm(formForChangePwd){
        this.$refs[formForChangePwd].validate((valid)=>{
          if(valid){
            var url = this.HOST + "/changePsd?oldPassword="+this.formForChangePwd.oldPwd+"&newPassword="+this.formForChangePwd.newPwd
            this.$http.post(url).then(response=>{
                if(response.data.success==true){
                    this.$refs.msgDialog.notify("密码修改成功")
                }else{
                    this.$refs.msgDialog.confirm("原密码错误！修改失败！")
                }
                this.oldPasswd=''
                this.newPasswd=''
                this.reEnterPasswd=''
            }).catch(error=>{
                this.$refs.msgDialog.confirm("修改失败！")
                this.oldPasswd=''
                this.newPasswd=''
                this.reEnterPasswd=''
            })
          }else{
            this.$refs.msgDialog.confirm("信息填写有误，提交失败！")
          }
        })
        
      }
    },
    components:{
        msgDialog
    }
  }
</script>