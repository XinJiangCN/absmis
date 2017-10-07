<template>
<div>
	<el-col :span="24">
		<el-row>
      	<!-- 每行分为24栏（固定），span设置该列占有5栏 -->
		      <el-col :span="8">
		        <!-- 增删改按钮 -->
		        <el-button-group>
		          <el-button type="primary" @click="reset">增加</el-button>
		          <el-button type="primary" @click="submit">提交</el-button>
		        </el-button-group>
		      </el-col>
    	</el-row>
    <project-info :projectForm="projectForm" :structureForm="structureForm" ref="projectInfo" @addProjectForm="addProjectForm">
    </project-info>  	
	</el-col>
	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script>
import moment from 'moment'
  import msgDialog from '../common/msgDialog'
  import projectInfo from './projectInfo'
  export default{
    data(){
      return{	
      	  pickerOptions1: {
		          shortcuts: [{
		            text: '今天',
		            onClick(picker) {
		              picker.$emit('pick', new Date());
		            }
		          }, 
		          {
		            text: '昨天',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24);
		              picker.$emit('pick', date);
		            }
		          }, 
		          {
		            text: '一周前',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', date);
		            }
		          }]
        },
      	projectStates:'',
      	structureForm: '',
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
    		this.structureForm = '',
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
    	findCurrentProjectInfo(ref){
    		this.$http.get(this.HOST + "/findProjectInfoById?id="+ref.id).then(response => {
          		this.projectForm = response.data
          		 this.checkedStatus = response.data.checkedStatus
        		}).catch(error => {
          		this.$refs.msgDialog.confirm("查询失败la")
        		})

    	},

    	findStructureForm(ref){
    		var url = this.HOST + "/findStructureForm?id="+ref.id 
        	this.$http.get(url).then(response => {
        		console.log("成功了")
        		this.structureForm = response.data
        		console.log(this.structureForm+"yesyes")
        		console.log(JSON.stringify(this.structureForm)+"`````")
          	this.$refs.msgDialog.notify("获取成功")
        	}).catch(error => {
          	this.$refs.msgDialog.confirm("获取失败")
        	})
    	},
    	submit(){
           this.$refs.projectInfo.check();
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
    		this.projectForm.startingTime = this.smallFormat(this.projectForm.startingTime)
    		this.projectForm.fillTime = this.smallFormat(this.projectForm.fillTime)
    		this.projectForm.schedule.projectStartTime =  this.smallFormat(this.projectForm.schedule.projectStartTime)
    		this.projectForm.schedule.projectEndTime =  this.smallFormat(this.projectForm.schedule.projectEndTime)
    		this.projectForm.schedule.landUseRightStart =  this.smallFormat(this.projectForm.schedule.landUseRightStart)
    		this.projectForm.schedule.landUseRightEnd =  this.smallFormat(this.projectForm.schedule.landUseRightEnd)
    		this.projectForm.schedule.constructionLicenseStart =  this.smallFormat(this.projectForm.schedule.constructionLicenseStart)
    		this.projectForm.schedule.constructionLicenseEnd =  this.smallFormat(this.projectForm.schedule.constructionLicenseEnd)
    		this.projectForm.schedule.engineeringLicenseStart =  this.smallFormat(this.projectForm.schedule.engineeringLicenseStart)
    		this.projectForm.schedule.engineeringLicenseEnd =  this.smallFormat(this.projectForm.schedule.engineeringLicenseEnd)
    		this.projectForm.schedule.tenderStart =  this.smallFormat(this.projectForm.schedule.tenderStart)
    		this.projectForm.schedule.tenderEnd =  this.smallFormat(this.projectForm.schedule.tenderEnd)
    		this.projectForm.schedule.comprehensiveInspectionAndAcceptanceStart =  this.smallFormat(this.projectForm.schedule.comprehensiveInspectionAndAcceptanceStart)
    		this.projectForm.schedule.comprehensiveInspectionAndAcceptanceEnd =  this.smallFormat(this.projectForm.schedule.comprehensiveInspectionAndAcceptanceEnd)
    		this.projectForm.schedule.deliveryStart =  this.smallFormat(this.projectForm.schedule.deliveryStart)
    		this.projectForm.schedule.deliveryEnd =  this.smallFormat(this.projectForm.schedule.deliveryEnd)
    		this.projectForm.schedule.constructionDrawingStart =  this.smallFormat(this.projectForm.schedule.constructionDrawingStart)
    		this.projectForm.schedule.constructionDrawingEnd =  this.smallFormat(this.projectForm.schedule.constructionDrawingEnd)

			var url = this.HOST + "/addProjectByRealEstateEn"
        	this.$http.post(url, this.projectForm).then(response => {
        		console.log("成功了")
        		this.$emit('findAllProjectsByRealEstateEn')
          	this.$refs.msgDialog.notify("操作成功")
        	}).catch(error => {
          	this.$refs.msgDialog.confirm("添加失败l")
        	})
    	},
    	smallFormat(data){
            return moment(data).format("YYYY-MM-DD")
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
        type: Number,
        required: true
      },
    },
    created() {
      this.findAllProjectCategorys()
      this.findAllProjectStates()
    },
    components: {
      msgDialog,
      projectInfo
    }
  }
</script>