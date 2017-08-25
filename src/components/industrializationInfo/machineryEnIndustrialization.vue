<template>
    <div>
        <el-row>
            <el-col :span="10">
                <span>填报起止时间</span>
                <el-date-picker
                  v-model="startStopTime"
                  type="daterange"
                  placeholder="选择日期范围">
                </el-date-picker>
                <el-button @click="">查询</el-button>
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
        @selection-change="handleSelectionChange">
            <el-table-column
              label="序号"
              type="selection"
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
              @current-change="handleCurrentChange"
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
                     <el-row>
                        <el-col :span="3">填报时间</el-col>
                        <el-col :span="10">
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
                        <el-col :span="3">填报时间</el-col>
                        <el-col :span="10">
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
            startStopTime:'',
            //表格显示的数据
            machineryEnIndustrializationTable:[],
            //被选择的行
            selectedRows:[],
            //对话框显示
            addDialogVisible:false,
            editDialogVisible:false,
            //当前页
            currentPage:1,
            //当前显示数据条数
            currentPageSize:5,
            totalNumber:0,
            //删除时所用的id
            ids:[],
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
            machineryEnIndustrializationForm:{integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:''}

        }
    },
    methods:{
        handleSelectionChange(selected){
            this.selectedRows = selected
        },
        //显示条数发生改变时触发本事件
        handleSizeChange(newPageSize){
            this.currentPageSize = newPageSize
            this.getMachineryEnIndustrializationTable()
        },
        //当前页数发生改变时触发本事件
        handleCurrentChange(newPage){
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
                var i = 0;
                this.selectedRows.forEach(item => {
                    this.ids[i] = item.id;
                    i = i + 1
                })
                var url=this.HOST + "/deleteMachineryEnIndustrializations?ids=" + this.ids
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
          this.machineryEnIndustrializationForm = {integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:''}
        },
        //点击修改之后运行本方法
        showEditDialogVisible() {
            if (this.selectedRows.length == 1) {
              this.editDialogVisible = true;
              this.machineryEnIndustrializationForm.integralWall = this.selectedRows[0].integralWall
              this.machineryEnIndustrializationForm.specialTransportEquipment = this.selectedRows[0].specialTransportEquipment
              this.machineryEnIndustrializationForm.specialConstructionEquipment = this.selectedRows[0].specialConstructionEquipment
              this.machineryEnIndustrializationForm.declareTime = this.selectedRows[0].declareTime
            } else if (this.selectedRows.length == 0) {
              this.$refs.msgDialog.confirm("请选择您要修改的产业化信息！");
            } else {
              this.$refs.msgDialog.confirm("仅可选择一个产业化信息进行修改！")
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
          this.machineryEnIndustrializationForm = {integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',declareTime:''}           
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
