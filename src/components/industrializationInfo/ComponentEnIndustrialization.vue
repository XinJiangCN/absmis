<template>
	<div>
		<div id='header'>
			<h4>
			<label>构建生产企业用户</label><br>			
			<label>企业建筑产业化信息</label>
			</h4>
		</div>
		<el-button @click="add">增加</el-button>
		<el-button @click="remove(selectedRowId)">删除</el-button>
		<el-button @click="update(selectedRowId)">修改</el-button>
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
	    layout="total, sizes, prev, pager, next, jumper"
	    :total="totalComponentIndustrializationData">
		</el-pagination>
		<el-dialog v-model="showAddDialog">
			<el-form ref="componentCompanyForm">
				<el-form-item>
					<el-date-picker
				      v-model="declareTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1"
				      :format="yyyy-MM-dd">
			    	</el-date-picker>
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
					<el-row>
						<el-col :span="24">
							<el-row>
								<el-col :span="6">
									<el-checkbox label="预制装配混凝土结构构件"></el-checkbox>	
								</el-col>				
								<el-col :span="6"><el-input v-model.number="prebuiltConcreteNum" type='number' ></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltConcreteAbility" type='number' ><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltConcreteScale" type='number' ><template slot="append">万平方米</template></el-input></el-col>		
							</el-row>
							<el-row>
								<el-col :span="6"><el-checkbox label="钢结构构件"></el-checkbox></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltSteelNum" type='number' ></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltSteelAbility"type='number' ><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltSteelScale" type='number' ><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>
							<el-row>
								<el-col :span="6"><el-checkbox label="木结构构件"></el-checkbox></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltTimberNum" type='number' ></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltTimberAbility" type='number' ><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltTimberScale" type='number' ><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>
							<el-row>
								<el-col :span="6"><el-checkbox label="其他结构的构件"></el-checkbox></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltOtherNum" type='number' ></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltOtherAbility" type='number' ><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="prebuiltOtherScale" type='number' ><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>	
						</el-col>
					</el-row>	
				</el-form-item>
				<el-button type="primary" @click="tempStore">暂存</el-button>
				<el-button type="primary" @click="submit">提交</el-button>
			</el-form>	
		</el-dialog>
		<el-dialog v-model="showUpdateDialog">
			<el-form ref="componentCompanyForm">
				<el-form-item>
					<el-date-picker
				      v-model="updateData.declareTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1"
				      :format="yyyy-MM-dd">
			    	</el-date-picker>
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
					<el-row>
						<el-col :span="24">
							<el-row>
								<el-col :span="6">
									<el-checkbox label="预制装配混凝土结构构件"></el-checkbox>	
								</el-col>				
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltConcreteNum" type='number' ></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltConcreteAbility" type='number' ><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltConcreteScale" type='number' ><template slot="append">万平方米</template></el-input></el-col>		
							</el-row>
							<el-row>
								<el-col :span="6"><el-checkbox label="钢结构构件"></el-checkbox></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltSteelNum" type='number' ></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltSteelAbility"type='number' ><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltSteelScale" type='number' ><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>
							<el-row>
								<el-col :span="6"><el-checkbox label="木结构构件"></el-checkbox></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltTimberNum" type='number' ></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltTimberAbility" type='number' ><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltTimberScale" type='number' ><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>
							<el-row>
								<el-col :span="6"><el-checkbox label="其他结构的构件"></el-checkbox></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltOtherNum" type='number' ></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltOtherAbility" type='number' ><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="updateData.prebuiltOtherScale" type='number' ><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>	
						</el-col>
					</el-row>	
				</el-form-item>
				<el-button type="primary" @click="tempStore">暂存</el-button>
				<el-button type="primary" @click="confirmUpdate">提交</el-button>
			</el-form>	
		</el-dialog>
				
	</div>
