<script setup>
import { ref, inject, watch,computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useState } from "@/store/pageDirection";
import productCardVertical from "@/components/product/productCardVertical.vue";
//起别名 为了不起冲突
import { useState as useCartState } from "@/store/cart";
import { getItem, clearItem } from "@/kits/LocalStorageKit";
import { gql } from "@/kits/HttpKit";
import { myHttp } from "@/kits/HttpKit";

import TopBar from "@/components/topbar/TopBar.vue";
import Content from "@/components/content/Content.vue";

const cartState = useCartState();
const router = useRouter();
const route = useRoute();
const state = useState();
const message = inject("$message");
const active = ref({});
const actives = ref([]);
const workBg = ref("");
const joinWork = ref([])
const categorys5 = ref([]);
const PlayStatus = computed(() => {
    switch(route.params.type){
        case "06":
            return "已结束"
        case "01":
            return "未开始"
        case "02":
            return "报名中"
        case "03":
            return "作品征集"
        case "04":
            return "评审中"
        case "05":
            return "结果公布"
    }
})

const back = () => {
  state.setDirection("backward");
  router.go(-1);
};

const goto = (id) => {
    // 直接去上传页面
    router.push({path:`/main/publish`,query:{id:route.params.id}})
}

const join = async (id,status) => {
  try { 
    if (status === "报名中") {
    const res = await cartState.createOrder(id)
        if(res.code === 1){
            message.success(res.msg)
            // 调用更新报名数量的接口
            const resUpdate = await myHttp('/api/updatepeoplecount',{
              id
            })
            // 实时更新
            fetchData();
        }else{
            message.warning(res.msg)
        }
  } else {
    message.warning('不在报名范围内')
  }    
    }catch(e){
        message.warning(e.message)
    }
}

const fetchData = async () => {
  const id = route.params.id;
  const type = route.params.type;
  console.log('HAHAH',type)
  console.log("fetchData", route.params.type);
  const p = {
    query: `
                {
                    active (id:"${id}") {
                        id
                        name
                        people
                        workCount
                        startTime
                        endTime
                        resultPubTime
                        playImgpath
                        prize
                    }
                    actives (type:"${type}",start:0,count:5){
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
            `,
  };
  //查询数据
  try {
    const res = await gql(p);
    active.value = res.data.active;
    actives.value = res.data.actives.filter((item) => item.id != id);
    workBg.value = `url(${res.data.active.playImgpath})`;
    return { code: "ok" };
  } catch (e) {
    // console.log(e)
    message.error(e.message);
    return { code: "failed" };
  }
};

fetchData();

const initData5 = async () => {
  const dictId = "goods_type";
  const types = '["05"]';
  const start = 0,
    count = 20;
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
                                        likeCount
                                        publishTime
                                        joinActives
                                        status
                                        collectionCount
                                        imgpath
                                        type (id:"${dictId}"){
                                                name
                                                id
                                         }
                                }
                        }
                }`,
  };
  try {
    const res = await gql(params);
    console.log('eee',route.params.id)
    res.data.categorys[0].goods.forEach((e,index) => {
      // 查询当前活动参赛作品
      if(e.joinActives === route.params.id) {
        categorys5.value.push(e)
        console.log('eee',categorys5.value)
      }
    })
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};


watch(
  () => route.path,
  (curr) => {
    // console.log("curr:",curr)
    if (curr.indexOf("/activedetail/") >= 0) {
      fetchData();
    }
  }
);

const QueryUser =async () => {
  const id = route.params.id
  const res = await myHttp('/api/queryerrolluser',{})
  console.log('res',res)
  res.data.forEach(e => {
    e.list.forEach(e => {
      if(e === id) {
      console.log('444',e)
      }
    })
  })
}

const QueryJionWork =async () => {
  const res = await myHttp('/api/queryjoinwork',{id:route.params.id})
  console.log('res',res)
  joinWork.value = res.data

}

const order = () => {
  //将当前商品加入购物车
  //再跳转页面
  goto("/cart");
};

const mounted = () => {
  QueryUser()
  QueryJionWork()
  initData5()
}
mounted()
</script>

<template>
  <div>
    <top-bar>
      <template v-slot:left>
        <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
      </template>
      <template v-slot:middle>
        <div>活动详情</div>
      </template>
    </top-bar>
    <content :pull="true" :refresFunc="fetchData">
      <div class="work-bg1"></div>
      <div class="good-content">
        <div class="good-content-left">
          <div class="good-title">{{ active.name }}</div>
          奖励规模：
          <div style="font-size:16px;color: red">{{ active.prize }}</div>
        </div>
        <div class="good-content-right">{{ PlayStatus }}</div>
      </div>
      
      <div style="color: rgb(0 0 0 / 0.5); margin-right: 15px">
            投稿时间: <span>{{ active.startTime }}-{{ active.endTime }}</span>
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
            <van-button class="button" size="small" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="goto">上传作品</van-button>
            <van-button class="button" size="small" type="primary" @click="join(active.id,PlayStatus)" plain>报名参赛</van-button>
          </div>
          <!-- <div style="margin-top: 12px;">参赛人员:</div>
          <div class="playjoin">
            <img/>
          </div> -->
          <!-- 渲染当前参赛作品 -->
          <div style="margin-top: 12px;">参赛作品:</div>
          <div class="category-list">
              <product-card-vertical
                :product="good"
                style="margin-right: 12px"
                v-for="good in categorys5"
              ></product-card-vertical>
            </div>
    </content>
  </div>
</template>

<style scoped>
.ant-carousel :deep(.slick-slide) {
  margin-top: 12px;
  height: 160px;
  background: #e5e5e5;
  overflow: hidden;
  border-radius: 1px;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}

.category-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  /* float: left; */
  /* overflow-x: auto; */
  margin-top: 12px;
}

.good-bg {
  height: 160px;
  width: 100%;
  background-image: v-bind(goodBg);
  background-size: contain;
}

.work-bg1 {
  height: 200px;
  width: 100%;
  background-image: v-bind(workBg);
  background-size: cover;
  margin-bottom: 5px;
}

.good-content {
  display: flex;
  margin-top: 30px;
  padding: 0 6px;
  box-sizing: border-box;
  border-bottom-style: solid;
    border-width: 1px;
    border-bottom-color: #e3e2e2;
}
.good-content-left {
  flex: 8;
}

.playjoin {
  margin-top: 10px;
  width: 100%;
  height: 60px;
  background-color:#f5f5f5;
}

.good-content-right {
  flex: 2;
  border-left-style: solid;
    border-left-color: #e3e2e2;
    border-width: 1px;
    line-height: 100px;
    padding-left: 20px;
    font-size: 20px;
    color:rgba(77, 73, 73, 0.5);
}

.good-title {
  font-size: 16px;
  font-weight: bold;
  color: rgb(0 0 0 / 0.8);
}
.good-desc {
  font-size: 16px;
  font-weight: bold;
  color: rgb(0 0 0 / 0.3);
}

.category-title {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  color: rgb(0 0 0 / 0.5);
  font-size: 14px;
}

.comment {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 16px;
  color: rgb(0 0 0 / 0.5);
  font-size: 14px;
}

.category-list {
  display: flex;
  overflow-x: auto;
  margin-top: 12px;
}
.button-container {
    display: flex;
    justify-content: space-between;
}
.button {
    width: 13em;
}
</style>
