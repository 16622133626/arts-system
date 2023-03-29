<script setup>
import { ref } from "vue";
import TopBar from "@/components/topbar/TopBar.vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import historyData from "@/store/histoty.js";
import { myHttp } from "@/kits/HttpKit";
import Content from "@/components/content/content.vue";
import { getItem } from "@/kits/LocalStorageKit";
import productCardVertical from "@/components/product/productCardVertical.vue";

const state = useState();
const router = useRouter();
const collectList = ref([])
// const history = historyData
const history = ref(getItem("productro"));
const history1 = JSON.parse(history.value);
console.log("productro11", history1);
const back = () => {
  state.setDirection("backward");
  router.go(-1);
};

const QueryCollectData = async () => {
    const userId = getItem('userId')
    const token = getItem('token')
    const res = myHttp('/api/querycollect',{
        token,
        userId
    })
    collectList.value = res.data
        console.log('111',res.PromiseResult)
    // if(res.code === 1) {
    //     collectList.value = res.data.collectList
    //     console.log('111',res.data)
    // }
}

const QueryData =async () => {
  // QueryCollectData()
  // console.log('111',collectList.value)
  const res = myHttp('/api/querygood',{
    id:''
  })
  console.log('888',res)
}

const mounted = () => {
  // 进入页面查询收藏夹的数据
  QueryCollectData();
  QueryData()
};
mounted();
</script>

<template>
  <div>
    <top-bar style="box-shadow: unset">
      <template v-slot:left>
        <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
      </template>
      <template v-slot:middle>
        <div>我的收藏</div>
      </template>
    </top-bar>
    <content>
      <productCardVertical
        v-for="record in history1"
        style="margin-right: 12px; float: left"
        :product="record"
      ></productCardVertical>
    </content>
  </div>
</template>
