<template>
<div id='accountMaintain'>
    <el-row>
    <el-col :span="5">
    <el-input
    placeholder="请输入要查询的内容"
    icon="search"
    v-model="searchContent"
    >
    </el-input>
    </el-col>
    <el-col :span=5>
    <el-button 
    @click="handleSearch"
    >查询</el-button>
    </el-col>
    </el-row>
    <el-row type="flex" >
    <el-col :span="5">



    <!-- 增删改按钮 -->
    <el-button-group>
    <el-button type="primary" icon="plus" @click="addDialogVisible=true">
    </el-button>
    <el-button type="primary" icon="edit" @click="editDialogVisible=true">
    </el-button>
    <el-button type="primary" icon="delete" @click="delDialogVisible=true">
    </el-button>
    </el-button-group>
    </el-col>




    <el-col :span="5">
    <el-button @click="resetPasswdDialogvisible = true">重置密码</el-button>
    </el-col>
    </el-row>
    <el-row type="flex">
    <el-col :span="15">



<!-- show table data -->
    <el-table
    ref="designCompanyTable"
    :data="tableData"
    border
    tooltip-effect="dark"
    style="width: 100%"
    highlight-current-row
    @selection-change="handleSelectionChange">
    <el-table-column
    type="selection"
    width="55">
    </el-table-column>
    <el-table-column
    prop="name"
    label="企业名称"
    width="120">
    </el-table-column>

    <el-table-column
    prop="username"
    label="用户名"
    show-overflow-tooltip>
    </el-table-column>

    <el-table-column
    prop="cumulant"
    label="累计装配式建筑"
    show-overflow-tooltip>
    </el-table-column>

    <el-table-column
    prop="qualificationNo"
    label="资质编号"
    show-overflow-tooltip>
    </el-table-column>

    <el-table-column
    prop="designerCertification.description"
    label="资质"
    show-overflow-tooltip>
    </el-table-column>
    </el-table>

    </el-col>
    </el-row>

    <!-- Add Dialog -->
    <el-dialog title="添加" :visible.sync="addDialogVisible">
    <el-form :model="addForm">
    <el-form-item label="企业名称">
    <el-input v-model="addForm.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户名">
    <el-input v-model="addForm.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="累计装配式建筑">
    <el-input v-model="addForm.cumulant" auto-complete="off"></el-input>     
    </el-form-item>
    <el-form-item label="资质编号" >
    <el-input v-model="addForm.qualificationNo" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="资质" >
    <el-select v-model="addForm.designerCertification" placeholder="请选择">
        <el-option
          v-for="item in designerCertification"
          :key="item.id"
          :label="item.description"
          :value="item.id">
        </el-option>    
    </el-select>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="addForm={name: '', username: '', cumulant: '', qualificationNo:'', designerCertification:''}
        "
        >清 空</el-button>
        <el-button @click="notSave(true)">取 消</el-button>
        <el-button type="primary" @click="submitAddForm(true)">确 定</el-button>
    </div>
    </el-dialog>
    <!-- Add Dialog Finished-->

    <!-- Edit Dialog-->
    <el-dialog title="修改" :visible.sync="editDialogVisible">
    <div v-if="tableSelectedRow">
        <el-form :model="updateForm" v-if="!isMuiltRowsSelected">
        <el-form-item label="企业名称">
    <el-input v-model="updateForm.name"></el-input>
    </el-form-item>
    <el-form-item label="用户名">
    <el-input v-model="updateForm.username"></el-input>
    </el-form-item>
    <el-form-item label="累计装配式建筑">
    <el-input v-model="updateForm.cumulant"></el-input>     
    </el-form-item>
    <el-form-item label="资质编号" >
    <el-input v-model="updateForm.qualificationNo"></el-input>
    </el-form-item>
    <el-form-item label="资质" >
    <el-select v-model="updateForm.designerCertification" placeholder="请选择">
        <el-option
          v-for="item in designerCertification"
          :key="item.id"
          :label="item.description"
          :value="item.id">
        </el-option>    
    </el-select>
    </el-form-item>

        </el-form>
        <label v-else>选择信息有误！修改信息仅可选择一条记录！</label>
    </div>
    <label v-else>请选择至少一条记录！</label>
    <div slot="footer" class="dialog-footer">
        <el-button @click="updateForm={name: '', username: '', cumulant: '', qualificationNo:'', designerCertificationId:''}"
        v-if="tableSelectedRow"
        >清 空</el-button>
        <el-button @click="notSave(false)">取 消</el-button>
        <el-button type="primary" @click="submitAddForm(false)">确 定</el-button>
    </div>
    </el-dialog>

    <!-- Edit Dialog Finished -->

    <!-- Delete Dialog-->
    <el-dialog title="删除" :visible.sync="delDialogVisible">
    <el-row>
    <label v-if="tableSelectedRow">确认删除这条记录吗？</label>
    <label v-else>请先选择一条记录！</label>
    </el-row>
    <el-row>
    <label v-if="tableSelectedRow">{{ }}</label>
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRecord" v-if="tableSelectedRow">确 定</el-button>
    </div>
    </el-dialog>

    <!-- Delete Dialog Finished -->



    <!-- Reset Password Dialog-->
    <el-dialog title="重置密码" :visible.sync="resetPasswdDialogvisible">
    <el-form :model="resetPasswdForm" v-if="tableSelectedRow">
    <label>{{ tableSelectedRow.userName }}</label>
    <el-form-item label="新密码">
    <el-input v-model="resetPasswdForm.newPasswd" auto-complete="off"></el-input>
    </el-form-item>

    </el-form>
    </el-form>
    <label v-else>请先选择一条记录！</label>
    <div slot="footer" class="dialog-footer">
        <el-button @click="resetPasswdForm={userName: '', newPasswd: ''}"
        >清 空</el-button>
        <el-button @click="resetPasswdDialogvisible = false">取 消</el-button>
        <el-button type="primary" @click="handleResetPasswd">确 定</el-button>
    </div>
    </el-dialog>

    <!-- Edit Dialog Finished -->

