<template>
	<el-form>
		<el-form-item label="工程名称">
	        <el-input v-model="unitEngineeringDialog.name" :disabled="true">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="建筑面积">
	        <el-input v-model="unitEngineeringDialog.constructionArea":disabled="true">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="地上层数">
	        <el-input v-model="unitEngineeringDialog.undergroundNum":disabled="true">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="地下层数">
	        <el-input v-model="unitEngineeringDialog.overgroundNum":disabled="true">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="工程类别">
	        <el-input v-model="unitEngineeringDialog.engineeringCategory":disabled="true">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="结构形式">
	    	<el-select v-model="unitEngineeringDialog.structureForm.id" placeholder="请选择":disabled="true">
	            <el-option
	              v-for="item in structureForms"
	              :key="item.id"
	              :label="item.description"
	              :value="item.id">
	            </el-option>    
	        </el-select>
	    </el-form-item>
	    <el-form-item label="单体装配率">
	        <el-input v-model="unitEngineeringDialog.engineeringIndustrialization.unitAssemblyRate":disabled="true">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="外墙预制比例应用产业化技术的建筑面积">
	        <el-input v-model="unitEngineeringDialog.engineeringIndustrialization.exteriorWallArea":disabled="true">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="预制外墙水平投影面积">
	        <el-input v-model="unitEngineeringDialog.engineeringIndustrialization.wallShadowArea":disabled="true">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="不纳入地上容积率的建筑面积">
	        <el-input v-model="unitEngineeringDialog.engineeringIndustrialization.conArea":disabled="true">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="应用结构类型">
	    	<el-select v-model="unitEngineeringDialog.engineeringIndustrialization.applicationStructureType.id" placeholder="请选择":disabled="true">
	            <el-option
	              v-for="item in applicationStructureTypes"
	              :key="item.id"
	              :label="item.description"
	              :value="item.id">
	            </el-option>    
	        </el-select>       
	    </el-form-item>
	    <el-form-item label="应用楼层范围">
	        <el-input v-model="unitEngineeringDialog.engineeringIndustrialization.floorScope":disabled="true">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="应用构件部品">
	        <el-checkbox label="柱" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.columnFs":disabled="true"></el-checkbox>
		    <el-checkbox label="梁" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.beamFs":disabled="true"></el-checkbox>
		    <el-checkbox label="楼板" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.floorFs":disabled="true"></el-checkbox>
		    <el-checkbox label="楼梯" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.stairsFs":disabled="true"></el-checkbox>
		    <el-checkbox label="外墙" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.exteriorWallFs":disabled="true"></el-checkbox>
		    <el-checkbox label="内墙" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.interiorWallFs":disabled="true"></el-checkbox>
		    <el-checkbox label="整体厨房" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.integralKitchenFs":disabled="true"></el-checkbox>
		    <el-checkbox label="整体卫生间" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.integralToiletFs":disabled="true"></el-checkbox>
		    <el-checkbox label="太阳能" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.solarEnergyFs":disabled="true"></el-checkbox>
	    </el-form-item>
	</el-form>
</template>
<script>
	export default{
		data(){
      		return{
        		applicationStructureTypes:[],
        		structureForms:[]
      		}
    	},
    	methods: {
    		findAllApplicationStructureTypes() {
	        	this.$http.get(this.HOST + "/findAllApplicationStructureTypes").then(response => {
	          	this.applicationStructureTypes = response.data;
	        	}).catch(error => {
	          	this.$refs.msgDialog.confirm("查询失败")
	        	})
	      	},
	       	findAllStructureForms() {
        		this.$http.get(this.HOST + "/findAllStructureForms").then(response => {
          		this.structureForms = response.data;
        		}).catch(error => {
          		this.$refs.msgDialog.confirm("查询失败")
        		})
      		}
    	},
		props:['unitEngineeringDialog'],
		created() {
      		this.findAllApplicationStructureTypes()
      		this.findAllStructureForms()
    	},
	}
</script>