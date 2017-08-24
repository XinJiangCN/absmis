<template>
	<div>
		<el-row>
			<el-col :span="5">
				<h4>非资质企业基本信息审核</h4>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="4">
				<el-input v-model="searchContent" placeholder="请输入查询内容"></el-input>
			</el-col>
			<el-col :span="3">
				<el-button @click="searchNonTraditionalData">查询</el-button>
			</el-col>
			<el-col :span="3">
				<el-button @click="checkNontraditionalInfo">审核</el-button>
			</el-col>
		</el-row>
		<el-table
		    :data="nonTraditionalCheckTableData"
		    border
		    tooltip-effect="dark"
		    style="width:100%"
		    highlight-current-row
		    @row-click="handleSelectionChange">

		    <el-table-column
		      label="企业名称"
		      prop="name"
		      show-overflow-tooltip>
		    </el-table-column>

		    <el-table-column
		      label="类型"
		      prop="enterpriseType"
		      show-overflow-tooltip>
		    </el-table-column>

		    <el-table-column
		      label="统一社会信用代码"
		      prop="creditCode"
		      show-overflow-tooltip>
		    </el-table-column>

		    <el-table-column
		      label="组织机构代码"
		      prop="organizationCode"
		      show-overflow-tooltip>
		    </el-table-column>

		    <el-table-column
		      label="所在市县"
		      prop="city"
		      show-overflow-tooltip>
		    </el-table-column>

		    <el-table-column
		      label="法定代表人"
		      prop="legalRepresentative"
		      show-overflow-tooltip>
		    </el-table-column>

		    <el-table-column
		      prop="checkedStatus.state"
		      label="审核状态">
		    </el-table-column>
	  	</el-table>
	  	<!-- 分页 -->
	  	<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[5, 10, 15, 20]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total">
	    </el-pagination>
	    <!-- 调用组件，使用其信息提示框，无实际显示意义 -->
	  	<msg-dialog ref="nonTraditionalCheckMsg"></msg-dialog>
	  	<!-- 对话框，用来修改审核状态 -->
	  	<el-dialog
		  	title="选择审核状态"
		  	:visible.sync="checkStatusDialogVisable"
		  	size="tiny">
		  	<el-select v-model="checkStatusId" placeholder="请选择">
			    <el-option
			      v-for="item in checkStatus"
			      :key="item.id"
			      :label="item.state"
			      :value="item.id">
			    </el-option>
			 </el-select>
		  	<span slot="footer" class="dialog-footer">
		    <el-button @click="checkStatusDialogVisable = false">取 消</el-button>
		    <el-button type="primary" @click="checkStatusUpdate">提 交</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import msgDialog from '../common/msgDialog'
	export default{
		data(){
			return{
				//被审核企业的所有信息
				nonTraditionalCheckTableData:[],
				//更改审核状态用的对话框显示条件
				checkStatusDialogVisable:false,
				//所有审核状态
				checkStatus:[],
				//当前审核状态的Id，对话框初始显示和提交时使用
				checkStatusId:'',
				//当前行的id，提交时使用
				currentRowId:'',
				//分页用
				//当前页页码
				currentPage:1,
				//当前页容量
				pageSize:5,
				//数据总量
				total:0,
				//查询条件
				searchContent:'',
				//刷新查询后的表格页面使用
				searchContentFinal:''


			}
		},
		//加载页面时触发
		created(){
			//调用方法，获取表格显示数据
			this.findNonTraditionalInfo()
			//获取所有审核状态可选项
			var url = this.HOST + '/findAllCheckedStates'
			this.$http.get(url).then(response=>{
				this.checkStatus = response.data
			})
		},
		methods:{
			//点击审核时触发，判断是否已有选择行，若没有，进行信息提示
			checkNontraditionalInfo(){
				if(this.currentRowId==''){
					this.$refs.nonTraditionalCheckMsg.confirm("请先选择一行")
				}else{
					this.checkStatusDialogVisable=true
				}
			},
			//每页容量改变时触发，刷新页面，重新显示
			handleSizeChange(newPageSize){
				this.pageSize=newPageSize
				this.findNonTraditionalInfo()
			},
			//页码改变时触发，刷新页面，重新显示
			handleCurrentChange(newPage){
				this.currentPage = newPage
				this.findNonTraditionalInfo()
			},
			//获取表格要显示的数据
			findNonTraditionalInfo(){
				var url = this.HOST + "/displayOrganizations?page="+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.nonTraditionalCheckTableData = response.data.rows
					this.total = response.data.total
					//遍历判断，给未审核状态的元素赋值，使其页面显示“未审核”
					this.nonTraditionalCheckTableData.forEach(item=>{
						if(!item.checkedStatus){
							item.checkedStatus={id:'',no:'',state:"未审核"}
						}
					})
					
				}).catch(error=>{
					this.$refs.nonTraditionalCheckMsg.confirm("获取失败！")
				})
			},
			//点击某行时触发
			handleSelectionChange(currentRow){
				//获取当前行的id，用于提交
				this.currentRowId=currentRow.id
				//获取当前行的审核状态id，用于对话框初始显示和提交
				this.checkStatusId=currentRow.checkedStatus.id
			},
			//点击提交审核状态
			checkStatusUpdate(){
				this.checkStatusDialogVisable=false
				var url=this.HOST+"/updateTraditionalEn?id="+this.currentRowId+"&checkedStatusId="+this.checkStatusId
				this.$http.post(url).then(response=>{
					if(this.searchContentFinal){
						var url = this.HOST + "/queryOrganizations?queryName="+this.searchContentFinal+"&rows="+this.pageSize+"&page="+this.currentPage
						this.$http.get(url).then(response=>{
							this.nonTraditionalCheckTableData = response.data.rows
							this.total = response.data.total
							//遍历判断，给未审核状态的元素赋值，使其页面显示“未审核”
							this.nonTraditionalCheckTableData.forEach(item=>{
								if(!item.checkedStatus){
									item.checkedStatus={id:'',no:'',state:"未审核"}
								}
							})
						}).catch(error=>{
							this.$refs.nonTraditionalCheckMsg.confirm("查询失败！")
						})
					}else{
						this.findNonTraditionalInfo()
					}
					
					this.$refs.nonTraditionalCheckMsg.notify("审核成功")
				}).catch(error=>{
					this.$refs.nonTraditionalCheckMsg.confirm("审核失败！")
				})
				this.checkStatusId=''
				this.currentRowId=''
			},
			//查询企业信息
			searchNonTraditionalData(){
				this.searchContentFinal = this.searchContent
				var url = this.HOST + "/queryOrganizations?queryName="+this.searchContentFinal+"&rows="+this.pageSize+"&page="+this.currentPage
				this.$http.get(url).then(response=>{
					this.nonTraditionalCheckTableData = response.data.rows
					this.total = response.data.total
					//遍历判断，给未审核状态的元素赋值，使其页面显示“未审核”
					this.nonTraditionalCheckTableData.forEach(item=>{
						if(!item.checkedStatus){
							item.checkedStatus={id:'',no:'',state:"未审核"}
						}
					})
				}).catch(error=>{
					this.$refs.nonTraditionalCheckMsg.confirm("查询失败！")
				})
			}
		},
		components:{
			msgDialog
		}
	}
</script>