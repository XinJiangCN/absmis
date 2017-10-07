<template>
<div>
	<el-form ref="checkForm" :model="unitEngineeringDialog" :rules="rules">
		<el-form-item label="工程名称"prop="name">
	        <el-input v-model="unitEngineeringDialog.name">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="工程开工时间"prop="startingTime">
			    <el-date-picker
			      v-model="unitEngineeringDialog.startingTime"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      >
			    </el-date-picker>
		</el-form-item>
	    <el-form-item label="建筑面积"prop="constructionArea">
	        <el-input v-model.number="unitEngineeringDialog.constructionArea"><template slot="append">万平方米</template>
	        </el-input>
	    </el-form-item>
	    <el-form-item label="地上层数"prop="undergroundNum">
	        <el-input v-model.number="unitEngineeringDialog.undergroundNum"><template slot="append">层</template>
	        </el-input>
	    </el-form-item>
	    <el-form-item label="地下层数"prop="overgroundNum">
	        <el-input v-model.number="unitEngineeringDialog.overgroundNum">
	        <template slot="append">层</template></el-input>
	    </el-form-item>
	    <el-form-item label="工程类别"prop="engineeringCategory">
	        <el-input v-model="unitEngineeringDialog.engineeringCategory">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="结构形式"prop="structureForm">
	    	<el-select v-model="unitEngineeringDialog.structureForm.id" placeholder="请选择">
	            <el-option
	              v-for="item in structureForms"
	              :key="item.id"
	              :label="item.description"
	              :value="item.id">
	            </el-option>    
	        </el-select>
	    </el-form-item>
	    <el-form ref="checkForm2" :model="unitEngineeringDialog.engineeringIndustrialization" :rules="rules">
	    <el-form-item label="单体装配率"prop="unitAssemblyRate">
	        <el-input v-model.number="unitEngineeringDialog.engineeringIndustrialization.unitAssemblyRate">
	        </el-input>
	    </el-form-item>
	    <el-form-item label="外墙预制比例应用产业化技术的建筑面积"prop="exteriorWallArea">
	        <el-input v-model.number="unitEngineeringDialog.engineeringIndustrialization.exteriorWallArea"><template slot="append">万平方米</template>
	        </el-input>
	    </el-form-item>
	    <el-form-item label="预制外墙水平投影面积"prop="wallShadowArea">
	        <el-input v-model.number="unitEngineeringDialog.engineeringIndustrialization.wallShadowArea"><template slot="append">万平方米</template>
	        </el-input>
	    </el-form-item>
	    <el-form-item label="不纳入地上容积率的建筑面积"prop="conArea">
	        <el-input v-model.number="unitEngineeringDialog.engineeringIndustrialization.conArea"><template slot="append">万平方米</template>
	        </el-input>
	    </el-form-item>
	    <el-form-item label="应用结构类型"prop="applicationStructureType">
	    	<el-select v-model="unitEngineeringDialog.engineeringIndustrialization.applicationStructureType.id" placeholder="请选择">
	            <el-option
	              v-for="item in applicationStructureTypes"
	              :key="item.id"
	              :label="item.description"
	              :value="item.id">
	            </el-option>    
	        </el-select>       
	    </el-form-item>
	    <el-form-item label="应用楼层范围"prop="floorScope">
	        <el-input v-model="unitEngineeringDialog.engineeringIndustrialization.floorScope">
	        </el-input>
	    </el-form-item>
	    </el-form>
	    <el-form-item label="应用构件部品">
	        <el-checkbox label="柱" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.columnFs"></el-checkbox>
		    <el-checkbox label="梁" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.beamFs"></el-checkbox>
		    <el-checkbox label="楼板" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.floorFs"></el-checkbox>
		    <el-checkbox label="楼梯" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.stairsFs"></el-checkbox>
		    <el-checkbox label="外墙" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.exteriorWallFs"></el-checkbox>
		    <el-checkbox label="内墙" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.interiorWallFs"></el-checkbox>
		    <el-checkbox label="整体厨房" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.integralKitchenFs"></el-checkbox>
		    <el-checkbox label="整体卫生间" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.integralToiletFs"></el-checkbox>
		    <el-checkbox label="太阳能" v-model="unitEngineeringDialog.engineeringIndustrialization.frameworkShear.solarEnergyFs"></el-checkbox>
	    </el-form-item>
	</el-form>
		<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script>
