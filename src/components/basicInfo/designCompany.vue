<template>
<div id="design-basic-info">
  
    <el-form ref="form" :model="designForm" label-width="180px">
    <el-row>
    <el-col>
    <label>企业类型: 设计企业</label>
    </el-form-item>
    </el-col>
    </el-row>
    <el-row type="flex">
    
    <el-form-item label="本单位从事装配式建筑当前累计">
    <el-col :span="20">
    <el-input v-model="designForm.count"></el-input>
    </el-col>
    </el-form-item>

    </el-col>
    </el-row>

   <el-row type="flex"> 
    <el-col>
    <el-form-item label="资质证书编号">
    <el-input v-model="designForm.qualificationNum"></el-input>
    </el-form-item>
    </el-col>
    <el-col>
    <el-form-item label="资质等级">
    <el-select v-model="designForm.qualificationlevel" placeholder="请选择">
    <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
    </el-option>
    </el-select>
    </el-form-item>
    </el-col>
    </el-row>
    </el-form>
      <basic-info
    @submitForm="handleSubmit"
    ></basic-info>

</div>
</template>
<script>
import basicInfo from './publicComponents/basicInfo.vue'
export default {
    data: function() {
        return {
            designForm: {
                count: '',
                qualificationNum: '',
                qualificationlevel: ''
            },
            options: [
                { value: 'A', label: "甲级"},
                { value: 'B', label: "乙级"},
                { value: 'C', label: "丙级"}
            ]


        }
    },
    methods: {
        handleSubmit: function(formData) {
            formData.count = this.designForm.count
            formData.qualificationNum = this.designForm.qualificationNum
            formData.qualificationlevel = this.designForm.qualificationlevel
            //TODO connect the server
        } 
    },
    components: {
        basicInfo
    }
}

</script>
