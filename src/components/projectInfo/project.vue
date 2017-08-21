<template>
<div id="projectInfo">
   <div>
     <el-row :gutter="8">
     <!-- 第一列 -->
      <el-col :span="8">
        <el-row>
          <el-col :span="24">
<<<<<<< HEAD
            <el-collapse>
                <el-collapse-item title="开工起止时间" name="1">
                    <div>
                    <el-date-picker
                    v-model="queryStartingTime"
                    type="daterange"
                    placeholder="选择日期范围">
                  </el-date-picker>        
                  <el-button type="text" :plain="true" @click="findByStartingTime">查询</el-button>
                  </div>
                </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
=======
>>>>>>> b6e4c6efb23cfe5af7652fccc1575daec13f7e69
            <!-- 企业账号维护（设计单位） -->
            <project-information-table 
            :projectTableData="projectTableData"
            @clickRow="clickRow"
            @handleSelectionChange="handleSelectionChange"></project-information-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageSize"
                  layout="total,sizes,prev,pager,next,jumper"
                  :total="totalNum">
              </el-pagination>
          </el-col>
      </el-row>
    </el-col>
   <!--  第二列 -->
    <el-col :span="16">
        <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="项目基本信息" 
            name="projectInfo">
                <project-info @findAllProjectsByRealEstateEn="findAllProjectsByRealEstateEn" :projectId="clickRowId" ref="findProjectInfo">
                </project-info>
            </el-tab-pane>

            <el-tab-pane label="项目单位工程信息" 
            name="unitEngineeringInfo">
                <unit-engineering-info :projectId="clickRowId" ref="findAllUnitEngineerings">
                </unit-engineering-info>
            </el-tab-pane>
        </el-tabs>
    </el-col>
</el-row>
<!-- 调用子组件，为了利用ref来调用子组件中的方法，实际无显示效果 -->
  <msg-dialog ref="msgDialog"></msg-dialog>
  </div>
</div>
</template>
<script>
<<<<<<< HEAD
import projectInformationTable from './projectInformationTable'
import msgDialog from '../common/msgDialog'
import projectInfo from './projectInfo'
import unitEngineeringInfo from './unitEngineeringInfo'
  export default {
    data: function() {
      return {
        queryStartingTime:'',
=======
  import projectInformationTable from './projectInformationTable'
  import msgDialog from '../common/msgDialog'
  import projectInfo from './projectInfo'
  import unitEngineeringInfo from './unitEngineeringInfo'
  export default {
    data: function() {
      return {
>>>>>>> b6e4c6efb23cfe5af7652fccc1575daec13f7e69
        pageSize:5,
        currentPage:1,
        totalNum:'',
        clickRowId:'1',
        //用来显示表格中的数据
        projectTableData: [],
        //提示信息框初始时不显示
        msgDialogVisible: false,
        //定义当前行为空，当点击某行时，为本变量赋值
        tableSelectedRows: [] 
        }
      },
      methods: {
<<<<<<< HEAD
        findByStartingTime(){
          this.$http.get(this.HOST + "/queryProjectByRealEstateEn?startTime="+this.queryStartingTime[0]+"&endTime="+this.queryStartingTime[1]+"&page="+this.currentPage+"&rows="+this.pageSize).then(response => {
          this.projectTableData = response.data.rows;
          this.totalNum = response.data.total;
          }).catch(error => {
          this.$refs.msgDialog.confirm("查询失败")
          })

        },
=======
>>>>>>> b6e4c6efb23cfe5af7652fccc1575daec13f7e69
        handleSizeChange(row){

        },
        handleCurrentChange(row){

        },
       handleSizeChange(selectedRows) {
        this.tableSelectedRows = selectedRows
       },
       clickRow(selectedRow) {
        this.clickRowId = selectedRow.id
        this.$refs.findAllUnitEngineerings.findAllUnitEngineerings()
        this.$refs.findProjectInfo.findCurrentProjectInfo()
       },
       handleSelectionChange(selectedRows) {
        this.tableSelectedRows = selectedRows
       },
       handleSelectionChange(selectedRows) {
        this.tableSelectedRows = selectedRows
       },
      findAllProjectsByRealEstateEn(){
        this.$http.get(this.HOST + "/displayAllProjectByRealEstateEns?page="+this.currentPage+"&rows="+this.pageSize).then(response => {
          this.projectTableData = response.data.rows;
          this.totalNum = response.data.total;
        }).catch(error => {
          this.$refs.msgDialog.confirm("查询失败")
        })
      }

    },
    created() {
      this.findAllProjectsByRealEstateEn()
    },
    components: {
      msgDialog,
      projectInformationTable,
      unitEngineeringInfo,
      projectInfo
    }
  }

</script>
