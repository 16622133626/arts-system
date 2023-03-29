<script setup>
import TopBar from "@/components/topbar/TopBar.vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import Content from "@/components/content/Content.vue";

const state = useState();
const router = useRouter();

const back = () => {
  state.setDirection("backward");
  router.go(-1);
};

const gotoExe = () => {
  state.setDirection("forward");
  router.push({
        path: "/helpexe"   
        })
};
</script>

<template>
  <div>
    <top-bar style="box-shadow: unset">
      <template v-slot:left>
        <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
      </template>
      <template v-slot:middle>
        <div>获奖领取</div>
      </template>
    </top-bar>
    <Content :hasTabBar="true" :pull="true">
        <div style="font-weight: 600;font-size:18px ;">我的获奖</div>
        <a-button type="primary" size="large" @click="gotoExe">疑问解答 >></a-button>
    </Content>
  </div>
</template>
