<script setup>
//先引入
import {inject,ref} from "vue"
import TopBar from "@/components/topbar/TopBar.vue";
import Content from "@/components/content/content.vue"
import { useRouter } from "vue-router"
import {getArray,setArray,clearItem} from "@/kits/LocalStorageKit.js"
// import { useStore } from "vuex"
// const store = useStore()
import {useState} from "@/store/pageDirection"

const message = inject("$message")

const historySearch = ref(getArray("historySearch"))

let searchContent = ""//对于搜索入口页面，这个变量不需要绑定
const router = useRouter()
const state = useState()

const back = () => {
    // store.commit("pageDirection/setDirection", "backward")
    state.setDirection("backward")
    router.go(-1)//浏览器向左回退
    //router.back
}

const search = () => {
    // store.commit("pageDirection/setDirection", "forward")
    if(searchContent !== ""){
        state.setDirection("forward")
        router.push({
              path: "/searchresult",
              query:{
                searchContent
              }
    })
    //在本地缓存中追加一个新内容
    setArray("historySearch",searchContent)
    }else{
        message.warning("请输入要查询的东西")
    }
    
}
// 接受子组件的最新输入值
const searchContentChange = content => {
    console.log("search 组件中 输入框的最新值是：",content)
    searchContent = content
}

const clearHistry = () => {
    clearItem("historySearch")  //仅仅是删除浏览器的内地缓存
    historySearch.value = []   //删除页面上的双向绑定变量
}

const quickSearch = (contentFromTag) => {
    state.setDirection("forward")
        router.push({
              path: "/searchresult",
              query:{
                searchContent:contentFromTag
              }
    })
}
</script>
<template>
    <div>
        <top-bar :searchInput="searchContent" :edit="true" @searchContentChangeHandle="searchContentChange"> 
            <template v-slot:left>
                <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
            </template>
            <template v-slot:right>
                <span @click="search">搜索</span>
            </template>
        </top-bar>
        <content>
          <div class="title-bar">
            <div class="title">最近搜索</div>
            <div class="clear" @click="clearHistry">全部清除</div>
            
          </div>
          <div class="histoty-search">
           <div @click="quickSearch(item)" class="history-search-item" v-for="item in historySearch">{{item}}</div>    
        </div>
        </content>
        <!-- 最新的搜索内容 -->
    </div>
</template>

<style scoped>
    .title-bar{
        display: flex;
        justify-content: space-between;
    }

    .title {
        color: rgb(0 0 0 / 0.5);
        font-size: 14px;
    }
    .clear {
        color: #1989fa;
        font-size: 14px;
    }
    .histoty-search {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
    }
    .history-search-item{
        margin-right: 8px;
        margin-top: 12px;
        padding: 3px 9px;
        box-shadow: 0px 1px 8px rgb(0 0 0 / 0.2);
        border-radius: 10px;
    }
</style>
