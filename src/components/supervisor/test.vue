<template>
<div id="projectCheck">
   <div>
     <el-row :gutter="8">
     <!-- 第一列 -->
      <el-col :span="8">
        <el-row>
          <el-col :span="24">
            <!-- 企业账号维护（设计单位） -->
            <el-table
                :data="projectCategorys"
                border
                stripe
                tooltip-effect="dark"
                style="width:63%"
                highlight-current-row
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="描述"
                  prop="description"
                  width="180"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="编号"
                   width="180"
                  prop="no"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
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
</el-row>
<!-- 调用子组件，为了利用ref来调用子组件中的方法，实际无显示效果 -->

  <msg-dialog ref="msgDialog"></msg-dialog>
  </div>
</div>
</template>
<script>
  import moment from 'moment'
  import projectInfoCheckTable from '../projectCheck/projectInfoCheckTable'
  import  queryStartingTime from '../projectInfo/queryStartingTime'
  import  msgDialog from '../common/msgDialog'
  import unitEngineeringInformationTable from '../projectInfo/unitEngineeringInformationTable'
  import projectInfoCheckPanel from '../projectCheck/projectInfoCheckPanel'
  export default {
    data: function() {
      return {
        pageSize:5,
        currentPage:1,
        totalNum:'',
        projectCategorys: [],
        //用来显示表格中的数据
        //提示信息框初始时不显示
      }
    },
    methods: {
      handleCurrentChange(currentPage){
          this.currentPage = currentPage
          this.findAllProjectCategorys()
        },
       handleSizeChange(currentSize) {
        this.pageSize = currentSize
        this.findAllProjectCategorys()
       },
        findAllProjectCategorys() {
            this.$http.get(this.HOST + "/testPage?page="+this.currentPage+"&rows="+this.pageSize).then(response => {
              this.projectCategorys = response.data.applicationStructureType;
              this.totalNum = response.data.total;
              console.log(this.totalNum+"size")
            }).catch(error => {
              this.$refs.msgDialog.confirm("查询失败")
            })
        }
    },
    created() {
      this.findAllProjectCategorys()
      
    },
    components: {
      msgDialog,
      queryStartingTime,
      projectInfoCheckTable,
      projectInfoCheckPanel,
      unitEngineeringInformationTable
    }
  }
</script>
