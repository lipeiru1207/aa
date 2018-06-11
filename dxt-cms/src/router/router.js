import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login'
import Home from '@/views/home/home'
import Authority_admin from '@/components/authority/authorityadmin'
import Configuration_admin from '@/components/configurationadmin/configurationadmin'
import Employee_admin from '@/components/employeeadmin/employeeadmin'
import Mywork_admin from '@/components/myworkadmin/myworkadming'
import Working_admin from '@/components/workingadmin/workingadmin'
import Management from '@/components/management/management'
import Rename from '@/components/rename/rename'
import Transfer from '@/components/transfer/transfer'
import Maintain from '@/components/maintain/maintain'
import Other from '@/components/other/other'
import Employeeaccount from '@/components/management/components/employeeaccount/employeeaccount'
Vue.use(VueRouter)
let router =new VueRouter({
  routes:[
    {
      name:'login',
      path:'/login',
      component:Login,
      beforeEnter(to,from,next){
        console.log('enter login')
        next()
      }
    },
    {
      name:'home',
      path:'/home',
      component:Home,
      children:[
        {
          name:'Authority_admin',
          path:'Authority_admin',
          component:Authority_admin
        },
        {
          name:'Configuration_admin',
          path:'Configuration_admin',
          component:Configuration_admin
        },
        {
          name:'Employee_admin',
          path:'Employee_admin',
          component:Employee_admin
        },
        {
          name:'Mywork_admin',
          path:'Mywork_admin',
          component:Mywork_admin,
          children:[
            {
              name:'rename',
              path:'rename',
              component:Rename
            },
            {
              name:'transfer',
              path:'transfer',
              component:Transfer
            },
            {
              name:'maintain',
              path:'maintain',
              component:Maintain
            },
            {
              name:'other',
              path:'other',
              component:Other
            }
          ]
        },
        {
          name:'Working_admin',
          path:'Working_admin',
          component:Working_admin
        },
        {
          name:'Management',
          path:'Management',
          component:Management,
          children:[
            // {
            //   name:'Employeeaccount',
            //   path:'Employeeaccount',
            //   component:'Employeeaccount'
            // }
          ]
        }
      ]
    }
  ]
})
//导航守卫
//全局守卫
router.beforeEach((to,from,next)=>{
  if(to.name==='login'){
    next()
  }else{
    let islogin=sessionStorage.getItem('islogin')
    if(islogin){
      next()
    }else{
      next('/login')
    }
  }
})
export default router
