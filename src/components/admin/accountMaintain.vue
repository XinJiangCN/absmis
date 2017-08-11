<template>
<div id='accountMaintain'>
    <el-row>
        <el-col :span="5">
            <el-input
                placeholder="请输入要查询的内容"
                icon="search"
                v-model="searchContent">
            </el-input>
        </el-col>

        <el-col :span=5>
            <el-button @click="handleSearch"
            >查询</el-button>
        </el-col>
    </el-row>

    <el-row type="flex" >
        <el-col :span="5">
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

        <el-col :span="5">
            <el-button @click="resetPwdConfirmation">
                重置密码
            </el-button>
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

            </el-table>
        </el-col>
    </el-row>

    <!-- Add Dialog -->
    <el-dialog title="添加" :visible.sync="addDialogVisible">
        <el-form>
            <enterprise-information 
                :enterprise = "enterpriseForAddForm"
            ></enterprise-information>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="enterpriseForUpdateForm={name: '', username: ''}">清 空</el-button>

            <el-button @click="cancel">取 消</el-button>

            <el-button type="primary" @click="submitAddForm">确 定</el-button>
        </div>
    </el-dialog>
    <!-- Add Dialog Finished-->

    <!-- Edit Dialog-->
    <el-dialog title="修改" :visible.sync="editDialogVisible">
        <div>
            <enterprise-information 
                :enterprise = "enterpriseForUpdateForm"
            ></enterprise-information>
        </div>

        <div slot="footer" class="dialog-footer">
            <el-button 
                @click="enterpriseForUpdateForm={name: '', username: ''}"
            >清 空</el-button>

            <el-button @click="editDialogVisible=false">取 消</el-button>

            <el-button type="primary" @click="submitUpdateForm">提 交</el-button>
        </div>
    </el-dialog>
    <!-- Edit Dialog Finished -->

    <!-- 提示信息对话框 -->
    <el-dialog title="提示信息" 
        :visible.sync="msgDialogVisible">
        <div v-if="tableSelectedRows.length==0">
            <label>请选择至少一条记录！</label>
        </div>
        <label v-if="tableSelectedRows.length>1">
            选择信息有误！修改信息仅可选择一条记录！
        </label>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeMsgDialog">关 闭</el-button>
        </div>
    </el-dialog>



    <!-- Delete Dialog-->
    <el-dialog title="删除" :visible.sync="delConfirmationDialogVisible">
        <el-row>
            <div>
                <label>确认删除以下企业吗？</label>
                <el-row>{{ }}</el-row>
                <el-row>
                    <label v-for="row in tableSelectedRows">
                        <el-row></el-row>
                        {{row.name}}
                    </label>
                </el-row>
            </div>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="delConfirmationDialogVisible = false">取 消</el-button>

            <el-button type="primary" @click="deleteRecord">确 定</el-button>
        </div>
    </el-dialog>
    <!-- Delete Dialog Finished -->

    <!-- Reset Password Dialog-->
    <el-dialog title="重置密码" :visible.sync="resetPwdConfirmationDialogVisible">

        <el-form>
            <label>您确定重置该密码吗？</label>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetPwdConfirmationDialogVisible = false">  取 消
            </el-button>

            <el-button type="primary" @click="handleResetPwd">  确 定
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
    export default {
        data(){
            return {
                //用来显示表格中的数据
                tableData:[],
                //用来绑定搜索框中的内容
                searchContent:'',
                //增加用的对话框，初始为不显示
                addDialogVisible:false,
                //修改用，初始不显示对话框
                editDialogVisible: false,
                //提示信息框初始时不显示
                msgDialogVisible:false,
                //删除对话框初始时的显示控制
                delConfirmationDialogVisible: false,
                //控制重置密码提示框的显示，初始不显示
                resetPwdConfirmationDialogVisible: false,
                //定义添加和修改的对象初始值为空
                enterpriseForAddForm: {name:'', username:''},
                enterpriseForUpdateForm: {id:'', name:'', username:''},
                //定义当前行为空，当点击某行时，为本变量赋值
                tableSelectedRows:[],
                //定义当前是否选择多行，控制修改框中选择过多时提示信息的显示
                isMultiRowsSelected: false,
                //定义数组，在删除时使用
                ids:[]
            }
        },
        methods: {
            handleSearch(){
            },
            //选中行之后，触发本方法
            handleSelectionChange(selectedRows){
                //取出选中行的所有信息，在判断选中情况、修改和删除时使用
                this.tableSelectedRows = selectedRows
            },
            //点击修改之后运行本方法
            showEditDialogVisible(){
                if(this.tableSelectedRows.length==1){
                    this.editDialogVisible=true
                    //将选中行的具体信息提取出来，修改时用于绑定
                    this.enterpriseForUpdateForm.id = this.tableSelectedRows[0].id
                    this.enterpriseForUpdateForm.name = this.tableSelectedRows[0].name
                    this.enterpriseForUpdateForm.username = this.tableSelectedRows[0].username
                }else if(this.tableSelectedRows.length==0){
                    this.$refs.msgDialog.confirm("请至少选择一个企业进行修改！");
                }else{
                    this.$refs.msgDialog.confirm("仅可选择一个企业进行修改！")
                }
            },
            //点击确定进行添加保存
            submitAddForm(){
                this.addDialogVisible=false
                console.log(this.enterpriseForAddForm)
                var url = this.HOST + "/addDesigner"
                this.$http.post(url,this.enterpriseForAddForm).then(response=>{
                    this.findAllDesigners()
                    this.$refs.msgDialog.notify("添加成功")
                }).catch(error=>{
                    this.$refs.msgDialog.confirm("添加失败")
                })
                this.enterpriseForAddForm={name:'', username:''}
            },
            //点击确定进行修改保存
            submitUpdateForm(){
                this.editDialogVisible=false
                    var url = this.HOST + "/updateDesigner"
                    this.$http.put(url,this.enterpriseForUpdateForm).then(response=>{
                        this.findAllDesigners()
                        
                        this.$refs.msgDialog.notify("修改成功")
                    }).catch(error=>{
                        this.$refs.msgDialog.confirm("修改失败")
                    })
                    this.enterpriseForUpdateForm={id:'', name:'', username:''}
            },
            //点击删除时运行本方法
            delConfirmation(){
                if(this.tableSelectedRows.length==0){
                    this.$refs.msgDialog.confirm("请至少选择一个企业进行删除！")
                }else{
                    this.delConfirmationDialogVisible=true
                }
            },
            //删除时使用，用来获取多选的所有行的id,并调用删除方法进行删除
            deleteRecord(){
                    this.delConfirmationDialogVisible = false
                    var i = 0
                    this.tableSelectedRows.forEach(item=>{
                        this.ids[i]=item.id
                        i=i+1
                    })
                    this.delContent()
            },
            //删除企业信息
            delContent(){
                var url = this.HOST + "/deleteDesigners?ids="+this.ids
                    this.$http.delete(url).then(response=>{
                        this.findAllDesigners()
                        this.$refs.msgDialog.notify("删除成功")
                    }).catch(response=>{
                        this.$refs.msgDialog.confirm("删除失败")
                    })
            },
            //点击重置密码时运行本方法
            resetPwdConfirmation(){
                if(this.tableSelectedRows.length==1){
                    this.resetPwdConfirmationDialogVisible=true
                }else if(this.tableSelectedRows==0){
                    this.$refs.msgDialog.confirm("至少选择一个企业进行操作")
                }else{
                    this.$refs.msgDialog.confirm("仅能选择一个企业进行操作")
                }
            },
            //进行密码重置
            handleResetPwd: function() {
                var url = this.HOST + "/"
                this.$http.get(url).then(response=>{
                    this.$refs.msgDialog.notify(response.username +"的密码已经重置为用户名")
                }).catch(response=>{
                    this.$refs.msgDialog.confirm("重置失败！")
                })
            },
            //当点击取消时运行
            cancel(){
                //关闭添加对话框，并清空对话框中的内容
                this.addDialogVisible = false 
                this.enterpriseForAddForm={name: '', username: ''}
            },
            closeMsgDialog(){
                this.msgDialogVisible=false
            },
            //查询所要显示的表格，或者刷新该表格使用
            findAllDesigners(){
            //初始显示表格用的查询数据
            var url1 = this.HOST + "/findAllDesigners"
            this.$http.get(url1).then(response=>{
                this.tableData = response.data
            }).catch(error=>{
                this.$refs.msgDialog.confirm("查询失败")
            })
            },
            
        },
        //watch负责监听，当监听对象发生变化时，运行对应的方法
        watch: {
            //监听当前行，如果当前行存在，并且长度大于一，则拒绝修改操作
            tableSelectedRows: function(){
                if (this.tableSelectedRows && this.tableSelectedRows.length != 1)
                    this.isMultiRowsSelected = true
                else
                    this.isMultiRowsSelected = false
            }
        },
        //页面加载时运行
        created(){
            this.findAllDesigners()
        },
        components:{
            enterpriseInformation,
            msgDialog
        }
    }
</script>