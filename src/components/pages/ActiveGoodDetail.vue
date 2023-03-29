<script setup>
import { ref, inject, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useState } from "@/store/pageDirection";
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
const product = ref({});
const products = ref([]);
const workBg1 = ref("");
const workBg2 = ref("");
const workBg3 = ref("");
const workBg4 = ref("");
const activeData = ref({})
const activeBG = ref("")
const myAvatar = ref("")
const isLike = ref(false)
const userInfo = ref({})

const back = () => {
  state.setDirection("backward");
  router.go(-1);
};

const goto = (path) => {
  state.setDirection("forward");
  router.push({ path });
};

const fetchData = async () => {
  const id = route.params.id;
  const type = route.params.type;
  const p = {
    query: `
                {
                    good (id:"${id}") {
                        id
                        name
                        gooddesc
                        likeCount
                        imgpath               
                        publishTime
                        userId
                        joinActives
                        imgpathDetail2
                        imgpathDetail1
                        imgpathDetail3
                        imgpathDetail4
                        collectionCount
                        like
                        collection
                    }
                    goods (type:"${type}",start:0,count:5){
                        id
                        name
                        likeCount
                        imgpath
                        joinActives
                        collectionCount
                        type (id:"goods_type"){
                            id
                        }
                    }
                }
            `,
  };
  //查询数据
  try {
    const res = await gql(p);
    product.value = res.data.good;
    products.value = res.data.goods.filter((item) => item.id != id);
    workBg1.value = `url(${res.data.good.imgpathDetail1})`;
    workBg2.value = `url(${res.data.good.imgpathDetail2})`;
    workBg3.value = `url(${res.data.good.imgpathDetail3})`;
    workBg4.value = `url(${res.data.good.imgpathDetail4})`;
    console.log('kkkk',res.data.good.imgpathDetail4)
    const resUser = await myHttp('/api/queryuserInfo', {
      id:res.data.good.userId
    })
    myAvatar.value = `http://127.0.0.1:4000/assets/upload/${resUser.data.avatar.substr(2)}`
    userInfo.value = resUser.data
    console.log('拿到用户信息',resUser)
    return { code: "ok" };
  } catch (e) {
    message.error(e.message);
    return { code: "failed" };
  }
};

fetchData();

watch(
  () => route.path,
  (curr) => {
    // console.log("curr:",curr)
    if (curr.indexOf("/activegooddetail/") >= 0) {
      fetchData();
    }
  }
);

const like = () => {
  /*
        1.校验当前用户是否登陆（查看是否有登陆后的会话缓存信息 session）
            客户端本地缓存中是否存在token(身份信息令牌-一串随机码)
        2.如果存在，说明已经登陆
            把当前商品加入到购物车中
        3.如果不存在，说明为登陆
            页面自动跳转到登陆页面
      
    */
   fetchData()
   console.log('res add',product.value.like)
   if(product.value.liken === true) {
    console.log('res addq前',product.value.like)
    product.value.collection = !product.value.like
    console.log('res add后',product.value.like)
   }else {
    product.value.like = !product.value.like
   }
  const token = getItem("token");
  const userId = getItem("userId");
  if (token && token != "") {
    //全局状态管理中获取的对象，在任何时候都可以拿到最新的值
    //像渲染页面的时候 无论你在哪一行打印document.querySelector(div)
    console.log("全局的购物车对象：", cartState.cart);
    cartState
      .addCart({
        token,
        userId,
        ifIncrease: true, //状态位是否新增  true不停加一
        good: product.value,
      })
      .then((res) => {
        console.log(cartState.cart);
        switch (res.code) {
          case 1:
            message.success(res.msg);
            break;
          case 101:
          case 102:
            message.warning(res.msg);
            clearItem("token");
            state.setDirection("forward");
            router.push({
              path: "/login",
            });
            break;
          default:
            message.warning(res.msg);
            break;
        }
      });
  } else {
    state.setDirection("forward");
    router.push({
      path: "/login",
    });
  }
};

const collection = () => {
  /*
        1.校验当前用户是否登陆（查看是否有登陆后的会话缓存信息 session）
            客户端本地缓存中是否存在token(身份信息令牌-一串随机码)
        2.如果存在，说明已经登陆
            把当前商品加入到购物车中
        3.如果不存在，说明为登陆
            页面自动跳转到登陆页面
      
    */
   fetchData()
   console.log('res add',product.value.collection)
   if(product.value.collection === true) {
    console.log('res addq前',product.value.collection)
    product.value.collection = !product.value.collection
    console.log('res add后',product.value.collection)
   }else {
    product.value.collection = !product.value.collection
   }
  const token = getItem("token");
  const userId = getItem("userId");
  if (token && token != "") {
    //全局状态管理中获取的对象，在任何时候都可以拿到最新的值
    //像渲染页面的时候 无论你在哪一行打印document.querySelector(div)
    console.log("全局的购物车对象：", cartState.cart);
    cartState
      .addCart({
        token,
        userId,
        ifIncrease: true, //状态位是否新增  true不停加一
        good: product.value,
      })
      .then((res) => {
        console.log(cartState.cart);
        switch (res.code) {
          case 1:
            message.success(res.msg);
            break;
          case 101:
          case 102:
            message.warning(res.msg);
            clearItem("token");
            state.setDirection("forward");
            router.push({
              path: "/login",
            });
            break;
          default:
            message.warning(res.msg);
            break;
        }
      });
  } else {
    state.setDirection("forward");
    router.push({
      path: "/login",
    });
  }
};

