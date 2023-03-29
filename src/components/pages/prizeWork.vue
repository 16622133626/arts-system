<script setup>
import TopBar from "@/components/topbar/TopBar.vue";
import { useRouter, useRoute } from "vue-router";
import {inject} from "vue"
import { useState } from "@/store/pageDirection";
import Content from "@/components/content/Content.vue";

const state = useState();
const router = useRouter();
const route = useRoute();
const message = inject("$message");

const back = () => {
  state.setDirection("backward");
  router.go(-1);
};
</script>
<template>
  <div>
    <top-bar style="box-shadow: unset">
      <template v-slot:left>
        <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
      </template>
      <template v-slot:middle>
        <div>获奖作品</div>
      </template>
    </top-bar>
    <content :pull="true" :refresFunc="fetchData" :hasTabBar="true">
      <div class="work-bg1"></div>
      <div class="good-content">
        <div class="good-content-left">
          <div class="good-title">{{ active.name }}</div>
          奖励规模：
          <div style="font-size: 16px; color: red">{{ active.prize }}</div>
        </div>
        <div class="good-content-right">{{ PlayStatus }}</div>
      </div>

      <div style="color: rgb(0 0 0 / 0.5); margin-right: 15px">
        投稿时间: <span>{{ active.contributeTime }}</span>
      </div>
      <div style="color: rgb(0 0 0 / 0.5)">
        结果公布: <span>{{ active.resultPubTime }}</span>
      </div>

      <div style="color: rgb(0 0 0 / 0.5); margin-right: 15px">
        参与人数 <span>{{ active.people }}</span>
      </div>
      <div style="color: rgb(0 0 0 / 0.5)">
        作品数量 <span>{{ active.workCount }}</span>
      </div>
      <div class="button-container">
        <van-button
          class="button"
          size="small"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          @click="goto"
          >获奖作品</van-button
        >
        <van-button class="button" size="small" type="primary" plain
          >赛事介绍</van-button
        >
      </div>
    </content>
  </div>
</template>
