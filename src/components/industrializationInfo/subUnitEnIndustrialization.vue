<template>
    <div>
    <el-row>
        <el-col :span="2">
            <el-button @click="setCurrent()">增加</el-button>
        </el-col>
        <el-col :span="2" >
            <el-button @click="deleteRowData">删除</el-button>
        </el-col>
        <el-col :span="2" >
            <el-button @click="showEditDialogVisible">修改</el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="5">
            <el-table
            :data="subUnitEnIndustrializationTable"
            stripe
            border
            style="width:98%"
            highlight-current-row
            @current-change="handleCurrentChange">
                <el-table-column
                  label="序号"
                  type="index"
                  width="55">
                </el-table-column>
                <el-table-column label="填报时间" prop="declareTime"> 
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="19">
            <el-form :model="subUnitEnIndustrializationForm" label-width="100px">
                <el-form-item>
                     <el-row>
                     <!-- v-model="subUnitEnIndustrializationForm.declareTime" -->
                        <el-col :span="3">填报时间</el-col>
                        <el-col :span="8">
                            <el-date-picker
                              v-model="subUnitEnIndustrializationForm.declareTime"
                              align="right"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions1">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="生产的主要构件和部品系列">
                    <el-row>
                        <el-col :span="5" :offset="1"><span>生产线数量(条)</span></el-col>
                        <el-col :span="5" :offset="1"><span>生产能力</span></el-col>
                        <el-col :span="5" :offset="1"><span>应用规模</span></el-input></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="整体墙板">
                    <el-row >
                        <el-col :span="5" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralWallNum">
                            </el-input>
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralWallAbility">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralWallScale">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="结构保温装饰一体化外墙">
                    <el-row >
                        <el-col :span="5" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integrativeExternalWallNum">
                            </el-input>
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integrativeExternalWallAbility">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integrativeExternalWallScale">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
     
                <el-form-item label="预制楼梯">
                    <el-row >
                        <el-col :span="5" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.prebuiltStairsNum">
                            </el-input>
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.prebuiltStairsAbility">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.prebuiltStairsScale">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
      

                <el-form-item label="整体厨房">
                    <el-row >
                        <el-col :span="5" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralKitchenNum">
                            </el-input>
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralKitchenAbility">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralKitchenScale">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
     

                <el-form-item label="整体卫生间">
                    <el-row >
                        <el-col :span="5" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralToiletNum">
                            </el-input>
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralToiletAbility">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralToiletScale">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
     

                <el-form-item label="整体内装体系">
                    <el-row>
                        <el-col :span="5" :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralInteriorDecorationNum">
                            </el-input>
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralInteriorDecorationAbility">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-col>
                        <el-col :span="5"  :offset="1">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralInteriorDecorationScale">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div align="center">
                <div v-if="this.submitVisible">
                    <el-button @click="">暂存</el-button>
                    <el-button @click="submitAddForm">提交</el-button>
                </div>
                <div v-else="this.submitVisible">
                    <el-button @click="">暂存</el-button>
                    <el-button @click="submitEditForm">提交</el-button>
                </div>
            </div>
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
            //默认当前时间
            currentDate:'',
            //时间面板左侧快捷键
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
            //获取表格数据
            subUnitEnIndustrializationTable:[],
            //被选中的行
            selectedRows:null,
            //删除行的id
            id:'',
            //控制是提交还是修改
            submitVisible:true,
            //部品产业化的属性
            subUnitEnIndustrializationForm:{integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:''}
        }
    },
    methods:{
        setCurrent(row) {
            this.subUnitEnIndustrializationForm={integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:''}
        },
        handleCurrentChange(selected){
            this.selectedRows = selected
            this.subUnitEnIndustrializationForm = this.selectedRows
        },
        getSubUnitEnIndustrializationTable(){
            var url = this.HOST+'/findAllSubUnitEnIndustrializations'
            this.$http.get(url).then(response=>{
                this.subUnitEnIndustrializationTable = response.data
            }).catch(error=>{
                this.$refs.msgDialog.confirm("获取表格数据失败")
            })
        },
        //提交表单信息
        submitAddForm(){
            var url = this.HOST+"/addSubUnitEnIndustrialization"
            for(var data in this.subUnitEnIndustrializationForm){
                if(this.subUnitEnIndustrializationForm[data]==0){
                    this.$refs.msgDialog.confirm("您有未填写的内容，请仔细检查，再重新提交")
                    return
                }
            }
            this.$http.post(url,this.subUnitEnIndustrializationForm).then(response=>{
                    this.$refs.msgDialog.notify("数据添加成功")
                }).catch(error=>{
                    this.$refs.msgDialog.confirm("数据添加失败")
                })
                this.subUnitEnIndustrializationForm = {integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:''}
            },
            //删除
            deleteRowData() {
                if (this.selectedRows.length == 0) {
                  this.$refs.msgDialog.confirm("请选择您要删除的产业化信息！")
                } else {
                    this.id = this.selectedRows.id
                    var url=this.HOST + "/deleteSubUnitEnIndustrialization?id=" + this.id
                    this.$http.delete(url).then(response => {
                        this.getSubUnitEnIndustrializationTable();
                        this.$refs.msgDialog.notify("删除成功")
                    }).catch(error => {
                        this.$refs.msgDialog.confirm("删除失败")
                    })
                }
            },
            //点击修改之后运行本方法
            showEditDialogVisible() {
                if (this.selectedRows.length == 0) {
                    this.$refs.msgDialog.confirm("请选择您要修改的产业化信息！")
                } else {
                    this.submitVisible = false
                }
            },
            //提交修改信息
            submitEditForm(){
              var url = this.HOST+"/updateSubUnitEnIndustrialization"
              for(var data in this.subUnitEnIndustrializationForm){
                    if(this.subUnitEnIndustrializationForm[data]==0){
                        this.$refs.msgDialog.confirm("您有未填写的内容，请仔细检查，再重新提交")
                        return
                    }
              }
              this.$http.put(url,this.subUnitEnIndustrializationForm).then(response=>{
                this.getSubUnitEnIndustrializationTable()
                this.$refs.msgDialog.notify("数据修改成功")
                this.editDialogVisible = false
              }).catch(error=>{
                this.$refs.msgDialog.confirm("数据修改失败")
              })
              this.subUnitEnIndustrializationForm = {integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:''}         
            },
    },
    created(){
        this.getSubUnitEnIndustrializationTable()
    },
    components:{
        msgDialog
    }
}
</script>
