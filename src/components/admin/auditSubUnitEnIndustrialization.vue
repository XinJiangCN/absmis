<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-input icon="search" v-model="searchContent" placeholder="请输入要查询的内容" class="search-input">
                </el-input>
                    <el-date-picker
                      v-model="searchTime"
                      type="daterange"
                      placeholder="选择日期范围">
                    </el-date-picker><el-button @click="handleSearch">查询</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
            <el-table
            :data="subUnitEnIndustrializationTable"
            stripe
            border
            style="width:60%"
            highlight-current-row
            @current-change="handleSelectionChange">
                <el-table-column
                  label="序号"
                  type="index">
                </el-table-column>
                <el-table-column label="企业名称" prop="subUnitEn.name" > 
                </el-table-column>
                <el-table-column label="填报时间" prop="declareTime" > 
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="10">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[5,10,15,20,]"
                      :page-size="currentPageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalNumber">
                    </el-pagination>
                </el-col>
            </el-row>
            </el-col>      
        <el-col :span="14">
            <el-row>
                <el-col>
                    <el-button @click="rebutAudit">驳回</el-button>
                    <el-button type="primary" @click="passAudit">通过</el-button>
                </el-col> 
            </el-row>
            <el-row>
                <el-col :span="6">生产的主要构件和部品系列</el-col>
                <el-col :span="5"><span>生产线数量(条)</span></el-col>
                <el-col :span="5"><span>生产能力</span></el-col>
            </el-row>
            <el-row >
                <el-col :span="6">整体墙板</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.integralWallNum}}</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.integralWallAbility}}万平方米</el-col>
            </el-row>
            <el-row >
                <el-col :span="6">结构保温装饰一体化外墙</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.integrativeExternalWallNum}}</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.integrativeExternalWallAbility}}万平方米</el-col>
            </el-row>
            <el-row >
                <el-col :span="6">预制楼梯</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.prebuiltStairsNum}}</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.prebuiltStairsAbility}}万平方米</el-col>
            </el-row>
            <el-row >
                <el-col :span="6">整体厨房</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.integralKitchenNum}}</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.integralKitchenAbility}}台套/年</el-col>
            </el-row>
            <el-row >
                <el-col :span="6">整体卫生间</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.integralToiletNum}}</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.integralToiletAbility}}台套/年</el-col>
            </el-row>
            <el-row >
                <el-col :span="6">整体内装体系</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.integralInteriorDecorationNum}}</el-col>
                <el-col :span="5">{{this.subUnitEnIndustrializationData.integralInteriorDecorationAbility}}万平方米</el-col>
            </el-row>
            
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
                searchTime:[],
                //审核对话框
                auditDialogVisible: false,
                //右侧内容显示数据
                subUnitEnIndustrializationDataVisible:false,
                //当前年
                currentYear:new Date().getFullYear() + "年",
                //选择的季度
                selectedQuarter:'',
                //表格数据
                subUnitEnIndustrializationTable:[],
                //当前页
                currentPage:1,
                //当前显示数据条数
                currentPageSize:5,
                //总条数
                totalNumber:0,
                //被选择的行
                selectedRows:null,
                //选择行企业的id
                id:'',
                //对话框显示内容
                subUnitEnIndustrializationData:{integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',checkedStatus:{id:''}}
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
                    var url = this.HOST+'/querySubUnitEnIn?subUnitEnName='+this.searchContent+'&startTime='+startTime+'&endTime='+endTime+'&page='+this.currentPage+'&rows='+this.currentPageSize
                    this.$http.get(url).then(response=>{
                        this.subUnitEnIndustrializationTable = response.data.rows
                        this.totalNumber = response.data.total
                    }).catch(error=>{
                        this.$refs.msgDialog.confirm("查询错误")
                    })
                }

            },
            //获取页面表格数据
            findAllSubUnitEnIndustrializationsTable(){
                var url = this.HOST + '/displayAllSubUnitEnIndustrializationsBySubmit?page='+this.currentPage+"&rows="+this.currentPageSize
                this.$http.get(url).then(response=>{
                    this.subUnitEnIndustrializationTable = response.data.rows
                    this.totalNumber = response.data.total
                }).catch(error=>{
                    this.$refs.msgDialog.confirm("查询错误")
                })
            },
            //显示条数发生改变时触发本事件
            handleSizeChange(newPageSize){
                this.currentPageSize = newPageSize
                this.findAllSubUnitEnIndustrializationsTable()
            },
            //当前页数发生改变时触发本事件
            handleCurrentChange(newPage){
                this.currentPage = newPage
                this.findAllSubUnitEnIndustrializationsTable()
            },
            //获取被选择的行
            handleSelectionChange(selectedRows){
                this.subUnitEnIndustrializationData={integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',checkedStatus:{id:''}}
                this.selectedRows = selectedRows
                this.id = this.selectedRows.id
                this.subUnitEnIndustrializationData = this.selectedRows
                this.fillAuditsubUnitEnIndustrializationData()
                
            },
            //点击行触发的事件
            showSubUnitEnIndustrializationData() {
                
            },

            //对话框中点击通过
            passAudit(){
                this.subUnitEnIndustrializationData.checkedStatus={id:1}
                var url = this.HOST+'/updateSubUnitEnIndustrialization'
                this.$http.put(url,this.subUnitEnIndustrializationData).then(response=>{
                    this.$refs.msgDialog.notify("修改审核状态为通过成功")
                    this.auditDialogVisible=false
                }).catch(error => {
                    this.$refs.msgDialog.confirm("修改审核状态失败")
                })
            },
            //对话框点击驳回
             rebutAudit(){
                this.subUnitEnIndustrializationData.checkedStatus={id:2}
                var url = this.HOST+'/updateSubUnitEnIndustrialization'
                this.$http.put(url,this.subUnitEnIndustrializationData).then(response=>{
                    this.$refs.msgDialog.notify("修改审核状态为修改重申成功")
                    this.auditDialogVisible=false
                }).catch(error => {
                    this.$refs.msgDialog.confirm("修改审核状态失败")
                })
             }
        },
        created() {
            this.findAllSubUnitEnIndustrializationsTable()
        },
        components:{
            msgDialog
        }
    }
</script>
