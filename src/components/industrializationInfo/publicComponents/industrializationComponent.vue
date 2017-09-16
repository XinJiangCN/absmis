<template>
<div id="body">
	<el-row>
		<el-button @click="add">增加</el-button>
		<el-button @click="remove(selectedRow,rowIndex)">删除</el-button>
		<el-button @click="update(selectedRow,rowIndex)">修改</el-button>
	</el-row>
	<el-table
	:data="industrializationInfoData"
	highlight-current-row
	border
	@row-click="handleSelectionChange"
	style="width: 100%">
		<el-table-column
		prop="declareTime"
		label="填报时间"
		></el-table-column>	
		<el-table-column
		prop="addNewConcrete"
		label="新增装配式混凝土结构建筑的数量"
		></el-table-column>
		<el-table-column
		prop="addNewSteel"
		label="新增装配式钢结构建筑的数量"
		></el-table-column>
		<el-table-column
		prop="addNewTimber"
		label="新增装配式木建筑的数量"
		></el-table-column>
	</el-table>
	<el-pagination
	@current-change="handlePageNumChange"
	@size-change="handlePageSizeChange"
    :current-page="pageNum"
    :page-size="pageSize"
    :page-sizes="[5,10,15,20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalIndustrializationInfoData">
	</el-pagination>
	<el-dialog v-model="showAddDialog" title="增加">
		<el-form>		
			<el-form :label-position="labelPosition" :rules="rules">
				<el-form-item>
					<el-col :span="5">
						填报时间：
					</el-col>
					<el-col :span="7">
						<el-date-picker
					      v-model="selectTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions1">
					    </el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-col :span="5">
						填报年份：
					</el-col>
					<el-col :span="7">
						<el-input
						type='number'
						v-model="selectedYear"
						align="right"
						></el-input>
					</el-col>
					<el-col :span="5">
						填报季度：
					</el-col>
					<el-col :span="7">
						<el-input
						type='number'
						v-model="selectedQuarter"
						align="right"
						max='4'
						min='1'
						></el-input>
					</el-col>
				</el-form-item>
				<el-form-item prop="data">
					<el-col :span="10">
						新增装配式混凝土结构建筑的数量:
					</el-col>
					<el-col :span="14">
						<el-input v-model.number="addNewConcrete" type='number' maxLength='5' placeholder="请输入内容"><template slot="append">万平方米</template></el-input>
					</el-col>	
				</el-form-item>
				<el-form-item prop="data">
					<el-col :span="10">
						新增装配式钢结构建筑的数量:
					</el-col>
					<el-col :span="14">
						<el-input v-model.number="addNewSteel" type='number' placeholder="请输入内容"><template slot="append">万平方米</template></el-input>
					</el-col>
				</el-form-item>			
				<el-form-item prop="data">
					<el-col :span="10">
						新增装配式木建筑的数量:
					</el-col>
					<el-col :span="14">
						<el-input v-model.number="addNewTimber" type='number' placeholder="请输入内容"><template slot="append">万平方米</template></el-input>
					</el-col>
				</el-form-item>		
			</el-form>
			<el-button type="primary" @click="tempStore">暂存</el-button>
			<el-button type="primary" @click="submit">提交</el-button>
		</el-form>
	</el-dialog>
	<el-dialog v-model="showUpdateDialog" title="修改">
		<el-form>		
			<el-form :label-position="labelPosition" :rules="rules" v-model="addDialogForm">
				<el-form-item>
					<el-col :span="5">
						填报时间：
					</el-col>
					<el-col :span="7">
						<el-date-picker
					      v-model="updateData.declareTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions1">
					    </el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-col :span="5">
						填报年份：
					</el-col>
					<el-col :span="7">
						<el-input
						type='number'
						v-model="updateData.year"
						align="right"
						></el-input>
					</el-col>
					<el-col :span="5">
						填报季度：
					</el-col>
					<el-col :span="7">
						<el-input
						type='number'
						v-model="updateData.quarter"
						align="right"
						max='4'
						min='1'
						></el-input>
					</el-col>
				</el-form-item>
				<el-form-item prop="data">
					<el-col :span="10">
						新增装配式混凝土结构建筑的数量:
					</el-col>
					<el-col :span="14">
						<el-input v-model="updateData.addNewConcrete" type='number' maxLength='5' placeholder="请输入内容"><template slot="append">万平方米</template></el-input>
					</el-col>	
				</el-form-item>
				<el-form-item prop="data">
					<el-col :span="10">
						新增装配式钢结构建筑的数量:
					</el-col>
					<el-col :span="14">
						<el-input v-model="updateData.addNewSteel" type='number' placeholder="请输入内容"><template slot="append">万平方米</template></el-input>
					</el-col>
				</el-form-item>			
				<el-form-item prop="data">
					<el-col :span="10">
						新增装配式木建筑的数量:
					</el-col>
					<el-col :span="14">
						<el-input v-model="updateData.addNewTimber" type='number' placeholder="请输入内容"><template slot="append">万平方米</template></el-input>
					</el-col>
				</el-form-item>		
			</el-form>
			<el-button type="primary" @click="cancelUpdate">取消</el-button>
			<el-button type="primary" @click="confirmUpdate">确定</el-button>
		</el-form>
	</el-dialog>
	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script type="text/javascript">