</template>
<script type="text/javascript">
	export default{
		data:function(){
			return{
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
				    checkedStatus:''
				},
				componentIndustrializationInfoData:'',
				declareTime:'',
				pageNum:1,
				pageSize:10,
				totalComponentIndustrializationData:'',
				showAddDialog:false,
				showUpdateDialog:false,
				selectedRow:'',
				selectedRowId:'',
				checkedStatus:'',
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
			}
		},
		created:function(){
			var currentDate= new Date();
			var preDate =new Date(currentDate.getTime()- 24*60*60*1000);
			this.declareTime=preDate
			this.getAllComponentEnIndustralization()

		},
		methods:{
			getAllComponentEnIndustralization:function(){
				var url=this.HOST+'/displayAllComponentEnIndustrializations?page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.componentIndustrializationInfoData=response.data.rows
					this.totalComponentIndustrializationData=response.data.total
				}).catch(response=>{
					alert("获取构件产业化信息失败！")
				})
			},
			
			handleRowChange:function(val){
				this.selectedRow=val
				this.selectedRowId=val.id
				this.checkedStatus=val.checkedStatus

			},
			handlePageNumChange:function(val){
				this.pageNum=val
				this.getAllComponentEnIndustralization()
			},
			handlePageSizeChange:function(val){
				this.pageSize=val
				this.getAllComponentEnIndustralization()
			},
			tempStore:function(){
				
			},
			add:function(){
				this.showAddDialog=true
			},
			submit:function(){
				var url=this.HOST+'/addComponentEnIndustrialization'
				this.$http.post(url,{
					/*生产条数*/
				    //预制装配混凝土结构
				    prebuiltConcreteNum:this.prebuiltConcreteNum,
				    //钢结构
				    prebuiltSteelNum:this.prebuiltSteelNum,
				    //木结构
				    prebuiltTimberNum:this.prebuiltTimberNum,
				    //其他结构的构件
				    prebuiltOtherNum:this.prebuiltOtherNum,
				    /*生产能力*/
				    //预制装配混凝土结构
				    prebuiltConcreteAbility:this.prebuiltConcreteAbility,
				    //钢结构
				    prebuiltSteelAbility:this.prebuiltSteelAbility,
				    //木结构
				    prebuiltTimberAbility:this.prebuiltTimberAbility,
				    //其他结构的构件
				    prebuiltOtherAbility:this.prebuiltOtherAbility,

				    /*应用规模*/
				    //预制装配混凝土结构
				    prebuiltConcreteScale:this.prebuiltConcreteScale,
				    //钢结构
				    prebuiltSteelScale:this.prebuiltSteelScale,
				    //木结构
				    prebuiltTimberScale:this.prebuiltTimberScale,
				    //其他结构的构件
				    prebuiltOtherScale:this.prebuiltOtherScale,
				    declareTime:this.declareTime
				}).then(response=>{
					this.showAddDialog=false
					this.getAllComponentEnIndustralization()
					this.$message({
						type:'success',
						message:'已成功添加'
					})
					this.prebuiltConcreteNum=''
					this.prebuiltSteelNum=''
					this.prebuiltTimberNum=''
					this.prebuiltOtherNum=''
					this.prebuiltConcreteAbility=''
					this.prebuiltSteelAbility=''
					this.prebuiltTimberAbility=''
					this.prebuiltOtherAbility=''
					this.prebuiltConcreteScale=''
					this.prebuiltSteelScale=''
					this.prebuiltTimberScale=''
					this.prebuiltOtherScale=''
					
				}).catch(response=>{
					alert("添加失败")
				})
			},
			update:function(val){
				if (val) {
					this.showUpdateDialog=true
					this.updateData.id=this.selectedRow.id
					this.updateData.declareTime=this.selectedRow.declareTime
					this.updateData.prebuiltConcreteNum=this.selectedRow.prebuiltConcreteNum
					this.updateData.prebuiltSteelNum=this.selectedRow.prebuiltSteelNum
					this.updateData.prebuiltTimberNum=this.selectedRow.prebuiltTimberNum
					this.updateData.prebuiltOtherNum=this.selectedRow.prebuiltOtherNum
					this.updateData.prebuiltConcreteAbility=this.selectedRow.prebuiltConcreteAbility
					this.updateData.prebuiltSteelAbility=this.selectedRow.prebuiltSteelAbility
					this.updateData.prebuiltTimberAbility=this.selectedRow.prebuiltTimberAbility
					this.updateData.prebuiltOtherAbility=this.selectedRow.prebuiltOtherAbility
					this.updateData.prebuiltConcreteScale=this.selectedRow.prebuiltConcreteScale
					this.updateData.prebuiltSteelScale=this.selectedRow.prebuiltSteelScale
					this.updateData.prebuiltTimberScale=this.selectedRow.prebuiltTimberScale
					this.updateData.prebuiltOtherScale=this.selectedRow.prebuiltOtherScale
					this.updateData.componentEn=this.selectedRow.componentEn
					this.updateData.checkedStatus=this.selectedRow.checkedStatus
				}else{
					alert("请选择要修改的一行！")
				}
				
			},
			confirmUpdate:function(){
				// this.updateData.id=this.selectedRowId
				var url=this.HOST+'/updateComponentEnIndustrialization'
				this.$http.put(url,this.updateData).then(response=>{
					this.showUpdateDialog=false
					this.getAllComponentEnIndustralization()
					this.$message({
						type:'success',
						message:'成功修改数据'
					})
				}).catch(response=>{
					this.showUpdateDialog=false
					alert("修改数据失败")
				})
			},
			remove:function(val){
				if (val) {
					if (this.checkedStatus==null) {						
						var url=this.HOST+'/deleteComponentEnIndustrialization?id='+this.selectedRowId
						this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(()=>{
				        	this.$http.delete(url).then(response=>{
								this.$message({
									type:'success',
									message:'已成功删除'
								})
								this.getAllComponentEnIndustralization()
							}).catch(response=>{
								this.$message({
									type:'info',
									message:'删除失败'
								})
							})
				        }).catch(()=>{
				        	this.$message({
				        		type:'info',
				        		message:'已取消删除'
				        	})
				        })
						
					}else if (this.checkedStatus.id==2) {
						alert("审核未通过！")
					}else if(this.checkedStatus.id==1){
						alert("已审核，不可以删除")
					}
				}else{
					alert("请选择要删除的一行！")
				}
			},

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
</style>