// 查询用户是否投票活动
const queryUserVote = async () => {
  const token = getItem("token");
  const userId = getItem("userId");
  const res = await myHttp("/api/queryuservoteactive", {
      id:route.params.activeid,
      userId,
      token,
    })
    if(res.code === 1) {
      console.log('hhhh',myAvatar.value)
      const userData = res.data.list
      if (userData && userData.length > 0) {
        userData.forEach(element => {
          if(element === route.params.activeid){
            isLike.value = true
          }
        });
      }
      console.log('得到用户数据',userData)
    }
}

const vote = async (num) => {
  const token = getItem("token");
  const userId = getItem("userId");
  const res = await myHttp("/api/uservoteactive", {
    likeCount:num,
      id:route.params.activeid,
      userId,
      token,
    })
    if(res.code === 4) {
      message.success(res.msg)
    }else {
      message.error(res.msg)
    }
    fetchData()
    // 点击投票后就会变红
    queryUserVote()
}

// 查询对应活动数据的函数
const queryActiveData = async () => {
  console.log('查到的活动数据',route.params.activeid)
  const res = await myHttp("/api/queryactive", {
      id:route.params.activeid
    })
    if(res.code === 1) {
      activeData.value = res.data
      activeBG.value = `http://127.0.0.1:4000/assets/upload/${activeData.value.playImgpath}`;
    }else {
    console.log('查到的活动数据',res)
    }
}

// 进入活动详情页面就要查询对应活动数据
const mounted = () =>  {
  queryActiveData()
  queryUserVote()
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
        <div>作品详情</div>
      </template>
      <template v-slot:right>
        <!-- <div
          class="iconfont icon-gouwuche"
          style="font-size: 20px"
          @click="goto"
        ></div> -->
        <!-- <van-button>关注</van-button> -->
      </template>
    </top-bar>
    <content :pull="true" :refresFunc="fetchData" :hasTabBar="true">
      <div class="work-bg1"></div>
      <div class="work-bg2"></div>
      <div class="work-bg3"></div>
      <div class="work-bg4"></div>
      <div class="good-content">
        <div class="good-title">{{ product.name }}</div>
        <div class="good-desc">{{ product.gooddesc }}</div>
        <div class="good-time">{{ product.publishTime }}</div>
      </div>
      <div class="user-vote">
        <img style="margin-left: 10px; border-radius: 15px; width:40%;height:10vh;" :src="activeBG" alt="">
        <div style="margin-left: 10px;">
          <div class="active-title">{{ activeData.name }}</div>
        </div>
      </div>
      <div style="margin-top: 5px;justify-content: space-around;" class="user-vote">
        <div style="display:flex;align-items: center;">
          <img style="margin-left: 10px; border-radius: 25px; width:50px;height:50px;" :src="myAvatar" alt="">
          <div style="margin-left: 10px;">
          <div>{{ userInfo.username }}</div>
        </div>
        </div>
        <div>
            <!-- // 点赞数 -->
            <div style="font-weight:500;font-size: 18px; color: red;">票数</div>
             <div style="margin-left: 10px;">{{ product.likeCount }}</div>
        </div> 
        <van-icon v-if="isLike === false" @click="vote(product.likeCount)" name="good-job-o" color="red" size="60"/>
        <van-icon v-if="isLike === true" @click="vote(product.likeCount)" name="good-job" color="red" size="60"/>
      </div>
    </content>
  </div>
</template>

<style scoped>
.ant-carousel :deep(.slick-slide) {
  margin-top: 12px;
  height: 160px;
  background: #f7f4f4;
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
.user-vote {
  border-radius: 10px;
  width: 100%;
  height: 12vh;
  display: flex;
  align-items: center;
  background-color: #f7f4f4;
}

.good-bg {
  height: 160px;
  width: 100%;
  background-image: v-bind(goodBg);
  background-size: contain;
}
.active-title {
  font-size: 16px;
  font-weight: 600;
}

.work-bg1 {
  height: 300px;
  width: 100%;
  background-image: v-bind(workBg1);
  background-size: cover;
  margin-bottom: 5px;
}



.work-bg2 {
  height: 300px;
  width: 100%;
  background-image: v-bind(workBg2);
  background-size: cover;
  margin-bottom: 5px;
}

.work-bg3 {
  height: 300px;
  width: 100%;
  background-image: v-bind(workBg3);
  background-size: cover;
  margin-bottom: 5px;
}

.work-bg4 {
  height: 300px;
  width: 100%;
  background-image: v-bind(workBg4);
  background-size: cover;
  margin-bottom: 5px;
}

.good-content {
  margin-top: 30px;
  padding: 0 6px;
  box-sizing: border-box;
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

.good-time {
  font-size: 14px;
  color: rgb(0 0 0 / 0.3);
}

.good-price {
  font-size: 18px;
  font-weight: bold;
  color: #fa6400;
  margin-top: 12px;
  margin-left: 10px;
}

.good-vr {
  font-size: 16px;
  color: #fa6400;
  margin-top: 12px;
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
</style>
