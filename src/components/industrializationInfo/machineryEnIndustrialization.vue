<template>
    <div>
        <el-row>
            <el-col :span="10">
                <span>填报起止时间</span>
                <el-date-picker
                  v-model="searchTime"
                  type="daterange"
                  placeholder="选择日期范围">
                </el-date-picker>
                <el-button @click="handleSearch">查询</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="showAddDialogVisible">增加</el-button>
            </el-col>
            <el-col :span="2" >
                <el-button @click="deleteRowData">删除</el-button>
            </el-col>
            <el-col :span="2" >
                <el-button @click="showEditDialogVisible">修改</el-button>
            </el-col>
        </el-row>
        <el-table
        :data="machineryEnIndustrializationTable"
        stripe
        border
        style="width:80%"
        highlight-current-row
        @current-change="handleCurrentChange">
            <el-table-column
              label="序号"
              type="index"
              width="55">
            </el-table-column>
            <el-table-column label="填报时间" prop="declareTime" > 
            </el-table-column>
            <el-table-column label="预制混凝土生产设备数量" prop="integralWall" > 
            </el-table-column>
            <el-table-column label="专用运输设备数量" prop="specialTransportEquipment" > 
            </el-table-column>
            <el-table-column label="专用施工设备数量" prop="specialConstructionEquipment" > 
            </el-table-column>
        </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :current-page="currentPage"
              :page-sizes="[5,10,15,20,]"
              :page-size="currentPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNumber">
            </el-pagination>
        <!-- 增加弹出框 -->
        <el-dialog title="增加施工设备企业产业化信息" :visible.sync="addDialogVisible">
            <el-form :model="machineryEnIndustrializationForm" label-width="200px" :rules="rules" ref="machineryEnIndustrializationForm">
                     <el-row :gutter="0">
                        <el-col :span="2">年份</el-col>
                        <el-col :span="10" :pull="6">
                            <el-form-item prop="year">
                                <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.year" min="2000">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" :pull="3">季度</el-col>
                        <el-col :span="10" :pull="9">
                            <el-form-item prop="quarter">
                             <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.quarter" min="1" max="4">
                            </el-input>
                            </el-form-item>
                        </el-col>
                      </el-row>
                        <el-row>
                            <el-col :span="4" >填报时间</el-col>
                            <el-col :span="8" :pull="7">
                                <el-form-item prop="declareTime">
                                <el-date-picker
                                  v-model="machineryEnIndustrializationForm.declareTime"
                                  align="right"
                                  type="date"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions1">
                                </el-date-picker>  
                            </el-form-item>
                            </el-col>
                        </el-row>
                <el-form-item label="装配式建筑专用施工设备机具">
                <el-row><el-col :span="7" :offset="1"><span>生产能力</span></el-col></el-row>
                </el-form-item>
                <el-form-item label="预装混凝土生产设备" prop="integralWall">
                    <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.integralWall" min="0">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="专用运输设备" prop="specialTransportEquipment">
                   <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.specialTransportEquipment" min="0">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>
     
                <el-form-item label="专用施工设备" prop="specialConstructionEquipment">
                    <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.specialConstructionEquipment" min="0">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="temporarySaveForm('machineryEnIndustrializationForm')">暂存</el-button>
                <el-button  @click="submitAddForm('machineryEnIndustrializationForm')">提交</el-button>
            </div>
        </el-dialog>
        <!-- 修改弹出框 -->
        <el-dialog title="修改施工设备企业产业化信息" :visible.sync="editDialogVisible">
            <el-form :model="machineryEnIndustrializationForm" label-width="200px" :rules="rules" ref="machineryEnIndustrializationForm">
                     <el-row>
                        <el-col :span="2">年份</el-col>
                        <el-col :span="10" :pull="6">
                            <el-form-item prop="year">
                                <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.year" min="2000">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" :pull="3">季度</el-col>
                        <el-col :span="10" :pull="9">
                            <el-form-item prop="quarter">
                             <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.quarter" min="1" max="4">
                            </el-input>
                            </el-form-item>
                        </el-col>
                      </el-row>
                        <el-row>
                            <el-col :span="4" >填报时间</el-col>
                            <el-col :span="8" :pull="7">
                                <el-form-item prop="declareTime">
                                <el-date-picker
                                  v-model="machineryEnIndustrializationForm.declareTime"
                                  align="right"
                                  type="date"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions1">
                                </el-date-picker>  
                            </el-form-item>
                            </el-col>
                        </el-row>
                <el-form-item label="装配式建筑专用施工设备机具">
                <el-row><el-col :span="7" :offset="1"><span>生产能力</span></el-col></el-row>
                </el-form-item>
                <el-form-item label="预装混凝土生产设备" prop="integralWall">
                    <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.integralWall" min="0">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="专用运输设备" prop="specialTransportEquipment">
                   <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.specialTransportEquipment" min="0">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>
     
                <el-form-item label="专用施工设备" prop="specialConstructionEquipment">
                    <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.specialConstructionEquipment" min="0">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="temporarySaveForm('machineryEnIndustrializationForm')">暂存</el-button>
                <el-button  @click="submitEditForm('machineryEnIndustrializationForm')">提交</el-button>
            </div>
        </el-dialog>
        <msg-dialog ref="msgDialog"></msg-dialog>
    </div>
