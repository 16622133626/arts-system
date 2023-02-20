<script setup>
//先引入
import { ref, inject,computed } from 'vue'
import TopBar from "@/components/topbar/TopBar.vue";
import Content from "@/components/content/content.vue"
import productCardVertical from '@/components/product/productCardVertical.vue';
import { useRouter } from "vue-router"
// import { useStore } from "vuex"
import { useState } from "@/store/pageDirection"
import { gql } from "@/kits/HttpKit"

const router = useRouter()
// const store = useStore()
const state = useState()

const homeImgs_skeleton = ['']
const homeImgs = ref(homeImgs_skeleton)

const category_skeleton = [
        {
                name:"类别",
                goods:[
                        {},
                        {},
                        {}
                ]
        },
        {
                name:"类别",
                goods:[
                        {},
                        {},
                        {}
                ]
        }
]

const topTabs = [
        {
                value:1,
                name:'关注'
        },
        {
                value:2,
                name:'推荐'
        },
        {
                value:3,
                name:'热门'
        },
        {
                value:4,
                name:'今日'
        },
        {
                value:5,
                name:'新人'
        },
        {
                value:6,
                name:'活动'
        }
        
]

const moreContent = [
        {
        name:"爆款",
        fontColor:"#fff",
        backgroundColor:"red"
        },
        {
        name:"二手",
        fontColor:"#fff",
        backgroundColor:"blue"
       },
       {
        name:"热卖",
        fontColor:"#fff",
        backgroundColor:"yellow"
       },
       {
        name:"促销",
        fontColor:"#fff",
        backgroundColor:"green"
       }
]
const categorys = ref(category_skeleton)
const message = inject("$message")
const goto = () => {
        // store.commit("modules中的key/module中的方法名")
        // store.commit("pageDirection/setDirection", "forward")
        // router.push({
        //         path: "/search"
        // })
        state.setDirection("forward")
        router.push({
                path:'/search'
                
        })
}

// const initDataPromise = () => {
//         const params = {
//                 query:`
//                 {
//                         homeImgs
//                 }
//                 `
//         }

//        return gql(params).then((res) => {
//                 console.log(res)
//                 return {code:"ok"}
//         }).catch((e) => {
//                 message.warning(message)
//                 return {code:"failed"}
//         })
// }


// initDataPromise()

const initData = async () => {
        const dictId = "goods_type"
        const types = '["03","04"]'
        const start = 0, count = 5;
        const params = {
                query: `
                {
                        homeImgs
                        categorys (id:"${dictId}",type:${types}){
                                     id
                                     name
                                     goods (start:${start},count:${count}) {
                                        name
                                        id
                                        price
                                        imgpath
                                        type (id:"${dictId}"){
                                                name
                                                id
                                         }
                                }
                        }
                }`
        }
        try {
                const res = await gql(params)
                homeImgs.value = res.data.homeImgs
                categorys.value = res.data.categorys
                // console.log(res)
                return { code: "ok" }
        } catch (e) {
                message.warning(e.message)
                return { code: 'failed' }
        }
}

initData()

const seeAll = type => {
    // console.log(`要查看类别为${type}的所有商品`)
    goto("/searchresult",{
        type
    })
}

const gotocart = () => {
    state.setDirection("forward")
    router.push({
                path:'/cart'
                
        })
}

const moreContentStyle = computed(() => {
        //本身计算属性不能传参，但是可以利用闭包的形式
        //包裹一层函数接受传参
        return (bgColor,fontColor) => {
                return {
                backgroundColor:bgColor,
                color:fontColor
        }
        }
})

</script>
<template>

        <div>
                <top-bar @handleTabbar="goto">
                        <template v-slot:left>
                                <span class="iconfont icon-saoyisao" style="font-size:18px;"></span>
                        </template>
                        <template v-slot:right>
                                <span class="iconfont icon-gouwuche" style="font-size:18px;" @click="gotocart"></span>
                        </template>
                </top-bar>
                <van-tabs v-model:active="active" swipeable>
                     <van-tab v-for="item in topTabs" :title="item.name">
                        <van-empty v-if="item.name === '关注'" description="暂时还没有关注哦~" />
                        <content v-else :hasTabBar="true" :pull="true" :refresFunc="initData">
                        <a-carousel v-if="item.name === '推荐'">
                                <div v-for="(item,index) in homeImgs">
                                        <h3>{{index+1}}</h3>
                                        <img class="carousel-img" v-if="item !== ''" :src="item">
                                </div>

                        </a-carousel>
                        <div v-for="item in categorys">
                                <div class="category-title">
                                        <div>{{item.name}}</div>
                                        <div class="category-title-action" @click="seeAll(item.id)">查看全部</div>
                                </div>
                                <div class="category-list">
                                        <product-card-vertical
                                        :product="good"
                                         style="margin-right:12px;"
                                          v-for="good in item.goods"></product-card-vertical>
                                </div>

                        </div>
                        <div class="more-content-title">
                                <div>更多内容</div>
                        </div>
                        <div class="more-content">
                                <div 
                                v-for = "item in moreContent" 
                                class="more-content-item" 
                                v-bind:style="moreContentStyle(item.backgroundColor,item.fontColor)">
                                {{item.name}}</div>
                        </div>
                </content>
                     </van-tab>
                </van-tabs>
                

        </div>

</template>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-slide) {
        text-align: center;
        border-radius: 6px;
        height: 180px;
        line-height: 120px;
        background: #e5e5e5;
        overflow: hidden;
        position: relative;
}

.ant-carousel :deep(.slick-slide h3) {
        color: #fff;
}

/* 绝对定位移到上方 */
.carousel-img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
}
.category-title {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        color:rgb(0 0 0 / 0.5);

}
.category-title-action {
        color: rgb(212, 115, 183);
        font-weight: 600;
}

.category-list {
        display: flex;
        overflow-x: auto;
        margin-top: 12px;
}
.more-content-title {
        display:flex;
        justify-content:space;
        margin-top:16px;
        color:rgb(0 0 0 / 0.5);
        font-size:14px;
}
.more-content {
        display:flex;
        overflow-x:auto;
        margin-top:12px;

}
.more-content-item {
        height:80px;
        width:100px;
        border-radius:8px;
        margin-right:8px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
}
</style>