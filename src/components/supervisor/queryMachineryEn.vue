<template>
    <div>
        <!-- 左侧查询 -->
        <el-row>
            <el-col :span="5">
                <el-input icon="search" v-model="searchContent" placeholder="请输入要查询的内容" class="search-input">
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-button @click="handleNameSearch">查询</el-button>
            </el-col>
        </el-row>
        <!-- 左侧表格 -->
        <el-row>
            <el-col :span="10">
                <el-table
                :data="machineryEnTable"
                stripe
                border
                highlight-current-row
                style="width:75%"
                @current-change="handleSelectionChange">
                    <el-table-column
                      label="序号"
                      type="index"
                      width="55">
                    </el-table-column>
                    <el-table-column label="企业名称" prop="name" ></el-table-column>
                </el-table>
                <!-- 左侧分页 -->
                <el-row>
                    <el-col :span="8">
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
            <!-- 右侧显示 -->
            <el-col :span="14">
                <!-- 右侧查询 -->
                <el-row>
                    <el-col :span="8">
                        <el-date-picker
                          v-model="searchYear"
                          align="right"
                          type="year"
                          placeholder="选择年">
                        </el-date-picker>年
                    </el-col>
                    <el-col :span="2">
                        <el-input type="number" max="4" min="1" v-model.number="searchQuarter"></el-input>
                    </el-col>
                    <el-col :span="4">
                        季度<el-button @click="handleYearSearch">查询</el-button>
                    </el-col>
                </el-row>
                <!-- 右侧 具体显示-->
                <el-row>
                    <el-col>
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
                    </el-col>
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
                //表格数据
                machineryEnTable:[],
                //当前页
                currentPage:1,
                //当前显示数据条数
                currentPageSize:5,
                //总条数
                totalNumber:0,
                //模糊查询企业名称
                searchContent:'',
                //选择年
                searchYear:'',
                //选择季节
                searchQuarter:'',
                //选择行
                selectedRows:null,
                //企业ID
                enId:'',
                //设备产业化的属性
                machineryEnIndustrializationData:{integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:'',}
            }
        },
        methods:{
            //企业名称模糊查询按钮处理事件
            handleNameSearch(){
                if(this.searchContent==''){
                    this.$refs.msgDialog.confirm("请输入要查询的内容")
                }else{
                    var url = this.HOST+'/queryMachineryEnByName?nameQuery='+this.searchContent+'&page='+this.currentPage+'&rows='+this.currentPageSize
                    this.$http.get(url).then(response=>{
                        this.machineryEnTable = response.data.rows
                        this.totalNumber = response.data.total
                    }).catch(error=>{
                        this.$refs.msgDialog.confirm("查询错误")
                    })
                }
            },
            //年份季度查询按钮处理事件
            handleYearSearch(){
                if(this.searchYear==''|| this.searchQuarter ==''){
                    this.$refs.msgDialog.confirm("请输入要查询的内容")
                }else{
                    var year = this.moment(this.searchYear).format('YYYY')
                    var url = this.HOST+'/queryQuarterMachineryEnIn?enId='+this.enId+'&year='+year+'&quarter='+this.searchQuarter
                    this.$http.get(url).then(response=>{
                        this.machineryEnIndustrializationData = response.data
                    }).catch(error=>{
                        this.$refs.msgDialog.confirm("查询错误")
                    })
                }
            },
            //获取页面表格数据
            findAllMachineryEns(){
                var url = this.HOST + '/displayAllMachineryEns?page='+this.currentPage+"&rows="+this.currentPageSize
                this.$http.get(url).then(response=>{
                    this.machineryEnTable = response.data.rows
                    this.totalNumber = response.data.total
                }).catch(error=>{
                    this.$refs.msgDialog.confirm("查询错误")
                })
            },
            //显示条数发生改变时触发本事件
            handleSizeChange(newPageSize){
                this.currentPageSize = newPageSize
                this.findAllMachineryEns()
            },
            //当前页数发生改变时触发本事件
            handleCurrentChange(newPage){
                this.currentPage = newPage
                this.findAllMachineryEns()
            },
            //点击表格某行显示数据
            handleSelectionChange(selected){
                this.selectedRows = selected
                this.enId = this.selectedRows.id
            },
    },

        created(){
            this.findAllMachineryEns()
        },
        components:{
            msgDialog
        }
    }
</script>
