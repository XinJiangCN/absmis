<template>
	<div>
		<div id='header'>
			<h4>
			<!-- 测试 -->
			<label>构建生产企业用户</label><br>			
			<label>企业建筑产业化信息</label>
			</h4>
		</div>
		<el-col :span="6">
			<el-button-group>
				<el-button type="primary" @click="add">增加</el-button>
				<el-button type="primary" @click="remove(selectedRowId)">删除</el-button>
				<el-button type="primary" @click="update(selectedRowId)">修改</el-button>
			</el-button-group>	
			<br><br>
			<el-table
			:data="componentIndustrializationInfoData"
			highlight-current-row
			border
			@row-click="handleRowChange"
			style="width: 100%">		
			<el-table-column
			prop="componentEn.name"
			label="企业名称">
			</el-table-column>
			<el-table-column
			prop="declareTime"
			label="填报时间">
			</el-table-column>
			</el-table>
			<el-pagination
			@current-change="handlePageNumChange"
			@size-change="handlePageSizeChange"
		    :current-page="pageNum"
		    :page-size="pageSize"
		    :page-sizes="[5,10,15,20]"
		    layout="total, sizes, prev, pager, next"
		    :total="totalComponentIndustrializationData">
			</el-pagination>
		</el-col>
		<el-col :span="18">
			<el-form :model="selectedRow" :rules="rules" ref="ruleForm">
			<el-row>
			<el-col :span="9">
				<el-form-item prop="declareTime">
					<el-col :span="8" :pull="1">
						填报时间：
					</el-col>
					<el-col :span="10" :pull="1">
						<el-date-picker
					      v-model="selectedRow.declareTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions1">
				    	</el-date-picker>
					</el-col>	
				</el-form-item>		
			</el-col>
			<el-col :span="7">
				<el-form-item prop="year">
					<el-col :span="10">
						填报年份：
					</el-col>
					<el-col :span="14">
						<el-input
						v-model="selectedRow.year"
						align="right"
						type="number"
						min='2000'
						></el-input>
					</el-col>
				</el-form-item>
			</el-col>			
			<el-col :span="8">
				<el-form-item prop="quarter">
					<el-col :span="10">
						填报季度：
					</el-col>
					<el-col :span="14">
						<el-input
						v-model="selectedRow.quarter"
						align="right"
						type="number"
						min='1'
						max='4'
						></el-input>
					</el-col>						
				</el-form-item>
			</el-col>					
			</el-row>
				<el-form-item>
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
				</el-form-item>
				<el-row>
					<el-col :span="6">
						<el-form-item>					
							<label>预制装配混凝土结构构件</label>
						</el-form-item>					
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltConcreteNum">
							<el-input v-model.number="selectedRow.prebuiltConcreteNum" type='number' min=0></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">					
						<el-form-item prop="prebuiltConcreteAbility">
							<el-input v-model.number="selectedRow.prebuiltConcreteAbility" type='number' min=0><template slot="append">万平方米</template></el-input>
						</el-form-item>	
					</el-col>	
					<el-col :span="6">
						<el-form-item prop="prebuiltConcreteScale">
							<el-input v-model.number="selectedRow.prebuiltConcreteScale" type='number' min=0><template slot="append">万平方米</template></el-input>	
						</el-form-item>	
					</el-col>	
				</el-row>			
				<el-row>
					<el-col :span="6">
						<el-form-item>
							<label>钢结构构件</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltSteelNum">
							<el-input v-model.number="selectedRow.prebuiltSteelNum" type='number' min=0></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltSteelAbility">
							<el-input v-model.number="selectedRow.prebuiltSteelAbility"type='number' min=0><template slot="append">万平方米</template></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltSteelScale">
							<el-input v-model.number="selectedRow.prebuiltSteelScale" type='number' min=0><template slot="append">万平方米</template></el-input>	
						</el-form-item>	
					</el-col>						
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item>
							<label>木结构构件</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltTimberNum">
							<el-input v-model.number="selectedRow.prebuiltTimberNum" type='number' min=0></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltTimberAbility">
							<el-input v-model.number="selectedRow.prebuiltTimberAbility" type='number' min=0><template slot="append">万平方米</template></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltTimberScale">
							<el-input v-model.number="selectedRow.prebuiltTimberScale" type='number' min=0><template slot="append">万平方米</template></el-input>
						</el-form-item>	
					</el-col>						
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item>
							<label>其他结构的构件</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltOtherNum">
							<el-input v-model.number="selectedRow.prebuiltOtherNum" type='number' min=0></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltOtherAbility">
							<el-input v-model.number="selectedRow.prebuiltOtherAbility" type='number' min=0><template slot="append">万平方米</template></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltOtherScale">
							<el-input v-model.number="selectedRow.prebuiltOtherScale" type='number' min=0><template slot="append">万平方米</template></el-input>	
						</el-form-item>		
					</el-col>					
				</el-row>			
				<el-button type="primary" @click="confirmUpdate('tempStore','ruleForm')">暂存</el-button>
				<el-button type="primary" @click="confirmUpdate('submit','ruleForm')">提交</el-button>
			</el-form>					
		</el-col>

		<el-dialog v-model="showAddDialog">
			<el-form :model="addData" :rules="rules" ref="ruleForm">
				<el-form-item prop="declareTime">
					<el-col :span="4">
						填报时间：
					</el-col>
					<el-col :span="5">
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
					<el-col :span="3">
						填报年份：
					</el-col>
					<el-col :span="5">
						<el-input
						v-model="addData.year"
						align="right"
						type="number"
						min='2000'
						></el-input>
					</el-col>
				</el-form-item>
				<el-form-item prop="quarter">
					<el-col :span="3">
						填报季度：
					</el-col>
					<el-col :span="5">
						<el-input
						v-model="addData.quarter"
						align="right"
						type="number"
						min='1'
						max='4'
						></el-input>
					</el-col>						
				</el-form-item>
				<el-form-item>
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
				</el-form-item>
				<el-row>
					<el-col :span="6">
						<el-form-item>					
							<label>预制装配混凝土结构构件</label>
						</el-form-item>					
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltConcreteNum">
							<el-input v-model.number="addData.prebuiltConcreteNum" type='number' min=0></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">					
						<el-form-item prop="prebuiltConcreteAbility">
							<el-input v-model.number="addData.prebuiltConcreteAbility" type='number' min=0><template slot="append">万平方米</template></el-input>
						</el-form-item>	
					</el-col>	
					<el-col :span="6">
						<el-form-item prop="prebuiltConcreteScale">
							<el-input v-model.number="addData.prebuiltConcreteScale" type='number' min=0><template slot="append">万平方米</template></el-input>	
						</el-form-item>	
					</el-col>	
				</el-row>			
				<el-row>
					<el-col :span="6">
						<el-form-item>
							<label>钢结构构件</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltSteelNum">
							<el-input v-model.number="addData.prebuiltSteelNum" type='number' min=0></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltSteelAbility">
							<el-input v-model.number="addData.prebuiltSteelAbility"type='number' min=0><template slot="append">万平方米</template></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltSteelScale">
							<el-input v-model.number="addData.prebuiltSteelScale" type='number' min=0><template slot="append">万平方米</template></el-input>	
						</el-form-item>	
					</el-col>						
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item>
							<label>木结构构件</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltTimberNum">
							<el-input v-model.number="addData.prebuiltTimberNum" type='number' min=0></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltTimberAbility">
							<el-input v-model.number="addData.prebuiltTimberAbility" type='number' min=0><template slot="append">万平方米</template></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltTimberScale">
							<el-input v-model.number="addData.prebuiltTimberScale" type='number' min=0><template slot="append">万平方米</template></el-input>
						</el-form-item>	
					</el-col>						
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item>
							<label>其他结构的构件</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltOtherNum">
							<el-input v-model.number="addData.prebuiltOtherNum" type='number' min=0></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltOtherAbility">
							<el-input v-model.number="addData.prebuiltOtherAbility" type='number' min=0><template slot="append">万平方米</template></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="6">
						<el-form-item prop="prebuiltOtherScale">
							<el-input v-model.number="addData.prebuiltOtherScale" type='number' min=0><template slot="append">万平方米</template></el-input>	
						</el-form-item>		
					</el-col>					
				</el-row>
				<el-form-item>
					<el-button type="primary" @click="submit('tempStore','ruleForm')">暂存</el-button>
					<el-button type="primary" @click="submit('submit','ruleForm')">提交</el-button>
				</el-form-item>							
			</el-form>		
		</el-dialog>
		<msg-dialog ref="msgDialog"></msg-dialog>		
	</div>