import msgDialog from '../common/msgDialog'
	export default{
		data(){
			var checkName=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入工程名称"))
				}else{
					callback()
				}	
			}
			var checkStartingTime=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入开工时间"))
				}else{
					callback()
				}	
			}
			var checkStructureForm=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入结构形式"))
				}else{
					callback()
				}	
			}
			var checkConstructionArea=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入建筑面积"))
				}else
				callback();
			}
			var checkUndergroundNum=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入地上层数"))
				}else
				callback();
			}
			var checkApplicationStructureType=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入地上层数"))
				}else
				callback();
			}
			var checkOvergroundNum=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入地下层数"))
				}else
				callback();
			}
			var checkEngineeringCategory=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入工程类别"))
				}else
				callback();
			}
			var checkUnitAssemblyRate=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入单体装配率"))
				}else
				callback();
			}
			var checkExteriorWallArea=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入外墙预制比例应用产业化技术的建筑面积"))
				}else
				callback();
			}
			var checkWallShadowArea=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入预制外墙水平投影面积"))
				}else
				callback();
			}
			var checkConArea=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入不纳入地上容积率的建筑面积"))
				}else
				callback();
			}
			var checkFloorScope=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入应用楼层范围"))
				}else
				callback();
			}
      		return{
        		applicationStructureTypes:[],
        		structureForms:[],
        		rules:{
					name:[
						{validator:checkName,trigger:'change'&'blur'}
					],
					startingTime:[
						{validator:checkStartingTime,trigger:'change'&'blur'}
					],
					structureForm:[
						{validator:checkStructureForm,trigger:'change'&'blur'}
					],
					constructionArea:[
						{validator:checkConstructionArea,trigger:'blur'},
						{type:'number',message:'只能填写数字',trigger:'change'}
					],
					undergroundNum:[
						{validator:checkUndergroundNum,trigger:'blur'},
						{type:'number',message:'只能填写数字',trigger:'change'}
					],
					overgroundNum:[
						{validator:checkOvergroundNum,trigger:'blur'},
						{type:'number',message:'只能填写数字',trigger:'change'}
					],
					engineeringCategory:[
						{validator:checkEngineeringCategory,trigger:'change'&'blur'}
					],
					unitAssemblyRate:[
						{validator:checkUnitAssemblyRate,trigger:'blur'},
						{type:'number',message:'只能填写数字',trigger:'change'}
					],
					exteriorWallArea:[
						{validator:checkExteriorWallArea,trigger:'blur'},
						{type:'number',message:'只能填写数字',trigger:'change'}
					],
					wallShadowArea:[
						{validator:checkWallShadowArea,trigger:'blur'},
						{type:'number',message:'只能填写数字',trigger:'change'}
					],
					applicationStructureType:[
						{validator:checkApplicationStructureType,trigger:'change'&'blur'}
					],
					conArea:[
						{validator:checkConArea,trigger:'blur'},
						{type:'number',message:'只能填写数字',trigger:'change'}
					],
					floorScope:[
						{validator:checkFloorScope,trigger:'change'&'blur'}
					]
				}
      		}
    	},
    	methods: {
    		check(){
    			console.log("laillllll");
            	this.$refs.checkForm.validate((valid)=>{
                	if(valid){
                    	this.check2()
                	}else{
                    	this.$refs.msgDialog.confirm("填写信息有误，请填写完整后再提交")
                	}
            	})
            
        	},
        	check2(){
    			console.log("laillllll");
            	this.$refs.checkForm2.validate((valid)=>{
                	if(valid){
                    	this.$emit('submitUpdateForm')
                	}else{
                    	this.$refs.msgDialog.confirm("填写信息有误，请填写完整后再提交")
                	}
            	})
            
        	},
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
    	components: {
      			msgDialog     
    	}
	}
</script>