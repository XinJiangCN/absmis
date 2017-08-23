import Vue from 'vue'
import Router from 'vue-router'

//For router-use

//public 
import changePasswd from '../components/bizCommon/changePasswd.vue'
import accountMaintain from '../components/admin/accountMaintain.vue'

//basic info
import homePage from '../components/bizCommon/homePage.vue'

import designCompanyBasicInfo from '../components/basicInfo/designCompanyBasicInfo.vue'
import buildCompanyBasicInfo from '../components/basicInfo/buildCompanyBasicInfo.vue'
import estateCompanyBasicInfo from '../components/basicInfo/estateCompanyBasicInfo.vue'
import componentCompanyBasicInfo from '../components/basicInfo/componentCompanyBasicInfo.vue'

import project from '../components/projectInfo/project.vue'
import projectCheck from '../components/projectCheck/projectCheck'
import projectByEstateOwner from '../components/projectInfo/projectByEstateOwner'

//check basic information
import traditionalInfoCheck from '../components/checkInformation/traditionalInfoCheck'
import nonTraditionalInfoCheck from '../components/checkInformation/nonTraditionalInfoCheck'

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
        component: changePasswd
    },
    {
        path: '/machineryEnInfo',
        name: '设备生产企业-基本信息',
        component: changePasswd
    },
    {
        path: '/estateOwnerInfo',
        name: '建设单位-基本信息',
        component: changePasswd
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
        path: '/subUnitEnIn',
        name: '部品企业-产业化信息',
        component: changePasswd
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
        component: changePasswd
    },
    {
        path: '/subUnitEnInCheck',
        name: '设备企业-产业化审核',
        component: changePasswd
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
