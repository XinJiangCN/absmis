import Vue from 'vue'
import Router from 'vue-router'

//For router-use

//public 
import changePasswd from '../components/bizCommon/changePasswd.vue'
import accountMaintain from '../components/admin/accountMaintain.vue'
//admin
import auditSubUnitEnIndustrialization from '../components/admin/auditSubUnitEnIndustrialization.vue'
import auditMachineryEnIndustrialization from '../components/admin/auditMachineryEnIndustrialization.vue'

//basic info
import homePage from '../components/bizCommon/homePage.vue'

import designCompanyBasicInfo from '../components/basicInfo/designCompanyBasicInfo.vue'
import buildCompanyBasicInfo from '../components/basicInfo/buildCompanyBasicInfo.vue'
import estateCompanyBasicInfo from '../components/basicInfo/estateCompanyBasicInfo.vue'
import componentCompanyBasicInfo from '../components/basicInfo/componentCompanyBasicInfo.vue'
import estateOwnerBasicInfo from '../components/basicInfo/estateOwnerBasicInfo'
import subUnitEnBasicInfo from '../components/basicInfo/subUnitEnBasicInfo'
import machineryEnBasicInfo from '../components/basicInfo/machineryEnBasicInfo'
//industrialization info
import subUnitEnIndustrialization from '../components/industrializationInfo/subUnitEnIndustrialization.vue'
import machineryEnIndustrialization from '../components/industrializationInfo/machineryEnIndustrialization.vue'
import realEstateEnIndustrialization from'../components/industrializationInfo/realEstateEnIndustrialization.vue'
import componentEnIndustrialization from '../components/industrializationInfo/componentEnIndustrialization.vue'
import designerIndustrialization from '../components/industrializationInfo/designerIndustrialization.vue'
import builderIndustrialization from '../components/industrializationInfo/builderIndustrialization.vue'
//项目信息提交+审核
import project from '../components/projectInfo/project.vue'
import projectCheck from '../components/projectCheck/projectCheck'
import projectByEstateOwner from '../components/projectInfo/projectByEstateOwner'

//check basic information
import traditionalInfoCheck from '../components/checkInformation/traditionalInfoCheck'
import nonTraditionalInfoCheck from '../components/checkInformation/nonTraditionalInfoCheck'
//check industrializationInfo
import traditionalInCheck from '../components/checkIndustrilizationInfo/traditionalInCheck.vue'
import componentEnInCheck from '../components/checkIndustrilizationInfo/componentEnInCheck.vue'
Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/homePage',
        name: '首页',
        component: homePage
    },
    {
        path: '/accountMaintain',
        name: '企业账号维护',
        component: accountMaintain
    },
    {
        path: '/changePasswd',
        name: '用户修改密码',
        component: changePasswd
    },
    {
        path: '/designerInfo',
        name: '设计单位-基本信息',
        component: designCompanyBasicInfo 
    },
    {
        path: '/realEstateEnInfo',
        name: '房地产企业-基本信息',
        component: estateCompanyBasicInfo
    },
    {
        path: '/builderInfo',
        name: '施工单位-基本信息',
        component: buildCompanyBasicInfo
    },
    {
        path: '/componentEnInfo',
        name: '构件生产企业-基本信息',
        component: componentCompanyBasicInfo
    },
    {
        path: '/subUnitEnInfo',
        name: '部品生产企业-基本信息',
        component: subUnitEnBasicInfo
    },
    {
        path: '/machineryEnInfo',
        name: '设备生产企业-基本信息',
        component: machineryEnBasicInfo
    },
    {
        path: '/estateOwnerInfo',
        name: '建设单位-基本信息',
        component: estateOwnerBasicInfo
    },
    {
        path: '/traditionalInfoCheck',
        name: '传统企业-基本信息审核',
        component: traditionalInfoCheck
    },
    {
        path: '/nonTraditionalInfoCheck',
        name: '非传统企业-基本信息审核',
        component: nonTraditionalInfoCheck
    },
    {
        path: '/realEstateEnIn',
        name: '房地产-产业化信息',
        component: changePasswd
    },
    {
        path: '/designerIn',
        name: '设计单位-产业化信息',
        component: changePasswd
    },
    {
        path: '/builderIn',
        name: '施工单位-产业化信息',
        component: changePasswd
    },
    {
        path: '/componentEnIn',
        name: '构件企业-产业化信息',
        component: changePasswd
    },
    {
        path:'/machineryEnIn',
        name:'设备企业-产业化信息',
        component:machineryEnIndustrialization
    },
    {
        path: '/subUnitEnIn',
        name: '部品企业-产业化信息',
        component: subUnitEnIndustrialization
    },
    {
        path: '/traditionalInCheck',
        name: '传统企业-产业化审核',
        component: changePasswd
    },
    {
        path: '/componentEnInCheck',
        name: '构件企业-产业化审核',
        component: changePasswd
    },
    {
        path: '/subUnitEnInCheck',
        name: '部品企业-产业化审核',
        component: auditSubUnitEnIndustrialization
    },
    {
        path: '/machineryEnInCheck',
        name: '设备企业-产业化审核',
        component: auditMachineryEnIndustrialization
    },
    {
        path: '/realEstateEnProject',
        name: '房地产-项目信息',
        component: project
    },
    {
        path: '/estateOwnerProject',
        name: '建设单位-项目信息',
        component: projectByEstateOwner
    },
    {
        path: '/projectCheck',
        name: '项目信息审核',
        component: projectCheck
    }
    ]
})
