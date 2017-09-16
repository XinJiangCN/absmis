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
                <el-button @click="addDialogVisible = true">增加</el-button>
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
            <el-form :model="machineryEnIndustrializationForm" label-width="200px" class="demo-ruleForm">
                <el-form-item>
                     <el-row >
                        <el-col :span="3" :pull="6">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.year" min="2000">
                            </el-input>
                        </el-col>
                        <el-col :span="2" :pull="6">年份</el-col>
                        <el-col :span="3" :pull="6">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.quarter" min="1" max="4">
                            </el-input>
                        </el-col>
                        <el-col :span="2" :pull="6">季度</el-col>
                        <el-col :span="3" :pull="6">填报时间</el-col>
                        <el-col :span="10" :pull="6">
                            <el-date-picker
                              v-model="machineryEnIndustrializationForm.declareTime"
                              align="right"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions1">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="装配式建筑专用施工设备机具">
                <el-row><el-col :span="7" :offset="1"><span>生产能力</span></el-col></el-row>
                </el-form-item>
                <el-form-item label="预装混凝土生产设备">
                    <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.integralWall">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="专用运输设备">
                   <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.specialTransportEquipment">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>
     
                <el-form-item label="专用施工设备">
                    <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.specialConstructionEquipment">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="">暂存</el-button>
                <el-button  @click="submitAddForm">提交</el-button>
            </div>
        </el-dialog>
        <!-- 修改弹出框 -->
        <el-dialog title="修改施工设备企业产业化信息" :visible.sync="editDialogVisible">
            <el-form :model="machineryEnIndustrializationForm" label-width="200px" class="demo-ruleForm">
                <el-form-item>
                     <el-row>
                        <el-col :span="3" :pull="6">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.year" min="2000">
                            </el-input>
                        </el-col>
                        <el-col :span="2" :pull="6">年份</el-col>
                        <el-col :span="3" :pull="6">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.quarter" min="1" max="4">
                            </el-input>
                        </el-col>
                        <el-col :span="2" :pull="6">季度</el-col>
                        <el-col :span="3" :pull="6">填报时间</el-col>
                        <el-col :span="10" :pull="6">
                            <el-date-picker
                              v-model="machineryEnIndustrializationForm.declareTime"
                              align="right"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions1">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="装配式建筑专用施工设备机具">
                <el-row><el-col :span="7" :offset="1"><span>生产能力</span></el-col></el-row>
                </el-form-item>
                <el-form-item label="预装混凝土生产设备">
                    <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.integralWall">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="专用运输设备">
                   <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.specialTransportEquipment">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>
     
                <el-form-item label="专用施工设备">
                    <el-row >
                        <el-col :span="7" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.specialConstructionEquipment">
                            <template slot="append">台套/年</template>
                            </el-input>  
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="">暂存</el-button>
                <el-button  @click="submitEditForm">提交</el-button>
            </div>
        </el-dialog>
        <msg-dialog ref="msgDialog"></msg-dialog>
    </div>
</template>
<script>
import msgDialog from '../common/msgDialog'
export default{
    data(){
        return{
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
                shortcuts: [{
                    text: '昨天',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      picker.$emit('pick', date);
                    }
                }]
            },
            //部品产业化的属性
            machineryEnIndustrializationForm:{integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:'',year:'',quarter:''}

        }
    },
    methods:{
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
        getMachineryEnIndustrializationTable(){
            var url = this.HOST+'/displayAllMachineryEnIndustrializations?page='+this.currentPage+"&rows="+this.currentPageSize
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
        //提交增加信息
        submitAddForm(){
          var url = this.HOST+"/addMachineryEnIndustrialization"
          for(var data in this.machineryEnIndustrializationForm){
                if(this.machineryEnIndustrializationForm[data]==0){
                    this.$refs.msgDialog.confirm("您有未填写的内容，请仔细检查，再重新提交")
                    return
                }
            }
          this.$http.post(url,this.machineryEnIndustrializationForm).then(response=>{
            this.getMachineryEnIndustrializationTable()
            this.$refs.msgDialog.notify("数据提交成功")
            this.addDialogVisible = false
          }).catch(error=>{
            this.$refs.msgDialog.confirm("数据提交失败")
          })
          this.machineryEnIndustrializationForm = {integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:'',year:'',quarter:''}
        },
        //点击修改之后运行本方法
        showEditDialogVisible() {
            if (this.selectedRows.length == 0) {
              this.$refs.msgDialog.confirm("请选择您要修改的产业化信息！");
            } else {
              this.editDialogVisible = true;
              this.machineryEnIndustrializationForm.integralWall = this.selectedRows.integralWall
              this.machineryEnIndustrializationForm.specialTransportEquipment = this.selectedRows.specialTransportEquipment
              this.machineryEnIndustrializationForm.specialConstructionEquipment = this.selectedRows.specialConstructionEquipment
              this.machineryEnIndustrializationForm.declareTime = this.selectedRows.declareTime
              this.machineryEnIndustrializationForm.year = this.selectedRows.year
              this.machineryEnIndustrializationForm.quarter = this.selectedRows.quarter
            } 
        },
        //提交修改信息
        submitEditForm(){
          var url = this.HOST+"/updateMachineryEnIndustrialization"
          for(var data in this.machineryEnIndustrializationForm){
                if(this.machineryEnIndustrializationForm[data]==0){
                    this.$refs.msgDialog.confirm("您有未填写的内容，请仔细检查，再重新提交")
                    return
                }
          }
          this.$http.put(url,this.machineryEnIndustrializationForm).then(response=>{
            this.getMachineryEnIndustrializationTable()
            this.$refs.msgDialog.notify("数据提交成功")
            this.editDialogVisible = false
          }).catch(error=>{
            this.$refs.msgDialog.confirm("数据提交失败")
          })
          this.machineryEnIndustrializationForm = {integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:'',year:'',quarter:''}           
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
