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
			<el-table
			:data="tempData"
			highlight-current-row
			border
			@row-click="handleRowChange"
			style="width: 100%">		
			<el-table-column
			prop="year"
			label="填报时间">
			</el-table-column>
			</el-table>
		</el-col>
		<el-col :span="18">
			<el-row>
				<el-col :span="3">填报时间：</el-col>
				<el-col :span="5">
					<el-date-picker
				      v-model="selectedRow.declareTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1"
				      :format="yyyy-MM-dd">
			    	</el-date-picker>
				</el-col>
				<el-col :span="5">填报年份：</el-col>
				<el-col :span="4">
					<el-input
					v-model="selectedRow.year"
					align="right"
					type="number"
					min='2000'
					></el-input>
				</el-col>
				<el-col :span="3">填报季度：</el-col>
				<el-col :span="4">
					<el-input
					v-model="selectedRow.quarter"
					align="right"
					type="number"
					min='1'
					max='4'
					></el-input>
				</el-col>
			</el-row>
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
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltConcreteNum" type='number' class="input"></el-input></el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltConcreteAbility" type='number' class="input"><template slot="append">万平方米</template></el-input></el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltConcreteScale" type='number' class="input"><template slot="append">万平方米</template></el-input></el-col>		
					</el-row>
					<el-row>
						<el-col :span="6">钢结构构件</el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltSteelNum" type='number' class="input"></el-input></el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltSteelAbility"type='number' class="input"><template slot="append">万平方米</template></el-input></el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltSteelScale" type='number' class="input"><template slot="append">万平方米</template></el-input></el-col>	
					</el-row>
					<el-row>
						<el-col :span="6">木结构构件</el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltTimberNum" type='number' class="input"></el-input></el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltTimberAbility" type='number' class="input"><template slot="append">万平方米</template></el-input></el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltTimberScale" type='number' class="input"><template slot="append">万平方米</template></el-input></el-col>	
					</el-row>
					<el-row>
						<el-col :span="6">其他结构的构件</el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltOtherNum" type='number' class="input"></el-input></el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltOtherAbility" type='number' class="input"><template slot="append">万平方米</template></el-input></el-col>
						<el-col :span="6"><el-input v-model.number="selectedRow.prebuiltOtherScale" type='number' class="input"><template slot="append">万平方米</template></el-input></el-col>	
					</el-row>	
				</el-col>
			</el-row>
			<el-row>
				<el-button type="primary" @click="">暂存</el-button>
				<el-button type="primary" @click="confirmUpdate">提交</el-button>
			</el-row>
		</el-col>

		<el-dialog v-model="showAddDialog">
			<el-form ref="componentCompanyForm">
				<el-form-item>
					<el-col :span="4">
						填报时间：
					</el-col>
					<el-col :span="5">
						<el-date-picker
					      v-model="addData.declareTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions1"
					      :format="yyyy-MM-dd">
				    	</el-date-picker>
					</el-col>	
				</el-form-item>
				<el-form-item>
					<el-col :span="4">
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
					<el-col :span="4">
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
					<el-row>
						<el-col :span="24">
							<el-row>
								<el-col :span="6">
									<el-checkbox label="预制装配混凝土结构构件"></el-checkbox>	
								</el-col>				
								<el-col :span="6"><el-input v-model.number="addData.prebuiltConcreteNum" type='number' min='0'></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltConcreteAbility" type='number' min='0'><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltConcreteScale" type='number' min='0'><template slot="append">万平方米</template></el-input></el-col>		
							</el-row>
							<el-row>
								<el-col :span="6"><el-checkbox label="钢结构构件"></el-checkbox></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltSteelNum" type='number' min='0'></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltSteelAbility"type='number' min='0'><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltSteelScale" type='number' min='0'><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>
							<el-row>
								<el-col :span="6"><el-checkbox label="木结构构件"></el-checkbox></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltTimberNum" type='number' min='0'></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltTimberAbility" type='number' min='0'><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltTimberScale" type='number' min='0'><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>
							<el-row>
								<el-col :span="6"><el-checkbox label="其他结构的构件"></el-checkbox></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltOtherNum" type='number' min='0'></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltOtherAbility" type='number' min='0'><template slot="append">万平方米</template></el-input></el-col>
								<el-col :span="6"><el-input v-model.number="addData.prebuiltOtherScale" type='number' min='0'><template slot="append">万平方米</template></el-input></el-col>	
							</el-row>	
						</el-col>
					</el-row>	
				</el-form-item>
				<el-button type="primary" @click="tempStore">暂存</el-button>
				<el-button type="primary" @click="submit">提交</el-button>
			</el-form>	
		</el-dialog>
		<msg-dialog ref="msgDialog"></msg-dialog>		
	</div>
