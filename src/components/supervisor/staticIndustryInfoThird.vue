<template>
	<div>
		<el-row>
			<el-col :span="26">
				<label>装配式建筑项目总量情况统计信息</label>
			</el-col>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-col :span="4">	
				<el-input
				    v-model="selectedYearForProjectStatus"
				    align="right"
				    size="small"
				    type="number"
				    min="1"
				    placeholder="选择年">
			 	</el-input>
			</el-col>
			<el-col :span="1">年</el-col>		 	
			<el-col :span="4">
			 	<el-input
					placeholder="请选择季度"
					align="right"
					size="small"
					type="number"
					max="4"
					min="1"
					v-model="selectedQuarterForProjectStatus"
			 	></el-input>		 	
			 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="3">
				<el-button @click="searchProjectStatusInfo" size="small">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table
			:data="projectStatusInfoData"
			border
			style="width:100%">
				<el-table-column
				label="序号"
				type="index"
				header-align="center"
				width="100"
				>
				</el-table-column>
				<el-table-column
				prop="description"
				label="指标"
				header-align="center">
				</el-table-column>
				<el-table-column
				prop="number"
				label="数值"
				header-align="center"
				>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row></el-row>
		<el-row>
			<label>
				装配式建筑项目应用产业化技术的分类情况统计信息1
			</label>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-col :span="4">	
				<el-input
				    v-model="selectedYearForIndustryInfoOne"
				    align="right"
				    size="small"
				    type="number"
				    min="1"
				    placeholder="选择年">
			 	</el-input>
			</el-col>
			<el-col :span="1">年</el-col>		 	
			<el-col :span="4">
			 	<el-input
					placeholder="请选择季度"
					align="right"
					size="small"
					type="number"
					max="4"
					min="1"
					v-model="selectedQuarterForIndustryInfoOne"
			 	></el-input>		 	
			 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="3">
				<el-button @click="searchIndustryInfoOne" size="small">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table
			:data="industryInfoDataOne"
			border
			style="width:100%">
				<el-table-column
				label="建筑形式"
				prop="formDes"
				header-align="center"
				width="300"
				>
				</el-table-column>
				<el-table-column
				prop="projectNum"
				label="项目数量（个）"
				header-align="center">
				</el-table-column>
				<el-table-column
				prop="area"
				label="项目建筑面积（万平方米）"
				header-align="center"
				>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row></el-row>
		<el-row>
			<label>
				装配式建筑项目应用产业化技术的分类情况统计信息2
			</label>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-col :span="4">	
				<el-input
				    v-model="selectedYearForIndustryInfoTwo"
				    align="right"
				    size="small"
				    type="number"
				    min="1"
				    placeholder="选择年">
			 	</el-input>
			</el-col>
			<el-col :span="1">年</el-col>		 	
			<el-col :span="4">
			 	<el-input
					placeholder="请选择季度"
					align="right"
					size="small"
					type="number"
					max="4"
					min="1"
					v-model="selectedQuarterForIndustryInfoTwo"
			 	></el-input>		 	
			 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="3">
				<el-button @click="searchIndustryInfoTwo" size="small">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table
			:data="industryInfoDataTwo"
			border
			style="width:100%">
				<el-table-column
				label="工程结构类型"
				prop="description"
				header-align="center"
				width="300"
				>
				</el-table-column>
				<el-table-column
				prop="number"
				label="各结构单位工程数量（个）"
				header-align="center">
				</el-table-column>
				<el-table-column
				prop="area"
				label="工程建筑面积（万平方米）"
				header-align="center"
				>
				</el-table-column>
			</el-table>
		</el-row>
		<msg-dialog ref="industryMsg"></msg-dialog>
	</div>
</template>
<script>
import msgDialog from '../common/msgDialog'
	export default{
		data(){
			return{
				//获取表格的初始显示信息
				projectStatusInfoData:[],
				industryInfoDataOne:[],
				industryInfoDataTwo:[],

				//获取年
				initSelectedYear:'',
				//获取季度
				initSelectedQuarter:'',

				selectedYearForProjectStatus:'',
				selectedQuarterForProjectStatus:'',
				selectedYearForIndustryInfoOne:'',
				selectedQuarterForIndustryInfoOne:'',
				selectedYearForIndustryInfoTwo:'',
				selectedQuarterForIndustryInfoTwo:'',

			}
		},
		created(){
			var date = new Date()
			var currMonth=date.getMonth()
			this.initSelectedYear=date.getFullYear()
			this.initSelectedQuarter=Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
			this.selectedYearForProjectStatus=this.initSelectedYear
			this.selectedYearForIndustryInfoOne=this.initSelectedYear
			this.selectedYearForIndustryInfoTwo=this.initSelectedYear

			this.selectedQuarterForProjectStatus=this.initSelectedQuarter
			this.selectedQuarterForIndustryInfoOne=this.initSelectedQuarter
			this.selectedQuarterForIndustryInfoTwo=this.initSelectedQuarter
			this.getAllProjectStatusInfo()
			this.getAllIndustryInfoOne()
			this.getAllIndustryInfoTwo()
		},
		methods:{
			getAllProjectStatusInfo(){
				var url = this.HOST + "/queryQuarterProject?year="+this.selectedYearForProjectStatus+"&quarter="+this.selectedQuarterForProjectStatus
				this.$http.get(url).then(response=>{
					this.projectStatusInfoData=response.data
					this.$refs.industryMsg.notify("查询成功")
				}).catch(error=>{
					this.$refs.industryMsg.confirm("查询失败")
				})
			},
			getAllIndustryInfoOne(){
				var url = this.HOST + "/queryQuarterFormProject?year="+this.selectedYearForIndustryInfoOne+"&quarter="+this.selectedQuarterForIndustryInfoOne
				this.$http.get(url).then(response=>{
					this.industryInfoDataOne=response.data
					this.$refs.industryMsg.notify("查询成功")
				}).catch(error=>{
					this.$refs.industryMsg.confirm("查询失败")
				})
			},
			getAllIndustryInfoTwo(){
				var url = this.HOST + "/queryQuarterUnitEngineering?year="+this.selectedYearForIndustryInfoTwo+"&quarter="+this.selectedQuarterForIndustryInfoTwo
				this.$http.get(url).then(response=>{
					this.industryInfoDataTwo=response.data
					this.$refs.industryMsg.notify("查询成功")
				}).catch(error=>{
					this.$refs.industryMsg.confirm("查询失败")
				})
			},
			searchProjectStatusInfo(){
				this.getAllProjectStatusInfo()
			},
			searchIndustryInfoOne(){
				this.getAllIndustryInfoOne()
			},
			searchIndustryInfoTwo(){
				this.getAllIndustryInfoTwo()
			}
		},
		components:{
			msgDialog
		}
	}
</script>