<script setup>
import { ref, inject, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useState } from "@/store/pageDirection";
//起别名 为了不起冲突
import { useState as useCartState } from "@/store/cart";
import { getItem, clearItem } from "@/kits/LocalStorageKit";
import { gql,myHttp } from "@/kits/HttpKit";

import TopBar from "@/components/topbar/TopBar.vue";
import Content from "@/components/content/Content.vue";
import FooterBar from "@/components/footerbar/FooterBar.vue";

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
const myAvatar = ref("");
const userInfo = ref({})
const isCollection = ref(false)
const isConcern = ref(false)
const isLike = ref(false)
const AllCollect = ref([])
const AllLike = ref([])
const AllConcern = ref([])

const back = () => {
  state.setDirection("backward");
  router.go(-1);
};

const goto = (path) => {
  state.setDirection("forward");
  router.push({ path });
};

const gotoMy = (id) => {
  state.setDirection("forward");
  router.push({
    path: "/mywork",
    query:{userId:id}
  });
}

const fetchData = async () => {
  const id = route.params.id;
  const type = route.params.type;
  console.log("fetchData", route.params.type);
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
    const resUser = await myHttp('/api/queryuserInfo', {
      id:res.data.good.userId
    })
    myAvatar.value = `http://127.0.0.1:4000/assets/upload/${resUser.data.avatar.substr(2)}`
    userInfo.value = resUser.data
    console.log('拿到用户信息',res.data.good.userId)
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
    if (curr.indexOf("/gooddetail/") >= 0) {
      fetchData();
    }
  }
);

const like = async (id,islike) => {
  fetchData()
  const token = getItem("token");
  const userId = getItem("userId");
  const userName = getItem("userName")
  if (token && token != "") {
    //全局状态管理中获取的对象，在任何时候都可以拿到最新的值
    //像渲染页面的时候 无论你在哪一行打印document.querySelector(div)
    if(islike === false) {
      const res = await myHttp('/api/like',{
      // 传入这个作品ID方便查询此作品是否点过赞
      // 判断是否登录
      token,
      userId,
      userName,
      goodId:id
    })
    if(res.code ===  1) {
      // 收藏成功
      QueryCollection()
      message.success(res.msg)
      AddLike() //点赞成功改变数据
      // 如果收藏成功那么点亮星星
      fetchData()
      isLike.value = true
    }else {
      message.error(res.msg)
    }
    } else if(islike === true){
      const res = await myHttp('/api/cancellike',{
      // 传入这个作品ID方便查询此作品是否
      token,
      userId,
      userName,
      goodId:id
    })
    if(res.code ===  1) {
      message.success(res.msg)
      // 如果取消收藏星星消灭
      isLike.value = false
      cancelLike() // 数量减少
      fetchData()
    }else {
      message.error(res.msg)
    }
    }
  } else {
    state.setDirection("forward");
    router.push({
      path: "/login",
    });
  }
};

const Concern = async (userId1,isconcern) => {
  fetchData()
  // const userId1 = product.value.userId
  const token = getItem("token");
  const userId = getItem("userId");
  const userName = getItem("userName")
  if (token && token != "") {
    //全局状态管理中获取的对象，在任何时候都可以拿到最新的值
    //像渲染页面的时候 无论你在哪一行打印document.querySelector(div)
    if(isconcern === false && userId1 != userId) {
      const res = await myHttp('/api/concern',{
      // 传入这个作品ID方便查询此作品是否已关注过
      // 判断是否登录
      token,
      userId,
      userId1,
      userName,
    })
    if(res.code ===  1) {
      // 收藏成功
      message.success(res.msg)
      // AddConcern(userId) //点赞成功改变数据
      // 如果收藏成功那么点亮星星
      fetchData()
      isConcern.value = true
    }else {
      message.error(res.msg)
    }
    } else if(isconcern === true){
      const res = await myHttp('/api/cancelconcern',{
      // 传入这个作品ID方便查询此作品是否已关注过,取消关注
      token,
      userId,
      userName,
      userId1:userId1
    })
    if(res.code ===  1) {
      message.success(res.msg)
      // 如果取消收藏星星消灭
      isConcern.value = false
      // cancelConcern(userId) // 数量减少
      fetchData()
    }else {
      message.error(res.msg)
    }
    }
  } else {
    state.setDirection("forward");
    router.push({
      path: "/login",
    });
  }
};
// 点亮收藏
const collection = async (id,iscollec) => {
  console.log('res add',id,iscollec)
  const token = getItem("token");
  const userId = getItem("userId");
  const userName = getItem("userName")
  if (token && token != "") {
    //全局状态管理中获取的对象，在任何时候都可以拿到最新的值
    //像渲染页面的时候 无论你在哪一行打印document.querySelector(div)
    if(iscollec === false) {
      const res = await myHttp('/api/collection',{
      // 传入这个作品ID方便查询此作品是否点过赞
      // 判断是否登录
      token,
      userId,
      userName,
      goodId:id
    })
    if(res.code ===  1) {
      // 收藏成功
      message.success(res.msg)
      // 如果收藏成功那么点亮星星
      isCollection.value = true
      AddCollection()
      fetchData()
    }else {
      message.error(res.msg)
    }
    } else if(iscollec === true){
      const res = await myHttp('/api/cancelcollection',{
      // 传入这个作品ID方便查询此作品是否点过赞
      token,
      userId,
      userName,
      goodId:id
    })
    if(res.code ===  1) {
      message.success(res.msg)
      // 如果取消收藏星星消灭
      isCollection.value = false
      cancelCollection()
      
      fetchData()
    }else {
      message.error(res.msg)
    }
    }
  } else {
    state.setDirection("forward");
    router.push({
      path: "/login",
    });
  }
};

