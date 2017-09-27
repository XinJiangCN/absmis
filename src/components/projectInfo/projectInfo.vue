<template>
<div>
	<el-form ref="checkForm" :model="projectForm" :rules="rules" label-width="180px">
    	<el-row>
    		<label>项目基本信息</label>
    	</el-row>

    	<el-row>
    		<el-col :span="12">
    			<el-form-item label="项目名称" prop="name">
			    <el-input v-model="projectForm.name" name="name"></el-input>
			    </el-form-item>
			    <el-form-item label="建设单位" prop="builder">
			    <el-input v-model="projectForm.builder" name="builder"></el-input>
			    </el-form-item>
			    <el-form-item label="设计单位" prop="designer">
			    <el-input v-model="projectForm.designer"></el-input>
			    </el-form-item>
			    <el-form-item label="施工单位" prop="construction">
			    <el-input v-model="projectForm.construction"></el-input>
			    </el-form-item>
			    <el-form-item label="项目状态" prop="projectState">
			    <el-select v-model="projectForm.projectState.id" placeholder="请选择">
	            <el-option
	              v-for="item in projectStates"
	              :key="item.id"
	              :label="item.description"
	              :value="item.id">
	            </el-option>    
	        	</el-select>
			    </el-form-item>
			    <el-form-item label="项目类别" prop="projectCategory">
			    <el-select v-model="projectForm.projectCategory.id" placeholder="请选择">
	            <el-option
	              v-for="item in projectCategorys"
	              :key="item.id"
	              :label="item.description"
	              :value="item.id">
	            </el-option>    
	        	</el-select>
			    </el-form-item>
			    <el-form-item label="结构形式">
			    	<el-collapse>
				        <el-collapse-item name="1">
				            <div>
				            	<span v-for="item in structureForm">{{item.description}}</span>
				            </div>
				        </el-collapse-item>
    				</el-collapse>
			    </el-form-item>
    		</el-col>
    		<el-col :span="12">
    			<el-form-item label="项目开工时间" prop="startingTime">
			    <el-date-picker
			      v-model="projectForm.startingTime"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-form-item>
			    <el-form-item label="项目填报时间" prop="fillTime">
			    <el-date-picker
			      v-model="projectForm.fillTime"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-form-item>
			    <el-form-item label="项目建设地点" prop="site">
			    <el-input v-model="projectForm.site"></el-input>
			    </el-form-item>
			    <el-form-item label="用地规划许可证号" prop="licenseNo">
			    <el-input v-model="projectForm.licenseNo"></el-input>
			    </el-form-item>
			    <el-form-item label="单位工程数量" prop="unitEngineeringNum">
			    <el-input v-model="projectForm.unitEngineeringNum"></el-input>
			    </el-form-item>
			    <el-form-item label="总建筑面积" prop="totalConstructionArea">
			    <el-input v-model="projectForm.totalConstructionArea"></el-input>
			    </el-form-item>
			    </el-form-item>
			    <el-form-item label="地上建筑面积" prop="overgroundConstructionArea">
			    <el-input v-model="projectForm.overgroundConstructionArea"></el-input>
			    </el-form-item>
    		</el-col>
    	</el-row>
    	<el-form :model="projectForm.schedule" :rules="rules">
    	<el-row>
    		<label>项目进度信息</label>
    	</el-row>
    	<el-row>
    		<el-row>
    			<el-col :span="7">
    				<label>项目起止时间</label>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="projectStartTime">
						<el-date-picker
					      v-model="projectForm.schedule.projectStartTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      >
					    </el-date-picker>
				    </el-form-item>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="projectEndTime">
	    				<el-date-picker
					      v-model="projectForm.schedule.projectEndTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					     >
					    </el-date-picker>
			    	</el-form-item>
    			</el-col>
    		</el-row>

    		<el-row>
    			<el-col :span="7">
    				<label>取得土地使用权</label>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="landUseRightStart">
						<el-date-picker
					      v-model="projectForm.schedule.landUseRightStart"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					    >
					    </el-date-picker>
			    	</el-form-item>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="landUseRightEnd">
					    <el-date-picker
					      v-model="projectForm.schedule.landUseRightEnd"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      >
					    </el-date-picker>
			    	</el-form-item>
    			</el-col>
    		</el-row>

    		<el-row>
    			<el-col :span="7">
    				<label>建设用地规划许可证</label>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="constructionLicenseStart">
						<el-date-picker
					      v-model="projectForm.schedule.constructionLicenseStart"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					    >
					    </el-date-picker>
				    </el-form-item>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="constructionLicenseEnd">
					    <el-date-picker
					      v-model="projectForm.schedule.constructionLicenseEnd"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					     >
					    </el-date-picker>
					</el-form-item>
    			</el-col>
    		</el-row>

    		<el-row>
    			<el-col :span="7">
    				<label>建设工程规划许可证</label>
    			</el-col>
    			<el-col :span="8">
    				
					    <el-form-item prop="engineeringLicenseStart">
								<el-date-picker
							      v-model="projectForm.schedule.engineeringLicenseStart"
							      align="right"
							      type="date"
							      placeholder="选择日期"
							     >
							    </el-date-picker>
					    </el-form-item>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="engineeringLicenseEnd">
					    <el-date-picker
					      v-model="projectForm.schedule.engineeringLicenseEnd"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      >
					    </el-date-picker>
					</el-form-item>
    			</el-col>
    		</el-row>

    		<el-row>
    			<el-col :span="7">
    				<label>施工图设计及审查</label>
    			</el-col>
    			<el-col :span="8">
    				 <el-form-item prop="tenderStart">
						<el-date-picker
					      v-model="projectForm.schedule.tenderStart"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      >
					    </el-date-picker>
			    	</el-form-item>
    			</el-col>
    			<el-col :span="8">
    				 <el-form-item prop="tenderEnd">
					    <el-date-picker
					      v-model="projectForm.schedule.tenderEnd"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					    >
					    </el-date-picker>
			    	</el-form-item>
    			</el-col>
    		</el-row>

    		<el-row>
    			<el-col :span="7">
    				<label>组织工程招标及工程施工</label>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="comprehensiveInspectionAndAcceptanceStart">
						<el-date-picker
					      v-model="projectForm.schedule.comprehensiveInspectionAndAcceptanceStart"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					     >
					    </el-date-picker>
			    	</el-form-item>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="comprehensiveInspectionAndAcceptanceEnd">
					    <el-date-picker
					      v-model="projectForm.schedule.comprehensiveInspectionAndAcceptanceEnd"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					     >
					    </el-date-picker>
			    	</el-form-item>
    			</el-col>
    		</el-row>

    		<el-row>
    			<el-col :span="7">
    				<label>项目综合验收</label>
    			</el-col>
    			<el-col :span="8">
    					 <el-form-item prop="deliveryStart">
					<el-date-picker
				      v-model="projectForm.schedule.deliveryStart"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				    >
				    </el-date-picker>
			    </el-form-item>
    			</el-col>
    			<el-col :span="8">
    				 <el-form-item prop="deliveryEnd">
					    <el-date-picker
					      v-model="projectForm.schedule.deliveryEnd"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					     >
					    </el-date-picker>
			    	</el-form-item>
    			</el-col>
    		</el-row>

    		<el-row>
    			<el-col :span="7">
    				<label>项目交付使用</label>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="constructionDrawingStart">
						<el-date-picker
					      v-model="projectForm.schedule.constructionDrawingStart"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					     >
					    </el-date-picker>
			    </el-form-item>
    			</el-col>
    			<el-col :span="8">
    				<el-form-item prop="constructionDrawingEnd">
					    <el-date-picker
					      v-model="projectForm.schedule.constructionDrawingEnd"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					    >
					    </el-date-picker>
			    </el-form-item>
    			</el-col>
    		</el-row>		
    	</el-row>
    	</el-form>
    	<el-form :model="projectForm.projectIndustrialization" :rules="rules">
    	<el-row>
    		<label>项目产业化信息</label>
    	</el-row>
    	<el-row>
    			<el-form-item label="应用产业化技术的建筑面积" prop="industrializedTechnologyArea">
			    <el-input v-model="projectForm.projectIndustrialization.industrializedTechnologyArea"></el-input>
			    </el-form-item>
			    <el-form-item label="落实产业化技术的面积比例" prop="industrializedTechnologyAreaRatio">
			    <el-input v-model="projectForm.projectIndustrialization.industrializedTechnologyAreaRatio"></el-input>
			    </el-form-item>
			    <el-form-item label="建筑单体装配率（≥45%）"prop="unitAssemblyRate">
			    <el-input v-model="projectForm.projectIndustrialization.unitAssemblyRate"></el-input>
			    </el-form-item>
			    <el-form-item label="建筑外墙采用预制墙体的比例（≥60%）"prop="wall">
			    <el-input v-model="projectForm.projectIndustrialization.wall"></el-input>
			    </el-form-item>
			    <el-form-item label="各单体预制外墙水平投影总面积" prop="wallShadowArea">
			    <el-input v-model="projectForm.projectIndustrialization.wallShadowArea"></el-input>
			    </el-form-item> 
			    <el-form-item label="不纳入地上容积率的建筑面积" prop="constructionArea">
			    <el-input v-model="projectForm.projectIndustrialization.constructionArea"></el-input>
			    </el-form-item> 
			    <el-form-item label="应用建筑产业化技术内容">
			    <el-row :span="24">
			    		<!-- <el-checkbox-group> -->
							    <el-checkbox label="柱" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.columnFs"></el-checkbox>
							    <el-checkbox label="梁" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.beamFs"></el-checkbox>
							    <el-checkbox label="楼板" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.floorFs"></el-checkbox>
							    <el-checkbox label="楼梯" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.stairsFs"></el-checkbox>
							    <el-checkbox label="外墙" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.exteriorWallFs"></el-checkbox>
							    <el-checkbox label="内墙" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.interiorWallFs"></el-checkbox>
							    <el-checkbox label="整体厨房" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.integralKitchenFs"></el-checkbox>
							    <el-checkbox label="整体卫生间" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.integralToiletFs"></el-checkbox>
							    <el-checkbox label="太阳能" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkShear.solarEnergyFs"></el-checkbox>

					  	<!-- </el-checkbox-group> -->
			  
			    </el-row>
			    <el-row :span="24">
			    		<!-- <el-checkbox-group> -->
							    <el-checkbox label="楼板" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.floorSw"></el-checkbox>
							    <el-checkbox label="楼梯"v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.stairsSw"></el-checkbox>
							    <el-checkbox label="外墙" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.exteriorWallSw"></el-checkbox>
							    <el-checkbox label="内墙" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.interiorWallSw"></el-checkbox>
							    <el-checkbox label="整体厨房" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.integralKitchenSw"></el-checkbox>
							    <el-checkbox label="整体卫生间" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.integralToiletSw"></el-checkbox>
							    <el-checkbox label="太阳能" v-model="projectForm.projectIndustrialization.applicationTechnology.shearWall.solarEnergySw"></el-checkbox>
					  	<!-- </el-checkbox-group> -->
			  
			    </el-row>
			    <el-row :span="24">
			    		<!-- <el-checkbox-group> -->
							    <el-checkbox label="柱" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.columnFc"></el-checkbox>
							    <el-checkbox label="梁" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.beamFc"></el-checkbox>
							    <el-checkbox label="楼板" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.floorFc"></el-checkbox>
							    <el-checkbox label="楼梯" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.stairsFc"></el-checkbox>
							    <el-checkbox label="外墙" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.exteriorWallFc"></el-checkbox>
							    <el-checkbox label="内墙" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.interiorWallFc"></el-checkbox>
							    <el-checkbox label="整体厨房" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.integralKitchenFc"></el-checkbox>
							    <el-checkbox label="整体卫生间" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.integralToiletFc"></el-checkbox>
							    <el-checkbox label="太阳能" v-model="projectForm.projectIndustrialization.applicationTechnology.frameworkCore.solarEnergyFc"></el-checkbox>
					  	<!-- </el-checkbox-group> -->
			  
			    </el-row>
			    </el-form-item> 		
    	</el-row>
    	</el-form>
