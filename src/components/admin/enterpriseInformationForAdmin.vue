<template>
	<el-form :rules="rulesForUsers" :model="enterprise">
	    <el-form-item label="用户名" prop="username"> 
	        <el-input v-model="enterprise.username" name="username">
	        </el-input>
	    </el-form-item>
	</el-form>
</template>
<script>
	export default{
		props:['enterprise'],
		data(){
			var checkUsername=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入用户名"))
				}else{
					callback()
				}
			}
			return{
				rulesForUsers:{
					username:[
						{validator:checkUsername,trigger:'change'&'blur'}
					]
				}
			}
		}
	}
</script>