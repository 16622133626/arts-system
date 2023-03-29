import { createRouter, createWebHashHistory } from "vue-router"
import Main from "@/components/pages/Main.vue"
//注册页面路由
import Home from "@/components/pages/tabs/Home.vue"
import Cate from "@/components/pages/tabs/Cate.vue"
import My from "@/components/pages/tabs/My.vue"
import Publish from "@/components/pages/tabs/Publish.vue"
import Order from "@/components/pages/tabs/Order.vue"
import Search from "@/components/pages/Search.vue"
import SearchResult from "@/components/pages/SearchResult.vue"
import GoodDetail from "@/components/pages/GoodDetail.vue"
import ActiveGoodDetail from "@/components/pages/ActiveGoodDetail.vue"
import ActivePublish from "@/components/pages/Publish.vue"
import Login from "@/components/pages/Login.vue"
import Register from "@/components/pages/register.vue"
import Splash from "@/components/pages/Splash.vue"
import BlankPage from "@/components/pages/BlankPage.vue";
import ActiveCate from "@/components/pages/ActiveCate.vue";
import UploadAvatar from "@/components/pages/UploadAvatar.vue"
import Cart from "@/components/pages/Cart.vue"
import ThisMyWork from "@/components/pages/ThisMyWork.vue"
import QueryDetail from "@/components/pages/querydetail.vue"
import ActiveDetail from "@/components/pages/activeDetail.vue"
import NewsDetail from "@/components/pages/NewsDetail.vue"
import History from "@/components/pages/History.vue"
import GetPrize from "@/components/pages/getPrize.vue"
import HelpExe from "@/components/pages/helpExe.vue"
import MyWork from "@/components/pages/MyWork.vue"
import Collet from "@/components/pages/collet.vue"
import Like from "@/components/pages/like.vue"
import PrizeWork from "@/components/pages/prizeWork.vue"
import Component from "@/components/pages/component.vue"
import Contribute from "@/components/pages/contribute.vue"

import {getItem} from "@/kits/LocalStorageKit.js"

const checkLogin = (to,from) => {
    //校验是否登录 路由守卫函数
    const token = getItem("token")
    if(token && token !== ""){
        return 
    }else{
        return {path:"/login"}
    }
}

const checkIsArt = (to,from) => {
    //校验是否入驻画师 路由守卫函数
    // const token = getItem("token")
    // if(token && token !== ""){
    //     return 
    // }else{
    //     return {path:"/login"}
    // }
}

//firstOpen 为空字符串是，代表用户"第一次打开或使用"
const firstOpen = getItem("firstOpen")

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            //重定向
            redirect: {
                // path: "/main/home"
                path:firstOpen === "" ? "/splash" : "/main/home"
            }
        },
        {
            path:"/splash",
            component:Splash
        },
        {
            path: "/main",  //一级路由
            component: Main,
            children: [
                { path: "home", component: Home },
                { path: "cate", component: Cate },
                { path: "order", component: Order },
                { path: "my", component: My },
                { path: "publish", component: Publish }
            ]
        },
        {
            path: "/search",
            component: Search
        },
        {
            path: "/pulish/:id",
            component: ActivePublish
        },
        {
            path: "/searchresult",
            component: SearchResult
        },
        {
            path: "/history",
            component: History
        },
        {
            path: "/gooddetail/:id",
            name: "gooddetail",
            component: GoodDetail
        },
        {
            path: "/activegooddetail/:activeid/:id/:type",
            name: "activegooddetail",
            component: ActiveGoodDetail
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/register",
            component: Register
        },
        {
            path:"/blankpage",
            component:BlankPage
        },
        {
            path:"/prizework/:id",
            component:PrizeWork
        },
        {
            path:"/activecate",
            component:ActiveCate
        },
        {
            path:"/querydetail",
            component:QueryDetail
        },
        {
            path:"/component",
            component:Component
        },
        {
            path:"/collet",
            component:Collet
        },
        {
            path:"/like",
            component:Like
        },
        {
            path:"/contribute",
            component:Contribute
        },
        {
            path:"/mywork",
            component:MyWork
        },
        {
            path:"/thismywork",
            component:ThisMyWork
        },
        {
            path:"/getprize",
            component:GetPrize
        },
        {
            path:"/helpexe",
            component:HelpExe
        },
        {
            path:"/uploadavatar",
            component:UploadAvatar
        },
        {
            path:"/cart",
            component:Cart,
            //路由守卫
            beforeEnter:checkLogin
        },
        {
            path:"/activedetail/:id/:type",
            name:'activedetail',
            component:ActiveDetail
        },
        {
            path:"/newsdetail/:id/:type",
            name:'newsdetail',
            component:NewsDetail
        }
    ]
})

