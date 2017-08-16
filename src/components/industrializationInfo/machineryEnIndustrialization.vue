<template>
    <div>
        <el-form :model="machineryEnIndustrializationForm" label-width="200px" class="demo-ruleForm">
            <el-form-item>
                 <el-row>
                    <el-col :span="2" :pull="5">
                        <el-button @click="">暂存</el-button>
                    </el-col>
                    <el-col :span="2" :pull="4">
                        <el-button @click="submitForm">提交</el-button>
                    </el-col>
                    <el-col :span="6" :push="8">
                        <span>{{this.currentDate}}</span>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="装配式建筑专用施工设备机具">
            <el-row><el-col :span="7" :offset="1"><span>生产能力</span></el-col></el-row>
            </el-form-item>
            <el-form-item label="预装混凝土生产设备">
                <el-row >
                    <el-col :span="7" :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.integralWall">
                        <template slot="append">台套/年</template>
                        </el-input>  
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="专用运输设备">
               <el-row >
                    <el-col :span="7" :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.specialTransportEquipment">
                        <template slot="append">台套/年</template>
                        </el-input>  
                    </el-col>
                </el-row>
            </el-form-item>
 
            <el-form-item label="专用施工设备">
                <el-row >
                    <el-col :span="7" :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="machineryEnIndustrializationForm.specialConstructionEquipment">
                        <template slot="append">台套/年</template>
                        </el-input>  
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>

        <msg-dialog ref="msgDialog"></msg-dialog>
    </div>
</template>
<script>
import msgDialog from '../common/msgDialog'
export default{
    data(){
        return{
            //默认当前时间
            currentDate:'',
            //部品产业化的属性
            machineryEnIndustrializationForm:{integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:''}

        }
    },
    methods:{
        //获取当前日期
        getCurrentDate(){
            var d = new Date();
            this.currentDate = d.getFullYear() + "年" +(d.getMonth() + 1) + "月" + d.getDate() + "日";
            return currentDate;
        },
        //提交表单信息
        submitForm(){
          var url = this.HOST+"/addMachineryEnIndustrialization"
          this.$http.post(url,this.machineryEnIndustrializationForm).then(response=>{
            this.$refs.msgDialog.notify("数据提交成功")
          }).catch(error=>{
            this.$refs.msgDialog.confirm("数据提交失败")
          })
          this.machineryEnIndustrializationForm = {integralWall:'',specialTransportEquipment:'',specialConstructionEquipment:''}
            
        },



    },
    created(){
        //页面加载完成调用显示当前年月日方法
        this.getCurrentDate()
    }
}

</script>
