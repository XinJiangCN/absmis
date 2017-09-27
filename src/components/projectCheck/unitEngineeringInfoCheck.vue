<template>
  <div>
    <el-row>
      <!-- 每行分为24栏（固定），span设置该列占有5栏 -->
      <el-col :span="5">
        <!-- 增删改按钮 -->
        <el-button-group>
          <el-button type="primary" @click="showEditDialogVisible">审核
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <el-row type="flex">  
      <el-col :span="24">
        <!-- 企业账号维护（设计单位） -->
        <unit-engineering-check-table
            :unitEngineeringTableData="unitEngineeringTableData"
            @handleSelectionChange="handleSelectionChange">
        </unit-engineering-check-table>
        
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
          :total="totalNum">
        </el-pagination>
      </el-col>
    </el-row>


    <!-- Edit Dialog-->
    <el-dialog title="审核" :visible.sync="editDialogVisible">
      <div>
        <el-form>
            <unit-engineering-info-check-dialog :unitEngineeringDialog="unitEngineeringForUpdateForm"
            ></unit-engineering-info-check-dialog>
        </el-form>
      </div>

      <div slot="footer">
            <el-button @click="rejectUnitEngineering">驳回</el-button>

            <el-button type="primary" @click="passUnitEngineering">通过</el-button>
        </div>
    </el-dialog>
    <!-- Edit Dialog Finished -->

    <!-- 调用子组件，为了利用ref来调用子组件中的方法，实际无显示效果 -->
    <msg-dialog ref="msgDialog"></msg-dialog>
  </div>
