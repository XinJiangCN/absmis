<template>
<div>
<el-form ref="form" :model="projectForm" label-width="180px">
    	<el-row>
    		<label>项目基本信息</label>
    	</el-row>

    	<el-row>
    		<el-col :span="12">
    			<el-form-item label="项目名称">
			    <el-row :span="20">
			    <el-input v-model="projectForm.name" :disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="建设单位">
			    <el-row :span="20">
			    <el-input v-model="projectForm.builder" :disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="设计单位">
			    <el-row :span="20">
			    <el-input v-model="projectForm.designer" :disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="施工单位">
			    <el-row :span="20">
			    <el-input v-model="projectForm.construction" :disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="项目状态">
			    <el-row :span="20">
			    <el-select v-model="projectForm.projectState" placeholder="请选择" :disabled="true">
	            <el-option
	              v-for="item in projectStates"
	              :key="item.id"
	              :label="item.description"
	              :value="item.id">
	            </el-option>    
	        	</el-select>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="项目类别">
			    <el-row :span="20">
			    <el-select v-model="projectForm.projectCategory" placeholder="请选择" :disabled="true">
	            <el-option
	              v-for="item in projectCategorys"
	              :key="item.id"
	              :label="item.description"
	              :value="item.id">
	            </el-option>    
	        	</el-select>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="结构形式">
			    <el-row :span="20">
			    	<el-collapse v-model="activeNames">
				        <el-collapse-item name="1">
				            <div>
				            	<span v-for="item in structureForm">{{item.description}}</span>
				            </div>
				        </el-collapse-item>
    				</el-collapse>
			    </el-row>
			    </el-form-item>
    		</el-col>
    		<el-col :span="12">
    			<el-form-item label="项目开工时间">
			    <el-row :span="20">
			    <el-date-picker
			      v-model="projectForm.startingTime"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="项目填报时间">
			    <el-row :span="20">
			    <el-date-picker
			      v-model="projectForm.fillTime"
			      align="right"
			      :disabled="true"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="项目建设地点">
			    <el-row :span="20">
			    <el-input v-model="projectForm.site" :disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="用地规划许可证号">
			    <el-row :span="20">
			    <el-input v-model="projectForm.licenseNo" :disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="单位工程数量">
			    <el-row :span="20">
			    <el-input v-model="projectForm.unitEngineeringNum" :disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="总建筑面积">
			    <el-row :span="20">
			    <el-input v-model="projectForm.totalConstructionArea" :disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    </el-form-item>
			    <el-form-item label="地上建筑面积">
			    <el-row :span="20">
			    <el-input v-model="projectForm.overgroundConstructionArea":disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
    		</el-col>
    	</el-row>
    	<el-row>
    		<label>项目进度信息</label>
    	</el-row>
    	<el-row>
				<el-form-item label="项目起止时间">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.startTime"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.endTime"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="取得土地使用权">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.landUseRightStart"
			      align="right"
			      :disabled="true"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.landUseRightEnd"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="建设用地规划许可证">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.constructionLicenseStart"
			      align="right"
			      :disabled="true"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.constructionLicenseEnd"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="建设工程规划许可证">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.engineeringLicenseStart"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.engineeringLicenseEnd"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="施工图设计及审查">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.tenderStart"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.tenderEnd"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="组织工程招标及工程施工">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.comprehensiveInspectionAndAcceptanceStart"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.comprehensiveInspectionAndAcceptanceEnd"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="项目综合验收">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.deliveryStart"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.deliveryEnd"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="项目交付使用">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.constructionDrawingStart"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.constructionDrawingEnd"
			      align="right"
			      type="date"
			      :disabled="true"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>
    		
    	</el-row>
    	<el-row>
    		<label>项目产业化信息</label>
    	</el-row>
    	<el-row>
    			<el-form-item label="应用产业化技术的建筑面积">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.industrializedTechnologyArea":disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="落实产业化技术的面积比例">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.industrializedTechnologyAreaRatio":disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="建筑单体装配率（≥45%）">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.unitAssemblyRate":disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="建筑外墙采用预制墙体的比例（≥60%）">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.wall":disabled="true"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="各单体预制外墙水平投影总面积">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.wallShadowArea":disabled="true"></el-input>
			    </el-row>
			    </el-form-item> 
			    <el-form-item label="不纳入地上容积率的建筑面积">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.constructionArea":disabled="true"></el-input>
			    </el-row>
			    </el-form-item> 
			    <el-form-item label="应用建筑产业化技术内容">
			    <el-row :span="24">
			    		<!-- <el-checkbox-group> -->
							    <el-checkbox label="柱" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.columnFs":disabled="true"></el-checkbox>
							    <el-checkbox label="梁" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.beamFs":disabled="true"></el-checkbox>
							    <el-checkbox label="楼板" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.floorFs":disabled="true"></el-checkbox>
							    <el-checkbox label="楼梯" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.stairsFs":disabled="true"></el-checkbox>
							    <el-checkbox label="外墙" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.exteriorWallFs":disabled="true"></el-checkbox>
							    <el-checkbox label="内墙" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.interiorWallFs":disabled="true"></el-checkbox>
							    <el-checkbox label="整体厨房" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.integralKitchenFs":disabled="true"></el-checkbox>
							    <el-checkbox label="整体卫生间" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.integralToiletFs":disabled="true"></el-checkbox>
							    <el-checkbox label="太阳能" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.solarEnergyFs":disabled="true"></el-checkbox>

					  	<!-- </el-checkbox-group> -->
			  
			    </el-row>
			    <el-row :span="24">
			    		<!-- <el-checkbox-group> -->
							    <el-checkbox label="楼板" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.floorSw":disabled="true"></el-checkbox>
							    <el-checkbox label="楼梯"v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.stairsSw":disabled="true"></el-checkbox>
							    <el-checkbox label="外墙" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.exteriorWallSw":disabled="true"></el-checkbox>
							    <el-checkbox label="内墙" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.interiorWallSw":disabled="true"></el-checkbox>
							    <el-checkbox label="整体厨房" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.integralKitchenSw":disabled="true"></el-checkbox>
							    <el-checkbox label="整体卫生间" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.integralToiletSw":disabled="true"></el-checkbox>
							    <el-checkbox label="太阳能" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.solarEnergySw":disabled="true"></el-checkbox>
					  	<!-- </el-checkbox-group> -->
			  
			    </el-row>
			    <el-row :span="24">
			    		<!-- <el-checkbox-group> -->
							    <el-checkbox label="柱" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.columnFc":disabled="true"></el-checkbox>
							    <el-checkbox label="梁" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.beamFc":disabled="true"></el-checkbox>
							    <el-checkbox label="楼板" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.floorFc":disabled="true"></el-checkbox>
							    <el-checkbox label="楼梯" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.stairsFc":disabled="true"></el-checkbox>
							    <el-checkbox label="外墙" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.exteriorWallFc":disabled="true"></el-checkbox>
							    <el-checkbox label="内墙" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.interiorWallFc":disabled="true"></el-checkbox>
							    <el-checkbox label="整体厨房" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.integralKitchenFc":disabled="true"></el-checkbox>
							    <el-checkbox label="整体卫生间" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.integralToiletFc":disabled="true"></el-checkbox>
							    <el-checkbox label="太阳能" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.solarEnergyFc":disabled="true"></el-checkbox>
					  	<!-- </el-checkbox-group> -->
			  
			    </el-row>
			    </el-form-item> 		
    	</el-row>
</el-form>
	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script>
  import msgDialog from '../common/msgDialog'
  export default{
  	 data() {
      return {
        activeNames: ['1']
      };
    },
    methods:{
    	findAllProjectStates() {
        		this.$http.get(this.HOST + "/findAllProjectStates").then(response => {
          		this.projectStates = response.data;
        		}).catch(error => {
          		this.$refs.msgDialog.confirm("查询失败")
        		})
      	},
    	findAllProjectCategorys() {
        		this.$http.get(this.HOST + "/findAllProjectCategorys").then(response => {
          		this.projectCategorys = response.data;
        		}).catch(error => {
          		this.$refs.msgDialog.confirm("查询失败")
        		})
      	}
      
    },
    created() {
      this.findAllProjectCategorys()
      this.findAllProjectStates()
    },
    props:['projectForm','structureForm'],
    components: {
      msgDialog
    }
  }
</script>