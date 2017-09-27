<template>
  <el-table
    :data="projectTableData"
    highlight-current-row
    border
    style="width:100%"
    @row-click="rowClick">
    <el-table-column
      label="项目名称"
      prop="name"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="开工时间"
      prop="startingTime"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
</template>
<script>
  export default{
    data(){
      return{
        selectedRows:[],
        currentRow:[],
      }
    },
    props:['projectTableData'],
    methods:{
      // handleSelectionChange(selectedRows){
      //   this.selectedRows = selectedRows
      //   this.$emit('handleSelectionChange',this.selectedRows)
      // },
      rowClick(selectedRow){
        this.currentRow = selectedRow
        this.$emit('clickRow',this.currentRow)
      }
    }
  }
</script>
