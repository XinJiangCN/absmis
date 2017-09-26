<template>
<div>
    <el-form :model="designInformation" label-width="180px" :rules="rules" ref="designInformation">

        <part-basic-info :basicInfoData="designInformation" ref="partBasicInfo"
            @checkOthers="checkOthers('designInformation')"
        ></part-basic-info>
        <el-row>
            <el-col :span="6">
                <label>企业类型: 设计单位</label>
            </el-col>
        </el-row>

        <el-row></el-row>

        <el-row>
            <el-col :span="9">
                <el-form-item label="资质证书编号" prop="qualificationNo">
                    <el-input v-model="designInformation.qualificationNo"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="9">
            <el-form-item label="资质等级">
                <el-select v-model="designerQualificationId" placeholder="请选择">
                    <el-option
                        v-for="item in designerQualifications"
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
                    <el-input v-model.number="designInformation.cumulant"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <all-type-basic-info :basicInfoData="designInformation"
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
        var userNameUrl = this.HOST + '/returnUserInfo'
        this.$http.get(userNameUrl).then(response=>{
            this.designInformation = response.data
            if(response.data.designerQualification!=null){
                this.designerQualificationId=response.data.designerQualification.id
            }
        }).catch(error=>{
            this.$refs.msgForSubmit.confirm("获取失败！")
        })
        var designerQualificationUrl = this.HOST + '/findAllDesignerQualifications'
        this.$http.get(designerQualificationUrl).then(response=>{
            this.designerQualifications=response.data
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
                callback();
        }
        return {
            //用来保存当前使用者的所有信息
            designInformation: {},
            //用来保存当前的资质等级id
            designerQualificationId:'',
            //资质等级下拉框选项
            designerQualifications:[],
            //提交所有信息时的确认对话框
            submitBasicInfoDialogVisible:false,
            rules:{
                qualificationNo:[
                    {validator:checkQualificationNo,trigger:'blur'}
                ],
                cumulant:[
                    {validator:checkCumulant,trigger:'blur'},
                    {type:'number',message:'只能填写数字',trigger:'change'}
                ],
            }
        }
    },
    methods: {
        handleSubmit() {
            this.submitBasicInfoDialogVisible=false
            this.designInformation.designerQualification=this.designerQualificationId
            var url = this.HOST + '/updateDesigner'
            this.$http.put(url,this.designInformation).then(response=>{
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
                    if(this.designerQualificationId!=''){
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