</div>
</template>
<script>
export default {
    data(){
        return {
            //用来显示表格中的数据
            tableData: [],

            searchContent: '',
            //增加用的对话框，初始为不显示
            addDialogVisible:false,
            //资质下拉框
            designerCertification:[],
            //修改用，初始不显示对话框
            editDialogVisible: false,
            //删除对话框初始时的显示控制
            delDialogVisible: false,
            resetPasswdDialogvisible: false,
            //定义添加和修改的对象初始值为空
            addForm: {name: '', username: '', cumulant: '', qualificationNo:'', designerCertification:''},
            updateForm: {id:'', name:'', username:'', cumulant:'', qualificationNo:'', designerCertification:''},
            resetPasswdForm: {userName: '', newPasswd: ''},
            //定义当前行为空，当点击某行时，进行赋值
            tableSelectedRow:[],
            //控制修改框中选择过多时提示信息的显示
            isMuiltRowsSelected: false,
            //定义数组，在删除时使用
            ids:[]
            

        }
    },
    methods: {
        handleSearch(){

        },
        handleSelectionChange(currentRow){
            //取出选中行的所有信息，在判断和删除时使用
            this.tableSelectedRow = currentRow
            //将选中行的具体信息提取出来，修改时用于绑定
            this.updateForm.id = currentRow[0].id
            this.updateForm.name = currentRow[0].name
            this.updateForm.username = currentRow[0].username
            this.updateForm.cumulant = currentRow[0].cumulant
            this.updateForm.qualificationNo=currentRow[0].qualificationNo
            this.updateForm.designerCertification=currentRow[0].designerCertification.id

        },
        //点击确定进行添加保存
        submitAddForm(val){
            if(val==true){
                this.addDialogVisible=false
                    var url = this.HOST + "/addDesigner"
                    this.$http.post(url,this.addForm).then(response=>{
                        this.findMsg()
                    })
                this.addForm={name:'', username:'', cumulant:'', qualificationNo:'', designerCertification:''}
            }else if(val==false){
                this.editDialogVisible=false
                var url = this.HOST + "/updateDesigner"
                console.log(this.updateForm)
                this.$http.put(url,this.updateForm).then(response=>{
                    this.findMsg()
                }).catch(error=>{
                    alert("修改失败")
                    this.tableSelectedRow = ''
                })
                this.updateForm={id:'', name:'', username:'', cumulant:'', qualificationNo:'', designerCertification:''}
            }


        },
        deleteRecord(){
            this.delDialogVisible = false
            var i = 0
            this.tableSelectedRow.forEach(item=>{
                this.ids[i]=item.id
                i=i+1
            })
            this.delContent()

        },
        delContent(){
            var url = this.HOST + "/deleteDesigners?ids="+this.ids
                this.$http.delete(url).then(response=>{
                    this.findMsg()
                }).catch(response=>{
                    alert("删除失败")
                })
        },
        handleResetPasswd: function() {

        },
        //当点击取消时运行
        notSave(val){
            if(val==true){
                //关闭添加对话框，并清空对话框中的内容
                this.addDialogVisible = false 
                this.addForm={name: '', username: '', cumulant: '', qualificationNo:'', designerCertification:''}
            }else if(val==false){
            //关闭修改对话框,并清空对话框内容
            this.editDialogVisible=false
            this.updateForm={name:'', username:'', cumulant:'', qualificationNo:'', designerCertification:''}
            }


        },
        //查询所要显示的表格，或者刷新该表格使用
        findMsg(){
        //初始显示表格用的查询数据
        var url1 = this.HOST + "/findAllDesigner"
        this.$http.get(url1).then(response=>{
            this.tableData = response.data
        }).catch(error=>{
            alert("查询失败")
        })
        }
    },
    watch: {
        //监听当前行，如果当前行存在，并且长度大于一，则拒绝修改操作
        tableSelectedRow: function(){
            if (this.tableSelectedRow && this.tableSelectedRow.length != 1)
                this.isMuiltRowsSelected = true
            else
                this.isMuiltRowsSelected = false
            //Used to clear the selected row
            //if don't do so, the tableSelectedRow will be [] instead of ''
            if (this.tableSelectedRow.length == 0)
                this.tableSelectedRow = ''
        }
    },
    created(){
        //防止页面加载完后点击修改弹出对话框
        if (this.tableSelectedRow.length == 0)
                this.tableSelectedRow = ''
        this.findMsg()
        //对资质的下拉框服务，提供下拉框所有的信息
        var url = this.HOST + "/findAllDesignerCertification"
        this.$http.get(url).then(response=>{
            this.designerCertification = response.data
        }).catch(response=>{
            alert("下拉框获取失败")
        })
    }

}
</script>
