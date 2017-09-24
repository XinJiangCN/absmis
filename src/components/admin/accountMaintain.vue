<template>
    <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="设计单位">
            <designer-account-maintain>
            </designer-account-maintain>
        </el-tab-pane>

        <el-tab-pane label="房地产企业">
            <real-estate-en-account-maintain>
            </real-estate-en-account-maintain>
        </el-tab-pane>

        <el-tab-pane label="施工单位">
            <builder-account-maintain>
            </builder-account-maintain>
        </el-tab-pane>

        <el-tab-pane label="构件生产企业">
            <component-en-account-maintain>
            </component-en-account-maintain>
        </el-tab-pane>

        <el-tab-pane label="部品生产企业">
             <sub-unit-en-account-maintain></sub-unit-en-account-maintain>
        </el-tab-pane>

        <el-tab-pane label="设备生产企业">
            <machinery-en-account-maintain>
            </machinery-en-account-maintain>
        </el-tab-pane>
        
        <el-tab-pane label="建设单位">
            <estate-owner-account-maintain>
            </estate-owner-account-maintain>   
        </el-tab-pane>

        <el-tab-pane label="业务管理员">
            <business-administrator-maintain>
            </business-administrator-maintain>   
        </el-tab-pane>

        <el-tab-pane label="管理员">
            <administrator-maintain>
            </administrator-maintain>   
        </el-tab-pane>
      </el-tabs>
</template>

<script>
import designerAccountMaintain from './designerAccountMaintain'
import realEstateEnAccountMaintain from './realEstateEnAccountMaintain'
import builderAccountMaintain from './builderAccountMaintain'
import componentEnAccountMaintain from './componentEnAccountMaintain'
import subUnitEnAccountMaintain from './subUnitEnAccountMaintain'
import machineryEnAccountMaintain from './machineryEnAccountMaintain'
import estateOwnerAccountMaintain from './estateOwnerAccountMaintain'
import businessAdministratorMaintain from './businessAdministratorMaintain'
import administratorMaintain from './administratorMaintain'
export default{
    components:{
        designerAccountMaintain,
        realEstateEnAccountMaintain,
        builderAccountMaintain,
        componentEnAccountMaintain,
        subUnitEnAccountMaintain,
        machineryEnAccountMaintain,
        estateOwnerAccountMaintain,
        businessAdministratorMaintain,
        administratorMaintain
    }
}
</script>