<template>
	<div>
		<el-row>
			<el-col :span="26">
				<label>装配式建筑产业发展情况统计表</label>
			</el-col>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-col :span="4">	
				<el-input
				    v-model="selectedYearByConstructionEn"
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
					v-model="selectedQuarterByConstructionEn"
			 	></el-input>		 	
			 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="3">
				<el-button @click="searchConstructionEnIn" size="small">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table
			:data="constructionEnInfo"
			border
			style="width:100%">
				<el-table-column
				prop="enType"
				label="企业类型"
				header-align="center">
				</el-table-column>
				<el-table-column
				prop="enNum"
				label="当前从事装配式建筑企业数量"
				header-align="center"
				>
				</el-table-column>
				<el-table-column
				prop="totalScale"
				label="从事装配式建筑规模累计量"
				header-align="center"
				>
				</el-table-column>
				<el-table-column
				prop="annualScale"
				label="本年度从事装配式建筑的规模"
				header-align="center"
				>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-col :span="4">	
				<el-input
				    v-model="selectedYearByComponentEn"
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
					v-model="selectedQuarterByComponentEn"
			 	></el-input>		 	
			 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="3">
				<el-button @click="searchComponentEnIn" size="small">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table
			:data="componentEnInfo"
			border
			style="width:100%">
				<el-table-column
				label="装配式建筑构件生产情况"
				prop="description"
				header-align="center"
				width="300"
				>
				</el-table-column>
				<el-table-column
				prop="enNum"
				label="当前生产企业数量(家)"
				header-align="center">
				</el-table-column>
				<el-table-column
				prop="productionLine"
				label="生产线（条）"
				header-align="center"
				>
				</el-table-column>
				<el-table-column
				prop="ability"
				label="生产能力（万平方米/万吨）"
				header-align="center"
				>
				</el-table-column>
				<el-table-column
				prop="appliance"
				label="应用（万平方米）"
				header-align="center"
				>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-col :span="4">	
				<el-input
				    v-model="selectedYearBySubUnitEn"
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
					v-model="selectedQuarterBySubUnitEn"
			 	></el-input>		 	
			 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="3">
				<el-button @click="searchSubUnitEnIn" size="small">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table
			:data="subUnitEnInfo"
			border
			style="width:100%">
				<el-table-column
				label="装配式建筑部品生产情况"
				prop="description"
				header-align="center"
				width="300"
				>
				</el-table-column>
				<el-table-column
				prop="enNum"
				label="当前生产企业数量(家)"
				header-align="center">
				</el-table-column>
				<el-table-column
				prop="productionLine"
				label="生产线（条）"
				header-align="center"
				>
				</el-table-column>
				<el-table-column
				prop="ability"
				label="生产能力（万平方米/万吨）"
				header-align="center"
				>
				</el-table-column>
				<el-table-column
				prop="appliance"
				label="应用（万平方米）"
				header-align="center"
				>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-col :span="4">	
				<el-input
				    v-model="selectedYearByMachineryEn"
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
					v-model="selectedQuarterByMachineryEn"
			 	></el-input>		 	
			 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="3">
				<el-button @click="searchMachineryEnIn" size="small">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table
			:data="machineryEnInfo"
			border
			style="width:100%">
				<el-table-column
				label="装配式建筑专用施工设备机具生产情况"
				prop="description"
				header-align="center"
				width="300"
				>
				</el-table-column>
				<el-table-column
				prop="enNum"
				label="当前生产企业数量(家)"
				header-align="center">
				</el-table-column>
				<el-table-column
				prop="ability"
				label="生产能力（台套/年）"
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
				constructionEnInfo:[],
				componentEnInfo:[],
				subUnitEnInfo:[],
				machineryEnInfo:[],

				//获取年
				initSelectedYear:'',
				//获取季度
				initSelectedQuarter:'',

				selectedYearByConstructionEn:'',
				selectedQuarterByConstructionEn:'',
				selectedYearByComponentEn:'',
				selectedQuarterByComponentEn:'',
				selectedYearBySubUnitEn:'',
				selectedQuarterBySubUnitEn:'',
				selectedYearByMachineryEn:'',
				selectedQuarterByMachineryEn:'',

			}
		},
		created(){
			var date = new Date()
			var currMonth=date.getMonth()
			this.initSelectedYear=date.getFullYear()
			this.initSelectedQuarter=Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
			this.selectedYearByConstructionEn=this.initSelectedYear
			this.selectedYearByComponentEn=this.initSelectedYear
			this.selectedYearBySubUnitEn=this.initSelectedYear
			this.selectedYearByMachineryEn=this.initSelectedYear

			this.selectedQuarterByConstructionEn=this.initSelectedQuarter
			this.selectedQuarterByComponentEn=this.initSelectedQuarter
			this.selectedQuarterByMachineryEn=this.initSelectedQuarter
			this.selectedQuarterBySubUnitEn=this.initSelectedQuarter
			this.searchConstructionEnIn()
			this.searchComponentEnIn()
			this.searchMachineryEnIn()
			this.searchSubUnitEnIn()
			
		},
		methods:{
			searchConstructionEnIn(){
				var url = this.HOST + "/querytjConstructionEn?year="+this.selectedYearByConstructionEn+"&quarter="+this.selectedQuarterByConstructionEn
				this.$http.get(url).then(response=>{
					this.constructionEnInfo=response.data
					this.$refs.industryMsg.notify("查询成功")
				}).catch(error=>{
					this.$refs.industryMsg.confirm("查询失败")
				})
			},
			searchComponentEnIn(){
				var url = this.HOST + "/querytjComponentEn?year="+this.selectedYearByComponentEn+"&quarter="+this.selectedQuarterByComponentEn
				this.$http.get(url).then(response=>{
					this.componentEnInfo=response.data
					this.$refs.industryMsg.notify("查询成功")
				}).catch(error=>{
					this.$refs.industryMsg.confirm("查询失败")
				})
			},
			searchSubUnitEnIn(){
				var url = this.HOST + "/querytjSubUnitEn?year="+this.selectedYearBySubUnitEn+"&quarter="+this.selectedQuarterBySubUnitEn
				this.$http.get(url).then(response=>{
					this.subUnitEnInfo=response.data
					this.$refs.industryMsg.notify("查询成功")
				}).catch(error=>{
					this.$refs.industryMsg.confirm("查询失败")
				})
			},
			searchMachineryEnIn(){
				var url = this.HOST + "/querytjMachineryEn?year="+this.selectedYearByMachineryEn+"&quarter="+this.selectedQuarterByMachineryEn
				this.$http.get(url).then(response=>{
					this.machineryEnInfo=response.data
					this.$refs.industryMsg.notify("查询成功")
				}).catch(error=>{
					this.$refs.industryMsg.confirm("查询失败")
				})
			}
		
		},
		components:{
			msgDialog
		}
	}
</script>