</template>
<script type="text/javascript">
import msgDialog from '../common/msgDialog.vue'
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
					declareTime:'',
					year:'',
					quarter:'',
					submit:'',
					/*生产条数*/
				    //预制装配混凝土结构
				    prebuiltConcreteNum:'',
				    //钢结构
				    prebuiltSteelNum:'',
				    //木结构
				    prebuiltTimberNum:'',
				    //其他结构的构件
				    prebuiltOtherNum:'',
				    /*生产能力*/
				    //预制装配混凝土结构
				    prebuiltConcreteAbility:'',
				    //钢结构
				    prebuiltSteelAbility:'',
				    //木结构
				    prebuiltTimberAbility:'',
				    //其他结构的构件
				    prebuiltOtherAbility:'',

				    /*应用规模*/
				    //预制装配混凝土结构
				    prebuiltConcreteScale:'',
				    //钢结构
				    prebuiltSteelScale:'',
				    //木结构
				    prebuiltTimberScale:'',
				    //其他结构的构件
				    prebuiltOtherScale:'',
				},				
				updateData:{
					id:'',
					/*生产条数*/
				    //预制装配混凝土结构
				    prebuiltConcreteNum:'',
				    //钢结构
				    prebuiltSteelNum:'',
				    //木结构
				    prebuiltTimberNum:'',
				    //其他结构的构件
				    prebuiltOtherNum:'',
				    /*生产能力*/
				    //预制装配混凝土结构
				    prebuiltConcreteAbility:'',
				    //钢结构
				    prebuiltSteelAbility:'',
				    //木结构
				    prebuiltTimberAbility:'',
				    //其他结构的构件
				    prebuiltOtherAbility:'',

				    /*应用规模*/
				    //预制装配混凝土结构
				    prebuiltConcreteScale:'',
				    //钢结构
				    prebuiltSteelScale:'',
				    //木结构
				    prebuiltTimberScale:'',
				    //其他结构的构件
				    prebuiltOtherScale:'',
				    componentEn:'',
				    checkedStatus:'',
				    submit:''
				},
				componentIndustrializationInfoData:'',
				pageNum:1,
				pageSize:10,
				totalComponentIndustrializationData:'',
				showAddDialog:false,
				selectedRow:'',
				selectedRowId:'',
				checkedStatus:'',
				isSubmit:'',
				pickerOptions1: {
					//限制日期选择器不可选择未来日期
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
		        //校验规则
		        rules:{
		        	declareTime:[{validator:validateNumber,trigger: 'change',message:'请选择填报时间'}],
					year:[{validator:validateNumber,trigger: 'change',message:'请选择填报年份'}],
					quarter:[{validator:validateNumber,trigger: 'change',message:'请选择填报季度'}],
					/*生产条数*/
				    //预制装配混凝土结构
				    prebuiltConcreteNum:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],
				    //钢结构
				    prebuiltSteelNum:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],
				    //木结构
				    prebuiltTimberNum:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],
				    //其他结构的构件
				    prebuiltOtherNum:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],
				    /*生产能力*/
				    //预制装配混凝土结构
				    prebuiltConcreteAbility:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],
				    //钢结构
				    prebuiltSteelAbility:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],
				    //木结构
				    prebuiltTimberAbility:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],
				    //其他结构的构件
				    prebuiltOtherAbility:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],

				    /*应用规模*/
				    //预制装配混凝土结构
				    prebuiltConcreteScale:[{validator:validateNumber,trigger: 'blur',min:0,message:'请填写大于零的数值'}],
				    //钢结构
				    prebuiltSteelScale:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],
				    //木结构
				    prebuiltTimberScale:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],
				    //其他结构的构件
				    prebuiltOtherScale:[{validator:validateNumber,trigger: 'blur',message:'请填写大于零的数值'}],
		        }
			}
		},
		created:function(){
			var currentDate= new Date();
			var currMonth=currentDate.getMonth()
			var preDate =new Date(currentDate.getTime()- 24*60*60*1000);
			this.addData.declareTime=preDate
			this.addData.year=currentDate.getFullYear()
			this.addData.quarter=Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
			this.getAllComponentEnIndustralization()		
		},
		methods:{
			getAllComponentEnIndustralization:function(){
				var url=this.HOST+'/getAllComponentEnIndustrializations?page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.componentIndustrializationInfoData=response.data.rows
					this.totalComponentIndustrializationData=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.notify("获取构件产业化信息失败！")
				})
			},			
			handleRowChange:function(val){
				this.selectedRow=val
				this.selectedRowId=val.id
				this.checkedStatus=val.checkedStatus
				this.isSubmit=val.submit
			},
			handlePageNumChange:function(val){
				this.pageNum=val
				this.getAllComponentEnIndustralization()
			},
			handlePageSizeChange:function(val){
				this.pageSize=val
				this.getAllComponentEnIndustralization()
			},
			add:function(){
				this.showAddDialog=true
			},
			submit(val,rules){
				if (val=="tempStore") {
					
				}else{
					this.addData.submit=true
				}
				this.addData.submit=false
				this.$refs.ruleForm.validate((valid) => {
		          if (valid) {
		            var url=this.HOST+'/addComponentEnIndustrialization'				
					this.$http.post(url,this.addData).then(response=>{
						this.showAddDialog=false
						this.getAllComponentEnIndustralization()
						this.$refs.msgDialog.notify("添加成功！")
						this.addData.prebuiltConcreteNum=''
						this.addData.prebuiltSteelNum=''
						this.addData.prebuiltTimberNum=''
						this.addData.prebuiltOtherNum=''
						this.addData.prebuiltConcreteAbility=''
						this.addData.prebuiltSteelAbility=''
						this.addData.prebuiltTimberAbility=''
						this.addData.prebuiltOtherAbility=''
						this.addData.prebuiltConcreteScale=''
						this.addData.prebuiltSteelScale=''
						this.addData.prebuiltTimberScale=''
						this.addData.prebuiltOtherScale=''
						this.addData.submit=''					
					}).catch(response=>{
						if (response=='Error: Request failed with status code 500') {
							this.$refs.msgDialog.confirm("不可添加同年同一季度，请检查增加信息")
						}
					})
		          } else {
		            this.$refs.msgDialog.confirm("请检查增加信息,请正确填写")
		            return false;
		          }
		        })
				
			},
			update:function(val){
				if (val) {

				}else{
					this.$refs.msgDialog.confirm("请选择要删除的一行！")
				}
				
			},
			confirmUpdate:function(val,rules){
				if (val=='tempStore') {
					this.selectedRow.submit=false
				}else{
					this.selectedRow.submit=true
				}
				this.$refs[rules].validate((valid) => {
		          if (valid) {
		            if (this.isSubmit==true) {
						if (this.checkedStatus==2) {
							var url=this.HOST+'/updateComponentEnIndustrialization'
							this.$http.put(url,this.selectedRow).then(response=>{
								this.getAllComponentEnIndustralization()
								this.$refs.msgDialog.notify("成功修改驳回信息！")
							}).catch(response=>{
								this.$refs.msgDialog.notify("修改驳回信息失败！")
							})
						}else{
							this.$refs.msgDialog.confirm("信息已提交,不可以修改！")
							this.getAllComponentEnIndustralization()
						}					
					}else {
						var url=this.HOST+'/updateComponentEnIndustrialization'
						this.$http.put(url,this.selectedRow).then(response=>{
							this.getAllComponentEnIndustralization()
							this.$refs.msgDialog.notify("成功修改数据！")
						}).catch(response=>{
							this.$refs.msgDialog.notify("修改数据失败！")
						})
					}			
		          } else {
		            this.$refs.msgDialog.confirm("请正确填写数据！")
		            return false;
		          }
		        })
				
			},
			remove:function(val){
				if (val) {
					if (this.isSubmit==true) {
						if (this.checkedStatus==null || this.checkedStatus.id==1 || this.checkedStatus.id==3) {
							this.$refs.msgDialog.confirm("信息已提交，不可以删除！")
						}else{
							var url=this.HOST+'/deleteComponentEnIndustrialization?id='+this.selectedRowId
							this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					          confirmButtonText: '确定',
					          cancelButtonText: '取消',
					          type: 'warning'
					        }).then(()=>{
					        	this.$http.delete(url).then(response=>{
									this.$refs.msgDialog.notify("成功删除数据！")
									this.getAllComponentEnIndustralization()
								}).catch(response=>{
									this.$refs.msgDialog.notify("删除数据失败！")
								})
					        }).catch(()=>{
					        	this.$refs.msgDialog.notify("已取消删除！")
					        })
						}
					}else{
						var url=this.HOST+'/deleteComponentEnIndustrialization?id='+this.selectedRowId
						this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(()=>{
				        	this.$http.delete(url).then(response=>{
								this.$refs.msgDialog.notify("成功删除数据！")
								this.getAllComponentEnIndustralization()
							}).catch(response=>{
								this.$refs.msgDialog.notify("删除数据失败！")
							})
				        }).catch(()=>{				        	
				        	this.$refs.msgDialog.notify("已取消删除！")
				        })
					}
				}else{
					this.$refs.msgDialog.confirm("请选择要删除的一行！")
				}
			},

		},
		components:{
			msgDialog
		}
	}
</script>
<style type="text/css">
	#header{
		width: 100%;
		height: 10%;
		float: left;
		margin-top: -30px;
	}
	.timeInput{
		width: 100px;
	}
	.dateInput{
		width: 200px;
	}
	.yearText{
		margin-left: 50px;
	}
</style>