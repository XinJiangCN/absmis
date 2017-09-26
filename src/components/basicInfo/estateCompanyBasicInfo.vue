<template>
<div>
    <el-form :model="estateInformation" label-width="180px" :rules='rules' ref='estateInformation'>
    <!-- 调用组件，进行页面显示 -->
        <part-basic-info :basicInfoData="estateInformation" @checkOthers="checkOthers('estateInformation')" ref='partBasicInfo'></part-basic-info>
        <el-row>
            <el-col :span="6">
                <label>企业类型: 房地产企业</label>
            </el-col>
        </el-row>
        <!-- 空一行 -->
        <el-row></el-row>

        <el-row>
            <el-col :span="9">
                <el-form-item label="资质证书编号" prop="qualificationNo">
                    <el-input v-model="estateInformation.qualificationNo"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="9">
                <el-form-item label="资质等级">
                    <el-select v-model="estateQualificationId" placeholder="请选择">
                        <el-option
                            v-for="item in estateQualifications"
                            :key="item.id"
                            :label="item.description"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="18">
                <el-form-item label="本单位从事装配式建筑初始累计" prop="cumulant">
                    <el-input v-model.number="estateInformation.cumulant"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <!-- 调用组件进行页面显示 -->
    <all-type-basic-info :basicInfoData="estateInformation"
        @submitForm="submitBasicInfoDialog"
    ></all-type-basic-info>
    <!-- 调用组件，使用其中的消息提示框，无显示意义 -->
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
    //加载页面时运行
    created(){
        //获取当前使用者的所有信息
        var userNameUrl = this.HOST + '/returnUserInfo'
        this.$http.get(userNameUrl).then(response=>{
            this.estateInformation = response.data
            if(response.data.realEstateEnQualification!=null){
                this.estateQualificationId=response.data.realEstateEnQualification.id
            }
        }).catch(error=>{
            this.$refs.msgForSubmit.confirm("获取失败！")
        })
        //获取所有资质等级选择项
        var estateQualificationUrl = this.HOST + '/findAllRealEstateEnQualifications'
        this.$http.get(estateQualificationUrl).then(response=>{
            this.estateQualifications=response.data
        }).catch(error=>{
            this.$refs.msgForSubmit.confirm("获取失败！")
        })
    },
    data() {
        var checkQualificationNo=(rule,value,callback)=>{
            if(!value)
                callback(new Error("必填项"))
            else
                callback()
        }
        var checkCumulant=(rule,value,callback)=>{
            if(!value)
                callback(new Error("必填项"))
            else
                callback()
        }
        return {
            //用来存放当前使用者的所有信息
            estateInformation: {},
            //当前资质等级的id，用于初始显示和提交
            estateQualificationId:'',
            //资质等级下拉框选项
            estateQualifications:[],
            //提交所有信息时的确认对话框
            submitBasicInfoDialogVisible:false,
            rules:{
                qualificationNo:[
                    {validator:checkQualificationNo,trigger:'blur'}
                ],
                cumulant:[
                    {validator:checkCumulant,trigger:'blur'},
                    {type:'number',message:'只能填写数字',trigger:'change'}
                ]
            }
        }
    },
    methods: {
        //点击提交时触发本方法
        handleSubmit: function() {
            //关闭对话框
            this.submitBasicInfoDialogVisible=false
            //给将要提交的对象的资质等级赋值
            this.estateInformation.realEstateEnQualification=this.estateQualificationId
            var url = this.HOST + '/updateRealEstateEn'
            this.$http.put(url,this.estateInformation).then(response=>{
                this.$refs.msgForSubmit.notify("提交成功！")
            }).catch(error=>{
                this.$refs.msgForSubmit.confirm("提交失败！")
            })
        },
        submitBasicInfoDialog(){
            this.$refs.partBasicInfo.check();
        },
        checkOthers(form){
            this.$refs[form].validate((valid)=>{
                if(valid){
                    if(this.estateQualificationId!=''){
                        this.submitBasicInfoDialogVisible=true
                    }else{
                        this.$refs.msgForSubmit.confirm('资质等级不能为空')
                    }
                }else{
                    this.$refs.msgForSubmit.confirm("填写信息有误，请填写完整后再提交")
                }
            })
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
