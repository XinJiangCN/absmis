<template>
<div>
	<el-form label-width="180px">
		<el-row type="flex">
			<el-col :span="9">
	            <el-form-item label="联系人姓名">
	                <el-input v-model="basicInfoData.contactPerson"></el-input>
	            </el-form-item>
			</el-col>
			<el-col :span="9">
	            <el-form-item label="身份证号码">
	                <el-input v-model="basicInfoData.idNumber"></el-input>
	            </el-form-item>
            </el-col>
        </el-row>


        <el-row type="flex">
            <el-form-item label="手机号码">
                <el-input v-model="basicInfoData.phoneNumber"></el-input>
            </el-form-item>

            <el-form-item label="办公电话">
                <el-input v-model="basicInfoData.officePhone"></el-input>
            </el-form-item>
        </el-row>

        <el-row type="flex">
            <el-form-item label="通讯地址">
                <el-input v-model="basicInfoData.mailingAddress"></el-input>
            </el-form-item>

            <el-form-item label="邮政编码">
                <el-input v-model="basicInfoData.postalCode"></el-input>
            </el-form-item>
        </el-row>


	</el-form>

    <el-row>
        <el-col :span="20">
            <el-button @click="submit" size="large">提交</el-button>
        </el-col>
    </el-row>
</div>
</template>

<script>
	export default{
		props:['basicInfoData'],
		methods:{
			submit(){
				this.$emit('submitForm')
			}
		}
	}
</script>