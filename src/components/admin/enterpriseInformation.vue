<template>
	<div>
		<el-form :model="enterprise" :rules="rules" ref="enterprise">
			<el-form-item label="企业名称" prop="name">
		        <el-input v-model="enterprise.name" name="username">
		        </el-input>
		    </el-form-item>

		    <el-form-item label="用户名" prop="username">
		        <el-input v-model="enterprise.username" name="name">
		        </el-input>
		    </el-form-item>
		</el-form>
	</div>
</template>
<script>
import msgDialog from "../common/msgDialog"
	export default{
		props:['enterprise'],
		data(){
			var checkName=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入企业名称"))
				}else
				callback();
			}
			var checkUsername=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入用户名"))
				else
					callback();
			}
			return{
				rules:{
					name:[
						{validator:checkName,trigger:'change'&'blur'}
					],
					username:[
						{validator:checkUsername,trigger:'change'&'blur'}
					]
				}
			}
		}
	}
</script>