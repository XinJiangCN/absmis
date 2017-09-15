<template>
	<div>
		<el-row>
			<el-col :span="26">
				<label>企业（房地产开发企业设计单位施工单位）单位信息统计</label>
			</el-col>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-col :span="4">	
				<el-input
				    v-model="selectedYearForConstructionEn"
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
					v-model="selectedQuarterForConstructionEn"
			 	></el-input>		 	
			 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="3">
				<el-button @click="searchConstructionEns" size="small">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table
			:data="ConstructionEn"
			border
			style="width:100%">
				<el-table-column
				prop="name"
				label="企业名称"
				header-align="center">
				</el-table-column>
				<el-table-column
				prop="type"
				label="企业类型"
				header-align="center"
				>
				</el-table-column>
				<el-table-column
				prop="totalScale"
				label="从事装配式建筑规模累计量（万平方米）"
				header-align="center"
				>
				</el-table-column>
				<el-table-column
				prop="annualScale"
				label="本年度从事装配式建筑规模累计量（万平方米）"
				header-align="center"
				>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row>
          <el-col :span="24">
              <el-pagination
                  @size-change="handleSizeChangeC"
                  @current-change="handleCurrentChangeC"
                  :current-page="currentPageC"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageSizeC"
                  layout="total,sizes,prev,pager,next,jumper"
                  :total="totalNumC">
              </el-pagination>
          </el-col>
        </el-row>
		<el-row></el-row>
		<el-row>
			<label>
				生产企业（构件生产企业部品生产企业）信息统计
			</label>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-col :span="4">	
				<el-input
				    v-model="selectedYearForSubUnitAndComponentEns"
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
					v-model="selectedQuarterForSubUnitAndComponentEns"
			 	></el-input>		 	
			 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="3">
				<el-button @click="searchSubUnitAndComponentEns" size="small">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table
			:data="SubUnitAndComponentEn"
			border
			style="width:100%">
				<el-table-column
				label="企业名称"
				prop="name"
				header-align="center"
				width="300"
				>
				</el-table-column>
				<el-table-column
				prop="type"
				label="生产的构件部品"
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
		<el-row>
          <el-col :span="24">
              <el-pagination
                  @size-change="handleSizeChangeS"
                  @current-change="handleCurrentChangeS"
                  :current-page="currentPageS"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageSizeS"
                  layout="total,sizes,prev,pager,next,jumper"
                  :total="totalNumS">
              </el-pagination>
          </el-col>
        </el-row>
		<el-row></el-row>
		<el-row>
			<label>
				施工设备机具生产企业信息统计
			</label>
		</el-row>
		<el-row></el-row>
		<el-row>
			<el-col :span="4">	
				<el-input
				    v-model="selectedYearForMachineryEn"
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
					v-model="selectedQuarterForMachineryEn"
			 	></el-input>		 	
			 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="3">
				<el-button @click="searchMachineryEns" size="small">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table
			:data="MachineryEn"
			border
			style="width:100%">
				<el-table-column
				label="企业名称"
				prop="name"
				header-align="center"
				width="300"
				>
				</el-table-column>
				<el-table-column
				prop="type"
				label="企业类型"
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
		<el-row>
          <el-col :span="24">
              <el-pagination
                  @size-change="handleSizeChangeM"
                  @current-change="handleCurrentChangeM"
                  :current-page="currentPageM"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageSizeM"
                  layout="total,sizes,prev,pager,next,jumper"
                  :total="totalNumM">
              </el-pagination>
          </el-col>
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
				ConstructionEn:[],
				pageSizeC:5,
        		currentPageC:1,
        		totalNumC:'',
				SubUnitAndComponentEn:[],
				pageSizeS:5,
        		currentPageS:1,
        		totalNumS:'',
				MachineryEn:[],
				pageSizeM:5,
        		currentPageM:1,
        		totalNumM:'',

				//获取年
				initSelectedYear:'',
				//获取季度
				initSelectedQuarter:'',

				selectedYearForConstructionEn:'',
				selectedQuarterForConstructionEn:'',
				selectedYearForComponentEn:'',
				selectedQuarterForComponentEn:'',
				selectedYearForSubUnitEn:'',
				selectedQuarterForSubUnitEn:'',
				selectedYearForMachineryEn:'',
				selectedQuarterForMachineryEn:'',
				
			}
		},
		created(){
			var date = new Date()
			var currMonth=date.getMonth()
			this.initSelectedYear=date.getFullYear()
			this.initSelectedQuarter=Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
			this.selectedYearForConstructionEn=this.initSelectedYear
			this.selectedYearForSubUnitAndComponentEns=this.initSelectedYear
			this.selectedYearForMachineryEn=this.initSelectedYear

			this.selectedQuarterForConstructionEn=this.initSelectedQuarter
			this.selectedQuarterForSubUnitAndComponentEns=this.initSelectedQuarter
			this.selectedQuarterForMachineryEn=this.initSelectedQuarter
			this.searchConstructionEns()
			this.searchMachineryEns()
			this.searchSubUnitAndComponentEns()
			
		},
		methods:{
			searchConstructionEns(){
				var url = this.HOST + "/getAllConstructionEns?year="+this.selectedYearForConstructionEn+"&quarter="+this.selectedQuarterForConstructionEn+"&page="+this.currentPageC+"&rows="+this.pageSizeC
				this.$http.get(url).then(response=>{
					this.ConstructionEn=response.data.rows
					this.totalNumC = response.data.total;
					this.$refs.industryMsg.notify("查询成功")
				}).catch(error=>{
					this.$refs.industryMsg.confirm("查询失败")
				})
			},
			searchSubUnitAndComponentEns(){
				var url = this.HOST + "/getAllSubUnitAndComponentEns?year="+this.selectedYearForSubUnitAndComponentEns+"&quarter="+this.selectedQuarterForSubUnitAndComponentEns+"&page="+this.currentPageS+"&rows="+this.pageSizeS
				this.$http.get(url).then(response=>{
					this.SubUnitAndComponentEn=response.data.rows
					this.totalNumS = response.data.total;
					this.$refs.industryMsg.notify("查询成功")
				}).catch(error=>{
					this.$refs.industryMsg.confirm("查询失败")
				})
			},
			searchMachineryEns(){
				var url = this.HOST + "/getAllMachineryEns?year="+this.selectedYearForMachineryEn+"&quarter="+this.selectedQuarterForMachineryEn+"&page="+this.currentPageM+"&rows="+this.pageSizeM
				this.$http.get(url).then(response=>{
					this.MachineryEn=response.data.rows
					this.totalNumM = response.data.total;
					this.$refs.industryMsg.notify("查询成功")
				}).catch(error=>{
					this.$refs.industryMsg.confirm("查询失败")
				})
			},
			   handleCurrentChangeC(currentPage){
		          this.currentPageC = currentPage
		          this.searchConstructionEns()
		        },
		       handleSizeChangeC(currentSize) {
		        this.pageSizeC = currentSize
		        this.searchConstructionEns()
		       },
		       handleCurrentChangeM(currentPage){
		          this.currentPageM = currentPage
		          this.searchMachineryEns()
		        },
		       handleSizeChangeM(currentSize) {
		        this.pageSizeM = currentSize
		        this.searchMachineryEns()
		       },
		       handleCurrentChangeS(currentPage){
		          this.currentPageS = currentPage
		          this.searchSubUnitAndComponentEns()
		        },
		       handleSizeChangeS(currentSize) {
		        this.pageSizeS = currentSize
		        this.searchSubUnitAndComponentEns()
		       },
			
		},
		components:{
			msgDialog
		}
	}
</script>