</el-form> 
	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script>
  import msgDialog from '../common/msgDialog'
  export default{
  	 data() {
  	  var checkName=(rule,value,callback)=>{
				if(!value){
					callback(new Error("请输入项目名称"))
				}else
				callback();
	  }
	  var checkBuilder=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入建设单位"))
				else
					callback();
	  }
	  var checkDesigner=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入设计单位"))
				else
					callback();
	  }
	  var checkConstruction=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入施工单位"))
				else
					callback();
	  }
	  var checkProjectState=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目状态"))
				else
					callback();
	  }
	  var checkProjectCategory=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目类别"))
				else
					callback();
	  }
	  var checkStartingTime=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目开工时间"))
				else
					callback();
	  }
	  var checkFillTime=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目填报时间"))
				else
					callback();
	  }
	  var checkSite=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目建设地点"))
				else
					callback();
	  }
	  var checkLicenseNo=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入用地规划许可证号"))
				else
					callback();
	  }
	  var checkTotalConstructionArea=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入总建筑面积"))
				else
					callback();
	  }
	  var checkOvergroundConstructionArea=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入地上建筑面积"))
				else
					callback();
	  }
	  var checkUnitEngineeringNum=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入单位工程数量"))
				else
					callback();
	  }
	  var checkLandUseRightStart=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入取得土地使用权"))
				else
					callback();
	  }
	  var checkLandUseRightEnd=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入取得土地使用权"))
				else
					callback();
	  }
	  var checkProjectStartTime=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目开始时间"))
				else
					callback();
	  }
	  var checkProjectEndTime=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目结束时间"))
				else
					callback();
	  }
	  var checkConstructionLicenseStart=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入建设用地规划许可证"))
				else
					callback();
	  }
	  var checkConstructionLicenseEnd=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入建设用地规划许可证"))
				else
					callback();
	  }
	  var checkEngineeringLicenseStart=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入建设工程规划许可证"))
				else
					callback();
	  }
	  var checkEngineeringLicenseEnd=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入建设工程规划许可证"))
				else
					callback();
	  }
	  var checkTenderStart=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入施工图设计及审查"))
				else
					callback();
	  }
	  var checkTenderEnd=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入施工图设计及审查"))
				else
					callback();
	  }
	  var checkComprehensiveInspectionAndAcceptanceStart=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入组织工程招标及工程施工"))
				else
					callback();
	  }
	  var checkComprehensiveInspectionAndAcceptanceEnd=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入组织工程招标及工程施工"))
				else
					callback();
	  }
	  var checkDeliveryStart=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目综合验收"))
				else
					callback();
	  }
	  var checkDeliveryEnd=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目综合验收"))
				else
					callback();
	  }
	  var checkConstructionDrawingStart=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目交付使用"))
				else
					callback();
	  }
	  var checkConstructionDrawingEnd=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入项目交付使用"))
				else
					callback();
	  }
	  var checkIndustrializedTechnologyArea=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入应用产业化技术的建筑面积"))
				else
					callback();
	  }
	  var checkIndustrializedTechnologyAreaRatio=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入落实产业化技术的面积比例"))
				else
					callback();
	  }
	  var checkUnitAssemblyRate=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入建筑单体装配率"))
				else
					callback();
	  }
	  var checkWall=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入建筑外墙采用预制墙体的比例"))
				else
					callback();
	  }
	  var checkWallShadowArea=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入各单体预制外墙水平投影总面积"))
				else
					callback();
	  }
	  var checkConstructionArea=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入不纳入地上容积率的建筑面积"))
				else
					callback();
	  }
	  var checkbuilder=(rule,value,callback)=>{
				if(!value)
					callback(new Error("请输入建设单位"))
				else
					callback();
	  }
      return {
        structureForm: '',
        rules:{
					name:[
						{validator:checkName,trigger:'change'&'blur'}
					],
					builder:[
						{validator:checkbuilder,trigger:'change'&'blur'}
					],
					designer:[
						{validator:checkDesigner,trigger:'change'&'blur'}
					],
					construction:[
						{validator:checkConstruction,trigger:'change'&'blur'}
					],
					projectState:[
						{validator:checkProjectState,trigger:'change'&'blur'}
					],
					projectCategory:[
						{validator:checkProjectCategory,trigger:'change'&'blur'}
					],
					startingTime:[
						{validator:checkStartingTime,trigger:'change'&'blur'}
					],
					fillTime:[
						{validator:checkFillTime,trigger:'change'&'blur'}
					],
					site:[
						{validator:checkSite,trigger:'change'&'blur'}
					],
					licenseNo:[
						{validator:checkLicenseNo,trigger:'change'&'blur'}
					],
					unitEngineeringNum:[
						{validator:checkUnitEngineeringNum,trigger:'change'&'blur'}
					],
					totalConstructionArea:[
						{validator:checkConstruction,trigger:'change'&'blur'}
					],
					overgroundConstructionArea:[
						{validator:checkOvergroundConstructionArea,trigger:'change'&'blur'}
					],
					projectStartTime:[
						{validator:checkProjectStartTime,trigger:'change'&'blur'}
					],
					projectEndTime:[
						{validator:checkProjectEndTime,trigger:'change'&'blur'}
					],
					landUseRightStart:[
						{validator:checkLandUseRightStart,trigger:'change'&'blur'}
					],
					landUseRightEnd:[
						{validator:checkLandUseRightEnd,trigger:'change'&'blur'}
					],
					constructionLicenseStart:[
						{validator:checkConstructionLicenseStart,trigger:'change'&'blur'}
					],
					constructionLicenseEnd:[
						{validator:checkConstructionLicenseEnd,trigger:'change'&'blur'}
					],
					engineeringLicenseStart:[
						{validator:checkEngineeringLicenseStart,trigger:'change'&'blur'}
					],
					engineeringLicenseEnd:[
						{validator:checkEngineeringLicenseEnd,trigger:'change'&'blur'}
					],
					tenderStart:[
						{validator:checkTenderStart,trigger:'change'&'blur'}
					],
					tenderEnd:[
						{validator:checkTenderEnd,trigger:'change'&'blur'}
					],
					comprehensiveInspectionAndAcceptanceStart:[
						{validator:checkComprehensiveInspectionAndAcceptanceStart,trigger:'change'&'blur'}
					],
					comprehensiveInspectionAndAcceptanceEnd:[
						{validator:checkComprehensiveInspectionAndAcceptanceEnd,trigger:'change'&'blur'}
					],
					deliveryStart:[
						{validator:checkDeliveryStart,trigger:'change'&'blur'}
					],
					deliveryEnd:[
						{validator:checkDeliveryEnd,trigger:'change'&'blur'}
					],
					constructionDrawingStart:[
						{validator:checkConstructionDrawingStart,trigger:'change'&'blur'}
					],
					constructionDrawingEnd:[
						{validator:checkConstructionDrawingEnd,trigger:'change'&'blur'}
					],
					industrializedTechnologyArea:[
						{validator:checkIndustrializedTechnologyArea,trigger:'change'&'blur'}
					],
					industrializedTechnologyAreaRatio:[
						{validator:checkIndustrializedTechnologyAreaRatio,trigger:'change'&'blur'}
					],
					unitAssemblyRate:[
						{validator:checkUnitAssemblyRate,trigger:'change'&'blur'}
					],
					wall:[
						{validator:checkWall,trigger:'change'&'blur'}
					],
					wallShadowArea:[
						{validator:checkWallShadowArea,trigger:'change'&'blur'}
					],
					constructionArea:[
						{validator:checkConstructionArea,trigger:'change'&'blur'}
					]
			}
      };
    },
    methods:{
    	check(){
            	this.$refs.checkForm.validate((valid)=>{
                	if(valid){
                    	this.$emit('addProjectForm')
                	}else{
                    	this.$refs.msgDialog.confirm("填写信息有误，请填写完整后再提交")
                	}
            	})
            
        	},
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
    props:['projectForm','structureForm'],
    created() {
      this.findAllProjectCategorys()
      this.findAllProjectStates()
    },
    components: {
      msgDialog
    }
  }
</script>