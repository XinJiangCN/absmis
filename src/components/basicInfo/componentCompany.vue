<template>
<div id="component-basic-info">
  
    <el-row>
    <el-col>
    <label>企业类型: 构件部品生产企业及其设备生产企业、建设单位</label>
    </el-form-item>
    </el-col>
    </el-row>


    
    <el-row type="flex">
         <basic-info
    @submitForm="handleSubmit"
    ></basic-info>
    </el-row>
</div>
</template>
<script>
import basicInfo from './publicComponents/basicInfo.vue'
export default {
    data: function() {
        return {
        }
    },
    methods: {
        handleSubmit: function(formData) {
        } 
    },
    components: {
        basicInfo
    }
}

</script>

