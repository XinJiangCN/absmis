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

                <el-button type="primary" icon="delete" @click="delConfirmationDialogVisible=true">
                </el-button>
            </el-button-group>
        </el-col>

        <el-col :span="5">
            <el-button @click="resetPwdConfirmationDialogVisible = true">
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
                    prop="designerQualification.description"
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
                <el-input v-model="addForm.name" auto-complete="off">
                </el-input>
            </el-form-item>

            <el-form-item label="用户名">
                <el-input v-model="addForm.username" auto-complete="off">
                </el-input>
            </el-form-item>

            <el-form-item label="累计装配式建筑">
                <el-input v-model="addForm.cumulant" auto-complete="off">
                </el-input>     
            </el-form-item>

            <el-form-item label="资质编号" >
                <el-input v-model="addForm.qualificationNo" auto-complete="off">
                </el-input>
            </el-form-item>

            <el-form-item label="资质" >
                <el-select v-model="addForm.designerQualification" placeholder="请选择">
                    <el-option
                      v-for="item in designerQualification"
                      :key="item.id"
                      :label="item.description"
                      :value="item.id">
                    </el-option>    
                </el-select>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="addForm={name: '', username: '', cumulant: '', qualificationNo:'', designerQualification:''}">清 空</el-button>

            <el-button @click="cancel(true)">取 消</el-button>

            <el-button type="primary" @click="submitForm(true)">确 定</el-button>
        </div>
    </el-dialog>
    <!-- Add Dialog Finished-->

    <!-- Edit Dialog-->
    <el-dialog title="修改" :visible.sync="editDialogVisible">
        <div v-if="tableSelectedRows.length!=0">
            <el-form :model="updateForm" v-if="!isMultiRowsSelected">
                <el-form-item label="企业名称">
                    <el-input v-model="updateForm.name">
                    </el-input>
                </el-form-item>

                <el-form-item label="用户名">
                    <el-input v-model="updateForm.username">
                    </el-input>
                </el-form-item>

                <el-form-item label="累计装配式建筑">
                    <el-input v-model="updateForm.cumulant">
                    </el-input>    
                </el-form-item>

                <el-form-item label="资质编号" >
                    <el-input v-model="updateForm.qualificationNo">
                    </el-input>
                </el-form-item>

            <el-form-item label="资质" >
                <el-select v-model="updateForm.designerQualification" placeholder="请选择">
                    <el-option
                      v-for="item in designerQualification"
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
            <el-button 
                @click="updateForm={name: '', username: '', cumulant: '', qualificationNo:'', designerQualificationId:''}"
            v-if="tableSelectedRows.length==1"
            >清 空</el-button>

            <el-button @click="cancel(false)">取 消</el-button>

            <el-button type="primary" v-if="tableSelectedRows.length==1" @click="submitForm(false)">提 交</el-button>
        </div>
    </el-dialog>
    <!-- Edit Dialog Finished -->

    <!-- Delete Dialog-->
    <el-dialog title="删除" :visible.sync="delConfirmationDialogVisible">
        <el-row>
            <div v-if="tableSelectedRows.length!=0">
                <label>确认删除以下企业吗？</label>
                <el-row>{{ }}</el-row>
                <el-row>
                    <label v-for="row in tableSelectedRows">
                    <el-row></el-row>
                    {{row.name}}

                    </label>
                </el-row>
            </div>
            <label v-else>请至少选择一个企业！</label>
        </el-row>

        <el-row>
            <label v-if="tableSelectedRows.length==1">{{ }}</label>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button @click="delConfirmationDialogVisible = false">取 消</el-button>

            <el-button type="primary" @click="deleteRecord" v-if="tableSelectedRows.length!=0">确 定</el-button>
        </div>
    </el-dialog>
    <!-- Delete Dialog Finished -->

    <!-- Reset Password Dialog-->
    <el-dialog title="重置密码" :visible.sync="resetPwdConfirmationDialogVisible">

        <el-form v-if="tableSelectedRows.length==1">
            <label>您确定重置该密码吗？</label>
        </el-form>
        <label v-else>请先选择一条记录！</label>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resetPwdConfirmationDialogVisible = false">  取 消
            </el-button>

            <el-button type="primary" v-if="tableSelectedRows.length==1" @click="handleResetPwd">  确 定
            </el-button>
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
                tableData:[],
                //用来绑定搜索框中的内容
                searchContent:'',
                //增加用的对话框，初始为不显示
                addDialogVisible:false,
                //资质下拉框
                designerQualification:[],
                //修改用，初始不显示对话框
                editDialogVisible: false,
                //删除对话框初始时的显示控制
                delConfirmationDialogVisible: false,
                //控制重置密码提示框的显示，初始不显示
                resetPwdConfirmationDialogVisible: false,
                //定义添加和修改的对象初始值为空
                addForm: {name: '', username: '', cumulant: '', qualificationNo:'', designerQualification:''},
                updateForm: {id:'', name:'', username:'', cumulant:'', qualificationNo:'', designerQualification:''},
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
                this.editDialogVisible=true
                if(this.tableSelectedRows.length==1){
                    //将选中行的具体信息提取出来，修改时用于绑定
                    this.updateForm.id = this.tableSelectedRows[0].id
                    this.updateForm.name = this.tableSelectedRows[0].name
                    this.updateForm.username = this.tableSelectedRows[0].username
                    this.updateForm.cumulant = this.tableSelectedRows[0].cumulant
                    this.updateForm.qualificationNo=this.tableSelectedRows[0].qualificationNo
                    this.updateForm.designerQualification=this.tableSelectedRows[0].designerQualification.id
                }
            },
            //点击确定进行添加保存
            submitForm(isAdd){
                if(isAdd){
                    this.addDialogVisible=false

                    var url = this.HOST + "/addDesigner"
                    this.$http.post(url,this.addForm).then(response=>{
                        this.findAllDesigners()
                    })
                    this.addForm={name:'', username:'', cumulant:'', qualificationNo:'', designerQualification:''}
                }else {
                    this.editDialogVisible=false
                    var url = this.HOST + "/updateDesigner"
                    console.log(this.updateForm)
                    this.$http.put(url,this.updateForm).then(response=>{
                        this.findAllDesigners()
                    }).catch(error=>{
                        alert("修改失败")
                        this.tableSelectedRows = ''
                    })
                    this.updateForm={id:'', name:'', username:'', cumulant:'', qualificationNo:'', designerQualification:''}
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
                    }).catch(response=>{
                        alert("删除失败")
                    })
            },
            //进行密码重置
            handleResetPwd: function() {
                var url = this.HOST + "/"
                this.$http.get(url).then(response=>{
                    alert(response.username +"的密码已经重置为用户名")
                }).catch(response=>{
                    alert("重置失败！")
                })
            },
            //当点击取消时运行
            cancel(val){
                if(val==true){
                    //关闭添加对话框，并清空对话框中的内容
                    this.addDialogVisible = false 
                    this.addForm={name: '', username: '', cumulant: '', qualificationNo:'', designerQualification:''}
                }else if(val==false){
                //关闭修改对话框,并清空对话框内容
                this.editDialogVisible=false
                this.updateForm={name:'', username:'', cumulant:'', qualificationNo:'', designerQualification:''}
                }


            },
            //查询所要显示的表格，或者刷新该表格使用
            findAllDesigners(){
            //初始显示表格用的查询数据
            var url1 = this.HOST + "/findAllDesigners"
            this.$http.get(url1).then(response=>{
                this.tableData = response.data
            }).catch(error=>{
                alert("查询失败")
            })
            }
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
            //对资质的下拉框服务，提供下拉框所有的信息
            var url = this.HOST + "/findAllDesignerQualifications"
            this.$http.get(url).then(response=>{
                this.designerQualification = response.data
            }).catch(response=>{
                alert("下拉框获取失败")
            })
        }
    }
</script>