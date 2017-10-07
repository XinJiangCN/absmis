<template>
  <div>
    <el-row>
      <!-- 每行分为24栏（固定），span设置该列占有5栏 -->
      <el-col :span="8">
        <!-- 增删改按钮 -->
        <el-button-group>
          <el-button type="primary" icon="plus" @click="addDialogVisible=true">
          </el-button>

          <el-button type="primary" icon="edit" @click="showEditDialogVisible">
          </el-button>

          <el-button type="primary" icon="delete" @click="delConfirmation">
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <el-row type="flex">	
      <el-col :span="20">
        <!-- 企业账号维护（设计单位） -->
        <unitEngineering-information-table 
            :unitEngineeringTableData="unitEngineeringTableData"
            @handleSelectionChange="handleSelectionChange"></unitEngineering-information-table>
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

    <!-- Add Dialog -->
    <el-dialog title="添加" :visible.sync="addDialogVisible">
      <el-form>
        <unitEngineering-info-add-dialog
          :unitEngineeringDialog="unitEngineeringForAddForm"
        ref="unitEngineeringAdd" @submitAddForm="submitAddForm"></unitEngineering-info-add-dialog>
      </el-form>

      <div slot="footer">
            <el-button @click="cancelAdd">取 消</el-button>

            <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Add Dialog Finished-->

    <!-- Edit Dialog-->
    <el-dialog title="修改" :visible.sync="editDialogVisible">
      <div>
        <unitEngineering-info-edit-dialog
          :unitEngineeringDialog="unitEngineeringForUpdateForm"
        @submitUpdateForm="submitUpdateForm"ref="unitEngineeringUpdate"></unitEngineering-info-edit-dialog>
      </div>

      <div slot="footer">
            <el-button @click="editDialogVisible=false">取 消</el-button>

            <el-button type="primary" @click="submitUpdate">提 交</el-button>
        </div>
    </el-dialog>
    <!-- Edit Dialog Finished -->

    <!-- Delete Dialog-->
    <el-dialog title="删除" :visible.sync="delConfirmationDialogVisible">
      <el-row>
        <div>
          <label>确认删除以下企业吗？</label>
          <!-- 换行 -->
          <el-row>{{ }}</el-row>
          <el-row>
            <label v-for="row in tableSelectedRows">
              <el-row></el-row>
              {{row.name}}
            </label>
          </el-row>
        </div>
      </el-row>
      <div slot="footer">
        <el-button @click="delConfirmationDialogVisible = false">取 消</el-button>

        <el-button type="primary" @click="deleteUnitEngineering">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Delete Dialog Finished -->

    <!-- 调用子组件，为了利用ref来调用子组件中的方法，实际无显示效果 -->
    <msg-dialog ref="msgDialog"></msg-dialog>
  </div>
