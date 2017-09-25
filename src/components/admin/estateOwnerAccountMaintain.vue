<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-input
          placeholder="请输入要查询的内容"
          icon="search"
          v-model="searchContent">
        </el-input>
      </el-col>

      <el-col :span="3">
        <el-button @click="handleSearch"
        >查询
        </el-button>
      </el-col>
      <!-- 每行分为24栏（固定），span设置该列占有5栏 -->
      <el-col :span="4">
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

      <el-col :span="4">
        <el-button @click="resetPwdConfirmation">重置密码
        </el-button>
      </el-col>
    </el-row>

    <el-row type="flex">
      <el-col :span="15">
        <!-- 企业账号维护（设计单位） -->
        <enterprise-information-table 
            :enterpriseTableData="estateOwnerTableData"
            @handleSelectionChange="handleSelectionChange"></enterprise-information-table>
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
        <enterprise-information
          :enterprise="enterpriseForAddForm"
        ></enterprise-information>
      </el-form>

      <div slot="footer">
            <el-button @click="enterpriseForAddForm={}">清 空</el-button>

            <el-button @click="cancelAdd">取 消</el-button>

            <el-button type="primary" @click="submitAddForm">确 定</el-button>
        </div>
    </el-dialog>
    <!-- Add Dialog Finished-->

    <!-- Edit Dialog-->
    <el-dialog title="修改" :visible.sync="editDialogVisible">
      <div>
        <enterprise-information
          :enterprise="enterpriseForUpdateForm"
        ></enterprise-information>
      </div>

      <div slot="footer">
            <el-button 
                @click="enterpriseForUpdateForm={name:'',username:''}"
            >清 空</el-button>

            <el-button @click="editDialogVisible=false">取 消</el-button>

            <el-button type="primary" @click="submitUpdateForm">提 交</el-button>
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

        <el-button type="primary" @click="deleteEnterprise">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Delete Dialog Finished -->

    <!-- Reset Password Dialog-->
    <el-dialog title="重置密码" :visible.sync="resetPwdConfirmationDialogVisible">

      <el-form>
        <label>您确定重置此用户的密码吗？</label>
      </el-form>
      <div slot="footer">
        <el-button @click="resetPwdConfirmationDialogVisible = false"> 取 消
        </el-button>

        <el-button type="primary" @click="handleResetPwd"> 确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- Edit Dialog Finished -->

    <!-- 调用子组件，为了利用ref来调用子组件中的方法，实际无显示效果 -->
    <msg-dialog ref="msgDialog"></msg-dialog>
  </div>
</template>

