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
    <el-table
    ref="designCompanyTable"
    :data="tableData"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
    type="selection"
    width="55">
    </el-table-column>
    <el-table-column
    prop="companyName"
    label="企业名称"
    width="120">
    </el-table-column>
    <el-table-column
    prop="type"
    label="类型"
    width="120">
    </el-table-column>
    <el-table-column
    prop="userName"
    label="用户名"
    show-overflow-tooltip>
    </el-table-column>
    </el-table>

    </el-col>
    </el-row>

    <!-- Add Dialog -->
    <el-dialog title="添加" :visible.sync="addDialogVisible">
    <el-form :model="addForm">
    <el-form-item label="企业名称">
    <el-input v-model="addForm.companyName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="类型" >
    <el-input v-model="addForm.type" auto-complete="off"></el-input>     
    </el-form-item>
    <el-form-item label="用户名">
    <el-input v-model="addForm.userName" auto-complete="off"></el-input>     
    </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="addForm={companyName: '', type: '', userName: ''}
        "
        >清 空</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddForm(true)">确 定</el-button>
    </div>
    </el-dialog>
    <!-- Add Dialog Finished-->

    <!-- Edit Dialog-->
    <el-dialog title="修改" :visible.sync="editDialogVisible">
    <div v-if="tableSelectedRow">
        <el-form :model="addForm" v-if="!isMuiltRowsSelected">
        <el-form-item label="企业名称">
        <el-input v-model="addForm.companyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
        <el-input v-model="addForm.type" auto-complete="off"></el-input>     
        </el-form-item>
        <el-form-item label="用户名">
        <el-input v-model="addForm.userName" auto-complete="off"></el-input>     
        </el-form-item>

        </el-form>
        <label v-else>选择信息有误！修改信息仅可选择一条记录！</label>
    </div>
    <label v-else>请选择至少一条记录！</label>
    <div slot="footer" class="dialog-footer">
        <el-button @click="addForm={companyName: '', type: '', userName: ''}"
        v-if="tableSelectedRow"
        >清 空</el-button>
        <el-button @click="editDialogVisible = false">取 消</el-button>
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
    data: function() {
        return {
            tableData: [
                {companyName: '1', type: 'design', userName: 'haha'},
                {companyName: '2', type: 'construction', userName: 'lala'}
            ],
            searchContent: '',
            addDialogVisible: false,
            editDialogVisible: false,
            delDialogVisible: false,
            resetPasswdDialogvisible: false,
            addForm: {companyName: '', type: '', userName: ''},
            resetPasswdForm: {userName: '', newPasswd: ''},
            tableSelectedRow : '',
            isMuiltRowsSelected: false

        }
    },
    methods: {
        handleSearch: function() {

        },
        handleSelectionChange: function(val) {
            this.tableSelectedRow = val;

        },
        submitAddForm: function(isAdding) {

        },
        deleteRecord: function() {

        },
        handleResetPasswd: function() {

        }
    },
    watch: {
        tableSelectedRow: function(){
            if (this.tableSelectedRow && this.tableSelectedRow.length != 1)
                this.isMuiltRowsSelected = true
            else
                this.isMuiltRowsSelected = false
            //Used to clear the selected row
            //if don't do so, the tableSelectedRow will be [] instead of ''
            if (this.tableSelectedRow.length == 0)
                this.tableSelectedRow = ''
        },
    }
}
</script>
