<template>
<div>
	<el-form>
		<el-form-item label="审核状态" >
	        <el-select v-model="updateForm.checkedStatus" placeholder="请选择">
	            <el-option
	              v-for="item in checkedStatuss"
	              :key="item.id"
	              :label="item.state"
	              :value="item.id">
	            </el-option>    
	        </el-select>
	    </el-form-item>
	</el-form>
</div>
</template>
<script>
	export default{
		data(){
		      return {
		        checkedStatuss:{
		        	id:'',
		        	state:''
		        }
		      }
		},
		props:['updateForm'],
		methods:{
			findAllCheckedStatus() {
		        var url = this.HOST + "/findAllCheckedStates"
		        this.$http.get(url).then(response => {
		          this.checkedStatuss = response.data;
		        }).catch(error => {
		          this.$refs.msgDialog.confirm("查询失败")
		        })
	      }
		},
		 created() {
      			this.findAllCheckedStatus()
    	}
	}
</script>