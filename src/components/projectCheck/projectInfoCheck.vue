<template>
<div>
	<el-col :span="24">
		<el-row>
      	<!-- 每行分为24栏（固定），span设置该列占有5栏 -->
		      <el-col :span="8">
		        <!-- 增删改按钮 -->
		        <el-button-group>
		          <el-button type="primary" @click="passProject">审核通过</el-button>
		          <el-button type="primary" @click="rejectProject">驳回</el-button>
		        </el-button-group>
		      </el-col>
    	</el-row>
            <project-info-check-panel
            :projectForm="projectForm" :structureForm="structureForm"></project-info-check-panel>   	
	</el-col>

	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script>
  import projectInfoCheckPanel from './projectInfoCheckPanel'
  import msgDialog from '../common/msgDialog'
  export default{
    data(){
      return{
       		
       	  editDialogVisible: false,
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
      	projectStates:[],
        structureForm: '',
      	projectCategorys:[],
  		projectForm: {
  			id:'',
  			checkedStatus:{
  				id:'',
  				state:''
  			},
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
		    projectCategory:'',
		   	projectState:'',
		   	schedule:{
		   		startTime:'',
			    endTime:'',
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
    	passProject(){
    		console.log("然后然后");
	         var url = this.HOST + "/updateProjectById?id="+this.projectForm.id+"&checkedStatus="+1
	        this.$http.post(url).then(response => {
	          this.$refs.msgDialog.notify("审核通过")
	        }).catch(error => {
	          this.$refs.msgDialog.confirm("修改失败")
	        })

    	},
    	 rejectProject() {
    	 	var url = this.HOST + "/updateProjectById?id="+this.projectForm.id+"&checkedStatus="+2
	        this.$http.post(url).then(response => {
	          this.$refs.msgDialog.notify("修改重申")
	        }).catch(error => {
	          this.$refs.msgDialog.confirm("修改失败")
	        })
      	 },
    	findCurrentProjectInfo(ref){
        this.projectForm = ref
    		// console.log("log"+this.projectId)
    		// this.$http.get(this.HOST + "/findProjectInfoById?id="+this.projectId).then(response => {
      //     		this.projectForm = response.data
      //     		console.log("啦啦啦啦")
      //     		console.log(this.projectForm)
      //   		}).catch(error => {
      //     		this.$refs.msgDialog.confirm("查询失败la")
      //   		})

    	},
      findStructureForm(ref){
        var url = this.HOST + "/findStructureForm?id="+ref.id 
          this.$http.get(url).then(response => {
            console.log("成功了")
            this.structureForm = response.data
            console.log(this.structureForm+"yesyes")
            this.$refs.msgDialog.notify("获取成功")
          }).catch(error => {
            this.$refs.msgDialog.confirm("获取失败")
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
      msgDialog,
      projectInfoCheckPanel
    }
  }
</script>