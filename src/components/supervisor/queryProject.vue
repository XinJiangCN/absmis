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
            @handleSelectionChange="handleSelectionChange"></project-info-check-table>
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
                <project-info-check-panel
                :projectForm="projectForm"></project-info-check-panel> 
            </el-tab-pane>

            <el-tab-pane label="项目单位工程信息审核" 
            name="unitEngineeringInfoCheck">
              <el-row>
                  <unitEngineering-information-table 
                  :unitEngineeringTableData="unitEngineeringTableData"
                  @handleSelectionChange="handleSelectionChange">
                  </unitEngineering-information-table>
              </el-row>
              <el-row>
                  <el-col :span="24">
                      <el-pagination
                          @size-change="handleSizeChangeU"
                          @current-change="handleCurrentChangeU"
                          :current-page="currentPageU"
                          :page-sizes="[5, 10, 15, 20]"
                          :page-size="pageSizeU"
                          layout="total,sizes,prev,pager,next,jumper"
                          :total="totalNumU">
                      </el-pagination>
                  </el-col>
              </el-row>
                
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
        pageSizeU:5,
        currentPageU:1,
        queryStartingTime:'',
        totalNum:100,
        totalNumU:100,
        clickRowId:'1',
        projectId:'',
        unitEngineeringTableData: [],
        //用来显示表格中的数据
        projectTableData: [],
        //提示信息框初始时不显示
        msgDialogVisible: false,
        //定义当前行为空，当点击某行时，为本变量赋值
        tableSelectedRows: [],
        projectForm: {
          id:'',
          checkedStatus:{
            id:'',
            state:''
          },
          name: '',
          startingTime:'',
          fillTime:'',
          site:'',
          licenseNo:'',
          unitEngineeringNum:'',
          totalConstructionArea:'',
          overgroundConstructionArea:'',
          builder:'',
          designer:'',
          construction:'',
          projectCategory:'',
          projectState:'',
          schedule:{
            startTime:'',
            endTime:'',
            landUseRightStart:'',
            landUseRightEnd:'',
            constructionLicenseStart:'',
            constructionLicenseEnd:'',
            engineeringLicenseStart:'',
            engineeringLicenseEnd:'',
            tenderStart:'',
            tenderEnd:'',
            comprehensiveInspectionAndAcceptanceStart:'',
            comprehensiveInspectionAndAcceptanceEnd:'',
            deliveryStart:'',
            deliveryEnd:'',
            constructionDrawingStart:'',
            constructionDrawingEnd:''
          },
          projectIndustrialization:{
            industrializedTechnologyArea:'',
            industrializedTechnologyAreaRatio:'',
            unitAssemblyRate:'',
            wall:'',
            wallShadowArea:'',
            constructionArea:'',
            applicationTechnology:{
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
               },
               frameworkCore:{
                 columnFc:false,
                 beamFc:false,
                 floorFc:false,
                 stairsFc:false,
                 exteriorWallFc:false,
                 interiorWallFc:false,
                 integralKitchenFc:false,
                 integralToiletFc:false,
                 solarEnergyFc:false
               },
               shearWall:{
                 floorSw:false,
                 stairsSw:false,
                 exteriorWallSw:false,
                 interiorWallSw:false,
                 integralKitchenSw:false,
                 integralToiletSw:false,
                 solarEnergySw:false
               }
            }
          }
        },

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
        this.pageSize= currentSize
        this.findAllProjects()
       },
       handleCurrentChangeU(currentPage){
          this.currentPageU = currentPage
          this.findAllUnitEngineerings()
        },
       handleSizeChangeU(currentSize) {
        this.pageSizeU = currentSize
        this.findAllUnitEngineerings()
       },
       clickRow(selectedRow) {
        this.clickRowId = selectedRow.id
        this.projectId = selectedRow.id
        this.findCurrentProjectInfo()
        this.findAllUnitEngineerings()
       },
       handleSelectionChange(selectedRows) {
        this.tableSelectedRows = selectedRows
       },
       handleSelectionChange(selectedRows) {
        this.tableSelectedRows = selectedRows
       },
      findCurrentProjectInfo(){
        console.log("log"+this.projectId)
        this.$http.get(this.HOST + "/findProjectInfoById?id="+this.projectId).then(response => {
              this.projectForm = response.data
              console.log("啦啦啦啦")
              console.log(this.projectForm)
            }).catch(error => {
              this.$refs.msgDialog.confirm("查询失败la")
            })

      },
       //查询所要显示的表格，或者刷新该表格使用
      findAllUnitEngineerings() {
        var url = this.HOST + "/displayAllUnitEngineeringsByPro?id="+this.projectId+"&page="+this.currentPageU+"&rows="+this.pageSizeU
        //初始显示表格用的查询数据
        //当前多少页 一页多少条
        this.$http.get(url).then(response => {
          this.unitEngineeringTableData = response.data.rows;
          this.totalNumU = response.data.total;
        }).catch(error => {
          this.$refs.msgDialog.confirm("查询失败")
        })
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
      queryStartingTime,
      projectInfoCheckTable,
      projectInfoCheckPanel,
      unitEngineeringInformationTable
    }
  }
</script>
