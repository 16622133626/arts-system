<script setup>
import TopBar from "@/components/topbar/TopBar.vue";
import { useRouter, useRoute } from "vue-router";
import { useState } from "@/store/pageDirection";
import Content from "@/components/content/content.vue";
import productCardVertical from "@/components/product/productCardVertical.vue";
import { myHttp } from "@/kits/HttpKit";
import { getItem } from "@/kits/LocalStorageKit";
import { ref, watch, nextTick } from "vue";

const state = useState();
const router = useRouter();
const route = useRoute();
const userInfo = ref({});
const userWork = ref([]);
const myAvatar = ref("");
const active = ref(0);
const audiutWork = ref([])
const noauditWork = ref([])

const topTabs = [
  {
    value: "01",
    name: "作品",
  },
  {
    value: "02",
    name: "待审核",
  },
];



const back = () => {
  state.setDirection("backward");
  router.go(-1);
};

const QueryUserInfo = async () => {
  const userId = getItem("userId");
  const resUser = await myHttp("/api/queryuserInfo", {
    id: userId,
  });
  userInfo.value = resUser.data;
  myAvatar.value = `http://127.0.0.1:4000/assets/upload/${resUser.data.avatar.substr(
    2
  )}`;
  console.log("userINNfo", userInfo.value, myAvatar);
};

const QueryUserWork = async () => {
  const userId = getItem("userId");
  const resWork = await myHttp("/api/queryuserwork", {
    id: userId,
  });
  // userWork.value = resWork.data;
  resWork.data.forEach((e,index) => {
    if(e.status === '1') {
      // 将没有审核通过的作品分出来
      console.log('5555',e)
      e.imgpath = `http://127.0.0.1:4000/assets/upload/${e.imgpath}`;
    e.imgpathDetail1 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail1}`;
    e.imgpathDetail2 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail2}`;
    e.imgpathDetail3 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail3}`;
    e.imgpathDetail4 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail4}`;
      audiutWork.value.push(e)
      console.log('audiutWork',audiutWork.value)
    }else if(e.status === '2') {
      e.imgpath = `http://127.0.0.1:4000/assets/upload/${e.imgpath}`;
    e.imgpathDetail1 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail1}`;
    e.imgpathDetail2 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail2}`;
    e.imgpathDetail3 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail3}`;
    e.imgpathDetail4 = `http://127.0.0.1:4000/assets/upload/${e.imgpathDetail4}`;
      noauditWork.value.push(e)
      console.log('noauditWork',noauditWork.value)
    }
  });
};


// watch(
//   userInfo,
//   (newVal,oldVal) => {
//     console.log('888',newVal)
//     userInfo.value = newVal
//   },
//   {immediate:true}
// );

const mounted = () => {
  QueryUserWork();
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
      <img class="my-backimage" :src="myAvatar" alt="" />&nbsp;&nbsp;
      
    </div>
    <div>
      <van-tabs v-model:active="active" swipeable>
        <van-tab v-for="item in topTabs" :title="item.name">
          <content v-if="item.name === '作品'">
            <div class="category-list">
              <product-card-vertical
                style="margin-right: 12px"
                v-for="item in audiutWork"
                :product="item"
              ></product-card-vertical>
            </div>
          </content>
          <content>
            <div class="category-list">
              <product-card-vertical
                style="margin-right: 12px"
                v-for="item in noauditWork"
                :product="item"
              ></product-card-vertical>
            </div>
          </content>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<style>
.my-backimage {
  width: 100%;
  height: 200px;
  /* background-image: v-bind(myAvatar);
  background-size: cover; */
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
.style-infor {
  width: 100%;
  height: 400px;
  background-color: aqua;
}
</style>
