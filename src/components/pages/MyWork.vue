<script setup>
import TopBar from "@/components/topbar/TopBar.vue";
import { useRouter, useRoute } from "vue-router";
import { useState } from "@/store/pageDirection";
import Content from "@/components/content/content.vue";
import productCardVertical from "@/components/product/productCardVertical.vue";
import { myHttp } from "@/kits/HttpKit";
import { ref } from "vue";

const state = useState();
const router = useRouter();
const route = useRoute();
const userInfo = ref({});
const userWork = ref([]);
const myAvatar = ref("");
const myBackImg = ref("")
const active = ref(0);

const topTabs = [
  {
    value: "01",
    name: "作品",
  },
  {
    value: "02",
    name: "资料",
  },
];

const back = () => {
  state.setDirection("backward");
  router.go(-1);
};

const QueryUserInfo = async () => {
  console.log("query", route.query.userId);
  const resUser = await myHttp("/api/queryuserInfo", {
    id: route.query.userId,
  });
  userInfo.value = resUser.data;
  myAvatar.value = `http://127.0.0.1:4000/assets/upload/${resUser.data.avatar.substr(
    2
  )}`;
  myBackImg.value = `http://127.0.0.1:4000/assets/upload/${resUser.data.BackImg.substr(
    2
  )}`;
  console.log("userINNfomyAvatar.value", myAvatar.value);
};

const QueryUserWork = async () => {
  const resWork = await myHttp("/api/queryuserwork", {
    id: route.query.userId,
  });
  userWork.value = resWork.data;
  userWork.value.forEach(e => {
    e.imgpath = `http://127.0.0.1:4000/assets/upload/${e.imgpath}`
    e.imgpathDetail1 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail1}`
    e.imgpathDetail2 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail2}`
    e.imgpathDetail3 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail3}`
    e.imgpathDetail4 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail4}`
  })
  console.log("YYYYYuserINNfo", userWork.value);
};
// 查询用户信息和用户作品
const mounted = () => {
  QueryUserWork()
  QueryUserInfo();
  
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
        <div>个人主页</div>
      </template>
    </top-bar>
    <div class="my-backimage">
      <!-- <img class="my-backimage" :src="myAvatar" alt="" /> -->
      <div style="text-align: center;width: 100%;z-index: 99;">
        <img class="pic-size"
          :src="myAvatar"
          alt=""
        />&nbsp;&nbsp;
        <div>{{ userInfo.username }}</div>
      </div>
      <!-- <img class="my-backimage" :src="myAvatar"> -->
    </div>
    <div>
      <van-tabs v-model:active="active" swipeable>
        <van-tab v-for="item in topTabs" :title="item.name">
          <!-- <div v-if="item.name === '作品'"> -->
            <!-- <div>{{ userWork }}</div> -->
              <content v-if="item.name === '作品'">
                <div class="category-list">
                <product-card-vertical style="margin-right: 12px" v-for="item in userWork" :product="item"></product-card-vertical>
              </div>
            </content>
            <content v-if="item.name === '资料'">
              <!-- <div v-for="item in userInfo">
                {{ item }}
              </div> -->
              <div>
                <div class="cell-list"><span>昵称：</span>{{ userInfo.username }}</div>
              <div class="cell-list"><span>UID：</span>{{ userInfo.id }}</div>
              <div class="cell-list"><span>电话号码：</span>{{ userInfo.tel }}</div>
              <div class="cell-list"><span>电子邮箱：</span>{{ userInfo.email }}</div>
              <div class="cell-list"><span>自我介绍：</span>{{ userInfo.intro }}</div>
              <div class="cell-list"><span>联系地址：</span>{{ userInfo.area }}</div>
              </div>
            </content>
          <!-- </div> -->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<style>
.my-backimage {
  width: 100%;
  height: 200px;
  /* background-image: v-bind(myAvatar); */
  background-size: cover;
}
.pic-size {
  margin-left: 10px;
   border-radius: 20px;
    width: 40px;
     height: 40px;
}
.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.cell-list {
  border-bottom-style: solid;
    border-width: 1px;
    border-bottom-color: #e3e2e2;
    margin: 10px 10px;
}
</style>