</template>
<script type="text/javascript">
import msgDialog from '../common/msgDialog.vue'
	export default{
		data:function(){
			return{
				addData:{
					declareTime:'',
					year:'',
					quarter:'',
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
				    checkedStatus:''
				},
				tempData:'',
				componentIndustrializationInfoData:'',
				declareTime:'',
				pageNum:1,
				pageSize:10,
				totalComponentIndustrializationData:'',
				showAddDialog:false,
				showUpdateDialog:false,
				selectedRow:'',
				selectedYear:'',
				selectedQuarter:'',
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
			var currMonth=currentDate.getMonth()
			var preDate =new Date(currentDate.getTime()- 24*60*60*1000);
			this.addData.declareTime=preDate
			this.addData.year=currentDate.getFullYear()
			this.addData.quarter=Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
			this.getAllComponentEnIndustralization()
			
		},
		methods:{
			getAllComponentEnIndustralization:function(){
				var url=this.HOST+'/displayAllComponentEnIndustrializations?page='+this.pageNum+'&rows='+this.pageSize
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
				var storage = window.localStorage
				var tempAddData = ''
				var tempUpdateData = []
				storage.setItem("tempAddData",JSON.stringify(this.addData))
				storage.setItem("tempUpdateData",JSON.stringify(this.selectedRow))
				var json=storage.getItem("tempAddData");
            	this.tempData=JSON.parse(json);
				// this.tempData=this.addData
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
				console.log("this.tempData="+JSON.stringify(this.tempData))
				this.showAddDialog=false
			},
			add:function(){
				this.showAddDialog=true
			},
			submit:function(){
				var url=this.HOST+'/addComponentEnIndustrialization'
				for (var data in this.addData) {
					if (this.addData[data] == 0) {
						this.$refs.msgDialog.confirm("请将内容填写完整！")
					}
				}
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
					
				}).catch(response=>{
					if (response=='Error: Request failed with status code 500') {
						this.$refs.msgDialog.confirm("不可添加同年同一季度，请检查增加信息")
					}
				})
			},
			update:function(val){
				if (val) {

				}else{
					this.$refs.msgDialog.confirm("请选择要删除的一行！")
				}
				
			},
			confirmUpdate:function(){
				if (this.checkedStatus==null||this.checkedStatus.id==2) {
					var url=this.HOST+'/updateComponentEnIndustrialization'
					this.$http.put(url,this.selectedRow).then(response=>{
						this.getAllComponentEnIndustralization()
						this.$refs.msgDialog.notify("成功修改数据！")
					}).catch(response=>{
						this.$refs.msgDialog.notify("修改数据失败！")
					})
				}else if (this.checkedStatus.id==3) {
					this.$refs.msgDialog.confirm("审核未通过！不可以修改")
				}else if(this.checkedStatus.id==1){
					this.$refs.msgDialog.confirm("已审核通过！不可以修改！")
				}
			
				
			},
			remove:function(val){
				if (val) {
					if (this.checkedStatus==null||this.checkedStatus.id==2) {
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
						
					}else if (this.checkedStatus.id==3) {
						this.$refs.msgDialog.confirm("审核未通过！")
					}else if(this.checkedStatus.id==1){
						this.$refs.msgDialog.confirm("已审核，不可以删除！")
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
</style>