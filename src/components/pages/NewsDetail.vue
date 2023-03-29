<script setup>
import TopBar from "@/components/topbar/TopBar.vue";
import { useState } from "@/store/pageDirection";
import { ref, inject, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Content from "@/components/content/Content.vue";
import { gql } from "@/kits/HttpKit";

const state = useState();
const router = useRouter();
const route = useRoute()

const message = inject("$message");
const find = ref({});
const news = ref([]);
const workBg = ref("");

const back = () => {
  state.setDirection("backward");
  router.go(-1);
};

const fetchData = async () => {
  const id = route.params.id;
  const type = route.params.type;
  console.log("HAHAH", type);
  console.log("fetchData", route.params.type);
  const p = {
    query: `
                {
                    new (id:"${id}") {
                        id
                        title
                        content
                        intro
                        findImgpath
                    }
                    news (type:"${type}",start:0,count:5){
                        id
                        title
                        content
                        intro
                        findImgpath
                                                  status (id:"news_status") {
                                              id
                                                    name
                                                  }
                    }
                }
            `,
  };
  //查询数据
  try {
    const res = await gql(p);
    find.value = res.data.new;
    news.value = res.data.news.filter((item) => item.id != id);
    workBg.value = res.data.new.findImgpath
    return { code: "ok" };
  } catch (e) {
    // console.log(e)
    message.error(e.message);
    return { code: "failed" };
  }
};

fetchData();

watch(
  () => route.path,
  (curr) => {
    // console.log("curr:",curr)
    if (curr.indexOf("/newsdetail/") >= 0) {
      fetchData();
    }
  }
);
</script>

<template>
  <div>
    <top-bar style="box-shadow: unset">
      <template v-slot:left>
        <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
      </template>
      <template v-slot:middle>
        <div>资讯详情</div>
      </template>
    </top-bar>
    <Content :pull="true" :refresFunc="fetchData" :hasTabBar="true">
      <h1>{{ find.title }}</h1>
        <!-- <div class="work-bg1"></div> -->
        <img class="work-bg1" :src="workBg"/>
        <div style="color:black;font-size:16px ; text-align:center;">{{ find.title }}</div>
        <div>{{ find.addTime}}</div>
        <div>{{ find.content }}</div>
    </Content>
  </div>
</template>

<style>
.work-bg1 {
  height: 200px;
  width: 100%;
  background-size: cover;
  margin-bottom: 5px;
}
</style>
