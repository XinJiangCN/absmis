<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-input icon="search" v-model="searchContent" placeholder="请输入要查询的内容" class="search-input">
                </el-input>
                </el-col>
                <el-col :span="6">
                    <el-date-picker
                      v-model="searchTime"
                      type="daterange"
                      placeholder="选择日期范围">
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-button @click="handleSearch">查询</el-button>
                </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :push="6">
                <el-button @click="rebutAudit">驳回</el-button>
                <el-button type="primary" @click="passAudit">通过</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table
                :data="machineryEnIndustrializationData"
                stripe
                border
                style="width:75%"
                highlight-current-row
                @current-change="handleSelectionChange">
                    <el-table-column
                      label="序号"
                      type="index">
                    </el-table-column>
                    <el-table-column label="企业名称" prop="machineryEn.name" > 
                    </el-table-column>
                    <el-table-column label="填报时间" prop="declareTime" > 
                    </el-table-column>
                    <el-table-column label="新增预制混凝土生产设备的数量" prop="integralWall" > 
                    </el-table-column>
                    <el-table-column label="新增专用运输设备的数量" prop="specialTransportEquipment" > 
                    </el-table-column>
                    <el-table-column label="新增专用施工设备的数量" prop="specialConstructionEquipment" > 
                    </el-table-column>
                    <el-table-column label="审核状态" prop="checkedStatus.state" > 
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalNumber">
                </el-pagination>
            </el-col>
        </el-row>
    <msg-dialog ref="msgDialog"></msg-dialog>
    </div>
</template>
<script>
    import msgDialog from '../common/msgDialog'
    export default{
        data(){
            return{
                //查询内容
                searchContent:'',
                //查询时间
                searchTime:'',
                //当前页
                currentPage:1,
                //当前显示数据条数
                currentPageSize:5,
                totalNumber:0,
                //审核对话框
                auditDialogVisible: false,
                //被选择的行
                selectedRows:null,
                //选择行企业的id
                id:'',
                //显示内容
                machineryEnIndustrializationData:[],
                //被选中的产业化信息
                machineryEnTable:{integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',checkedStatus:{id:''},submit:true} 
            }
        
        },
        methods:{
            //查询按钮处理事件
            handleSearch(){
                if(this.searchContent==''|| this.searchTime ==''){
                    this.$refs.msgDialog.confirm("请输入要查询的内容")
                }else{
                    var startTime = this.moment(this.searchTime[0]).format('YYYY-MM-DD')
                    var endTime = this.moment(this.searchTime[(this.searchTime.length)-1]).format('YYYY-MM-DD')
                    var url = this.HOST+'/queryMachineryEnIn?machineryEnName='+this.searchContent+'&startTime='+startTime+'&endTime='+endTime+'&page='+this.currentPage+'&rows='+this.currentPageSize
                    this.$http.get(url).then(response=>{
                        this.machineryEnIndustrializationData = response.data.rows
                        this.totalNumber = response.data.total
                    }).catch(error=>{
                        this.$refs.msgDialog.confirm("查询错误")
                    })
                }
            },
            //获取被选择的行
            handleSelectionChange(selectedRows){
                this.selectedRows = selectedRows
                this.showMachineryEnIndustrializationData()
            },
            //获取页面表格数据
            findAllMachineryEnIndustrializationsTable(){
                var url = this.HOST + '/displayAllMachineryEnIndustrializationsBySubmit?page='+this.currentPage+"&rows="+this.currentPageSize
                this.$http.get(url).then(response=>{
                    this.machineryEnIndustrializationData = response.data.rows
                    this.totalNumber = response.data.total
                }).catch(error=>{
                    this.$refs.msgDialog.confirm("显示错误")
                })
            },
            //显示条数发生改变时触发本事件
            handleSizeChange(newPageSize){
                this.currentPageSize = newPageSize
                this.findAllMachineryEnIndustrializationsTable()
            },
            //当前页数发生改变时触发本事件
            handleCurrentChange(newPage){
                this.currentPage = newPage
                this.findAllMachineryEnIndustrializationsTable()
            },
           //点击行触发的事件
            showMachineryEnIndustrializationData() {
                this.machineryEnTable = this.selectedRows
            },
            //点击通过
            passAudit(){
                this.machineryEnTable.checkedStatus={id:1}
                var url = this.HOST+'/updateMachineryEnIndustrialization'
                this.$http.put(url,this.machineryEnTable).then(response=>{
                    this.findAllMachineryEnIndustrializationsTable()
                    this.$refs.msgDialog.notify("修改审核状态为通过成功")
                }).catch(error => {
                    this.$refs.msgDialog.confirm("修改审核状态失败")
                })
            },
            //点击驳回
             rebutAudit(){
                this.machineryEnTable.checkedStatus={id:2}
                var url = this.HOST+'/updateMachineryEnIndustrialization'
                this.$http.put(url,this.machineryEnTable).then(response=>{
                    this.findAllMachineryEnIndustrializationsTable()
                    this.$refs.msgDialog.notify("修改审核状态为修改重申成功")
                }).catch(error => {
                    this.$refs.msgDialog.confirm("修改审核状态失败")
                })
             }
        },
        created() {
            this.findAllMachineryEnIndustrializationsTable()
        },
        components:{
            msgDialog
        }
    }
</script>