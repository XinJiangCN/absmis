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
import componentEnIndustrialization from '../components/industrializationInfo/ComponentEnIndustrialization.vue'
import designerIndustrialization from '../components/industrializationInfo/designerIndustrialization.vue'
import builderIndustrialization from '../components/industrializationInfo/builderIndustrialization.vue'
//项目信息提交+审核
import projectByRealEstateEn from '../components/projectInfo/projectByRealEstateEn'
import projectCheck from '../components/projectCheck/projectCheck'
import projectByEstateOwner from '../components/projectInfo/projectByEstateOwner'
//管理部门查询
import queryProject from '../components/supervisor/queryProject.vue'
import queryMachineryEn from '../components/supervisor/queryMachineryEn.vue'
import querySubUnitEn from '../components/supervisor/querySubUnitEn.vue'
import constructionEnInQuery from '../components/supervisor/constructionEnInQuery.vue'
import componentEnInQuery from '../components/supervisor/componentEnInQuery.vue'
//test
import test from '../components/supervisor/test.vue'
import staticIndustryInfoThird from '../components/supervisor/staticIndustryInfoThird.vue'
//check basic information
import traditionalInfoCheck from '../components/checkInformation/traditionalInfoCheck'
import nonTraditionalInfoCheck from '../components/checkInformation/nonTraditionalInfoCheck'
//check industrializationInfo
import traditionalInCheck from '../components/checkIndustrilizationInfo/traditionalInCheck.vue'
import componentEnInCheck from '../components/checkIndustrilizationInfo/componentEnInCheck.vue'
//统计信息查询
import queryIndustrilization from '../components/supervisor/queryIndustrilizationInfo'
import queryEnterpriseInfo from '../components/supervisor/queryEnterpriseInfo'

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
        component: realEstateEnIndustrialization
    },
    {
        path: '/designerIn',
        name: '设计单位-产业化信息',
        component: designerIndustrialization
    },
    {
        path: '/builderIn',
        name: '施工单位-产业化信息',
        component: builderIndustrialization
    },
    {
        path: '/componentEnIn',
        name: '构件企业-产业化信息',
        component: componentEnIndustrialization
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
        component: traditionalInCheck
    },
    {
        path: '/componentEnInCheck',
        name: '构件企业-产业化审核',
        component: componentEnInCheck
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
        component: projectByRealEstateEn
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
    },
    {
        path: '/constructionEnInQuery',
        name: '传统企业信息查询',
        component: constructionEnInQuery
    },
    {
        path: '/componentEnInQuery',
        name: '构件企业信息查询',
        component: componentEnInQuery
    },
    {
        path: '/subUnitEnInQuery',
        name: '部品企业信息查询',
        component: querySubUnitEn
    },
    {
        path: '/machineryEnInQuery',
        name: '设备企业信息查询',
        component: queryMachineryEn
    },
    {
        path: '/projectQuery',
        name: '项目信息查询',
        component: queryProject
    },
    {
        path: '/query1',
        name: '统计行业信息1',
        component: queryEnterpriseInfo
    },
    {
        path: '/query2',
        name: '统计行业信息2',
        component: queryIndustrilization
    },
    {
        path: '/query3',
        name: '统计行业信息3',
        component: staticIndustryInfoThird
    }
    ]
})