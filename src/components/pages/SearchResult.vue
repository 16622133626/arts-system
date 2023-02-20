<script setup>
//先引入
import { ref, inject } from "vue"
import TopBar from "@/components/topbar/TopBar.vue";
import ProductCard from "@/components/product/ProductCard.vue"
import Content from "@/components/content/content.vue"
import { useRouter, useRoute } from "vue-router"
import { useState } from "@/store/pageDirection"
import { gql } from "@/kits/HttpKit"



// import { useStore } from "vuex";
const router = useRouter()
// const store = useStore()

const route = useRoute()
const state = useState()
const message = inject("$message")
let route_query_searchContent = route.query.searchContent
const data = ref([])
const loadingMore = ref(false)
const back = () => {
    // store.commit("pageDirection/setDirection","backward")
    state.setDirection("backward")
    router.go(-1)//浏览器向左回退
    //router.back
}
let start = 0, count = 6
// 接受子组件传来的最新输入值
const searchContentChange = content => route_query_searchContent = content

const search = () => {
    data.value = []
    start = 0
    searchData(route_query_searchContent)
}


// const search = () => {
//     myHttp("/search").then((arr) => {
//         console.log(1000,arr)
//         data.value = arr.filter(item => item.indexOf(route_query_searchContent) >= 0)
//     })
// }

const refresh =() => {
    data.value = []
    start = 0
    return searchData(route_query_searchContent)
}

const searchData = async (query) => {
    //变为异步
    // try{
    //     const arr = await myHttp("/search",{
    //         searchContent:query
    //     })
    //     console.log(10000,arr)
    //     data.value = arr
    // } catch(e){
    //     console.log("查询失败",e)
    // }
    
    try {
        const dictId = "goods_type"
        const p = {
            query: `
            {
                goods (name:"${query}",start:${start},count:${count}) {
                        id
                        count
                        type (id:"${dictId}"){
                            name
                            id
                        }
                        name
                        gooddesc
                        price
                        imgpath         
                  }
            }
            `
        }
        const res = await gql(p)
        // console.log(res)
        console.log("start",start)
        if(res.data.goods && res.data.goods.length > 0){
            data.value = data.value.concat(res.data.goods)
            start += res.data.goods.length
        }
        return {
            code:"OK"
        }
         //如果查询成功点击加载更多会加载出新的四条记录
    } catch (e) {
        console.log("查询失败", e)
        message.warning(e.message)
        return {
            code:"failed"
        }
    }

}
//refresh 返回的结果是一个promise对象是异步的
// const refresh =() => {
//     return new Promise((resolve,reject) => {
//         //模拟网络
//         setTimeout(() => {
//             resolve([1,2,3,4,5,6])
//         })
//     })
// }

const onLoadMore =async () => {
    loadingMore.value = true;
    // setTimeout(() => {
    //     loadingMore.value = false
    // },2000)
    console.log(11111111)
   await searchData(route_query_searchContent)  //继续查询
   console.log(33333333333)
   loadingMore.value = false
}

searchData(route_query_searchContent)



</script>
<template>
    <div>
        <top-bar :searchInput="route_query_searchContent" :edit="true" @searchContentChangeHandle="searchContentChange">
            <template v-slot:left>
                <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
            </template>
            <template v-slot:right>
                <span @click="search">搜索</span>
            </template>
        </top-bar>
        <content :refresFunc="refresh" :pull="true">
            <div class="title">有{{data.length}}个商品符合要求</div>
            <a-list :data-source="data">
                <template #renderItem="{item}">
                    <product-card :product="item"></product-card>
                </template>
                <template #loadMore>
                    <div v-if="data.length > 0" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                        <a-spin v-if="loadingMore"></a-spin> 
                        <a-button v-else style="color:#7f7f7f;border: unset;" @click="onLoadMore">加载更多</a-button>
                    </div>
                </template>
            </a-list>

        </content>

    </div>
</template>
<style scoped>

.title {
    color: #7f7f7f;
    font-weight: bold;
    margin-top: 12px;
}
</style>