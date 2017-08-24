<template>
	<div>
		<el-row>
			<el-col :span="4">
				<el-input v-model="searchContent" placeholder="请输入查询内容"></el-input>
			</el-col>
			<el-col :span="3">
				<el-button @click="searchDesignTraditionalData">查询</el-button>
			</el-col>
			<el-col :span="3">
				<el-button @click="check">审核</el-button>
			</el-col>
		</el-row>
		<el-table
		    :data="traditionalCheckTableData"
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
		      label="资质证书编号"
		      prop="qualificationNo"
		      show-overflow-tooltip>
		    </el-table-column>

		    <el-table-column
		      label="资质等级"
		      prop="designerQualification.description"
		      show-overflow-tooltip>
		    </el-table-column>

		    <el-table-column
		      label="审核状态"
		      prop="checkedStatus.state"
		      show-overflow-tooltip>
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
	  	<msg-dialog ref="traditionalCheckMsg"></msg-dialog>
	  	<!-- 对话框，用来修改审核状态 -->
	  	<el-dialog
		  	title="选择审核状态"
		  	:visible.sync="checkedStatusDialogVisible"
		  	size="tiny">
		  	<el-select v-model="checkedStatusId" placeholder="请选择">
			    <el-option
			      v-for="item in checkedStatus"
			      :key="item.id"
			      :label="item.state"
			      :value="item.id">
			    </el-option>
			 </el-select>
		  	<span slot="footer" class="dialog-footer">
		    <el-button @click="checkedStatusDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="checkedStatusUpdate">确 定</el-button>
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
				traditionalCheckTableData:[],
				//更改审核状态用的对话框显示条件
				checkedStatusDialogVisible:false,
				//所有审核状态
				checkedStatus:'',
				//审核状态的id，提交后台更改后的状态和对话框绑定显示时使用
				checkedStatusId:'',
				//获取当前行id，提交时使用
				currentRowId:'',
				//当前页页码
				currentPage:1,
				//每页最大显示数据条数
				pageSize:5,
				//数据总量
				total:0,
				//查询的内容
				searchContent:'',
				//刷新查询后的表格页面使用
				searchContentFinal:''

			}
		},
		//加载页面时执行
		created(){
			//获取表格需要显示的信息
			this.findDesignTraditionalInfo()
			//获取所有的审核状态可选项
			var url = this.HOST + '/findAllCheckedStates'
			this.$http.get(url).then(response=>{
				this.checkedStatus = response.data
			})
		},
		methods:{
			//每页容量改变时触发，刷新表格，重新显示
			handleSizeChange(newPageSize){
				this.pageSize=newPageSize
				this.findDesignTraditionalInfo()
			},
			//页码改变时触发，刷新表格，重新显示
			handleCurrentChange(newPage){
				this.currentPage=newPage
				this.findDesignTraditionalInfo()
			},
			//获取表格显示需要的数据，用于表格显示和刷新表格
			findDesignTraditionalInfo(){
				var url = this.HOST + '/displayAllDesigners?page='+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.traditionalCheckTableData = response.data.rows
					this.total=response.data.total
					//遍历获取的数据，对未审核状态进行赋值，使页面显示“未审核”
					this.traditionalCheckTableData.forEach(item=>{
						if(!item.checkedStatus){
							item.checkedStatus={id:'',no:'',state:"未审核"}
						}
					})
				}).catch(error=>{
					this.$refs.traditionalCheckMsg.confirm("获取失败！")
				})
			},
			//点击审核时触发，判断是否已选择某行，若没有，进行提示
			check(){
				if(this.currentRowId!=''){
					this.checkedStatusDialogVisible=true
				}else{
					this.$refs.traditionalCheckMsg.confirm("请先选择一行")
				}
			},
			//点击提交审核状态
			checkedStatusUpdate(){
				this.checkedStatusDialogVisible=false
				var url=this.HOST+"/checkDesigner?id="+this.currentRowId+"&checkedStatusId="+this.checkedStatusId
				this.$http.post(url).then(response=>{
					if(this.searchContentFinal){
						var url = this.HOST + "/queryDesignerByName?nameQuery="+this.searchContentFinal+"&rows="+this.pageSize+"&page="+this.currentPage
						this.$http.get(url).then(response=>{
							this.traditionalCheckTableData = response.data.rows
							this.total=response.data.total
							//遍历所有元素，给未审核元素的审核状态赋值，页面显示效果为“未审核”
							this.traditionalCheckTableData.forEach(item=>{
								if(!item.checkedStatus){
									item.checkedStatus={id:'',no:'',state:"未审核"}
								}
							})
						}).catch(error=>{
							this.$refs.traditionalCheckMsg.confirm("查询失败！")
						})
					}else{
						this.findDesignTraditionalInfo()
					}
					this.$refs.traditionalCheckMsg.notify("审核成功")
				}).catch(error=>{
					this.$refs.traditionalCheckMsg.confirm("审核失败！")
				})
				this.checkedStatusId=''
				this.currentRowId=''
			},
			//当某一行被点击时执行
			handleSelectionChange(currentRow){
				//获取当前行的id，提交时执行
				this.currentRowId=currentRow.id
				//获取当前行的审核状态id，用于对话框初始显示和提交
				this.checkedStatusId=currentRow.checkedStatus.id
			},
			//查询获取查询内容
			searchDesignTraditionalData(){
				this.searchContentFinal = this.searchContent
				var url = this.HOST + "/queryDesignerByName?nameQuery="+this.searchContentFinal+"&rows="+this.pageSize+"&page="+this.currentPage
				this.$http.get(url).then(response=>{
					this.traditionalCheckTableData = response.data.rows
					this.total=response.data.total
					//遍历所有元素，给未审核元素的审核状态赋值，页面显示效果为“未审核”
					this.traditionalCheckTableData.forEach(item=>{
						if(!item.checkedStatus){
							item.checkedStatus={id:'',no:'',state:"未审核"}
						}
					})
				}).catch(error=>{
					this.$refs.traditionalCheckMsg.confirm("查询失败！")
				})
			}
		},
		//注册组件
		components:{
			msgDialog
		}
	}
</script>