<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";


const router = useRouter()
const state = useState()

const props = defineProps({
    active: Object
})


const imgStyle = computed(() => {
    return {
        backgroundImage: `url(${props.active.playImgpath})`,
        backgroundSize: "cover"
    }
})

const goto = () => {
    state.setDirection("forward")  //页面跳转到明细页面
    router.push({
        name: "activedetail",
        params: {
            id: props.active.id,
            type:props.active.status.id
        }
    })
}
</script>
<template>
    <div class="product-card" @click="goto">
        <div class="product-img" :style="imgStyle"></div>
        <div class="product-desc">
            <div class="product-desc-left">
                <div>{{active.name}}</div>
                <div style="color:red">{{ active.prize }}</div>
                <div style="display:flex;">
                    <div style="color:rgb(0 0 0 / 0.5);margin-right: 15px;">参与人数 <span style="color:red;">{{active.people}}</span></div>
                    <div style="color:rgb(0 0 0 / 0.5)">作品数量 <span style="color:red;">{{active.workCount}}</span></div>
                </div>
            <!-- <div style="color: #fa6400;">￥{{active.likeCount}}</div> -->
            </div>
            <div class="product-desc-right">{{ active.status.name }}</div>
        </div>
    </div>
</template>

<style scoped>
.product-card {
    width: 100%;
    height: 300px;
    background-color: beige;
    border-radius: 5px;
    flex-shrink: 0;
    margin-bottom: 15px;
    box-shadow: 2px 2px 5px #989595;
}

.product-img {
    height: 200px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.product-desc {
    display: flex;
    height: calc(300px - 200px);
    background-color: #fff;
    padding: 12px;
    box-sizing: border-box;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}
.product-desc-left {
    font-weight: 600;
    flex: 8;
}
.product-desc-right {
    flex:2 ;
    border-left-style: solid;
    border-left-color: #e3e2e2;
    line-height: 80px;
    padding-left: 20px;
    color:rgb(0 0 0 / 0.5);
}
</style>