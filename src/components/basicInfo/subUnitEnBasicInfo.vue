<template>
<div>
    <el-form :model="subUnitEnInformation" label-width="180px">
    <!-- 调用组件进行页面显示 -->
        <part-basic-info :basicInfoData="subUnitEnInformation"
        ref="partBasicInfo" @checkOthers="submit"></part-basic-info>
        <el-row>
            <el-col :span="7">
                <label>企业类型：部品生产企业</label>
            </el-col>
        </el-row>
        <el-row></el-row>
  
    </el-form>
    <!-- 调用组件进行页面显示 -->
    <all-type-basic-info :basicInfoData="subUnitEnInformation"
        @submitForm="submitBasicInfoDialog"
    ></all-type-basic-info>
    <!-- 调用组件，目的是利用组件中的消息提示框，实际无显示意义 -->
    <msg-dialog ref="msgForSubmit"></msg-dialog>
    <!-- 调用组件进行页面显示 -->
    <confirmation-dialog 
        :submitBasicInfoDialogVisible="submitBasicInfoDialogVisible"
        @handleSubmit="handleSubmit"
        @cancle="submitBasicInfoDialogVisible=false"
    ></confirmation-dialog>
</div>
</template>
<script>
import partBasicInfo from './publicComponents/partBasicInfo'
import allTypeBasicInfo from './publicComponents/allTypeBasicInfo'
import msgDialog from '../common/msgDialog'
import confirmationDialog from './publicComponents/confirmationDialog'
export default {
    //加载页面时使用
    created(){
        //获取当前使用者的所有信息
        var userNameUrl = this.HOST + '/returnUserInfo'
        this.$http.get(userNameUrl).then(response=>{
            this.subUnitEnInformation = response.data
        }).catch(error=>{
            this.$refs.msgForSubmit.confirm("获取失败！")
        })
    },
    data: function() {
        return {
            //用来存放当前使用者的所有信息
            subUnitEnInformation: {},
            //提交所有信息时的确认对话框
            submitBasicInfoDialogVisible:false
        }
    },
    methods: {
        //点击提交时触发本方法
        handleSubmit() {
            //关闭对话框
            this.submitBasicInfoDialogVisible=false
            var url = this.HOST + '/updateSubUnitEn'
            this.$http.put(url,this.subUnitEnInformation).then(response=>{
                this.$refs.msgForSubmit.notify("提交成功！")
            }).catch(error=>{
                this.$refs.msgForSubmit.confirm("提交失败！")
            })
        },
        submitBasicInfoDialog(){
            this.$refs.partBasicInfo.check();
        },
        submit(){
            this.submitBasicInfoDialogVisible=true
        } 
    },
    components: {
        partBasicInfo,
        allTypeBasicInfo,
        msgDialog,
        confirmationDialog
    }
}

</script>
