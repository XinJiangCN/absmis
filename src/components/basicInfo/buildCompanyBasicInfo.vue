<template>
<div>
    <el-form :model="buildInformation" label-width="180px" :rules="rules" ref="buildInformation">
        <part-basic-info :basicInfoData="buildInformation" 
        @checkOthers="checkOthers('buildInformation')" ref='partBasicInfo'></part-basic-info>
        <el-row>
            <el-col :span="6">
                <label>企业类型: 施工单位</label>
            </el-col>
        </el-row>
        <el-row>
        </el-row>
        <el-row>
            <el-col :span="9">
                <el-form-item label="资质证书编号" prop="qualificationNo">
                    <el-input v-model="buildInformation.qualificationNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="9">
                <el-form-item label="资质等级" prop="builderQualificationId">
                    <el-select v-model="builderQualificationId" placeholder="请选择">
                        <el-option
                            v-for="item in buildQualifications"
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
                    <el-input v-model.number="buildInformation.cumulant"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <all-type-basic-info :basicInfoData="buildInformation"
        @submitForm="submitBasicInfoDialog"
    ></all-type-basic-info>

    <msg-dialog ref="msgForSubmit"></msg-dialog>

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
    created(){
        //加载页面时使用，获取当前使用者的所有信息
        var userNameUrl = this.HOST + '/returnUserInfo'
        this.$http.get(userNameUrl).then(response=>{
            this.buildInformation = response.data
            if(response.data.builderQualification!=null){
                this.builderQualificationId=response.data.builderQualification.id
            }
        }).catch(error=>{
            this.$refs.msgForSubmit.confirm("获取失败！")
        })
        //获取所有的资质等级可选项
        var buildQualificationUrl = this.HOST + '/findAllBuilderQualifications'
        this.$http.get(buildQualificationUrl).then(response=>{
            this.buildQualifications=response.data
        }).catch(error=>{
            this.$refs.msgForSubmit.confirm("获取失败！")
        })
    },
    data: function() {
        var checkQualificationNo=(rule,value,callback)=>{
            if(!value)
                callback(new Error('必填项'))
            else
                callback()
        }
        var checkCumulant=(rule,value,callback)=>{
            if(!value)
                callback(new Error('必填项'))
            else
                callback()
        }
        return {
                rules: {
                    qualificationNo: [
                        { required: true, message: '请输入资质证书编号', trigger: 'blur' }
                    ],
                    builderQualificationId: [
                        { required: true, message: '请选择资质等级', trigger: 'blur' }
                    ],
                    cumulant: [
                        { required: true, message: '请输入本单位从事装配式建筑初始累计', trigger: 'blur' }
                    ]
                },
            //用来存放当前使用者的所有信息
            buildInformation: {},
            //资质等级下拉框选项
            buildQualifications:[],
            //资质等级的Id，用于初始显示以及向后台提交
            builderQualificationId:'',
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
        //当点击提交时触发本方法
        handleSubmit() {
            //关闭弹出框
            this.submitBasicInfoDialogVisible=false
            //将选择的资质等级赋值给将要提交的对象
            this.buildInformation.builderQualification=this.builderQualificationId
            var url = this.HOST + '/updateBuilder'
            this.$http.put(url,this.buildInformation).then(response=>{
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
                    if(this.builderQualificationId!=''){
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