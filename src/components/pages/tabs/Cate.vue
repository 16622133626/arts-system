<script setup>
import { inject, ref } from "vue";
import TopBar from "@/components/topbar/TopBar.vue";
import ActiveItem from "@/components/actives/activeItem.vue"
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import Content from "@/components/content/Content.vue";
import { getItem, clearItem } from "@/kits/LocalStorageKit";
import { gql,myHttp } from "@/kits/HttpKit";

const router = useRouter();
const state = useState();
const message = inject("$message");
const categorys = ref("");
const activeList = ref([])
const gotoPlay = () => {
  state.setDirection("forward");
  router.push({
    path: "/activecate",
  });
};
const gotoCompany = () => {
  console.log("4444");
  state.setDirection("forward");
  router.push({
    path: "/component",
  });
};
const gotoGet = () => {
  state.setDirection("forward");
  router.push({
    path: "/getprize",
  });
};
const gotoStudy = () => {
  console.log("4444");
  state.setDirection("forward");
  router.push({
    path: "/helpexe",
  });
};

const initData = async () => {
  const dictId = "active_status";
  const types = '["01","02","03","04","05","06"]';
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
    categorys.value = res.data.categorys;
    console.log(res,categorys.value);
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};
initData();

// 进入页面时更新活动当前状态
const UpdateStatus =async () => {
  const newTime = new Date().valueOf() //获取当前时间
  console.log('555hahahha',newTime,activeList.value)
  activeList.value.forEach(async e => {
    const oldTime = e.resultTime
    const startTime = e.startTime
    // 报名开始和报名结束时间
    const endTime = e.endTime
    //  判断时间 如果当前时间大于结束时间 活动结束
    if(oldTime < newTime) {
      const res = await myHttp('/api/updatetime',{
             status:'06'
        })
      if(res.code === 1) {
        // 如果状态更新成功 重新查询更新页面初始化数据
        initData()
      }
        // 如果当前时间大于开始时间小于结束时间 活动报名中
    } else if(startTime<newTime<endTime) {
      const res2 = await myHttp('/api/updatetime',{
             status:'02'
        })
        if(res2.code === 1) {
        // 如果状态更新成功 重新查询更新页面 初始化数据
        initData()
      }
    }
  })
  // const res = await myHttp('/api/updatetime',{

  // })
}
const created = () => {
  initData();
}
created()

const QueryAllActive = async () => {
  const res = await myHttp('/api/queryactiveInfo',{})
  if(res.code === 1) {
    activeList.value = res.data
  }
}

// 更新时间状态
const mounted = () => {
  QueryAllActive()
  UpdateStatus()
}
mounted()
</script>
<template>
  <TopBar>
    <template v-slot:middle>
      <div class="top-title">全部活动</div>
    </template>
  </TopBar>
  <content :pull="true" :hasTabBar="true">
    <div class="toppper">
      <div class="play">
        <div style="margin-left: 40%" @click="gotoPlay">
          <span class="iconfont icon-huodong2"></span>
        </div>
        <div>活动任务</div>
      </div>
      <!-- <div class="play">
        <div style="margin-left: 40%" @click="gotoGet">
          <span class="iconfont icon-fenqishangcheng"></span>
        </div>
        <div>获奖领取</div>
      </div> -->
      <div class="play">
        <div style="margin-left: 40%" @click="gotoStudy">
          <span
            style="width: 3vh"
            class="iconfont icon-xiangqingjieshao"
          ></span>
        </div>
        <div>新手必看</div>
      </div>
      <div class="play">
        <div style="margin-left: 40%" @click="gotoCompany">
          <span class="iconfont icon-baozhengjindanbao"></span>
        </div>
        <div>活动合作</div>
      </div>
    </div>
    <div v-for="item in categorys">
      <!-- <div class="product-container" v-for="active in item">{{ active.playImgpath }}</div> -->
      <active-item :active="active" v-for="active in item.actives"></active-item>
    </div>
  </content>
</template>
<style>
.play:hover {
  color: #1989fa;
}
.toppper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}
.top-title {
  font-weight: 600;
  font-size: 20px;
    text-align: center;
}
.product-img {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 100%;
  height: 170px;
}
.product-container {
  width: 100%;
  height: 240px;
  background-color: aqua;
  border-radius: 10px;
}
</style>
