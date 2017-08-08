import Vue from 'vue'
import Router from 'vue-router'

//For router-use

//public 
import changePasswd from '../components/changePasswd.vue'
import accountMaintain from '../components/accountMaintain.vue'

//basic info
import designCompanyBasicInfo from '../components/basicInfo/designCompany.vue'
import buildCompanyBasicInfo from '../components/basicInfo/buildCompany.vue'
import estateCompanyBasicInfo from '../components/basicInfo/estateCompany.vue'
import componentCompanyBasicInfo from '../components/basicInfo/componentCompany.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
        path: '/changepasswd',
        name: '更改密码',
        component: changePasswd
    },
    {
        path: '/accountmaintain',
        name: '账户维护',
        component: accountMaintain
    },
    {
        path: '/designcompanyinfo',
        name: '设计企业-基本信息',
        component: designCompanyBasicInfo
    },
    {
        path: '/buildcompanyinfo',
        name: '施工企业-基本信息',
        component: buildCompanyBasicInfo 
    },
    {
        path: '/estatecompanyinfo',
        name: '房地产企业-基本信息',
        component: estateCompanyBasicInfo
    },
    {
        path: '/componentcompanyinfo',
        name: '构件部品生产企业及其他',
        component: componentCompanyBasicInfo
    }
    ]
})