</template>
<script>
import msgDialog from '../common/msgDialog'
export default{
    data(){
        var validateNumber = (rule, value, callback) => {
        // if (!Number.isInteger(value)) {
        if(value===''){
        callback(new Error('请输入数值'));
        }else if(value<'0') {
          callback('请输入大于或等于0的数值');
        }else{
          callback();
      }
      };
        return{
            //表单验证
            rules:{
                 year: [{ validator: validateNumber, trigger: 'blur&change' }],
                 declareTime: [{ validator: validateNumber, trigger: 'blur&change' }],
                 quarter: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralWall: [{ validator: validateNumber, trigger: 'blur&change' }],
                 specialTransportEquipment: [{ validator: validateNumber, trigger: 'blur&change' }],
                 specialConstructionEquipment: [{ validator: validateNumber, trigger: 'blur&change' }],
            },
            //填报起止时间
            searchTime:'',
            //表格显示的数据
            machineryEnIndustrializationTable:[],
            //被选择的行
            selectedRows:null,
            //对话框显示
            addDialogVisible:false,
            editDialogVisible:false,
            //当前页
            currentPage:1,
            //当前显示数据条数
            currentPageSize:5,
            totalNumber:0,
            //删除时所用的id
            id:'',
            //默认当前时间
            currentDate:'',
            pickerOptions1: {
                disabledDate(time) {
                  return time.getTime() > (Date.now()+24*60*60*1000) - 8.64e7;
                },
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
            //部品产业化的属性(这里submit初始值设置为true是为了下面表单提交的时候通过测试)
            machineryEnIndustrializationForm:{integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:'',year:'',quarter:'',submit:'',checkedStatusState:''}

        }
    },
    methods:{
        //获取当前年,季度,和当前日期
        getCurrentYearAndQuarter(){
            var currentDate= new Date();
            var currMonth=currentDate.getMonth()
            var preDate =new Date(currentDate.getTime()- 24*60*60*1000);
            this.machineryEnIndustrializationForm.declareTime=preDate
            this.machineryEnIndustrializationForm.year=currentDate.getFullYear()
            this.machineryEnIndustrializationForm.quarter=Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
        },
        //查询按钮处理事件
        handleSearch(){
            if(this.searchTime ==''){
                this.$refs.msgDialog.confirm("请输入要查询的内容")
            }else{
                var startTime = this.moment(this.searchTime[0]).format('YYYY-MM-DD')
                var endTime = this.moment(this.searchTime[(this.searchTime.length)-1]).format('YYYY-MM-DD')
                var url = this.HOST+'/queryMachineryEnInCheck?startTime='+startTime+'&endTime='+endTime+'&page='+this.currentPage+'&rows='+this.currentPageSize
                this.$http.get(url).then(response=>{
                    this.machineryEnIndustrializationTable = response.data.rows
                    this.totalNumber = response.data.total
                }).catch(error=>{
                    this.$refs.msgDialog.confirm("查询错误")
                })
            }
        },
        //选中表格中某一行触发的事件
        handleCurrentChange(selected){
            this.selectedRows = selected
        },
        //显示条数发生改变时触发本事件
        handleSizeChange(newPageSize){
            this.currentPageSize = newPageSize
            this.getMachineryEnIndustrializationTable()
        },
        //当前页数发生改变时触发本事件
        handlePageChange(newPage){
            this.currentPage = newPage
            this.getMachineryEnIndustrializationTable()
        },
        //获取表格数据
        getMachineryEnIndustrializationTable(){
            var url = this.HOST+'/getAllMachineryEnIndustrializations?page='+this.currentPage+"&rows="+this.currentPageSize
            this.$http.get(url).then(response=>{
                this.machineryEnIndustrializationTable = response.data.rows
                this.totalNumber = response.data.total
            }).catch(error=>{
                this.$refs.msgDialog.confirm("获取表格数据失败")
            })
        },
         //删除
        deleteRowData() {
            if (this.selectedRows.length == 0) {
              this.$refs.msgDialog.confirm("请选择您要删除的产业化信息！")
            } else {
                this.id = this.selectedRows.id
                var url=this.HOST + "/deleteMachineryEnIndustrialization?id=" + this.id
                this.$http.delete(url).then(response => {
                    this.getMachineryEnIndustrializationTable();
                    this.$refs.msgDialog.notify("删除成功")
                }).catch(error => {
                    this.$refs.msgDialog.confirm("删除失败")
                })
            }
        },
        //暂存表单
        temporarySaveForm(formName){
          this.machineryEnIndustrializationForm.submit = false
          this.$refs[formName].validate((valid) => {
              if (valid) {
                var url = this.HOST+"/addMachineryEnIndustrialization"
                this.$http.post(url,this.machineryEnIndustrializationForm).then(response=>{
                    this.getMachineryEnIndustrializationTable()
                    this.$refs.msgDialog.notify("数据暂存成功")
                    this.addDialogVisible = false 
                    this.editDialogVisible = false
                    }).catch(error=>{
                       if (error=='Error: Request failed with status code 500') {
                        this.$refs.msgDialog.confirm("不可同年同一季度，请检查增加信息")
                     }else{
                        this.$refs.msgDialog.confirm("数据暂存失败")
                     }
                     this.addDialogVisible = false 
                    this.editDialogVisible = false
                    })
                    this.machineryEnIndustrializationForm = {integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:'',year:'',quarter:'',submit:''}
              } else {
                this.$refs.msgDialog.confirm("您有未填写或小于0的内容，请仔细检查，再重新提交")
                return false;
              }
            }); 
          },
        //点击增加打开增加对话框
        showAddDialogVisible(){
            this.machineryEnIndustrializationForm = {integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:'',year:'',quarter:'',submit:''}
            this.getCurrentYearAndQuarter()
            this.addDialogVisible = true
        },
        //提交增加信息
        submitAddForm(formName){
           this.machineryEnIndustrializationForm.submit = true
           this.$refs[formName].validate((valid) => {
              if (valid) {
                  var url = this.HOST+"/addMachineryEnIndustrialization"
                  console.log(JSON.stringify(this.machineryEnIndustrializationForm))
                  this.$http.post(url,this.machineryEnIndustrializationForm).then(response=>{
                    this.getMachineryEnIndustrializationTable()
                    this.$refs.msgDialog.notify("数据提交成功")
                    this.addDialogVisible = false
                  }).catch(error=>{
                    if (error=='Error: Request failed with status code 500') {
                        this.$refs.msgDialog.confirm("不可添加同年同一季度，请检查增加信息")
                     }else{
                        this.$refs.msgDialog.confirm("数据添加失败")
                     }
                     this.addDialogVisible = false
                  })
                  this.machineryEnIndustrializationForm = {integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:'',year:'',quarter:'',submit:''}
              } else {
                this.$refs.msgDialog.confirm("您有未填写或小于0的内容，请仔细检查，再重新提交")
                return false;
              }
            }); 

          
        },
        //点击修改之后运行本方法
        showEditDialogVisible() {
            // alert(this.selectedRows.checkedStatus)
            // alert(this.selectedRows.checkedStatus.id)
            if (this.selectedRows == null) {
              this.$refs.msgDialog.confirm("请选择您要修改的产业化信息！");
            } else if(this.selectedRows.submit){ 
                if(this.selectedRows.checkedStatus!=null){
                    if(this.selectedRows.checkedStatus.id==1 || this.selectedRows.checkedStatus.id==3)
                        this.$refs.msgDialog.confirm("提交且修改状态不为修改重申的数据不能修改")
                    else{
                        this.editDialogVisible = true
                        this.machineryEnIndustrializationForm = this.selectedRows
                    }            
                }
                else{
                     this.$refs.msgDialog.confirm("提交且修改状态不为修改重申的数据不能修改")
                }
            }
            else{
                this.editDialogVisible = true
                this.machineryEnIndustrializationForm = this.selectedRows
            }

        },
        //提交修改信息
        submitEditForm(formName){
          this.machineryEnIndustrializationForm.submit = true
          this.$refs[formName].validate((valid) => {
              if (valid) {
                var url = this.HOST+"/updateMachineryEnIndustrialization"
                this.$http.put(url,this.machineryEnIndustrializationForm).then(response=>{
                    this.getMachineryEnIndustrializationTable()
                    this.$refs.msgDialog.notify("数据修改成功")
                    this.editDialogVisible = false
                  }).catch(error=>{
                    if (error=='Error: Request failed with status code 500') {
                        this.$refs.msgDialog.confirm("不可修改为已有年度季度的信息，请检查增加信息")
                         }else{
                            this.$refs.msgDialog.confirm("数据修改失败")
                         }
                         this.editDialogVisible = false
                  })
                  this.machineryEnIndustrializationForm = {integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:'',year:'',quarter:'',submit:''} 
              } else {
                this.$refs.msgDialog.confirm("您有未填写或小于0的内容，请仔细检查，再重新提交")
                return false;
              }
            }); 
                    
        },


    },
    created(){
        this.getMachineryEnIndustrializationTable()
    },
    components:{
        msgDialog
    }
}

</script>