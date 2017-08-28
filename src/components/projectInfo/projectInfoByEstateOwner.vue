<template>
<div>
	<el-col :span="24">
		<el-row>
      	<!-- 每行分为24栏（固定），span设置该列占有5栏 -->
		      <el-col :span="8">
		        <!-- 增删改按钮 -->
		        <el-button-group>
		          <el-button type="primary" @click="reset">增加</el-button>
		          <el-button type="primary">暂存</el-button>
		          <el-button type="primary" @click="addProjectForm">提交</el-button>
		        </el-button-group>
		      </el-col>
    	</el-row>
    <project-info :projectForm="projectForm">
    </project-info>  	
	</el-col>
	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script>
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
    		console.log("测试中1"+this.projectForm)
    		console.log("测试中1"+JSON.stringify(this.projectForm))
    		this.$http.get(this.HOST + "/findProjectInfoById?id="+this.projectId).then(response => {
          		this.projectForm = response.data
          		 this.checkedStatus = response.data.checkedStatus
          		console.log("啦啦啦啦"+response.data.checkedStatus)
          		// console.log("啦啦啦啦"+response.data.checkedStatus.id)
          		console.log("啦啦啦啦")
          		console.log("测试中2"+this.projectForm)
          		console.log("测试中3"+JSON.stringify(response.data))
    			console.log("测试中2"+JSON.stringify(this.projectForm))
          		//console.log(this.projectForm)
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
			var url = this.HOST + "/addProjectByEstateOwner"
        	this.$http.post(url, this.projectForm).then(response => {
        		console.log("成功了")
        		this.$emit('findAllProjectsByEstateOwner')
          	this.$refs.msgDialog.notify("添加成功")
        	}).catch(error => {
          	this.$refs.msgDialog.confirm("添加失败l")
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