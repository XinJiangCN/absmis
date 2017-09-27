<template>
<div id="projectCheck">
   <div>
     <el-row :gutter="8">
     <!-- 第一列 -->
      <el-col :span="8">
        <el-row>
          <el-col :span="24">
          <queryStartingTime :queryStartingTime="queryStartingTime" @findByStartingTime="findByStartingTime"> 
           </queryStartingTime>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <!-- 企业账号维护（设计单位） -->
            <project-info-check-table 
            :projectTableData="projectTableData"
            @clickRow="clickRow"
            ></project-info-check-table>
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
            <el-tab-pane label="项目基本信息审核" 
            name="projectInfoCheck">
                <project-info-check :projectId="clickRowId" ref="findProjectInfo">
                </project-info-check>
            </el-tab-pane>

            <el-tab-pane label="项目单位工程信息审核" 
            name="unitEngineeringInfoCheck">
                <unit-engineering-info-check :projectId="clickRowId" ref="findAllUnitEngineerings">
                </unit-engineering-info-check>
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
  import unitEngineeringInfoCheck from './unitEngineeringInfoCheck'
  import moment from 'moment'
  import projectInfoCheckTable from './projectInfoCheckTable'
  import msgDialog from '../common/msgDialog'
  import projectInfoCheck from './projectInfoCheck'
  export default {
    data: function() {
      return {
        pageSize:5,
        currentPage:1,
        queryStartingTime:'',
        totalNum:100,
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
         findByStartingTime(param){
            this.queryStartingTime = param
            this.$http.get(this.HOST + "/queryProject?startTime="+this.smallFormat(this.queryStartingTime[0])+"&endTime="+this.smallFormat(this.queryStartingTime[1])+"&page="+this.currentPage+"&rows="+this.pageSize).then(response => {
            this.projectTableData = response.data.rows;
            this.totalNum = response.data.total;
            }).catch(error => {
            this.$refs.msgDialog.confirm("查询失败")
            })
        },
        smallFormat(data){
            return moment(data).format("YYYY-MM-DD")
        },
       handleCurrentChange(currentPage){
          this.currentPage = currentPage
          this.findAllProjects()
        },
       handleSizeChange(currentSize) {
        this.pageSize = currentSize
        this.findAllProjects()
       },
       clickRow(selectedRow) {
        this.clickRowId = selectedRow.id
        this.$refs.findAllUnitEngineerings.findAllUnitEngineerings(selectedRow)
        this.$refs.findProjectInfo.findCurrentProjectInfo(selectedRow)
         this.$refs.findProjectInfo.findStructureForm(selectedRow)
       },
       handleSelectionChange(selectedRows) {
        this.tableSelectedRows = selectedRows
       },
       handleSelectionChange(selectedRows) {
        this.tableSelectedRows = selectedRows
       },
      findAllProjects(){
        this.$http.get(this.HOST + "/displayAllProjects?page="+this.currentPage+"&rows="+this.pageSize).then(response => {
          this.projectTableData = response.data.rows;
          this.totalNum = response.data.total;
        }).catch(error => {
          this.$refs.msgDialog.confirm("查询失败")
        })
      }

    },
    created() {
      this.findAllProjects()
    },
    components: {
      msgDialog,
      unitEngineeringInfoCheck,
      projectInfoCheckTable,
      projectInfoCheck
    }
  }
</script>
