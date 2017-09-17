<template>
<div>
	<div id="header">
		<h4>
			<label>业务管理员</label>
			<label>构件生产企业建筑产业化信息</label>
		</h4>	
	</div>
	<el-row>
		<el-col :span="6">
			<el-input
			  placeholder="请填写企业名称"
			  icon="search"
			  v-model="selectedCompanyName"
			  :on-icon-click="searchTraditionalInfo">
			</el-input>			
		</el-col>
		<el-col :span="3">
			填报时间：
		</el-col>
		<el-col :span="6">
			<el-date-picker
		      v-model="searchTime"
		      type="daterange"
		      placeholder="选择日期范围">
		    </el-date-picker>		
		</el-col>
		<el-col :span="6">
			<el-button type="primary" @click="searchTraditionalInfo">查询</el-button>
			<el-button @click="passCheck(selectedId)">通过</el-button>
			<el-button @click="failCheck(selectedId)">驳回</el-button>	
		</el-col>	
	</el-row>
	<el-col :span="6">	
		<el-row>
			<el-table
			:data="companyInfoData"
			highlight-current-row
			border
			@row-click="handleRowChange">
			<el-table-column
			label="企业名称"
			prop="componentEn.name">				
			</el-table-column>
			<el-table-column
			label="填报时间"
			prop="declareTime">				
			</el-table-column>
			</el-table>
			<el-pagination
				@current-change="handlePageNumChange"
				@size-change="handlePageSizeChange"
				:page-sizes="[5,10,15,20]"
			    :current-page="pageNum"
			    :page-size="pageSize"
			    layout="total,  prev, pager, next, jumper"
			    :total="total">
			</el-pagination>
		</el-row>	
	</el-col>
	<el-col :span="18">
		<el-col :span="24">	
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
				<el-col :span="6">
					预制装配混凝土结构构件
				</el-col>				
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltConcreteNum" disabled></el-input></el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltConcreteAbility" disabled><template slot="append">万平方米</template></el-input></el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltConcreteScale" disabled><template slot="append">万平方米</template></el-input></el-col>		
			</el-row>
			<el-row>
				<el-col :span="6">钢结构构件"</el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltSteelNum" disabled></el-input></el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltSteelAbility"disabled><template slot="append">万平方米</template></el-input></el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltSteelScale" disabled><template slot="append">万平方米</template></el-input></el-col>	
			</el-row>
			<el-row>
				<el-col :span="6">木结构构件</el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltTimberNum" disabled></el-input></el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltTimberAbility" disabled><template slot="append">万平方米</template></el-input></el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltTimberScale" disabled><template slot="append">万平方米</template></el-input></el-col>	
			</el-row>
			<el-row>
				<el-col :span="6">其他结构的构件</el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltOtherNum" disabled></el-input></el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltOtherAbility" disabled><template slot="append">万平方米</template></el-input></el-col>
				<el-col :span="6"><el-input v-model="this.selectedRow.prebuiltOtherScale" disabled><template slot="append">万平方米</template></el-input></el-col>	
			</el-row>
		</el-col>
	</el-col>
	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
	
</template>
<script type="text/javascript">
import moment from 'moment'
import msgDialog from '../common/msgDialog.vue'
	export default{
		data(){
			return{
				companyInfoData:'',
				selectedCompanyName:'',
				searchTime:'',
				pageNum:1,
				pageSize:10,
				total:'',
				selectedRow:'',
				selectedComponentEnId:'',
				selectedId:'',
			}
		},
		created:function(){
			this.getComponentInfoData()
		},
		methods:{
			getComponentInfoData:function(){
				var url = this.HOST+'/displayAllComponentEnIndustrializationsBySubmit?page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.companyInfoData=response.data.rows
					this.total=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.notify("获取数据失败")
				})
			},
			searchTraditionalInfo:function(){
				if (this.selectedCompanyName==''||this.searchTime=='') {
					this.$refs.msgDialog.confirm("请检查查询条件")
				}else{
					var startTime=moment(this.searchTime[0]).format("YYYY-MM-DD")
					var endTime=moment(this.searchTime[1]).format("YYYY-MM-DD")
					var url=this.HOST+'/queryComponentEnIn?componentEnName='+this.selectedCompanyName+'&startTime='+startTime+'&endTime='+endTime+'&page='+this.pageNum+'&rows='+this.pageSize
					this.$http.get(url).then(response=>{
						this.companyInfoData=response.data.rows
						this.total=response.data.total
					}).catch(response=>{
						this.$refs.msgDialog.notify("查询出错")
					})
				}
			},
			handleRowChange:function(val){
				this.selectedRow=val
				this.selectedId=val.id				
				this.selectedComponentEnId=val.componentEn.id
			},
			handlePageNumChange:function(val){
				this.pageNum=val
				this.getComponentInfoData()
			},
			handlePageSizeChange:function(val){
				this.pageSize=val
				this.getComponentInfoData()
			},
			failCheck:function(val){
				if (val) {
					var url=this.HOST+'/checkComponentEnIndustrialization?id='+this.selectedId+'&constructionEnId='+this.selectedComponentEnId+'&checkedStatusId='+3
					this.$http.post(url).then(response=>{
						this.getComponentInfoData()	
						this.selectedId=''			
						this.$refs.msgDialog.notify("成功驳回！")
					}).catch(response=>{
						this.$refs.msgDialog.notify("驳回失败！")
					})
				}else{

					this.$refs.msgDialog.confirm("请选择要审核的企业产业化信息")				
				}
				
			},
			passCheck:function(val){
				// /checkComponentEnIndustrialization
				if (val) {
					var url=this.HOST+'/checkComponentEnIndustrialization?id='+this.selectedId+'&constructionEnId='+this.selectedComponentEnId+'&checkedStatusId='+1
					this.$http.post(url).then(response=>{
						this.getComponentInfoData()				
						this.selectedId=''
						this.$refs.msgDialog.notify("审核通过！")
					}).catch(response=>{
						this.$refs.msgDialog.notify("审核失败！")
					})
				}else{
					this.$refs.msgDialog.confirm("请选择要审核的企业产业化信息！")
				}
				
			}
		},
		components:{
			msgDialog
		}
	}
</script>
<style type="text/css">
	#header{
		width: 100%;
		height: 5%;
		margin-top: -30px
	}
</style>