</template>
<script>
import msgDialog from '../common/msgDialog'
import unitEngineeringInfoCheckDialog from './unitEngineeringInfoCheckDialog'
import unitEngineeringCheckTable from './unitEngineeringCheckTable'
export default {
    data(){
      return {
        pageSize:5,
        currentPage:1,
        totalNum:100,
        checkedStatus:'',
        //用来显示表格中的数据
        unitEngineeringTableData: [],
        //增加用的对话框，初始为不显示
        addDialogVisible: false,
        //修改用，初始不显示对话框
        editDialogVisible: false,
        //提示信息框初始时不显示
        msgDialogVisible: false,
        //删除对话框初始时的显示控制
        delConfirmationDialogVisible: false,
        //控制重置密码提示框的显示，初始不显示
        resetPwdConfirmationDialogVisible: false,
        //定义添加和修改的对象初始值为空
        unitEngineeringForUpdateForm: {
          id:'',
          name: '', 
          constructionArea: '',
          undergroundNum: '', 
          overgroundNum: '', 
          engineeringCategory: '', 
          structureForm: '',
          checkedStatus:'',
          engineeringIndustrialization:{
            unitAssemblyRate:'',
            unitAssemblyRate: '',
            exteriorWallArea: '',
            wallShadowArea: '',
            conArea: '', 
            applicationStrutureType: '', 
            floorScope: '',
            frameworkShear:{
               columnFs:false,
               beamFs:false,
               floorFs:false,
               stairsFs:false,
               exteriorWallFs:false,
               interiorWallFs:false,
               integralKitchenFs:false,
               integralToiletFs:false,
               solarEnergyFs:false,

            }
          }
         },
        //定义当前行为空，当点击某行时，为本变量赋值
        tableSelectedRows: [],
        //定义当前是否选择多行，控制修改框中选择过多时提示信息的显示
        isMultiRowsSelected: false,
      }
    },
    methods: {
      handleSizeChange(newPageSize){
        this.pageSize=newPageSize;
        this.findAllUnitEngineerings();
      },
      handleCurrentChange(newPage){
        this.currentPage = newPage;
        this.findAllUnitEngineerings();
      },
      //选中行之后，触发本方法
      handleSelectionChange(selectedRows) {
        // console.log("啦啦啦啦")
        //取出选中行的所有信息，在判断选中情况、修改和删除时使用
        this.tableSelectedRows = selectedRows
      },
      //点击修改之后运行本方法
      showEditDialogVisible() {
        if (this.tableSelectedRows.length == 1) {
          this.editDialogVisible = true;
          this.unitEngineeringForUpdateForm.id = this.tableSelectedRows[0].id;
          this.unitEngineeringForUpdateForm.checkedStatus = this.tableSelectedRows[0].checkedStatus;
          this.unitEngineeringForUpdateForm.name = this.tableSelectedRows[0].name;
          this.unitEngineeringForUpdateForm.constructionArea = this.tableSelectedRows[0].constructionArea;
          this.unitEngineeringForUpdateForm.undergroundNum = this.tableSelectedRows[0].undergroundNum;
          this.unitEngineeringForUpdateForm.overgroundNum = this.tableSelectedRows[0].overgroundNum;
          this.unitEngineeringForUpdateForm.engineeringCategory = this.tableSelectedRows[0].engineeringCategory;
          this.unitEngineeringForUpdateForm.structureForm = this.tableSelectedRows[0].structureForm;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.unitAssemblyRate = this.tableSelectedRows[0].engineeringIndustrialization.unitAssemblyRate;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.exteriorWallArea = this.tableSelectedRows[0].engineeringIndustrialization.exteriorWallArea;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.wallShadowArea = this.tableSelectedRows[0].engineeringIndustrialization.wallShadowArea;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.conArea = this.tableSelectedRows[0].engineeringIndustrialization.conArea;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.applicationStructureType = this.tableSelectedRows[0].engineeringIndustrialization.applicationStructureType;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.floorScope = this.tableSelectedRows[0].engineeringIndustrialization.floorScope;

          this.unitEngineeringForUpdateForm.engineeringIndustrialization.frameworkShear.columnFs = this.tableSelectedRows[0].engineeringIndustrialization.frameworkShear.columnFs;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.frameworkShear.beamFs = this.tableSelectedRows[0].engineeringIndustrialization.frameworkShear.beamFs;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.frameworkShear.floorFs = this.tableSelectedRows[0].engineeringIndustrialization.frameworkShear.floorFs;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.frameworkShear.stairsFs = this.tableSelectedRows[0].engineeringIndustrialization.frameworkShear.stairsFs;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.frameworkShear.exteriorWallFs = this.tableSelectedRows[0].engineeringIndustrialization.frameworkShear.exteriorWallFs;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.frameworkShear.interiorWallFs = this.tableSelectedRows[0].engineeringIndustrialization.frameworkShear.interiorWallFs;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.frameworkShear.integralKitchenFs = this.tableSelectedRows[0].engineeringIndustrialization.frameworkShear.integralKitchenFs;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.frameworkShear.integralToiletFs = this.tableSelectedRows[0].engineeringIndustrialization.frameworkShear.integralToiletFs;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.frameworkShear.solarEnergyFs = this.tableSelectedRows[0].engineeringIndustrialization.frameworkShear.solarEnergyFs;
          console.log(this.unitEngineeringForUpdateForm.checkedStatus)
        
        } else if (this.tableSelectedRows.length == 0) {
          this.$refs.msgDialog.confirm("请至少选择一个企业进行修改！");
        } else {
          console.log(this.tableSelectedRows.length+"jijiji")
          this.$refs.msgDialog.confirm("仅可选择一个企业进行修改！")
        }
      },
      //点击确定进行修改保存
      passUnitEngineering() {
        console.log(this.unitEngineeringForUpdateForm.id)
        this.editDialogVisible = false;
        var url = this.HOST + "/checkUnitEngineering?id="+this.unitEngineeringForUpdateForm.id+"&checkedStatusId="+1
        this.$http.post(url).then(response => {
          this.findAllUnitEngineering();
          this.$refs.msgDialog.notify("审核通过")
        }).catch(error => {
          this.$refs.msgDialog.confirm("修改失败1")
        })
      },
      rejectUnitEngineering() {
        this.editDialogVisible = false;
        var url = this.HOST + "/checkUnitEngineering?id="+this.unitEngineeringForUpdateForm.id+"&checkedStatusId="+2
        this.$http.post(url).then(response => {
          this.findAllUnitEngineering();
          this.$refs.msgDialog.notify("修改重申")
        }).catch(error => {
          this.$refs.msgDialog.confirm("修改失败2")
        })
      },
      //查询所要显示的表格，或者刷新该表格使用
      findAllUnitEngineering() {
        var url = this.HOST + "/displayAllUnitEngineeringsByPro?id="+this.projectId+"&page="+this.currentPage+"&rows="+this.pageSize
        //初始显示表格用的查询数据
        //当前多少页 一页多少条
        this.$http.get(url).then(response => {
          this.unitEngineeringTableData = response.data.rows;
          this.totalNum = response.data.total;
        }).catch(error => {
          this.$refs.msgDialog.confirm("查询失败")
        })
      },
      findAllUnitEngineerings(ref) {
        var url = this.HOST + "/displayAllUnitEngineeringsByPro?id="+ref.id+"&page="+this.currentPage+"&rows="+this.pageSize
        //初始显示表格用的查询数据
        //当前多少页 一页多少条
        this.$http.get(url).then(response => {
          this.unitEngineeringTableData = response.data.rows;
          this.totalNum = response.data.total;
        }).catch(error => {
          this.$refs.msgDialog.confirm("查询失败")
        })
      }
    },
    props:{
      projectId:{
        type: String,
        required: true
      },
    },
    created() {
      this.findAllUnitEngineerings()
    },
    components: {
      msgDialog,
      unitEngineeringInfoCheckDialog,
      unitEngineeringCheckTable
    }
}
</script>