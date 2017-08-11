<template>
	<el-form>
		<el-form-item label="企业名称">
	        <el-input v-model="enterprise.name">
	        </el-input>
	    </el-form-item>

	    <el-form-item label="用户名">
	        <el-input v-model="enterprise.username">
	        </el-input>
	    </el-form-item>
	</el-form>
</template>
<script>
	export default{
		props:['enterprise']
	}
</script>