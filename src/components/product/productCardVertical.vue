<script setup>
import { computed,ref } from "vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import historyData from "@/store/histoty.js"
import { setItem } from "@/kits/LocalStorageKit";



const router = useRouter()
const state = useState()

const props = defineProps({
    product: Object
})


const imgStyle = computed(() => {
    return {
        backgroundImage: `url(${props.product.imgpath})`,
        backgroundSize: "cover"
    }
})

const Time = ref('')
const secondTime = ref('')
const result = ref('')
const minuteTime = ref('')
const hourTime = ref('')

const goto = () => {
    state.setDirection("forward")  //页面跳转到详情页面
    if(props.product.type.id === '05'){
        router.push({
        name: "activegooddetail",
        params: {
            activeid:props.product.joinActives,
            id: props.product.id,
            type:props.product.type.id
        }
    })
    }else {
        router.push({
        name: "gooddetail",
        params: {
            id: props.product.id,
            // type:props.product.type.id
        }
    })
    }
    // 将历史记录存到本地缓存中
    historyData.push(props.product)
    console.log('history',historyData)
    setItem('productro',JSON.stringify(historyData))
}

// const dataCompute = () => {
//     // 时间差计算 将当前时间转换为时间戳
//     const newTime = Date.parse(new Date())
//     const publicTime = props.product.publishTime
//     Time.value = newTime - Date.parse(publicTime)
//     secondTime.value = Time.value.getSeconds()  // 时间转化为秒
//     if(secondTime.value > 60) {//如果秒数大于60，将秒数转换成整数
//             //获取分钟，除以60取整数，得到整数分钟
//             minuteTime.value = parseInt(secondTime.value / 60);
//             //获取秒数，秒数取余，得到整数秒数
//             secondTime.value = parseInt(secondTime.value % 60);
//             //如果分钟大于60，将分钟转换成小时
//             if(minuteTime.value > 60) {
//                 //获取小时，获取分钟除以60，得到整数小时
//                 hourTime = parseInt(minuteTime.value / 60);
//                 //获取小时后取余的分，获取分钟除以60取余的分
//                 minuteTime.value = parseInt(minuteTime.value % 60);
//             }
//         }
//          result.value = "" + parseInt(secondTime.value) + "秒";
 
//         if(minuteTime > 0) {
//             result.value = "" + parseInt(minuteTime.value) + "分" + result;
//         }
//         if(hourTime > 0) {
//             result.value = "" + parseInt(hourTime.value) + "小时" + result;
//         }
//         return result.value;  
// }

// const mounted = () => {
//     dataCompute()
// }
// mounted()
</script>
<template>
    <div class="product-card" @click="goto">
        <div class="product-img" :style="imgStyle"><van-tag v-if="product.joinActives != ''" type="danger">活动</van-tag></div>
        <div class="product-desc">
            <div class="name-desc">
                <div class="title-name">{{product.name}}</div>
                <span class="time-pulish" style="color:rgb(0 0 0 / 0.5);font-size:10px;">{{ Time }}</span>
            </div>
            <div class="count-desc">
                <span style="color:rgb(0 0 0 / 0.5);font-size:10px;margin-right: 5px;"><van-icon name="like-o" />{{ product.likeCount }}</span>
                <span style="color:rgb(0 0 0 / 0.5);font-size:10px;"><van-icon name="star-o" />{{ product.collectionCount }}</span>
            </div>
            
            <!-- <div style="color: #fa6400;">￥{{product.likeCount}}</div> -->
        </div>
    </div>
</template>

<style scoped>
.product-card {
    width: 171px;
    height: 210px;
    background-color: beige;
    border-radius: 5px;
    flex-shrink: 0;
    margin-bottom: 15px;
    box-shadow: 2px 2px 5px #989595;
}

.product-img {
    height: 140px;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
}
.name-desc {
    display: flex;
    justify-content: space-between;
    border-bottom-style: solid;
    border-bottom-color: #e3e2e2;
}
.title-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100px;
}
.time-pulish {
    white-space: nowrap;
}
.count-desc {

}

.product-desc {
    height: calc(210px - 140px);
    background-color: #fff;
    padding: 12px;
    box-sizing: border-box;

}
</style>