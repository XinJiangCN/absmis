<template>
	<div>
		<el-row>
			<el-col :span="5">
				<h4>资质企业基本信息审核</h4>
			</el-col>
		</el-row>
		<el-tabs v-model="activeName2" type="card">
		    <el-tab-pane label="设计单位" name="designTraditionalInfoCheck">
		    	<design-traditional-info-check></design-traditional-info-check>
		    </el-tab-pane>

		    <el-tab-pane label="房地产企业" name="estateTraditionalInfoCheck">
		    	<estate-traditional-info-check></estate-traditional-info-check>
		    </el-tab-pane>

		    <el-tab-pane label="施工单位" name="buildTraditionalInfoCheck">
		    	<build-traditional-info-check></build-traditional-info-check>
		    </el-tab-pane>
	    </el-tabs>
	  </div>
</template>

<script>
import designTraditionalInfoCheck from './designTraditionalInfoCheck'
import estateTraditionalInfoCheck from './estateTraditionalInfoCheck'
import buildTraditionalInfoCheck from './buildTraditionalInfoCheck'
	export default{
		components:{
			designTraditionalInfoCheck,
			estateTraditionalInfoCheck,
			buildTraditionalInfoCheck
		}
	}
</script>
