<template>
	<div>
		<h4>
			管理部门-查询-构件生产企业用户
		</h4>
		<el-row>
			<el-col :span="5">
				<el-input
					placeholder="请填写企业名称"
				  	icon="search"
				  	v-model="selectedCompanyName"
				  	:on-icon-click="searchComponentCompanyInfo"
				></el-input>			
			</el-col>
			<el-col :span="2">
				<el-button @click="searchComponentCompany">查询</el-button>
			</el-col>		
			<el-col :span="4">	
				<el-input
				    v-model="selectedYear"
				    align="right"
				    type="number"
				    placeholder="选择年">
			 	</el-input>
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
				<el-button @click="searchComponentCompanyInfo">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="7">
				<el-table
					:data="componentCompanyData"
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
			<el-col :span="17">
				<el-row>
						<el-col :span="6">
							生产的主要构件和部品系列
						</el-col>
						<el-col :span="6">
							生产线条数（条）
						</el-col>
						<el-col :span="6">
							生产能力
						</el-col>
						<el-col :span="6">
							应用规模
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-row>
								<el-col :span="6">
									预制装配混凝土结构构件
								</el-col>				
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltConcreteNum" disabled></el-input></el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltConcreteAbility" disabled><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltConcreteScale" disabled><template slot="append">万平方米</template></el-input></el-col>		
							</el-row>
							<el-row>
								<el-col :span="6">钢结构构件</el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltSteelNum" disabled></el-input></el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltSteelAbility" disabled><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltSteelScale" disabled><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>
							<el-row>
								<el-col :span="6">木结构构件</el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltTimberNum" disabled></el-input></el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltTimberAbility" disabled><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltTimberScale" disabled><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>
							<el-row>
								<el-col :span="6">其他结构的构件</el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltOtherNum"  disabled></el-input></el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltOtherAbility" disabled><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model="componentEnInfoData.prebuiltOtherScale" disabled><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>	
						</el-col>
					</el-row>	
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
				componentCompanyData:'',
				componentEnInfoData:'',
				componentEnId:'',
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
			this.getAllComponentEnInfo()

		},
		methods:{
			getAllComponentEnInfo:function(){
				var url =this.HOST+'/displayAllComponentEns?page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.componentCompanyData=response.data.rows
					this.total=response.data.total
				})
			},
			searchComponentCompany:function(){
				var url=this.HOST+'/queryComponentEnByName?nameQuery='+this.selectedCompanyName+'&page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.componentCompanyData=response.data.rows
					this.total=response.data.total
				}).catch(response=>{
					alert("模糊查询出错")
				})
			},
			searchComponentCompanyInfo:function(){
				if (this.componentEnId) {
					var url=this.HOST+'/queryQuarterComponentEnIn?enId='+this.componentEnId+'&year='+this.selectedYear+'&quarter='+this.selectedQuarter
					this.$http.get(url).then(response=>{
						this.componentEnInfoData=response.data
						this.componentEnId=''
					}).catch(response=>{
						alert("获取产业化信息出错")
					})		
				}else{
					this.$confirm('请选择要查询的企业','提示',{
						confirmButtonText:'确定',
						type:'warning'
					})
				}
						
			},
			handleRowChange:function(val){
				this.componentEnId=val.id
			},
			handlePageNumChange:function(val){
				this.pageNum=val
				this.getAllComponentEnInfo()
			},
			handlePageSizeChange:function(){
				this.pageSize=val
				this.getAllComponentEnInfo()
			}
		}
	}
</script>