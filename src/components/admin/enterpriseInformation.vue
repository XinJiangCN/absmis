<template>
	<div>
		<el-form>
			<el-form-item label="企业名称">
		        <el-input v-model="enterprise.name" v-validate="'required'" name="username">
		        </el-input>
		        <span v-show="errors.has('username')">{{ errors.first('username') }}</span>
		    </el-form-item>

		    <el-form-item label="用户名">
		        <el-input v-model="enterprise.username" v-validate="'required'" name="name">
		        </el-input>
		        <span v-show="errors.has('name')">
		        	{{ errors.first('name') }}
		        </span>
		    </el-form-item>
		</el-form>
	</div>
</template>
<script>
import msgDialog from "../common/msgDialog"
	export default{
		props:['enterprise']
	}
</script>