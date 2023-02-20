<script setup>
import TopBar from "@/components/topbar/TopBar.vue";
import { useRouter } from "vue-router"
import { useState } from "@/store/pageDirection"

const router = useRouter()
const state = useState()
const gotoPlay = () => {
    console.log('4444')
    state.setDirection("forward")
    router.push({
        path: "/blankpage"
                
        })
}
const gotoCompany = () => {
    console.log('4444')
    state.setDirection("forward")
    router.push({
        path: "/blankpage"
                
        })
}
const gotoGet = () => {
    console.log('4444')
    state.setDirection("forward")
    router.push({
        path: "/blankpage"
                
        })
}
const gotoStudy = () => {
    console.log('4444')
    state.setDirection("forward")
    router.push({
        path: "/blankpage"
                
        })
}
</script>
<template>
  <div>
    <div class="toppper">
        <div>
          <div style="margin-left: 40%" @click="gotoPlay">
            <span class="iconfont icon-huodong2"></span>
          </div>
          <div>活动任务</div>
        </div>
        <div>
          <div style="margin-left: 40%" @click="gotoGet">
            <span class="iconfont icon-fenqishangcheng"></span>
          </div>
          <div>获奖领取</div>
        </div>
        <div>
          <div style="margin-left: 40%" @click="gotoStudy">
            <span
              style="width: 3vh"
              class="iconfont icon-xiangqingjieshao"
            ></span>
          </div>
          <div>新手必看</div>
        </div>
        <div>
          <div style="margin-left: 40%" @click="gotoCompany">
            <span class="iconfont icon-baozhengjindanbao"></span>
          </div>
          <div>活动合作</div>
        </div>
      </div>
  </div>
</template>
<style>
.toppper {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5em;
}
</style>
