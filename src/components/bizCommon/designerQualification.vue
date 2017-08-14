<template>
	<el-form>
		<el-form-item label="资质" >
	        <el-select v-model="updateForm.designerQualification" placeholder="请选择">
	            <el-option
	              v-for="item in designerQualification"
	              :key="item.id"
	              :label="item.description"
	              :value="item.id">
	            </el-option>    
	        </el-select>
	    </el-form-item>
	</el-form>
</template>
<script>
	export default{
		props:['designerQualification','updateForm']
	}
</script>