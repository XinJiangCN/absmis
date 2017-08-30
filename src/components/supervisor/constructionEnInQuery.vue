<template>
	<div>
		<h4>
			管理部门-查询-传统企业信息
		</h4>
		<el-row>
			<el-col :span="5">
				<el-input
					placeholder="请填写企业名称"
				  	icon="search"
				  	v-model="selectedCompanyName"
				  	:on-icon-click="searchTraditionalCompany"
				></el-input>			
			</el-col>
			<el-col :span="2">
				<el-button @click="searchTraditionalCompany">查询</el-button>
			</el-col>		
			<el-col :span="4">	
				<el-input
					placeholder="请选择年份"
					align="right"
					type="number"
					v-model="selectedYear"
			 	></el-input>	
			</el-col>
			<el-col :span="1">年</el-col>		 	
			<el-col :span="4">
			 	<el-input
					placeholder="请选择季度"
					align="right"
					type="number"
					v-model="selectedQuarter"
			 	></el-input>		 				 	
			</el-col>
			<el-col :span="1">季度</el-col>
			<el-col :span="1">
				<el-button @click="searchTraditionalInfo">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<el-table
					:data="traditionalCompanyData"
					highlight-current-row
					border
					@row-click="handleRowChange">
				<el-table-column
					label="企业名称"
					prop="name">				
				</el-table-column>
				</el-table>
				<el-pagination
					@current-change="handlePageNumChange"
					@size-change="handlePageSizeChange"
					:page-sizes="[5,10,15,20]"
				    :current-page="pageNum"
				    :page-size="pageSize"
				    layout="total, prev, pager, next, jumper"
				    :total="total">
				</el-pagination>
			</el-col>
			<el-col :span="18">
				<el-col :span="10">
						当期装配式混凝土结构建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model="traditionalCompanyInfoData.addNewConcrete"  placeholder="暂无信息" disabled><template slot="append">万平方米</template></el-input>
				</el-col>
				<el-col :span="10">
						当期装配式钢结构建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model="traditionalCompanyInfoData.addNewSteel"placeholder="暂无信息" disabled><template slot="append">万平方米</template></el-input>
				</el-col>
				<el-col :span="10">
						当期装配式木建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model="traditionalCompanyInfoData.addNewTimber"  placeholder="暂无信息" disabled><template slot="append">万平方米</template></el-input>
				</el-col>
				<el-col :span="10">
						本单位从事装配式建筑历年累计量:
				</el-col>
				<el-col :span="14">
					<el-input v-model="traditionalCompanyInfoData.cumulant" placeholder="暂无信息" disabled><template slot="append">万平方米</template></el-input>
				</el-col>
				<el-col :span="10">
						本年度从事装配式混凝土结构建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model="traditionalCompanyInfoData.annualConcrete" placeholder="暂无信息" disabled><template slot="append">万平方米</template></el-input>
				</el-col>
				<el-col :span="10">
						本年度从事装配式钢结构建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model="traditionalCompanyInfoData.annualSteel" placeholder="暂无信息" disabled><template slot="append">万平方米</template></el-input>
				</el-col>
				<el-col :span="10">
						本年度从事装配式木建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model="traditionalCompanyInfoData.annualTimber" placeholder="暂无信息" disabled><template slot="append">万平方米</template></el-input>
				</el-col>		
			</el-col>
		</el-row>
		
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				selectedCompanyName:'',
				selectedYear:'',
				selectedQuarter:'',
				traditionalCompanyData:'',
				traditionalCompanyInfoData:'',
				currConstructionEnId:'',
				pageSize:10,
				pageNum:1,
				total:'',
			}
		},
		created:function(){
			var date = new Date()
			var currMonth=date.getMonth()
			this.selectedYear=date.getFullYear()
			this.selectedQuarter=Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
			this.getAllConstructionEnInfo()

		},
		methods:{
			getAllConstructionEnInfo:function(){
				var url =this.HOST+'/displayAllConstructionEns?page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.traditionalCompanyData=response.data.rows
					this.total=response.data.total
				})
			},
			searchTraditionalCompany:function(){
				var url =this.HOST+'/queryConstructionEnByName?nameQuery='+this.selectedCompanyName+'&page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.traditionalCompanyData=response.data.rows
					this.total=response.data.total
				}).catch(response=>{
					alert("模糊查询出错")
				})
			},
			searchTraditionalInfo:function(){
				if (this.currConstructionEnId) {
					var url=this.HOST+'/queryAnnual?enId='+this.currConstructionEnId+'&year='+this.selectedYear+'&quarter='+this.selectedQuarter
					this.$http.get(url).then(response=>{
						this.traditionalCompanyInfoData=response.data
						this.currConstructionEnId=''
					}).catch(response=>{
						alert("查询信息出错")
					})
				}else{
					this.$confirm('请选择要查询的企业','提示',{
						confirmButtonText:'确定',
						type:'warning'
					})
				}
				
			},
			handleRowChange:function(val){
				this.currConstructionEnId=val.id
			},
			handlePageNumChange:function(val){
				this.pageNum=val
				this.getAllConstructionEnInfo()
			},
			handlePageSizeChange:function(){
				this.pageSize=val
				this.getAllConstructionEnInfo()
			}
		}
	}
</script>