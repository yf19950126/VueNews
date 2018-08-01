import Vue from 'vue'
import Router from 'vue-router'
import indexList from '@/components/indexList/indexList'
import content from '@/components/content/content'
import search from '@/components/search/search'
import setting from '@/components/setting/Setting'
import Login from "../components/login/Login"
import Person from "../components/users/Person"
import Register from "../components/register/Register"
import Like from "../components/like/Like"
import Connect from "../components/connect/connect"
import Comment from "../components/comment/Comment"
import Fb from "../components/fb/Fb"
import Write from "../components/write/Write"
import pipper from "../components/pipper/Pipper"
import pipper1 from "../components/pipper/Pipper1"
Vue.use(Router)

export default new Router({
  routes: [
    // 首页重定向
    {
        path: '/',
        redirect: '/indexList/__all__'
    },
    {
      path: '/user',
      component: Person,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/like',
      component: Like,
    },
    {
      path: '/write',
      component: Write,
    },
    {
      path: '/connect',
      component: Connect,
    },
    {
      path: '/comment',
      component: Comment,
    },
    {
      path: '/fb',
      component: Fb,
    },
    {
      path:"/pipper",
      component: pipper,
    },
    {
      path:"/pipper1",
      component: pipper1,
    },
   //动态路由传nav参数
    {
      path: '/indexList/:id',
      component: indexList 
    },
    {
      path: '/content/:id',
      component: content ,
    },
    {
      path: '/search',
      component: search ,
    },
    {
      path: '/setting',
      component: setting ,
    }
    // {
    //   path: '/indexList',
    //   component: indexList ,
    //   children:[
    //     {
    //       path:'/indexList/push',
    //       component:Push
    //     }
    //   ]
    // },
  ],
})
