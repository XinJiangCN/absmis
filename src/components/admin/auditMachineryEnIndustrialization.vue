<template>
    <div>
        <el-row>
            <el-col :span="5">
                <el-input icon="search" v-model="searchContent" placeholder="请输入要查询的内容">
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-button @click="handleSearch">查询</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="auditmachineryEn">审核</el-button>
            </el-col>
            <el-col :span="4" :push="2">
                <el-input type="number" v-model="selectedQuarter">
                    <span slot="prepend">{{this.currentYear}}</span>
                    <span slot="append">季度</span>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-table
            :data="machineryEnData"
            stripe
            border
            style="width:60%"
            @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column label="企业名称" prop="name" > 
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog title="专用施工设备机具企业建筑产业化信息审核" :visible.sync="auditDialogVisible" size="tiny">
            <el-row>
                <el-col :span="6">生产的装配式建筑专用施工设备机具</el-col>
                <el-col :span="5"><span>生产能力</span></el-col>
            </el-row>
            <el-row >
                <el-col :span="6">预制混凝土生产设备</el-col>
                <el-col :span="5">{{this.machineryEnIndustrializationData.integralWall}}台套/年</el-col>
            </el-row>

            <el-row >
                <el-col :span="6">专用运输设备</el-col>
                <el-col :span="5">{{this.machineryEnIndustrializationData.specialTransportEquipment}}台套/年</el-col>
            </el-row>
            <el-row >
                <el-col :span="6">专用施工设备</el-col>
                <el-col :span="5">{{this.machineryEnIndustrializationData.specialConstructionEquipment}}台套/年</el-col>
            </el-row>
          <div slot="footer">
                <el-button @click="">驳回</el-button>
                <el-button type="primary" @click="">通过</el-button>
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
                //查询内容
                searchContent:'',
                //审核对话框
                auditDialogVisible: false,
                //当前年
                currentYear:new Date().getFullYear() + "年",
                //选择的季度
                selectedQuarter:'',
                //表格数据
                machineryEnData:[],
                //被选择的行
                selectedRows:[],
                //选择行企业的id
                id:'',
                //对话框显示内容
                machineryEnIndustrializationData:{integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:''} 
            }
        
        },
        methods:{
            //查询按钮处理事件
            handleSearch(){},
            //获取被选择的行
            handleSelectionChange(selectedRows){
                this.selectedRows = selectedRows
            },
            //点击审核触发的事件
            auditmachineryEn() {
                if (this.selectedRows.length == 1) {        
                    this.id = this.selectedRows[0].id
                    this.findAllMachineryEnIndustrializations()
                    this.auditDialogVisible=true
                } else if (this.selectedRows == 0) {
                    this.$refs.msgDialog.confirm("请选择要审核的企业")
                } else {
                    this.$refs.msgDialog.confirm("一次只能对一个企业进行审核")
                }
            },
            //获取页面表格数据
            findAllMachineryEns(){
                var url = this.HOST + '/findAllMachineryEns'
                this.$http.get(url).then(response=>{
                    this.machineryEnData = response.data
                }).catch(error=>{
                    this.$refs.msgDialog.confirm("查询错误")
                })
            },
            //获取对话框显示内容
            findAllMachineryEnIndustrializations(){
                var url = this.HOST + '/findAllMachineryEnIndustrializations'
                this.$http.get(url).then(response=>{
                    response.data.forEach(item => {
                      if(item.machineryEn.id == this.id){
                            this.machineryEnIndustrializationData = item
                        }
                    })
                }).catch(error=>{
                    this.$refs.msgDialog.confirm("显示错误")
                })
            }
        },
        created() {
            this.findAllMachineryEns()
        },
        components:{
            msgDialog
        }
    }
</script>