<template>
<div>
	<el-col :span="24">
		<el-row>
      	<!-- 每行分为24栏（固定），span设置该列占有5栏 -->
		      <el-col :span="8">
		        <!-- 增删改按钮 -->
		        <el-button-group>
		          <el-button type="primary"@click="reset">增加</el-button>
		          <el-button type="primary">暂存</el-button>
		          <el-button type="primary" @click="addProjectForm">提交</el-button>
		        </el-button-group>
		      </el-col>
    	</el-row>
<el-form ref="form" :model="projectForm" label-width="180px">
    	<el-row>
    		<label>项目基本信息</label>
    	</el-row>

    	<el-row>
    		<el-col :span="12">
    			<el-form-item label="项目名称">
			    <el-row :span="20">
			    <el-input v-model="projectForm.name"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="建设单位">
			    <el-row :span="20">
			    <el-input v-model="projectForm.builder"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="设计单位">
			    <el-row :span="20">
			    <el-input v-model="projectForm.designer"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="施工单位">
			    <el-row :span="20">
			    <el-input v-model="projectForm.construction"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="项目状态">
			    <el-row :span="20">
			    <el-select v-model="projectForm.projectState.id" placeholder="请选择">
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
			    <el-select v-model="projectForm.projectCategory.id" placeholder="请选择">
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
			    <el-input v-model="projectForm.construction"></el-input>
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
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="项目建设地点">
			    <el-row :span="20">
			    <el-input v-model="projectForm.site"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="用地规划许可证号">
			    <el-row :span="20">
			    <el-input v-model="projectForm.licenseNo"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="单位工程数量">
			    <el-row :span="20">
			    <el-input v-model="projectForm.unitEngineeringNum"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="总建筑面积">
			    <el-row :span="20">
			    <el-input v-model="projectForm.totalConstructionArea"></el-input>
			    </el-row>
			    </el-form-item>
			    </el-form-item>
			    <el-form-item label="地上建筑面积">
			    <el-row :span="20">
			    <el-input v-model="projectForm.overgroundConstructionArea"></el-input>
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
			      v-model="projectForm.schedule.projectStartTime"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      >
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.projectEndTime"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			     >
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="取得土地使用权">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.landUseRightStart"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			    >
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.landUseRightEnd"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      >
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="建设用地规划许可证">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.constructionLicenseStart"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			    >
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.constructionLicenseEnd"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			     >
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="建设工程规划许可证">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.engineeringLicenseStart"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			     >
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.engineeringLicenseEnd"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      >
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="施工图设计及审查">
			    <el-row :span="20">

				<el-date-picker
			      v-model="projectForm.schedule.tenderStart"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      >
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.tenderEnd"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			    >
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="组织工程招标及工程施工">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.comprehensiveInspectionAndAcceptanceStart"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			     >
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.comprehensiveInspectionAndAcceptanceEnd"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			     >
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="项目综合验收">
			    <el-row :span="20">
				<el-date-picker
			      v-model="projectForm.schedule.deliveryStart"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			    >
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.deliveryEnd"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			     >
			    </el-date-picker>
			    </el-row>
			    </el-form-item>

			    <el-form-item label="项目交付使用">
			    <el-row :span="20">

				<el-date-picker
			      v-model="projectForm.schedule.constructionDrawingStart"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			     >
			    </el-date-picker>
			    <el-date-picker
			      v-model="projectForm.schedule.constructionDrawingEnd"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			    >
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
			    <el-input v-model="projectForm.projectIndustrialization.industrializedTechnologyArea"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="落实产业化技术的面积比例">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.industrializedTechnologyAreaRatio"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="建筑单体装配率（≥45%）">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.unitAssemblyRate"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="建筑外墙采用预制墙体的比例（≥60%）">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.wall"></el-input>
			    </el-row>
			    </el-form-item>
			    <el-form-item label="各单体预制外墙水平投影总面积">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.wallShadowArea"></el-input>
			    </el-row>
			    </el-form-item> 
			    <el-form-item label="不纳入地上容积率的建筑面积">
			    <el-row :span="20">
			    <el-input v-model="projectForm.projectIndustrialization.constructionArea"></el-input>
			    </el-row>
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
	</el-col>
	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script>
  import msgDialog from '../common/msgDialog'
  export default{
    data(){
      return{
       		
      	  pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
	projectStates:'',
      	projectCategorys:'',
      	checkedStatus:'undefined',
  		projectForm: {
            name: '',
		    startingTime:'',
		    fillTime:'',
		    site:'',
		    licenseNo:'',
		    unitEngineeringNum:'',
		    totalConstructionArea:'',
		    overgroundConstructionArea:'',
		    builder:'',
		  	designer:'',
		   	construction:'',
		    projectCategory:{
		    	id:'',
		    	description:''
		    },
		   	projectState:{
		   		id:'',
		   		description:''
		   	},
		   	schedule:{
		   		projectEndTime:'',
		   		projectStartTime:'',
			    landUseRightStart:'',
			    landUseRightEnd:'',
			    constructionLicenseStart:'',
			    constructionLicenseEnd:'',
			    engineeringLicenseStart:'',
			    engineeringLicenseEnd:'',
			    tenderStart:'',
			    tenderEnd:'',
			    comprehensiveInspectionAndAcceptanceStart:'',
			    comprehensiveInspectionAndAcceptanceEnd:'',
			    deliveryStart:'',
			    deliveryEnd:'',
			    constructionDrawingStart:'',
			    constructionDrawingEnd:''
		   	},
		   	projectIndustrialization:{
		   		industrializedTechnologyArea:'',
			    industrializedTechnologyAreaRatio:'',
			  	unitAssemblyRate:'',
			   	wall:'',
			    wallShadowArea:'',
			   	constructionArea:'',
			   	applicationTechnology:{
			   		 frameworkShear:{
			   		 	 columnFs:false,
			   			 beamFs:false,
					     floorFs:false,
					     stairsFs:false,
					     exteriorWallFs:false,
					     interiorWallFs:false,
					     integralKitchenFs:false,
					     integralToiletFs:false,
					     solarEnergyFs:false
			   		 },
     				 frameworkCore:{
     				 	 columnFc:false,
			   			 beamFc:false,
					     floorFc:false,
					     stairsFc:false,
					     exteriorWallFc:false,
					     interiorWallFc:false,
					     integralKitchenFc:false,
					     integralToiletFc:false,
					     solarEnergyFc:false
     				 },
     				 shearWall:{
					     floorSw:false,
					     stairsSw:false,
					     exteriorWallSw:false,
					     interiorWallSw:false,
					     integralKitchenSw:false,
					     integralToiletSw:false,
					     solarEnergySw:false
     				 }
			   	}

		   	}
        },
      
      }
    },
    methods:{
    	    	reset(){
    		this.checkedStatus = 'undefined',
    		this.projectForm = {
            name: '',
		    startingTime:'',
		    fillTime:'',
		    site:'',
		    licenseNo:'',
		    unitEngineeringNum:'',
		    totalConstructionArea:'',
		    overgroundConstructionArea:'',
		    builder:'',
		  	designer:'',
		   	construction:'',
		    projectCategory:{
		    	id:'',
		    	description:''
		    },
		   	projectState:{
		   		id:'',
		   		description:''
		   	},
		   	schedule:{
		   		projectEndTime:'',
		   		projectStartTime:'',
			    landUseRightStart:'',
			    landUseRightEnd:'',
			    constructionLicenseStart:'',
			    constructionLicenseEnd:'',
			    engineeringLicenseStart:'',
			    engineeringLicenseEnd:'',
			    tenderStart:'',
			    tenderEnd:'',
			    comprehensiveInspectionAndAcceptanceStart:'',
			    comprehensiveInspectionAndAcceptanceEnd:'',
			    deliveryStart:'',
			    deliveryEnd:'',
			    constructionDrawingStart:'',
			    constructionDrawingEnd:''
		   	},
		   	projectIndustrialization:{
		   		industrializedTechnologyArea:'',
			    industrializedTechnologyAreaRatio:'',
			  	unitAssemblyRate:'',
			   	wall:'',
			    wallShadowArea:'',
			   	constructionArea:'',
			   	applicationTechnology:{
			   		 frameworkShear:{
			   		 	 columnFs:false,
			   			 beamFs:false,
					     floorFs:false,
					     stairsFs:false,
					     exteriorWallFs:false,
					     interiorWallFs:false,
					     integralKitchenFs:false,
					     integralToiletFs:false,
					     solarEnergyFs:false
			   		 },
     				 frameworkCore:{
     				 	 columnFc:false,
			   			 beamFc:false,
					     floorFc:false,
					     stairsFc:false,
					     exteriorWallFc:false,
					     interiorWallFc:false,
					     integralKitchenFc:false,
					     integralToiletFc:false,
					     solarEnergyFc:false
     				 },
     				 shearWall:{
					     floorSw:false,
					     stairsSw:false,
					     exteriorWallSw:false,
					     interiorWallSw:false,
					     integralKitchenSw:false,
					     integralToiletSw:false,
					     solarEnergySw:false
     				 }
			   	}

		   	}
        }
    	},
    	findCurrentProjectInfo(){
    		this.$http.get(this.HOST + "/findProjectInfoByEstateOwner?id="+this.projectId).then(response => {
          		this.projectForm = response.data
          		this.checkedStatus = response.data.checkedStatus
          		console.log("啦啦啦啦")
          		console.log(this.projectForm)
        		}).catch(error => {
          		this.$refs.msgDialog.confirm("查询失败la")
        		})

    	},
    	//TODO 已经审核通过的不能重复提交
    	addProjectForm(){
    		if(this.checkedStatus=='undefined'){
    			this.submitForm()
    		}else{
    			if(this.checkedStatus==null){
    				this.submitForm()	
    			}else{
    				if(this.checkedStatus.id==1){
    					this.findCurrentProjectInfo()
    					this.$refs.msgDialog.confirm("审核通过不能重复提交！")
    				}else{
    					this.submitForm()
    				}
    			}
    		}
    	},
    	submitForm(){
    		console.log(JSON.stringify(this.projectForm))
    		console.log(this.projectForm)
    		var url = this.HOST + "/addProjectByEstateOwner"
        	this.$http.post(url, this.projectForm).then(response => {
        		console.log("成功了")
        		this.$emit('findAllProjectsByRealEstateEn')
          	this.$refs.msgDialog.notify("添加成功")
        	}).catch(error => {
          	this.$refs.msgDialog.confirm("添加失败")
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
    //watch负责监听，当监听对象发生变化时，运行对应的方法
    watch: {},
    //页面加载时运行
    props:{
      projectId:{
        type: String,
        required: true
      },
    },
    created() {
      this.findAllProjectCategorys()
      this.findAllProjectStates()
    },
    components: {
      msgDialog
    }
  }
</script>