<template>
	<el-form>
	    <el-form-item label="用户名">
	        <el-input v-model="enterprise.username" v-validate="'required'" name="username">
	        </el-input>
	        <span v-show="errors.first('username')">
	        	{{errors.first('username')}}
	        </span>
	    </el-form-item>
	</el-form>
</template>
<script>
	export default{
		props:['enterprise']
	}
</script>