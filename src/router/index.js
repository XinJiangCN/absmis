import Vue from 'vue'
import Router from 'vue-router'

//For router-use
import changePasswd from '../components/changePasswd.vue'
import accountMaintain from '../components/accountMaintain.vue'





Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/changepasswd',
      name: 'changepasswd',
      component: changePasswd
    },
    {
        path: '/accountmaintain',
        name: 'accountmaintain',
        component: accountMaintain
    }
  ]
})
