<template>
	<el-form>
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