const AddLike = async () => {
  const id = route.params.id
  const res = await myHttp('/api/updatelike',{
    goodId:id
  })
}

const AddConcern = async () => {
  const id = route.params.id
  const res = await myHttp('/api/updateconcern',{
    goodId:id
  })
}

const cancelConcern = async (id) => {
  const res = await myHttp('/api/updatedelconcern',{
    userId:id
  })
}

const cancelLike = async () => {
  const id = route.params.id
  const res = await myHttp('/api/updatedellike',{
    goodId:id
  })
}

const AddCollection = async () => {
  const id = route.params.id
  const res = await myHttp('/api/updatecollec',{
    goodId:id
  })
}


const cancelCollection = async () => {
  const id = route.params.id
  const res = await myHttp('/api/updatedelcollec',{
    goodId:id
  })
}

// 查询收藏夹所有的数据
const QueryCollection = async () => {
  const id = route.params.id
  console.log('22',id)
  const userId = getItem('userId')
  const res = await myHttp('/api/querycollection',{userId})
  if(res.code === 1) {
    AllCollect.value = res.data
    console.log('2222',AllCollect.value)
    res.data.colleList.forEach(e => {
      if(e === route.params.id) {
        // 如果数组里面有此项数据,那么点亮星星  否则不变
        isCollection.value = true
      }
    })
  }
}

const QueryLike = async () => {
  const id = route.params.id
  console.log('22',id)
  const userId = getItem('userId')
  const res = await myHttp('/api/querylike',{userId})
  if(res.code === 1) {
    AllLike.value = res.data
    console.log('2222',AllLike.value)
    res.data.likeList.forEach(e => {
      if(e === route.params.id) {
        // 如果数组里面有此项数据,那么点亮星星  否则不变
        isLike.value = true
      }
    })
  }
} 

const QueryConcern = async () => {
  const token = getItem('token')
  const id = route.params.id
  console.log('22',id)
  const userId = getItem('userId')
  const res = await myHttp('/api/queryconcern',{token,userId})
  if(res.code === 1) {
    AllConcern.value = res.data
    console.log('2222',AllConcern.value)
    res.data.concernList.forEach(e => {
      // console.log('5555888',product.value.userId)
      if(e === product.value.userId) {
        // 如果数组里面有此项数据,那么点亮星星  否则不变
        isConcern.value = true
      }
    })
  }
}

const mounted = () => {
  // 进入此页面查询搜藏集合
  QueryCollection()
  QueryLike()
  QueryConcern()
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
        <div>作品明细</div>
      </template>
      <template v-slot:right>
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
        <div class="comment">用户评论</div>
        <!-- <a-skeleton avatar active />
        <a-skeleton avatar active :paragraph="{ rows: 1 }" /> -->
      </div>
    </content>
    <footer-bar style="display:flex;justify-content: space-around;">
        <div class="good-price">
        <div style="flex: 1;"><van-icon v-if="isLike === true" name="like" @click="like(product.id,isLike)"/><van-icon name="like-o" v-if="isLike === false" @click="like(product.id,isLike)"/>{{ product.likeCount }}&nbsp;&nbsp;
        <van-icon name="star" v-if="isCollection === true" @click="collection(product.id,isCollection)"/><van-icon name="star-o" v-if="isCollection === false" @click="collection(product.id,isCollection)"/>{{ product.collectionCount }}</div>
      </div>
      <div style="float: right;">
        <img @click="gotoMy(userInfo.id)" style="margin-left: 10px; border-radius: 20px; width:40px;height:40px;" :src="myAvatar" alt="">&nbsp;&nbsp;
        <span>{{ userInfo.username }}</span>
      </div>
      <van-button v-if="isConcern === false" @click="Concern(product.userId,isConcern)" size="small">关注</van-button><van-button v-if="isConcern === true" @click="Concern(product.userId,isConcern)" size="small">已关注</van-button>
    </footer-bar>
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

.good-bg {
  height: 160px;
  width: 100%;
  background-image: v-bind(goodBg);
  background-size: contain;
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