import moment from 'moment'
import msgDialog from '../../../components/common/msgDialog.vue'
	export default{
		data:function(){
			return{
				//新增装配式混凝土结构建筑的数量
				addNewConcrete:'',
				//新增装配式钢结构建筑的数量
    			addNewSteel:'',
    			// 新增装配式木建筑的数量
    			addNewTimber:'',
    			//要更新的数据行
    			updateData:{
    				id:'',
    				declareTime:'',
    				addNewConcrete:'',
    				addNewSteel:'',
    				addNewTimber:'',
    				year:'',
    				quarter:'',
    				checkedStatus:'',
    				constructionEn:''
    			},
    			tempUpdateData:'',
    			isTemp:false,
    			rowIndex:'',
    			showAddDialog:false,
    			showUpdateDialog:false,
    			addDialogForm:'',
    			updateDialogForm:'',
				selectTime:'',
				selectedYear:'',
				selectedQuarter:'',
				selectedRow:'',
				selectedRowId:'',
				//表格数据总条数
				totalIndustrializationInfoData:'',
				//表格数据
				industrializationInfoData:'',
				//当前行的审核状态id，用于判断是否可以修改.删除
				checkedStatus:'',
				pageSize:10,
				pageNum:1,
				labelPosition:'left',
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
		        rules:{
		        }
			}
		},
		created:function(){
			var currentDate= new Date()
			var currMonth=currentDate.getMonth()
			var preDate =new Date(currentDate.getTime()- 24*60*60*1000)
			this.selectTime=preDate
			this.selectedYear=currentDate.getFullYear()
			this.selectedQuarter=Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
			this.getAllIndustrializationInfo()			
		},
		watch:function(){
			pageNum:{
				handler:{
					this.getAllIndustrializationInfo()
				}
				deep:true
			}
		},
		methods:{
			getAllIndustrializationInfo:function(){
				var url=this.HOST+'/displayAllConstructionEnIndustrializations?page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.industrializationInfoData=response.data.rows
					this.totalIndustrializationInfoData=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取产业化信息失败!")
				})
			},
			submit:function(){
				var url=this.HOST+'/addConstructionEnIndustrialization'
				for(var data in this.addDialogForm){
					if (this.addDialogForm[data]==0) {
						this.$refs.msgDialog.confirm("填写内容有误，请仔细检查！")
						return
					}

				}
				this.$http.post(url,{
					addNewConcrete:this.addNewConcrete,
					addNewSteel:this.addNewSteel,
					addNewTimber:this.addNewTimber,
					declareTime:this.selectTime,
					year:this.selectedYear,
					quarter:this.selectedQuarter
				}).then(response=>{
					this.addNewConcrete=''
					this.addNewSteel=''
					this.addNewTimber=''
					this.getAllIndustrializationInfo()
					this.$refs.msgDialog.notify("成功提交！")
				}).catch(response=>{
					this.$refs.msgDialog.notify("提交失败！")
				})
				this.showAddDialog=false				
			},
			handleSelectionChange:function(val){
				this.selectedRow=val
				this.selectedRowId=val.id
				this.checkedStatus=val.checkedStatus.id
				for (var i =0;; i++) {
					if (val==this.industrializationInfoData[i]){
						this.rowIndex=i
						break
					}
				}
			},
			handlePageNumChange:function(val){
				this.pageNum=val
				this.getAllIndustrializationInfo()
			},
			handlePageSizeChange:function(val){
				this.pageSize=val
				this.getAllIndustrializationInfo()
			},
			tempStore:function(){
				this.industrializationInfoData.push({
					addNewConcrete:this.addNewConcrete,
					addNewSteel:this.addNewSteel,
					addNewTimber:this.addNewTimber,
					declareTime:moment(this.declareTime).format("YYYY-MM-DD")
				})			
				this.addNewConcrete=''
				this.addNewTimber=''
				this.addNewSteel=''
				this.declareTime=''
				this.showAddDialog=false
			},
			add:function(){
				this.showAddDialog=true
			},
			update:function(val,index){
				if (val) {
					if (val.id) {
						if (this.checkedStatus==1) {
							this.$refs.msgDialog.confirm("已审核通过，不可修改！")
						}else if (this.checkedStatus==2) {
							this.$refs.msgDialog.confirm("审核失败,不可以修改！")
						}else{
							this.showUpdateDialog=true
							this.updateData.addNewConcrete=val.addNewConcrete
							this.updateData.addNewSteel=val.addNewSteel
							this.updateData.addNewTimber=val.addNewTimber
							this.updateData.declareTime=val.declareTime
							this.updateData.year=val.year
							this.updateData.quarter=val.quarter
							this.updateData.checkedStatus=val.checkedStatus
						}
					}else{
						this.updateData.addNewConcrete=val.addNewConcrete
						this.updateData.addNewSteel=val.addNewSteel
						this.updateData.addNewTimber=val.addNewTimber
						this.updateData.declareTime=val.declareTime
						this.updateData.year=val.year
						this.updateData.quarter=val.quarter
						this.updateData.checkedStatus=val.checkedStatus
						this.isTemp=true
					}
					
				}else{
					this.$refs.msgDialog.confirm("请选择要修改的一行！")
				}
			},
			confirmUpdate:function(){
				if (this.isTemp) {
					this.isTemp=false
				}else{
					var url=this.HOST+'/updateConstructionEnIndustrialization'
					this.$http.put(url,{
						id:this.selectedRowId,
						addNewConcrete:this.updateData.addNewConcrete,
						addNewTimber:this.updateData.addNewTimber,
						addNewSteel:this.updateData.addNewSteel,
						declareTime:this.updateData.declareTime,
						checkedStatus:this.updateData.checkedStatus,
					}).then(response=>{
						this.$refs.msgDialog.notify("成功修改！")
						this.getAllIndustrializationInfo()
						this.showUpdateDialog=false
						this.isTemp=false
					}).catch(response=>{
						this.$refs.msgDialog.notify("修改失败！")
						this.showUpdateDialog=false
						this.isTemp=false
					})		
				}
				
			},
			cancelUpdate:function(){
				this.showUpdateDialog=false
				this.updateData.addNewConcrete=''
				this.updateData.addNewSteel=''
				this.updateData.addNewTimber=''
				this.updateData.declareTime=''
				this.updateData.checkedStatus=''
			},
			remove:function(val,index){
				if (val) {
					if (val.id) {
						if (this.checkedStatus==1) {
							this.$refs.msgDialog.confirm("已审核通过，不可删除！")
						}else if (this.checkedStatus==2) {
							this.$refs.msgDialog.confirm("审核未通过，不可删除！")
						}else{
							var url=this.HOST+'/deleteConstructionEnIndustrialization?id='+this.selectedRowId
							this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					          confirmButtonText: '确定',
					          cancelButtonText: '取消',
					          type: 'warning'
					        }).then(()=>{
					        	this.$http.delete(url).then(response=>{
									this.$refs.msgDialog.notify("成功删除！")
									this.getAllIndustrializationInfo()
								}).catch(response=>{
									this.$refs.msgDialog.notify("删除失败！")
								})
					        }).catch(()=>{
					        	this.$refs.msgDialog.notify("已取消删除！")
					        })						
						}
					}else{
						this.industrializationInfoData.splice(index, 1)
						this.$refs.msgDialog.notify("成功删除暂存数据！")
					}
				}else{
					this.$refs.msgDialog.confirm("请选择要删除的一行数据！")
				}
			}
		},
		components:{
			msgDialog
		}
	}
</script>
<style type="text/css">
	#body{
		width: 100%;
		height: 100%
	}
	#header{
		width: 100%;
		height: 10%;
		float: left;
	}
</style>
	