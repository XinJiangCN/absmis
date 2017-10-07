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
        <el-col :span="6">
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
            <el-pagination
            @current-change="handlePageNumChange"
            @size-change="handlePageSizeChange"
            :current-page="pageNum"
            :page-size="pageSize"
            :page-sizes="[5,10,15,20]"
            layout="total, sizes, prev, pager, next"
            :total="total">
            </el-pagination>
        </el-col>
        <el-col :span="18">
            <el-form :model="subUnitEnIndustrializationForm" label-width="100px" :rules="rules" ref="subUnitEnIndustrializationForm">
                <el-row :gutter="0">
                    <el-col :span="2" :push="2">年份</el-col>
                    <el-col :span="5" :pull="1">
                        <el-form-item prop="year">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.year" min="2000">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" :pull="1">季度</el-col>
                    <el-col :span="5" :pull="4" >
                        <el-form-item prop="quarter">
                             <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.quarter" min="1" max="4">
                            </el-input>
                        </el-form-item>
                    </el-col>
                   
                    <el-col :span="2" :pull="3">填报时间</el-col>
                    <el-col :span="8" :pull="5" >
                        <el-form-item prop="declareTime">
                            <el-date-picker
                              v-model="subUnitEnIndustrializationForm.declareTime"
                              align="right"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions1">
                            </el-date-picker>  
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3" :offset="1" :pull="1"><span>生产的主要构件和部品系列</span></el-col>
                    <el-col :span="5" :pull="1"><span>生产线数量(条)</span></el-col>
                    <el-col :span="5" :pull="1"><span>生产能力</span></el-col>
                    <el-col :span="5" :pull="1"><span>应用规模</span></el-input></el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="3">
                        整体墙板
                    </el-col>
                    <el-col :span="7" :pull="2">
                        <el-form-item prop="integralWallNum">
                             <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralWallNum" min="0">
                             </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="4">
                        <el-form-item prop="integralWallAbility">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralWallAbility" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="6">
                        <el-form-item  prop="integralWallScale">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralWallScale" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="3">
                        结构保温装饰一体化外墙
                    </el-col>
                    <el-col :span="7" :pull="2">
                        <el-form-item prop="integrativeExternalWallNum">
                             <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integrativeExternalWallNum" min="0">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="4">
                        <el-form-item prop="integrativeExternalWallAbility">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integrativeExternalWallAbility" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="6">
                        <el-form-item prop="integrativeExternalWallScale">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integrativeExternalWallScale" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="3">
                        预制楼梯
                    </el-col>
                    <el-col :span="7" :pull="2">
                        <el-form-item prop="prebuiltStairsNum">
                             <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.prebuiltStairsNum" min="0">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="4">
                        <el-form-item prop="prebuiltStairsAbility">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.prebuiltStairsAbility" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="6">
                        <el-form-item prop="prebuiltStairsScale">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.prebuiltStairsScale" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="3">
                        整体厨房
                    </el-col>
                    <el-col :span="7" :pull="2">
                        <el-form-item prop="integralKitchenNum">
                             <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralKitchenNum" min="0">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="4">
                        <el-form-item prop="integralKitchenAbility">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralKitchenAbility" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="6">
                        <el-form-item prop="integralKitchenScale"> 
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralKitchenScale" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="3">
                        整体卫生间
                    </el-col>
                    <el-col :span="7" :pull="2">
                        <el-form-item prop="integralToiletNum">
                             <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralToiletNum" min="0">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="4">
                        <el-form-item prop="integralToiletAbility">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralToiletAbility" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="6">
                        <el-form-item prop="integralToiletScale">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralToiletScale" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="3">
                        整体内装体系
                    </el-col>
                    <el-col :span="7" :pull="2">
                        <el-form-item prop="integralInteriorDecorationNum">
                             <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralInteriorDecorationNum" min="0">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="4">
                        <el-form-item prop="integralInteriorDecorationAbility">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralInteriorDecorationAbility" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>  
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :pull="6">
                        <el-form-item prop="integralInteriorDecorationScale">
                            <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralInteriorDecorationScale" min="0">
                            <template slot="append">万平方米</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div align="center">
                <div v-if="this.submitVisible">
                    <el-button @click="temporarySaveForm('subUnitEnIndustrializationForm')">暂存</el-button>
                    <el-button @click="submitAddForm('subUnitEnIndustrializationForm')">提交</el-button>
                </div>
                <div v-else="this.submitVisible">
                    <el-button @click="temporarySaveForm('subUnitEnIndustrializationForm')">暂存</el-button>
                    <el-button @click="submitEditForm('subUnitEnIndustrializationForm')">提交</el-button>
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
            pageNum:1,
            pageSize:10,
            total:'',
            //表单验证
            rules:{
                year: [{ validator: validateNumber, trigger: 'blur&change' }],
                 declareTime: [{ validator: validateNumber, trigger: 'blur&change' }],
                 quarter: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralWallNum: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integrativeExternalWallNum: [{ validator: validateNumber, trigger: 'blur&change' }],
                 prebuiltStairsNum: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralKitchenNum: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralToiletNum: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralInteriorDecorationNum: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralWallAbility: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integrativeExternalWallAbility: [{ validator: validateNumber, trigger: 'blur&change' }],
                 prebuiltStairsAbility: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralKitchenAbility: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralToiletAbility: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralInteriorDecorationAbility: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralWallScale: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integrativeExternalWallScale: [{ validator: validateNumber, trigger: 'blur&change' }],
                 prebuiltStairsScale: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralKitchenScale: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralToiletScale: [{ validator: validateNumber, trigger: 'blur&change' }],
                 integralInteriorDecorationScale: [{ validator: validateNumber, trigger: 'blur&change' }],
            },
            //默认当前时间
            currentDate:'',
            //时间面板左侧快捷键
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
            //获取表格数据
            subUnitEnIndustrializationTable:[],
            //被选中的行
            selectedRows:null,
            //删除行的id
            id:'',
            //控制是提交还是修改false为修改
            submitVisible:false,
            //部品产业化的属性
            subUnitEnIndustrializationForm:{integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:'',year:'',quarter:'',submit:''}
        }
    },
    methods:{
        //获取当前年,季度,和当前日期
        getCurrentYearAndQuarter(){
            var currentDate= new Date();
            var currMonth=currentDate.getMonth()
            var preDate =new Date(currentDate.getTime()- 24*60*60*1000);
            this.subUnitEnIndustrializationForm.declareTime=preDate
            this.subUnitEnIndustrializationForm.year=currentDate.getFullYear()
            this.subUnitEnIndustrializationForm.quarter=Math.floor( ( currMonth % 3 == 0 ? ( currMonth / 3 ) : ( currMonth / 3 + 1 ) ) )
        },
        //点击增加触发的事件
        setCurrent(row) {
            this.subUnitEnIndustrializationForm={integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:'',year:'',quarter:'',submit:''}
            this.getCurrentYearAndQuarter()
            this.submitVisible = true
        },
        handleCurrentChange(selected){
            this.selectedRows = selected
            this.subUnitEnIndustrializationForm = this.selectedRows
        },
        handlePageNumChange:function(val){
                this.pageNum=val
                this.getSubUnitEnIndustrializationTable()
            },
            handlePageSizeChange:function(val){
                this.pageSize=val
                this.getSubUnitEnIndustrializationTable()
            },
        getSubUnitEnIndustrializationTable(){
            var url = this.HOST+'/getAllSubUnitEnIndustrializations?page='+this.pageNum+'&rows='+this.pageSize
            this.$http.get(url).then(response=>{
                this.total=response.data.total
                this.subUnitEnIndustrializationTable = response.data.rows
            }).catch(error=>{
                this.$refs.msgDialog.confirm("获取表格数据失败")
            })
        },
        //暂存表单
        temporarySaveForm(formName){
            this.subUnitEnIndustrializationForm.submit = false
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var url = this.HOST+"/addSubUnitEnIndustrialization"
                this.$http.post(url,this.subUnitEnIndustrializationForm).then(response=>{
                    this.getSubUnitEnIndustrializationTable();
                    this.$refs.msgDialog.notify("数据暂存成功")
                }).catch(error=>{
                    if (error=='Error: Request failed with status code 500') {
                        this.$refs.msgDialog.confirm("不可暂存同年同一季度，请检查增加信息")
                     }else{
                        this.$refs.msgDialog.confirm("数据暂存失败")
                     }
                    
                })
                this.subUnitEnIndustrializationForm = {integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:'',year:'',quarter:'',submit:''}
              } else {
                this.$refs.msgDialog.confirm("您有未填写或小于0的内容，请仔细检查，再重新提交")
                return false;
              }
            });               
        },
        //提交表单信息
        submitAddForm(formName){
            this.subUnitEnIndustrializationForm.submit = true
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var url = this.HOST+"/addSubUnitEnIndustrialization"
                this.$http.post(url,this.subUnitEnIndustrializationForm).then(response=>{
                    this.getSubUnitEnIndustrializationTable();
                    this.$refs.msgDialog.notify("数据添加成功")
                }).catch(error=>{
                    if (error=='Error: Request failed with status code 500') {
                        this.$refs.msgDialog.confirm("不可添加同年同一季度，请检查增加信息")
                     }else{
                        this.$refs.msgDialog.confirm("数据添加失败")
                     }
                })
                this.subUnitEnIndustrializationForm = {integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:'',year:'',quarter:'',submit:''}
              } else {
                this.$refs.msgDialog.confirm("您有未填写或小于0的内容，请仔细检查，再重新提交")
                return false;
              }
            });
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
                if (this.selectedRows == null) {
                    this.$refs.msgDialog.confirm("请选择您要修改的产业化信息！")
                }else if(this.selectedRows.submit){ 
                    if(this.selectedRows.checkedStatus == null){
                        this.$refs.msgDialog.confirm("提交且修改状态不为修改重申的数据不能修改")
                        this.subUnitEnIndustrializationForm = {integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:'',year:'',quarter:'',submit:''}
                    }
                    else if(this.selectedRows.checkedStatus.state!='修改重申'){
                        this.$refs.msgDialog.confirm("提交且修改状态不为修改重申的数据不能修改")
                        this.subUnitEnIndustrializationForm = {integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:'',year:'',quarter:'',submit:''}  
                    }else{
                        this.submitVisible = false
                    }
                }else{
                    this.submitVisible = false
                }
            },
            //提交修改信息
            submitEditForm(formName){
                 if(this.selectedRows.submit){ 
                    if(this.selectedRows.checkedStatus == null){
                        this.$refs.msgDialog.confirm("提交且修改状态不为修改重申的数据不能修改")
                        this.subUnitEnIndustrializationForm = {integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:'',year:'',quarter:'',submit:''}
                        return
                    }
                    else if(this.selectedRows.checkedStatus.state!='修改重申'){
                        this.$refs.msgDialog.confirm("提交且修改状态不为修改重申的数据不能修改")
                        this.subUnitEnIndustrializationForm = {integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:'',year:'',quarter:'',submit:''}  
                        return
                    }else{
                        this.submitVisible = false
                    }
                }else{
                    this.submitVisible = false
                }
                this.subUnitEnIndustrializationForm.submit = true
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    var url = this.HOST+"/updateSubUnitEnIndustrialization"
                    this.$http.put(url,this.subUnitEnIndustrializationForm).then(response=>{
                        this.getSubUnitEnIndustrializationTable()
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
                    this.subUnitEnIndustrializationForm = {integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:'',declareTime:'',year:'',quarter:'',submit:''}    
                  } else {
                    this.$refs.msgDialog.confirm("您有未填写或小于0的内容，请仔细检查，再重新提交")
                  }
                });                
            },
    },
    created(){
        this.getSubUnitEnIndustrializationTable()
        this.getCurrentYearAndQuarter()
        
    },
    components:{
        msgDialog
    }
}
</script>
