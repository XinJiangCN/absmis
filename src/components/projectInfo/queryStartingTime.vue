<template>
<div>
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
	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script>
  import msgDialog from '../common/msgDialog'
  export default{
  	data(){
      return{
        queryStartingTime:'',
      }
    },
    props:['queryStartingTime'],
    methods:{
      findByStartingTime(){
        this.$emit('findByStartingTime',this.queryStartingTime)
      }
    },
    components: {
      msgDialog
    }
  }
</script>