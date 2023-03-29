<script setup>
import { ref, inject, computed } from "vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import TopBar from "@/components/topbar/TopBar.vue";
import Content from "@/components/content/Content.vue";
import { getItem } from "@/kits/LocalStorageKit";
import { gql } from "@/kits/HttpKit";
import { useState as useOrderState } from "@/store/order.js";

const message = inject("$message");
const router = useRouter();
const state = useState();
const orderState = useOrderState();
const order = ref([]);

const categorys = ref("");
const categorys1 = ref("");
const categorys2 = ref("")
const topTabs = [
  {
    value: '1',
    name: "头条",
  },
  {
    value: '2',
    name: "快讯",
  },
  {
    value: '3',
    name: "精编",
  },
];

const initData = async (x) => {
  const dictId = "news_status";
  const types = '["1"]';
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
                                     news (start:${start},count:${count}) {
                                            id
                                                  title
                                                  intro
                                                  findImgpath
                                                  content
                                                  addTime
                                                  status (id:"news_status") {
                                              id
                                                    name
                                                  }
                                                }
                                              }
                }`,
  };
  try {
    const res = await gql(params);
    console.log('111',res);
    // homeImgs.value = res.data.homeImgs
    categorys.value = res.data.categorys;
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

initData()

const fetchData = async (x) => {
  const dictId = "news_status";
  const types = '["2"]';
  const start = 0,
    count = 10;
  const params = {
    query: `
                {
                  categorys (id:"${dictId}",type:${types}){
                    id
                                     name
                                     news (start:${start},count:${count}) {
                                            id
                                                  title
                                                  intro
                                                  findImgpath
                                                  content
                                                  addTime
                                                  status (id:"news_status") {
                                              id
                                                    name
                                                  }
                                                }
                                              }
                }`,
  };
  try {
    const res = await gql(params);
    categorys1.value = res.data.categorys;
    console.log('222',res);
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

fetchData()

const fetchData3 = async (x) => {
  const dictId = "news_status";
  const types = '["3"]';
  const start = 0,
    count = 10;
  const params = {
    query: `
                {
                  categorys (id:"${dictId}",type:${types}){
                    id
                                     name
                                     news (start:${start},count:${count}) {
                                            id
                                                  title
                                                  intro
                                                  findImgpath
                                                  content
                                                  addTime
                                                  status (id:"news_status") {
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
    console.log('333',res);
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

fetchData3()

const goto = (path) => {
  state.setDirection("forward");
  router.push({ path });
};

const sumPrice = computed(() => {
  return (item) => {
    return item.list.reduce((acc, v) => acc + v.price * v.count, 0);
  };
});

const orderId = computed(() => {
  return (id) => {
    return id.substring(id.length - 6, id.length);
  };
});

const goDetail = (orderDetail) => {
  orderState.setOrderDetail(orderDetail);
  goto("/orderdetail");
}; 

const gotoDetail = (id,status) => {
    state.setDirection("forward")  //页面跳转到明细页面
    router.push({
        name: "newsdetail",
        params: {
            id: id,
            type:status
        }
    })
}

const statusStyle = computed(() => {
  return (statusId) => {
    const res = {};
    switch (statusId) {
      case "1":
        res.color = "#919100";
        break;
      case "2":
        res.color = "red";
        break;

      case "3":
        res.color = "gray";
        break;

      case "4":
        res.color = "pink";
        break;

      case "5":
        res.color = "pueple";
        break;

      default:
        break;
    }
    return res;
  };
});
</script>

<template>
  <div>
    <TopBar>
      <template v-slot:middle>
        <div class="top-title">发现</div>
      </template>
    </TopBar>

    <van-tabs swipeable>
      <van-tab v-for="item in topTabs" :title="item.name">
        <content v-if="item.name === '头条'" :hasTabBar="true" :pull="true" :refresFunc="initData">
          <div v-for="item in categorys">
            <div v-for="items in item.news">
              <div class="item-news" @click="gotoDetail(items.id,items.status.id)">
                <img style=" margin-top: 2px;width:80px;height:80px;" :src="items.findImgpath" alt="">
                <div class="new-intro">
                  <div style="color:black;font-size:16px;">{{ items.title }}</div>
                  <div style="margin-top: 5px;text-overflow:ellipsis;">{{ items.intro }}</div>
                </div>
              </div>
            </div>
          </div>
        </content>

        <content v-if="item.name === '快讯'" :hasTabBar="true" :pull="true" :refresFunc="fetchData">
          <div v-for="item in categorys1">
            <div v-for="items in item.news">
              <div class="item-news" @click="gotoDetail(items.id,items.status.id)">
                <img style=" margin-top: 2px;width:80px;height:80px;" :src="items.findImgpath" alt="">
                <div class="new-intro">
                  <div style="color:black;font-size:16px;">{{ items.title }}</div>
                  <div style="margin-top: 5px;text-overflow:ellipsis;">{{ items.intro }}</div>
                </div>
              </div>
            </div>
          </div>
        </content>

        <content v-if="item.name === '精编'" :hasTabBar="true" :pull="true" :refresFunc="fetchData3">
          <div v-for="item in categorys2">
            <div v-for="items in item.news">
              <div class="item-news"  @click="gotoDetail(items.id,items.status.id)">
                <img style=" margin-top: 2px;width:80px;height:80px;" :src="items.findImgpath" alt="">
                <div class="new-intro">
                  <div style="color:black;font-size:16px;">{{ items.title }}</div>
                  <div style="margin-top: 5px;text-overflow:ellipsis;">{{ items.intro }}</div>
                </div>
              </div>
            </div>
          </div>
        </content>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.order-item {
  /* display:flex; */
  width: 100%;
  font-size: 13px;
  color: rgb(0 0 0 / 0.5);
  padding: 6px;
  box-sizing: border-box;
  box-shadow: 0px 1px 8px rgb(0 0 0 /0.1);
  border-radius: 15px;
}

.top-title {
    font-weight: 600;
    font-size: 20px;
    text-align: center;
}

.order-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.order-status {
  font-size: 16px;
  font-weight: bold;
}
.item-news {
  width: 100%;
  height: 100px;
  border-bottom-style: solid;
  border-width: 2px;
  border-bottom-color: #a09e9e;
  margin-top: 12px;
  display: flex;
}
.new-intro {
  margin-left: 10px;
  overflow:hidden;
}
</style>