</template>
<script>
 import unitEngineeringInfoEditDialog from './unitEngineeringInfoEditDialog'
  import unitEngineeringInfoAddDialog from './unitEngineeringInfoAddDialog'
  import moment from 'moment'
 import msgDialog from '../common/msgDialog'
 import unitEngineeringInformationTable from './unitEngineeringInformationTable'
  export default{
    data(){
      return {
        pageSize:5,
        currentPage:1,
        totalNum:100,
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
        unitEngineeringForAddForm: {
          name: '', 
          startingTime:'',
          constructionArea: '',
          undergroundNum: '', 
          overgroundNum: '', 
          engineeringCategory: '', 
          structureForm:'',
          engineeringIndustrialization:{
            unitAssemblyRate:'',
            unitAssemblyRate: '',
            exteriorWallArea: '',
            wallShadowArea: '',
            conArea: '', 
            applicationStrutureType:'', 
            floorScope: '',
            frameworkShear: {
               columnFs:false,
               beamFs:false,
               floorFs:false,
               stairsFs:false,
               exteriorWallFs:false,
               interiorWallFs:false,
               integralKitchenFs:false,
               integralToiletFs:false,
               solarEnergyFs:false

            }
          }
        },
        unitEngineeringForUpdateForm: {
          id:'',
          name: '', 
          startingTime:'',
          constructionArea: '',
          undergroundNum: '', 
          overgroundNum: '', 
          engineeringCategory: '', 
          structureForm: {
             id:'',
            description:''
          },
          engineeringIndustrialization:{
            unitAssemblyRate:'',
            unitAssemblyRate: '',
            exteriorWallArea: '',
            wallShadowArea: '',
            conArea: '', 
            applicationStrutureType: {
               id:'',
               description:''
            }, 
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
        //定义数组，在删除时使用
        ids: []
      }
    },
    props:{
      projectId:{
        type: Number,
        required: true
      },
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
        //取出选中行的所有信息，在判断选中情况、修改和删除时使用
        this.tableSelectedRows = selectedRows
      },
      getRowInfo(){
        this.editDialogVisible = true;
          //将选中行的具体信息提取出来，修改时用于绑定
          this.unitEngineeringForUpdateForm.id = this.tableSelectedRows[0].id;
          // this.unitEngineeringForUpdateForm.checkedStatus = this.tableSelectedRows[0].checkedStatus;
          // this.unitEngineeringForUpdateForm.checkedStatus.id = this.tableSelectedRows[0].checkedStatus.id;
          this.unitEngineeringForUpdateForm.name = this.tableSelectedRows[0].name;
          this.unitEngineeringForUpdateForm.startingTime = this.tableSelectedRows[0].startingTime;
          this.unitEngineeringForUpdateForm.constructionArea = this.tableSelectedRows[0].constructionArea;
          this.unitEngineeringForUpdateForm.undergroundNum = this.tableSelectedRows[0].undergroundNum;
          this.unitEngineeringForUpdateForm.overgroundNum = this.tableSelectedRows[0].overgroundNum;
          this.unitEngineeringForUpdateForm.engineeringCategory = this.tableSelectedRows[0].engineeringCategory;
          this.unitEngineeringForUpdateForm.structureForm = this.tableSelectedRows[0].structureForm;
          this.unitEngineeringForUpdateForm.structureForm.id = this.tableSelectedRows[0].structureForm.id;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.unitAssemblyRate = this.tableSelectedRows[0].engineeringIndustrialization.unitAssemblyRate;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.exteriorWallArea = this.tableSelectedRows[0].engineeringIndustrialization.exteriorWallArea;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.wallShadowArea = this.tableSelectedRows[0].engineeringIndustrialization.wallShadowArea;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.conArea = this.tableSelectedRows[0].engineeringIndustrialization.conArea;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.applicationStructureType = this.tableSelectedRows[0].engineeringIndustrialization.applicationStructureType;
          this.unitEngineeringForUpdateForm.engineeringIndustrialization.applicationStructureType.id = this.tableSelectedRows[0].engineeringIndustrialization.applicationStructureType.id;
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


      },
      //点击修改之后运行本方法
      showEditDialogVisible() {
        console.log(this.tableSelectedRows[0].checkedStatus)
        console.log(this.tableSelectedRows)
        if (this.tableSelectedRows.length == 1) {
          if(this.tableSelectedRows[0].checkedStatus==null){
            this.getRowInfo()
          }else{
            if(this.tableSelectedRows[0].checkedStatus.id==1){
                this.$refs.msgDialog.confirm("审核通过不能修改！")
            }else{
                this.getRowInfo()
            }
            
          }
        } else if (this.tableSelectedRows.length == 0) {
          this.$refs.msgDialog.confirm("请至少选择一个企业进行修改！");
        } else {
          this.$refs.msgDialog.confirm("仅可选择一个企业进行修改！")
        }
      },
      //点击确定进行添加保存
      submit(){
           this.$refs.unitEngineeringAdd.check();
      },
      smallFormat(data){
            return moment(data).format("YYYY-MM-DD")
      },
      submitAddForm() {
        this.addDialogVisible = false;
        this.unitEngineeringForAddForm.startingTime =  this.smallFormat(this.unitEngineeringForAddForm.startingTime)
        var url = this.HOST + "/addUnitEngineering?projectId="+this.projectId
        this.$http.post(url, this.unitEngineeringForAddForm).then(response => {
          this.findAllUnitEngineering();
          this.$refs.msgDialog.notify("添加成功")
        }).catch(error => {
          this.$refs.msgDialog.confirm("添加失败")
        })
         this.unitEngineeringForAddForm = {
          name: '',
          startingTime:'', 
          constructionArea: '',
          undergroundNum: '', 
          overgroundNum: '', 
          engineeringCategory: '', 
          structureForm:'',
          engineeringIndustrialization:{
            unitAssemblyRate:'',
            unitAssemblyRate: '',
            exteriorWallArea: '',
            wallShadowArea: '',
            conArea: '', 
            applicationStrutureType:{
              id:'',
              description:''
            }, 
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
               solarEnergyFs:false

            }
          }
        }
      },
      //点击确定进行修改保存
      submitUpdate(){
           this.$refs.unitEngineeringUpdate.check();
      },
      submitUpdateForm() {
        this.unitEngineeringForUpdateForm.startingTime =  this.smallFormat(this.unitEngineeringForUpdateForm.startingTime)
        this.editDialogVisible = false;
        var url = this.HOST + "/updateUnitEngineering?projectId="+this.projectId
        this.$http.put(url, this.unitEngineeringForUpdateForm).then(response => {
          this.findAllUnitEngineering();
          this.$refs.msgDialog.notify("修改成功")
        }).catch(error => {
          this.$refs.msgDialog.confirm("修改失败")
        })
      },
      //点击删除时运行本方法
      delConfirmation() {
        if (this.tableSelectedRows.length == 0) {
          this.$refs.msgDialog.confirm("请至少选择一个企业进行删除！")
        } else {
          this.delConfirmationDialogVisible = true
        }
      },
      //删除时使用，用来获取多选的所有行的id,并调用删除方法进行删除
      deleteUnitEngineering() {
        this.delConfirmationDialogVisible = false
        var i = 0;
        this.tableSelectedRows.forEach(item => {
          this.ids[i] = item.id;
          i = i + 1
        });
        this.delRecord()
      },
      //删除企业信息
      delRecord() {
        var url = this.HOST + "/deleteUnitEngineerings?ids=" + this.ids
        this.$http.delete(url).then(response => {
          this.findAllUnitEngineering();
          this.$refs.msgDialog.notify("删除成功")
        }).catch(response => {
          this.$refs.msgDialog.confirm("删除失败")
        })
      },
      //当点击取消时运行
      cancelAdd() {
        //关闭添加对话框，并清空对话框中的内容
        this.addDialogVisible = false;
        this.unitEngineeringForAddForm = {
          name: '', 
          startingTime:'',
          constructionArea: '',
          undergroundNum: '', 
          overgroundNum: '', 
          engineeringCategory: '', 
          structureForm:'',
          engineeringIndustrialization:{
            unitAssemblyRate:'',
            unitAssemblyRate: '',
            exteriorWallArea: '',
            wallShadowArea: '',
            conArea: '', 
            applicationStrutureType:{
              id:'',
              description:''
            }, 
            floorScope: '',
            frameworkShear: {
               columnFs:false,
               beamFs:false,
               floorFs:false,
               stairsFs:false,
               exteriorWallFs:false,
               interiorWallFs:false,
               integralKitchenFs:false,
               integralToiletFs:false,
               solarEnergyFs:false

            }
          }
        }
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
        console.log(JSON.stringify(ref)+"ref")
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
    created() {
      this.findAllUnitEngineerings()
    },
    components: {
      unitEngineeringInfoEditDialog,
      unitEngineeringInfoAddDialog,
      msgDialog,
      unitEngineeringInformationTable
    }
  }
</script>