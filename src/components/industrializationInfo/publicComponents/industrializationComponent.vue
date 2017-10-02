<template>
<div id="body">
	<el-row>
		<el-button @click="add" id="addBtn">增加</el-button>
		<el-button @click="remove(selectedRow)">删除</el-button>
		<el-button @click="update(selectedRow)">修改</el-button>
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
		<el-form :model="addData" :rules="rules" ref="ruleForm">
			<el-form-item prop="declareTime">
				<el-col :span="5">
					填报时间：
				</el-col>
				<el-col :span="7">
					<el-date-picker
				      v-model="addData.declareTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				    </el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item prop="year">
				<el-col :span="5">
					填报年份：
				</el-col>
				<el-col :span="7">
					<el-input
					type='number'
					v-model="addData.year"
					align="right"
					></el-input>
				</el-col>
			</el-form-item>
			<el-form-item prop="quarter">
				<el-col :span="5">
					填报季度：
				</el-col>
				<el-col :span="7">
					<el-input
					type='number'
					v-model="addData.quarter"
					align="right"
					max='4'
					min='1'
					></el-input>
				</el-col>
			</el-form-item>
			<el-form-item prop="addNewConcrete">
				<el-col :span="10">
					新增装配式混凝土结构建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model.number="addData.addNewConcrete" type='number' maxLength='5' placeholder="请输入内容" min=0><template slot="append">万平方米</template></el-input>
				</el-col>	
			</el-form-item>
			<el-form-item prop="addNewSteel">
				<el-col :span="10">
					新增装配式钢结构建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model.number="addData.addNewSteel" type='number' placeholder="请输入内容" min=0><template slot="append">万平方米</template></el-input>
				</el-col>
			</el-form-item>			
			<el-form-item prop="addNewTimber">
				<el-col :span="10">
					新增装配式木建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model.number="addData.addNewTimber" type='number' placeholder="请输入内容" min=0><template slot="append">万平方米</template></el-input>
				</el-col>
			</el-form-item>		
			<el-button type="primary" @click="submit('tempStore')">暂存</el-button>
			<el-button type="primary" @click="submit('submit')">提交</el-button>
		</el-form>
	</el-dialog>
	<el-dialog v-model="showUpdateDialog" title="修改">	
		<el-form :model="updateData" :rules="rules" ref="ruleForm">
			<el-form-item prop="declareTime">
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
			<el-form-item prop="year">
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
			</el-form-item>
			<el-form-item prop="quarter">
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
			<el-form-item prop="addNewConcrete">
				<el-col :span="10">
					新增装配式混凝土结构建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model="updateData.addNewConcrete" type='number' maxLength='5' placeholder="请输入内容"><template slot="append">万平方米</template></el-input>
				</el-col>	
			</el-form-item>
			<el-form-item prop="addNewSteel">
				<el-col :span="10">
					新增装配式钢结构建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model="updateData.addNewSteel" type='number' placeholder="请输入内容"><template slot="append">万平方米</template></el-input>
				</el-col>
			</el-form-item>			
			<el-form-item prop="addNewTimber">
				<el-col :span="10">
					新增装配式木建筑的数量:
				</el-col>
				<el-col :span="14">
					<el-input v-model="updateData.addNewTimber" type='number' placeholder="请输入内容"><template slot="append">万平方米</template></el-input>
				</el-col>
			</el-form-item>		
			<el-button type="primary" @click="cancelUpdate">取消</el-button>
			<el-button type="primary" @click="confirmUpdate('tempStore')">暂存</el-button>
			<el-button type="primary" @click="confirmUpdate('submit')">提交</el-button>
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
			var validateNumber = (rule, value, callback) => {
		        if (value==='') {
		          return callback(new Error('请输入大于等于0的数值'))
		        }else if (value<0) {
		        	return callback(new Error('请输入大于等于0的数值'))
		        } else{
		        	callback()
		        } 
	      	}
			return{
				addData:{
					//新增装配式混凝土结构建筑的数量
					addNewConcrete:'',
					//新增装配式钢结构建筑的数量
	    			addNewSteel:'',
	    			// 新增装配式木建筑的数量
	    			addNewTimber:'',
	    			//是否是提交状态
	    			submit:'',
	    			declareTime:'',
	    			year:'',
	    			quarter:''
				},			
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
    				submit:''
    			},
    			showAddDialog:false,
    			showUpdateDialog:false,
				selectedRow:'',
				selectedRowId:'',
				//表格数据总条数
				totalIndustrializationInfoData:'',
				//表格数据
				industrializationInfoData:'',
				//当前行的审核状态id，用于判断是否可以修改.删除
				checkedStatus:'',
				//判断是否是提交状态
				isSubmit:'',
				pageSize:10,
				pageNum:1,
				pickerOptions1: {
					//限制日期选择器不可选择未来时间
					disabledDate(time) {
		            	return time.getTime() > Date.now()+ 24*60*60*1000 - 8.64e7;
		          	},
		          	//快捷键
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
		        	//新增装配式混凝土结构建筑的数量
					addNewConcrete:[{validator:validateNumber,trigger: 'change',message:'请填写大于等于零的数值'}],
					//新增装配式钢结构建筑的数量
	    			addNewSteel:[{validator:validateNumber,trigger: 'change',message:'请填写大于等于零的数值'}],
	    			// 新增装配式木建筑的数量
	    			addNewTimber:[{validator:validateNumber,trigger: 'change',message:'请填写大于等于零的数值'}],
	    			declareTime:[{validator:validateNumber,trigger: 'change',message:'请填写填报时间'}],
	    			year:[{validator:validateNumber,trigger: 'change',message:'请填写填报年份'}],
	    			quarter:[{validator:validateNumber,trigger: 'change',message:'请填写填报季度'}],
		        }
			}
		},
		created:function(){
			var currentDate= new Date()
			var currMonth=currentDate.getMonth()
			var preDate =new Date(currentDate.getTime()- 24*60*60*1000)
			this.addData.declareTime=preDate
			this.addData.year=currentDate.getFullYear()
			this.addData.quarter=Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
			this.getAllIndustrializationInfo()			
		},
		methods:{
			getAllIndustrializationInfo:function(){
				var url=this.HOST+'/getAllConstructionEnIndustrializations?page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.industrializationInfoData=response.data.rows
					this.totalIndustrializationInfoData=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取产业化信息失败!")
				})
			},
			handleSelectionChange:function(val){
				this.selectedRow=val
				this.selectedRowId=val.id
				this.checkedStatus=val.checkedStatus
				this.isSubmit=val.submit
			},
			handlePageNumChange:function(val){
				this.pageNum=val
				this.getAllIndustrializationInfo()
			},
			handlePageSizeChange:function(val){
				this.pageSize=val
				this.getAllIndustrializationInfo()
			},
			add:function(){
				this.showAddDialog=true
			},
			//暂存和提交
			submit:function(val){
				if (val=='tempStore') {
					this.addData.submit=false
				}else{
					this.addData.submit=true
				}				
				this.$refs.ruleForm.validate((valid)=>{
					if (valid) {
						var url=this.HOST+'/addConstructionEnIndustrialization'
						this.$http.post(url,this.addData).then(response=>{					
							this.getAllIndustrializationInfo()
							this.showAddDialog=false	
							this.addData.addNewTimber=''
							this.addData.addNewConcrete=''
							this.addData.addNewSteel=''
							this.addData.submit=''
							this.$refs.msgDialog.notify("成功提交！")
						}).catch(response=>{
							if (response=='Error: Request failed with status code 500') {
								this.$refs.msgDialog.confirm("不可添加同年同一季度，请检查增加信息")
							}
						})			
					}else{
						this.$refs.msgDialog.confirm("请检查增加信息,请正确填写")
		            	return false;
					}
				})
								
			},
			update:function(val){
				if (val) {
					if (this.isSubmit==true) {
						if (this.checkedStatus==null || this.checkedStatus.id==1 || this.checkedStatus.id==3) {
							this.$refs.msgDialog.confirm("已提交审核，不可修改！")
						}else{
							this.showUpdateDialog=true
							this.updateData.id=val.id
							this.updateData.addNewConcrete=val.addNewConcrete
							this.updateData.addNewSteel=val.addNewSteel
							this.updateData.addNewTimber=val.addNewTimber
							this.updateData.declareTime=val.declareTime
							this.updateData.year=val.year
							this.updateData.quarter=val.quarter
							this.updateData.checkedStatus=val.checkedStatus
						}
					}else{
						this.showUpdateDialog=true
						this.updateData.id=val.id
						this.updateData.addNewConcrete=val.addNewConcrete
						this.updateData.addNewSteel=val.addNewSteel
						this.updateData.addNewTimber=val.addNewTimber
						this.updateData.declareTime=val.declareTime
						this.updateData.year=val.year
						this.updateData.quarter=val.quarter
						this.updateData.checkedStatus=val.checkedStatus				
					}				
				}else{
					this.$refs.msgDialog.confirm("请选择要修改的一行！")
				}
			},
			confirmUpdate:function(val){
				if (val=='tempStore') {
					this.updateData.submit=false
				}else{
					this.updateData.submit=true
				}			
				this.$refs.ruleForm.validate((valid)=>{
					if (valid) {
						var url=this.HOST+'/updateConstructionEnIndustrialization'
						this.$http.put(url,this.updateData).then(response=>{
							this.$refs.msgDialog.notify("成功修改！")
							this.getAllIndustrializationInfo()
							this.showUpdateDialog=false
						}).catch(response=>{
							this.$refs.msgDialog.notify("修改失败！")
							this.showUpdateDialog=false
						})		
					}else{
						this.$refs.msgDialog.confirm("请检查增加信息,请正确填写")
		            	return false;
					}
				})
				
			},
			cancelUpdate:function(){
				this.showUpdateDialog=false
				this.updateData.addNewConcrete=''
				this.updateData.addNewSteel=''
				this.updateData.addNewTimber=''
				this.updateData.declareTime=''
				this.updateData.checkedStatus=''
			},
			remove:function(val){
				if (val) {
					if (this.isSubmit==true) {
						if (this.checkedStatus==null || this.checkedStatus.id==1 || this.checkedStatus.id==3) {
							this.$refs.msgDialog.confirm("信息已提交，不可以修改！")
						}else{
							var url=this.HOST+'/deleteConstructionEnIndustrialization?id='+this.selectedRowId
							this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					          confirmButtonText: '确定',
					          cancelButtonText: '取消',
					          type: 'warning'
					        }).then(()=>{
					        	this.$http.delete(url).then(response=>{
									this.$refs.msgDialog.notify("成功删除驳回数据！")
									this.getAllIndustrializationInfo()
								}).catch(response=>{
									this.$refs.msgDialog.notify("删除驳回数据失败！")
								})
					        }).catch(()=>{
					        	this.$refs.msgDialog.notify("已取消删除驳回数据！")
					        })					
						}							
					}else{
						var url=this.HOST+'/deleteConstructionEnIndustrialization?id='+this.selectedRowId
							this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					          confirmButtonText: '确定',
					          cancelButtonText: '取消',
					          type: 'warning'
					        }).then(()=>{
					        	this.$http.delete(url).then(response=>{
									this.$refs.msgDialog.notify("成功删除暂存数据！")
									this.getAllIndustrializationInfo()
								}).catch(response=>{
									this.$refs.msgDialog.notify("删除暂存数据失败！")
								})
					        }).catch(()=>{
					        	this.$refs.msgDialog.notify("已取消删除暂存数据！")
					        })				
					}
				}else{
					this.$refs.msgDialog.confirm("请选择要删除的一行数据！")
				}
			},
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
	