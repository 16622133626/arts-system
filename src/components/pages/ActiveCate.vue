<script setup>
import {ref,inject} from "vue"
import TopBar from "@/components/topbar/TopBar.vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import Content from "@/components/content/content.vue";
import ActiveItem from "@/components/actives/activeItem.vue";
import { gql,myHttp } from "@/kits/HttpKit";

const state = useState();
const router = useRouter();
const categorys = ref("");
const categorys1 = ref("");
const categorys2 = ref("");
const message = inject("$message");
const topTabs = [
  {
    value: '01',
    name: "未开始",
  },
  {
    value: '02',
    name: "已结束",
  },
  {
    value: '03',
    name: "火热报名中",
  },
];


const initData = async (x) => {
  const dictId = "active_status";
  const types = '["06"]';
// const types = [x];
console.log('type',types)
  const start = 0,
    count = 10;
  const params = {
    query: `
                {
                  categorys (id:"${dictId}",type:${types}){
                                     id
                                     name
                                     actives (start:${start},count:${count}) {
                                            id
                                                  name
                                                  people
                                                  workCount
                                                  playImgpath
                                                  prize
                                                  status (id:"active_status") {
                                              id
                                                    name
                                                  }
                                                }
                                              }
                }`,
  };
  try {
    const res = await gql(params);
    categorys.value = res.data.categorys;
    console.log(res);
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

initData()

const initData1 = async (x) => {
  const dictId = "active_status";
  const types = '["02"]';
  console.log('type',types)
  const start = 0,
  count = 10;
  const params = {
    query: `
                {
                  categorys (id:"${dictId}",type:${types}){
                                     id
                                     name
                                     actives (start:${start},count:${count}) {
                                            id
                                                  name
                                                  people
                                                  workCount
                                                  playImgpath
                                                  prize
                                                  status (id:"active_status") {
                                              id
                                                    name
                                                  }
                                                }
                                              }
                }`,
  };
  try {
    const res = await gql(params);
    // homeImgs.value = res.data.homeImgs
    categorys2.value = res.data.categorys;
    console.log(res);
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

initData1()

const fetchData = async (x) => {
  const dictId = "active_status";
  const types = '["01"]';
// const types = [x];
console.log('type',types)
  const start = 0,
    count = 10;
  const params = {
    query: `
                {
                  categorys (id:"${dictId}",type:${types}){
                                     id
                                     name
                                     actives (start:${start},count:${count}) {
                                            id
                                                  name
                                                  people
                                                  workCount
                                                  playImgpath
                                                  prize
                                                  status (id:"active_status") {
                                              id
                                                    name
                                                  }
                                                }
                                              }
                }`,
  };
  try {
    const res = await gql(params);
    // homeImgs.value = res.data.homeImgs
    categorys1.value = res.data.categorys;
    console.log(res);
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

fetchData()

const back = () => {
  state.setDirection("backward");
  router.go(-1);
};
</script>

<template>
  <div>
    <top-bar>
      <template v-slot:left>
        <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
      </template>
      <template v-slot:middle>
        <div>活动任务</div>
      </template>
    </top-bar>
    <van-tabs v-model:active="active" swipeable>
      <van-tab v-for="item in topTabs" :title="item.name">
        <content v-if="item.name === '已结束'" :hasTabBar="true" :pull="true" :refresFunc="initData">
          <div v-for="item in categorys">
            <!-- <div class="product-container" v-for="active in item">{{ active.playImgpath }}</div> -->
            <active-item
              :active="activeItem"
              v-for="activeItem in item.actives"
            ></active-item>
          </div>
        </content>

        <content v-if="item.name === '未开始'" :hasTabBar="true" :pull="true" :refresFunc="fetchData">
          <div v-for="item in categorys1">
            <!-- <div class="product-container" v-for="active in item">{{ active.playImgpath }}</div> -->
            <active-item
              :active="activeItem"
              v-for="activeItem in item.actives"
            ></active-item>
          </div>
        </content>
        <content v-if="item.name === '火热报名中'" :hasTabBar="true" :pull="true" :refresFunc="initData1">
          <div v-for="item in categorys2">
            <!-- <div class="product-container" v-for="active in item">{{ active.playImgpath }}</div> -->
            <active-item
              :active="activeItem"
              v-for="activeItem in item.actives"
            ></active-item>
          </div>
        </content>
      </van-tab>
    </van-tabs>
  </div>
</template>
