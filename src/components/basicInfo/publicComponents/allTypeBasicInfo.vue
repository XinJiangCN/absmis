<template>
<div>
	<el-form label-width="180px" :model="basicInfoData" :rules="rules" ref="basicInfoData">
		<el-row type="flex">
			<el-col :span="9">
	            <el-form-item label="联系人姓名" prop="contactPerson">
	                <el-input v-model="basicInfoData.contactPerson"></el-input>
	            </el-form-item>
			</el-col>
			<el-col :span="9">
	            <el-form-item label="身份证号码" prop="idNumber">
	                <el-input v-model="basicInfoData.idNumber"></el-input>
	            </el-form-item>
            </el-col>
        </el-row>


        <el-row type="flex">
            <el-form-item label="手机号码" prop="phoneNumber">
                <el-input v-model="basicInfoData.phoneNumber"></el-input>
            </el-form-item>

            <el-form-item label="办公电话" prop="officePhone">
                <el-input v-model.number="basicInfoData.officePhone"></el-input>
            </el-form-item>
        </el-row>

        <el-row type="flex">
            <el-form-item label="通讯地址" prop="mailingAddress">
                <el-input v-model="basicInfoData.mailingAddress"></el-input>
            </el-form-item>

            <el-form-item label="邮政编码" prop="postalCode">
                <el-input v-model="basicInfoData.postalCode"></el-input>
            </el-form-item>
        </el-row>


	</el-form>

    <el-row>
        <el-col :span="20">
            <el-button @click="submit('basicInfoData')" size="large">提交</el-button>
        </el-col>
    </el-row>
    <msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>

<script>
import msgDialog from '../../common/msgDialog'
	export default{
		props:['basicInfoData'],
        data(){
            var checkContactPerson=(rule,value,callback)=>{
                if(!value)
                    callback(new Error("必填项"))
                else
                    callback()
            }
            var checkIdNumber=(rule,value,callback)=>{
                if(!value)
                    callback(new Error("必填项"))
                else
                    callback()
            }
            var checkPhoneNumber=(rule,value,callback)=>{
                if(!value)
                    callback(new Error("必填项"))
                else
                    callback()
            }
            var checkOfficePhone=(rule,value,callback)=>{
                if(!value)
                    callback(new Error("必填项"))
                else
                    callback()
            }
            var checkMailingAddress=(rule,value,callback)=>{
                if(!value)
                    callback(new Error("必填项"))
                else
                    callback()
            }
            var checkPostalCode =(rule,value,callback)=>{
                if(!value)
                    callback(new Error("必填项"))
                else
                    callback()
            }
            return{
                rules:{
                    contactPerson:[
                        {validator:checkContactPerson,trigger:'blur'}
                    ],
                    idNumber:[
                        {validator:checkIdNumber,trigger:'blur'},
                        {pattern:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,message:'请填写正确证件号',trigger:'change'}
                    ],
                    phoneNumber:[
                        {validator:checkPhoneNumber,trigger:'blur'},
                        {pattern:/^1[3|4|5|7|8]\d{9}$/,message:'请输入正确的手机号',trigger:'change'}
                    ],
                    officePhone:[
                        {validator:checkOfficePhone,trigger:'blur'},
                        {type:'number',message:'请输入正确的电话号码',trigger:'change'}
                    ],
                    mailingAddress:[
                        {validator:checkMailingAddress,trigger:'blur'}
                    ],
                    postalCode:[
                        {validator:checkPostalCode,trigger:'blur'}
                    ]
                }
            }
        },
		methods:{
			submit(form){
                this.$refs[form].validate((valid)=>{
                    if(valid){
                        this.$emit('submitForm')
                    }else
                    this.$refs.msgDialog.confirm('填写信息有误，请填写完整后再提交')
                })
			}
		},
        components:{
            msgDialog
        }
	}
</script>