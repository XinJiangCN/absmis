<template>
    <div>
        <el-row>
            <el-col :span="5">
                <el-input icon="search" v-model="searchContent" placeholder="请输入要查询的内容" class="search-input">
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-button @click="handleSearch">查询</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="auditsubUnitEn">审核</el-button>
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
            :data="subUnitEnData"
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
        <el-dialog title="部品生产企业建筑产业化信息审核" :visible.sync="auditDialogVisible">
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
                subUnitEnData:[],
                //被选择的行
                selectedRows:[],
                //选择行企业的id
                id:'',
                //对话框显示内容
                subUnitEnIndustrializationData:{integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:''}
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
            auditsubUnitEn() {
                if (this.selectedRows.length == 1) {        
                    this.id = this.selectedRows[0].id
                    this.fillAuditsubUnitEnIndustrializationData()
                    this.auditDialogVisible=true
                } else if (this.selectedRows == 0) {
                    this.$refs.msgDialog.confirm("请选择要审核的企业")
                } else {
                    this.$refs.msgDialog.confirm("一次只能对一个企业进行审核")
                }
            },
            //获取页面表格数据
            findAllSubUnitEns(){
                var url = this.HOST + '/findAllSubUnitEns'
                this.$http.get(url).then(response=>{
                    this.subUnitEnData = response.data
                }).catch(error=>{
                    this.$refs.msgDialog.confirm("查询错误")
                })
            },
            //获取对话框显示内容
            fillAuditsubUnitEnIndustrializationData(){
                var url = this.HOST + '/findAllSubUnitEnIndustrializations'
                this.$http.get(url).then(response=>{
                    response.data.forEach(item => {
                      if(item.subUnitEn.id == this.id){
                            this.subUnitEnIndustrializationData = item
                        }
                    })
                }).catch(error=>{
                    this.$refs.msgDialog.confirm("显示错误")
                })
            }
        },
        created() {
            this.findAllSubUnitEns()
        },
        components:{
            msgDialog
        }
    }
</script>