<template>
	<!-- 确认对话框 -->
    <el-dialog title="添加信息" :visible.sync="submitBasicInfoDialogVisible">
        <el-row>
            <div>
                <label>您确定要提交所有信息吗？</label>
            </div>
        </el-row>
        <div slot="footer">
            <el-button @click="cancle">取 消</el-button>

            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
	export default{
		props:['submitBasicInfoDialogVisible'],
		methods:{
			handleSubmit(){
				this.$emit('handleSubmit')
			},
			cancle(){
				this.$emit('cancle')
			}
		}
	}
</script>