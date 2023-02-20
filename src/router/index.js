import { createRouter, createWebHashHistory } from "vue-router"
import Main from "@/components/pages/Main.vue"
//注册页面路由
import Home from "@/components/pages/tabs/Home.vue"
import Cate from "@/components/pages/tabs/Cate.vue"
import My from "@/components/pages/tabs/My.vue"
import Order from "@/components/pages/tabs/Order.vue"
import Search from "@/components/pages/Search.vue"
import SearchResult from "@/components/pages/SearchResult.vue"
import GoodDetail from "@/components/pages/GoodDetail.vue"
import Login from "@/components/pages/Login.vue"
import Register from "@/components/pages/register.vue"
import Splash from "@/components/pages/Splash.vue"
import BlankPage from "@/components/pages/BlankPage.vue";
import UploadAvatar from "@/components/pages/UploadAvatar.vue"
import Cart from "@/components/pages/Cart.vue"
import OrderDetail from "@/components/pages/orderDetail.vue"
import VrRoom from "@/components/pages/VrRoom.vue"

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
                { path: "my", component: My }
            ]
        },
        {
            path: "/search",
            component: Search
        },
        {
            path: "/searchresult",
            component: SearchResult
        },
        {
            path: "/gooddetail/:id/:type",
            name: "gooddetail",
            component: GoodDetail
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
            path:"/orderdetail",
            component:OrderDetail
        },
        {
            path:"/vrroom",
            component:VrRoom
        }
    ]
})

