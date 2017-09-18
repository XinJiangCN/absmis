<template>
	<div>
		<div id="header">
		<h4>
			<label>业务管理员</label><br>			
			<label>企业建筑产业化信息</label>
		</h4>			
		</div>
		<el-row>
			<el-col :span="24">
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
					<el-col :span="5">
					<el-date-picker
				      v-model="searchTime"
				      type="daterange"
				      placeholder="选择日期范围">
				    </el-date-picker>	
					</el-col>
					<el-button type="primary" @click="searchTraditionalInfo">查询</el-button>
					<el-button @click="passCheck(selectedId)">通过</el-button>
				    <el-button @click="failCheck(selectedId)">驳回</el-button>
				</el-row>
				<el-row>
					<el-table
					:data="traditionalInfoData"
					highlight-current-row
					border
					@row-click="handleRowChange">
					<el-table-column
					label="企业名称"
					prop="constructionEn.name">				
					</el-table-column>
					<el-table-column
					label="填报时间"
					prop="declareTime">
					</el-table-column>	
					<el-table-column
					label="混凝土数量"
					prop="addNewConcrete"
					></el-table-column>
					<el-table-column
					prop="addNewSteel"
					label="负责结构数量"
					></el-table-column>
					<el-table-column
					prop="addNewTimber"
					label="木结构数量"
					></el-table-column>
					<el-table-column
					prop="checkedStatus.state"
					label="审核状态"	
					></el-table-column>			
				</el-table>
				<el-pagination
					@current-change="handlePageNumChange"
					@size-change="handlePageSizeChange"
					:page-sizes="[5,10,15,20]"
				    :current-page="pageNum"
				    :page-size="pageSize"
				    layout="total, sizes, prev, pager, next, jumper"
				    :total="total">
				</el-pagination>
				</el-row>
			</el-col>
		</el-row>
		<msg-dialog ref="msgDialog"></msg-dialog>
	</div>
</template>
<script type="text/javascript">
import moment from 'moment'
import msgDialog from '../common/msgDialog.vue'
	export default{
		data:function(){
			return{
				traditionalInfoData:'',
				selectedCompanyName:'',
				selectedRow:[],
				selectedId:'',
				selectedConstructionId:'',
				pageNum:1,
				pageSize:10,
				total:'',
				searchTime:'',
			}
		},
		created:function(){
			this.getComponentCompanyInfoData()
		},
		methods:{
			getComponentCompanyInfoData:function(){
				var url=this.HOST+'/displayAllConstructionEnIndustrializationsBySubmit?page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.traditionalInfoData=response.data.rows
					this.total=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.notify("获取数据失败")
				})
			},
			handleRowChange:function(val){	
				this.selectedId=val.id
				this.selectedRow=val
				this.selectedConstructionId=val.constructionEn.id		
			},
			handlePageNumChange:function(val){
				this.pageNum=val
				this.getComponentCompanyInfoData()
			},
			handlePageSizeChange:function(val){
				this.pageSize=val
				this.getComponentCompanyInfoData()
			},
			searchTraditionalInfo:function(){
				if (this.selectedCompanyName==''||this.searchTime=='') {
					this.$refs.msgDialog.confirm("请检查查询条件")
				}else{
					var startTime=moment(this.searchTime[0]).format("YYYY-MM-DD")
					var endTime=moment(this.searchTime[1]).format("YYYY-MM-DD")
					var url=this.HOST+'/queryConstructionEnIn?constructionEnName='+this.selectedCompanyName+'&startTime='+startTime+'&endTime='+endTime+'&page='+this.pageNum+'&rows='+this.pageSize
					this.$http.get(url).then(response=>{
						this.traditionalInfoData=response.data.rows
						this.total=response.data.total
					}).catch(response=>{
						this.$refs.msgDialog.notify("查询出现错误！")
					})
				}
			},
			passCheck:function(val){
				if (val) {
					var url1 = this.HOST+'/checkConstructionEnIndustrialization?id='+this.selectedId+'&checkedStatusId='+1+'&constructionEnId='+this.selectedConstructionId			
					this.$http.post(url1).then(response=>{
						this.$refs.msgDialog.notify("通过审核！")
						this.getComponentCompanyInfoData()
					}).catch(response=>{
						this.$refs.msgDialog.notify("审核通过失败！")
					})
				}else{
					this.$refs.msgDialog.confirm("请选择要审核的企业产业化信息")
				}
				
			},
			failCheck:function(val){
				if (val) {
					var url = this.HOST+'/checkConstructionEnIndustrialization?id='+this.selectedId+'&checkedStatusId='+2+'&constructionEnId='+this.selectedConstructionId	
					this.$http.post(url).then(response=>{
						this.$refs.msgDialog.notify("成功驳回！")
						this.getComponentCompanyInfoData()
					}).catch(response=>{
						this.$refs.msgDialog.notify("驳回出错")
					})
				}else{
					this.$refs.msgDialog.confirm("请选择要审核的企业产业化信息")
				}
				
			}
		},
		components:{
			msgDialog
		}
	}
</script>
<style type="text/css">
</style>