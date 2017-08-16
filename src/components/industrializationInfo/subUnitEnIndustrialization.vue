<template>
    <div>
        <el-form :model="subUnitEnIndustrializationForm" label-width="100px">
            <el-form-item>
                 <el-row>
                    <el-col :span="2" :pull="2">
                        <el-button @click="">暂存</el-button>
                    </el-col>
                    <el-col :span="2" :pull="2">
                        <el-button @click="submitForm">提交</el-button>
                    </el-col>
                    <el-col :span="6" :push="9">
                        <span>{{this.currentDate}}</span>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="生产的主要构件和部品系列">
                <el-row>
                    <el-col :span="5" :offset="1"><span>生产线数量(条)</span></el-col>
                    <el-col :span="5" :offset="1"><span>生产能力</span></el-col>
                    <el-col :span="5" :offset="1"><span>应用规模</span></el-input></el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="整体墙板">
                <el-row >
                    <el-col :span="5" :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralWallNum">
                        </el-input>
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralWallAbility">
                        <template slot="append">万平方米</template>
                        </el-input>  
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralWallScale">
                        <template slot="append">万平方米</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="结构保温装饰一体化外墙">
                <el-row >
                    <el-col :span="5" :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integrativeExternalWallNum">
                        </el-input>
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integrativeExternalWallAbility">
                        <template slot="append">万平方米</template>
                        </el-input>  
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integrativeExternalWallScale">
                        <template slot="append">万平方米</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
 
            <el-form-item label="预制楼梯">
                <el-row >
                    <el-col :span="5" :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.prebuiltStairsNum">
                        </el-input>
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.prebuiltStairsAbility">
                        <template slot="append">万平方米</template>
                        </el-input>  
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.prebuiltStairsScale">
                        <template slot="append">万平方米</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
  

            <el-form-item label="整体厨房">
                <el-row >
                    <el-col :span="5" :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralKitchenNum">
                        </el-input>
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralKitchenAbility">
                        <template slot="append">万平方米</template>
                        </el-input>  
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralKitchenScale">
                        <template slot="append">万平方米</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
 

            <el-form-item label="整体卫生间">
                <el-row >
                    <el-col :span="5" :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralToiletNum">
                        </el-input>
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralToiletAbility">
                        <template slot="append">万平方米</template>
                        </el-input>  
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralToiletScale">
                        <template slot="append">万平方米</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
 

            <el-form-item label="整体内装体系">
                <el-row>
                    <el-col :span="5" :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralInteriorDecorationNum">
                        </el-input>
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralInteriorDecorationAbility">
                        <template slot="append">万平方米</template>
                        </el-input>  
                    </el-col>
                    <el-col :span="5"  :offset="1">
                        <el-input  type="number" auto-complete="off" v-model.number="subUnitEnIndustrializationForm.integralInteriorDecorationScale">
                        <template slot="append">万平方米</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>

        <msg-dialog ref="msgDialog"></msg-dialog>
    </div>
</template>
<script>
import msgDialog from '../common/msgDialog.vue'
export default{
    data(){
        return{
            //默认当前时间
            currentDate:'',
            //部品产业化的属性
            subUnitEnIndustrializationForm:{integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:''}

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
          var url = this.HOST+"/addSubUnitEnIndustrialization"
          if(this.subUnitEnIndustrializationForm)
          this.$http.post(url,this.subUnitEnIndustrializationForm).then(response=>{
            this.$ref.msgDialog.notify("数据提交成功")
          }).catch(error=>{
            this.$ref.msgDialog.confirm("数据提交失败")
          })
          this.subUnitEnIndustrializationForm = {integralWallNum:'',integrativeExternalWallNum:'',prebuiltStairsNum:'',integralKitchenNum:'',integralToiletNum:'',integralInteriorDecorationNum:'',integralWallAbility:'',integrativeExternalWallAbility:'',prebuiltStairsAbility:'',integralKitchenAbility:'',integralToiletAbility:'',integralInteriorDecorationAbility:'',integralWallScale:'',integrativeExternalWallScale:'',prebuiltStairsScale:'',integralKitchenScale:'',integralToiletScale:'',integralInteriorDecorationScale:''}
            
        },




    },
    created(){
        //页面加载完成调用显示当前年月日方法
        this.getCurrentDate()
    }
}

</script>