<script>
  import enterpriseInformation from './enterpriseInformation'
  import msgDialog from '../common/msgDialog'
  import enterpriseInformationTable from '../bizCommon/enterpriseInformationTable'

  export default {
    data() {
      return {
        pageSize:5,
        currentPage:1,
        totalNum:0,
        //用来显示表格中的数据
        estateOwnerTableData: [],
        //用来绑定搜索框中的内容
        searchContent: '',
        searchContentFinal:'',
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
        enterpriseForAddForm: {name: '', username: '',password:''},
        enterpriseForUpdateForm: {name: '', username: ''},
        //定义当前行为空，当点击某行时，为本变量赋值
        tableSelectedRows: [],
        //定义当前是否选择多行，控制修改框中选择过多时提示信息的显示
        isMultiRowsSelected: false,
        //定义数组，在删除时使用
        ids: []
      }
    },
    methods: {
      handleSizeChange(newPageSize){
        this.pageSize=newPageSize;
        this.findAllEstateOwners();
      },
      handleCurrentChange(newPage){
        this.currentPage = newPage;
        this.findAllEstateOwners();
      },
      handleSearch() {
        this.searchContentFinal = this.searchContent
        this.findAllEstateOwners()
      },
      //选中行之后，触发本方法
      handleSelectionChange(selectedRows) {
        //取出选中行的所有信息，在判断选中情况、修改和删除时使用
        this.tableSelectedRows = selectedRows
      },
      //点击修改之后运行本方法
      showEditDialogVisible() {
        if (this.tableSelectedRows.length == 1) {
          this.editDialogVisible = true;
          this.enterpriseForUpdate=this.tableSelectedRows[0]
          //将选中行的具体信息提取出来，修改时用于绑定
          this.enterpriseForUpdateForm.name = this.tableSelectedRows[0].name
          this.enterpriseForUpdateForm.username = this.tableSelectedRows[0].username
        } else if (this.tableSelectedRows.length == 0) {
          this.$refs.msgDialog.confirm("请至少选择一个企业进行修改！");
        } else {
          this.$refs.msgDialog.confirm("仅可选择一个企业进行修改！")
        }
      },
      //点击确定进行添加保存
      submitAddForm() {
        if(!this.enterpriseForAddForm.username||!this.enterpriseForAddForm.name){
          this.$refs.msgDialog.confirm("用户民和企业名称均不能为空")
        }else{
          this.addDialogVisible = false;
          this.enterpriseForAddForm.password = this.enterpriseForAddForm.username
          var url = this.HOST + "/addEstateOwner"
          this.$http.post(url, this.enterpriseForAddForm).then(response => {
            this.findAllEstateOwners();
            this.$refs.msgDialog.notify("添加成功")
          }).catch(error => {
            this.$refs.msgDialog.confirm("添加失败")
          })
          this.enterpriseForAddForm = {}
        }
      },
      //点击确定进行修改保存
      submitUpdateForm() {
        if(!this.enterpriseForUpdateForm.username||!this.enterpriseForUpdateForm.name){
          this.$refs.msgDialog.confirm("用户民和企业名称均不能为空")
        }else{
          this.editDialogVisible = false;
          this.enterpriseForUpdate.name=this.enterpriseForUpdateForm.name
          this.enterpriseForUpdate.username=this.enterpriseForUpdateForm.username
          var url = this.HOST + "/updateEstateOwner"
          this.$http.put(url, this.enterpriseForUpdate).then(response => {
            this.findAllEstateOwners();
            this.$refs.msgDialog.notify("修改成功")
          }).catch(error => {
            this.$refs.msgDialog.confirm("修改失败")
          })
        }
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
      deleteEnterprise() {
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
        var url = this.HOST + "/deleteEstateOwners?ids=" + this.ids
        this.$http.delete(url).then(response => {
          this.findAllEstateOwners();
          this.$refs.msgDialog.notify("删除成功")
        }).catch(response => {
          this.$refs.msgDialog.confirm("删除失败")
        })
      },
      //点击重置密码时运行本方法
      resetPwdConfirmation() {
        if (this.tableSelectedRows.length == 1) {
          this.resetPwdConfirmationDialogVisible = true
        } else if (this.tableSelectedRows == 0) {
          this.$refs.msgDialog.confirm("至少选择一个企业进行操作")
        } else {
          this.$refs.msgDialog.confirm("仅能选择一个企业进行操作")
        }
      },
      //进行密码重置
       handleResetPwd: function() {
          this.resetPwdConfirmationDialogVisible=false
          var url = this.HOST + "/resetPsd?id="+this.tableSelectedRows[0].id
          this.$http.post(url).then(response=>{
              this.$refs.msgDialog.notify(response.data.username +"的密码已经重置为用户名")
              this.findAllEstateOwners()
          }).catch(response=>{
              this.$refs.msgDialog.confirm("重置失败！")
          })
      },
      //当点击取消时运行
      cancelAdd() {
        //关闭添加对话框，并清空对话框中的内容
        this.addDialogVisible = false;
        this.enterpriseForAddForm = {name: '', username: ''}
      },
      //查询所要显示的表格，或者刷新该表格使用
      findAllEstateOwners() {
        var url = this.HOST + "/queryEstateOwnerByName?nameQuery="+this.searchContentFinal+"&page="+this.currentPage+"&rows="+this.pageSize
        //初始显示表格用的查询数据
        //当前多少页 一页多少条
        this.$http.get(url).then(response =>{
          this.estateOwnerTableData = response.data.rows;
          this.totalNum = response.data.total;
        }).catch(error => {
          this.$refs.msgDialog.confirm("查询失败")
        })
      }
    },
    //页面加载时运行
    created() {
      this.findAllEstateOwners()
    },
    components: {
      enterpriseInformation,
      msgDialog,
      enterpriseInformationTable
    }
  }
</script>
