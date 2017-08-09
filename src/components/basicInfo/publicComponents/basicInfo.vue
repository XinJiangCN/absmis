<template>
<div id="basicInfo">
   <el-form :model="formData" label-width="180px">
    <el-row type="flex">
    <el-form-item label="统一社会信用代码">
    <el-input v-model="formData.creditCode"></el-input>
    </el-form-item>



    <el-form-item label="组织机构代码">
    <el-input v-model="formData.organizationCode"></el-input>
    </el-form-item>
    </el-row>

    <el-row type="flex">
    <el-form-item label="企业名称">
    <el-input v-model="formData.name"></el-input>
    </el-form-item>
    </el-row>

    <el-row type="flex">
    <el-form-item label="所在市县">
    <el-input v-model="formData.city"></el-input>
    </el-form-item>



    <el-form-item label="法定代表人">
    <el-input v-model="formData.legalRepresentative"></el-input>
    </el-form-item>
    </el-row>




    <el-row type="flex">
    <el-form-item label="联系人姓名">
    <el-input v-model="formData.contactPerson"></el-input>
    </el-form-item>



    <el-form-item label="身份证号码">
    <el-input v-model="formData.idNumber"></el-input>
    </el-form-item>
    </el-row>
    <el-row type="flex">
    <el-form-item label="手机号码">
    <el-input v-model="formData.phoneNumber"></el-input>
    </el-form-item>



    <el-form-item label="办公电话">
    <el-input v-model="formData.officePhone"></el-input>
    </el-form-item>
    </el-row>
    <el-row type="flex">
    <el-form-item label="通讯地址">
    <el-input v-model="formData.mailingAddress"></el-input>
    </el-form-item>



    <el-form-item label="邮政编码">
    <el-input v-model="formData.postalCode"></el-input>
    </el-form-item>
    </el-row>
    <el-row>
    <el-button @click="submit">提交</el-button>
    </el-row>

    </el-form>


</div>
</template>
<script>
export default {
    data: function() {
        return {
            formData: {
                creditCode: '',
                organizationCode:'',
                name: '',
                city: '',
                legalRepresentative: '',
                contactPerson: '',
                idNumber: '',
                phoneNumber: '',
                officePhone: '',
                mailingAddress: '',
                postalCode: ''
            },

        }
    },
    methods: {
        submit: function() {
            this.$emit('submitForm', this.formData)    
        }
    }
}

</script>
