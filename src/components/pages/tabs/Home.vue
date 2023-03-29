<script setup>
//先引入
import { ref, inject, computed } from "vue";
import TopBar from "@/components/topbar/TopBar.vue";
import Content from "@/components/content/content.vue";
import productCardVertical from "@/components/product/productCardVertical.vue";
import { useRouter } from "vue-router";
// import { useStore } from "vuex"
import { useState } from "@/store/pageDirection";
import { gql,myHttp } from "@/kits/HttpKit";
import { getItem } from "@/kits/LocalStorageKit";

const router = useRouter();
const userInfo = ref([])
const myAvatar = ref([])
const AllData = ref([])
const AllData1 = ref([])
const AllData2 = ref([])
const AllData3 = ref([])
const AllData4 = ref([])
const AllData5 = ref([])
// const store = useStore()
const state = useState();

const homeImgs_skeleton = [""];
const homeImgs = ref(homeImgs_skeleton);

const category_skeleton = [
  {
    name: "类别",
    goods: [{}, {}, {}],
  },
  {
    name: "类别",
    goods: [{}, {}, {}],
  },
];

const topTabs = [
  {
    value: 1,
    name: "推荐",
  },
  {
    value: 2,
    name: "书法",
  },
  {
    value: 3,
    name: "国画",
  },
  {
    value: 4,
    name: "摄影",
  },
  {
    value: 5,
    name: "油画",
  },
  {
    value: 6,
    name: "活动",
  },
  
];

const categorys = ref(category_skeleton);
const categorys1 = ref(category_skeleton);
const categorys2 = ref(category_skeleton);
const categorys3 = ref(category_skeleton);
const categorys4 = ref(category_skeleton);
const categorys5 = ref(category_skeleton);
const message = inject("$message");
const goto = () => {
  state.setDirection("forward");
  router.push({
    path: "/search",
  });
};


const initData = async () => {
  const dictId = "goods_type";
  const types = '["01","02","03","04"]';
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
                                        status
                                        publishTime
                                        joinActives
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
    homeImgs.value = res.data.homeImgs;
    categorys.value = res.data.categorys;
    console.log('拿到推荐数据',res.data.categorys)
    categorys.value.forEach(e => {
      let key = Object.entries(e)
      // Object.entries 将对象的键值对分成一个一个的数组，拿到遍历
      console.log('keys',Object.entries(e)[2][1])
      Object.entries(e)[2][1].forEach(item => {
        AllData.value.push(item)
      })
    })
    AllData.value.forEach((item,index) => {
      if(item.status != '1'){
        AllData.value.splice(index,1)
      }
    })
    console.log('555',AllData.value)
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

initData();

const initData1 = async () => {
  const dictId = "goods_type";
  const types = '["01"]';
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
                                        status
                                        publishTime
                                        joinActives
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
    categorys1.value = res.data.categorys;
    categorys1.value.forEach(e => {
      let key = Object.entries(e)
      // Object.entries 将对象的键值对分成一个一个的数组，拿到遍历
      console.log('keys',Object.entries(e)[2][1])
      Object.entries(e)[2][1].forEach(item => {
        AllData1.value.push(item)
      })
    })
    AllData1.value.forEach((item,index) => {
      if(item.status != '1'){
        AllData1.value.splice(index,1)
      }
    })
    console.log('555',AllData.value)
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

initData1();

const initData2 = async () => {
  const dictId = "goods_type";
  const types = '["02"]';
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
                                        status
                                        publishTime
                                        joinActives
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
    categorys2.value = res.data.categorys;
    categorys2.value.forEach(e => {
      let key = Object.entries(e)
      // Object.entries 将对象的键值对分成一个一个的数组，拿到遍历
      console.log('keys',Object.entries(e)[2][1])
      Object.entries(e)[2][1].forEach(item => {
        AllData2.value.push(item)
      })
    })
    AllData2.value.forEach((item,index) => {
      if(item.status != '1'){
        AllData2.value.splice(index,1)
      }
    })
    console.log('555',AllData.value)
    // console.log(res)
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

initData2();

const initData3 = async () => {
  const dictId = "goods_type";
  const types = '["03"]';
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
                                        joinActives
                                        publishTime
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
    categorys3.value = res.data.categorys;
    categorys3.value.forEach(e => {
      let key = Object.entries(e)
      // Object.entries 将对象的键值对分成一个一个的数组，拿到遍历
      console.log('keys',Object.entries(e)[2][1])
      Object.entries(e)[2][1].forEach(item => {
        AllData3.value.push(item)
      })
    })
    AllData3.value.forEach((item,index) => {
      if(item.status != '1'){
        AllData3.value.splice(index,1)
      }
    })
    console.log('555',AllData.value)
    // console.log(res)
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

initData3();

const initData4 = async () => {
  const dictId = "goods_type";
  const types = '["04"]';
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
                                        status
                                        collectionCount
                                        joinActives
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
    categorys4.value = res.data.categorys;
    categorys4.value.forEach(e => {
      let key = Object.entries(e)
      // Object.entries 将对象的键值对分成一个一个的数组，拿到遍历
      console.log('keys',Object.entries(e)[2][1])
      Object.entries(e)[2][1].forEach(item => {
        AllData4.value.push(item)
      })
    })
    AllData4.value.forEach((item,index) => {
      if(item.status != '1'){
        AllData4.value.splice(index,1)
      }
    })
    console.log('555',AllData.value)
    // console.log(res)
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

initData4();

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
    categorys5.value = res.data.categorys;
    categorys5.value.forEach(e => {
      let key = Object.entries(e)
      // Object.entries 将对象的键值对分成一个一个的数组，拿到遍历
      console.log('keys',Object.entries(e)[2][1])
      Object.entries(e)[2][1].forEach(item => {
        AllData5.value.push(item)
      })
    })
    AllData5.value.forEach((item,index) => {
      if(item.status != '1'){
        AllData5.value.splice(index,1)
      }
    })
    console.log('555',AllData.value)
    // console.log(res)
    return { code: "ok" };
  } catch (e) {
    message.warning(e.message);
    return { code: "failed" };
  }
};

initData5();

const seeAll = (type) => {
  // console.log(`要查看类别为${type}的所有商品`)
  goto("/searchresult", {
    type,
  });
};

const gotocart = () => {
  state.setDirection("forward");
  router.push({
    path: "/cart",
  });
};

const gotoContri = () => {
  state.setDirection("forward");
  router.push({
    path: "/contribute",
  });
};
// 跳转到个人主页
const gotoMy = (id) => {
  state.setDirection("forward");
  router.push({
    path: "/mywork",
    query:{userId:id}
  });
}

const moreContentStyle = computed(() => {
  //本身计算属性不能传参，但是可以利用闭包的形式
  //包裹一层函数接受传参
  return (bgColor, fontColor) => {
    return {
      backgroundColor: bgColor,
      color: fontColor,
    };
  };
});
// 首页搜索用户信息
const QueryUserInfo = async () => {
  const userId = getItem('userId')
  const resUser = await myHttp("/api/queryuserInfo", {
    id: userId,
  });
  userInfo.value = resUser.data;
  myAvatar.value = `http://127.0.0.1:4000/assets/upload/${resUser.data.avatar.substr(
    2
  )}`;
  console.log("userINNfo", userInfo.value);
};

const mounted = () => {
  QueryUserInfo()
}
mounted()

</script>
<template>
  <div>
    <top-bar @handleTabbar="goto">
      <template v-slot:left>
        <img class="pic-size"
          :src="myAvatar"
          @click="gotoMy(userInfo.id)"
          alt=""
        />
      </template>
      <!-- <template v-slot:right>
        <span
          class="iconfont icon-gouwuche"
          style="font-size: 18px"
          @click="gotocart"
        ></span>
      </template> -->
    </top-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item  v-for="(item,index) in homeImgs"><img style="height: 100%;width: 100%;" :src="item"/></van-swipe-item>
    </van-swipe>
    <van-tabs v-model:active="active" swipeable>
      <van-tab v-for="item in topTabs" :title="item.name">
        <content class="category-list1" v-if="item.name === '推荐'" :hasTabBar="true" :pull="true" :refresFunc="initData">
          <div class="category-list">
              <product-card-vertical
                :product="good"
                style="margin-right: 12px"
                v-for="good in AllData"
              ></product-card-vertical>
            </div>
        </content>
        <content v-if="item.name === '书法'" :hasTabBar="true" :pull="true" :refresFunc="initData1">
          
          <div class="category-list">
              <product-card-vertical
                :product="good"
                style="margin-right: 12px"
                v-for="good in AllData1"
              ></product-card-vertical>
            </div>
        </content>
        <content v-if="item.name === '国画'" :hasTabBar="true" :pull="true" :refresFunc="initData2">
          
          <div class="category-list">
              <product-card-vertical
                :product="good"
                style="margin-right: 12px"
                v-for="good in AllData2"
              ></product-card-vertical>
            </div>
        </content>
        <content v-if="item.name === '摄影'" :hasTabBar="true" :pull="true" :refresFunc="initData3">
          <div class="category-list">
              <product-card-vertical
                :product="good"
                style="margin-right: 12px"
                v-for="good in AllData3"
              ></product-card-vertical>
            </div>
        </content>
        <content v-if="item.name === '油画'" :hasTabBar="true" :pull="true" :refresFunc="initData4">
          <div class="category-list">
              <product-card-vertical
                :product="good"
                style="margin-right: 12px"
                v-for="good in AllData4"
              ></product-card-vertical>
            </div>
        </content>
        <content v-if="item.name === '活动'" :hasTabBar="true" :pull="true" :refresFunc="initData5">
          <div class="category-list">
              <product-card-vertical
                :product="good"
                style="margin-right: 12px"
                v-for="good in AllData5"
              ></product-card-vertical>
            </div>
        </content>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  border-radius: 6px;
  height: 180px;
  line-height: 120px;
  background: #e5e5e5;
  overflow: hidden;
  position: relative;
}

.pic-size {
  margin-left: 10px;
  border-radius: 20px;
  width: 40px;
  height: 40px;
}
.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

/* 绝对定位移到上方 */
.carousel-img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.category-title {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  color: rgb(0 0 0 / 0.5);
}
.category-title-action {
  color: rgb(212, 115, 183);
  font-weight: 600;
}

.category-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  /* float: left; */
  /* overflow-x: auto; */
  margin-top: 12px;
}
.category-list1 {
 float: left;
 width: 100%;
  margin-top: 12px;
}
.more-help {
  width: 100%;
  height: 80px;
  background-color: aqua;
  border-radius: 5px;
}
.img-help {
  width: 100%;
  height: 80px;
  border-radius: 5px;
}
.more-content-title {
  display: flex;
  justify-content: space;
  margin-top: 16px;
  color: rgb(0 0 0 / 0.5);
  font-size: 14px;
}
.more-content {
  display: flex;
  justify-content: space-around;
  overflow-x: auto;
  margin-top: 12px;
}
.more-content-item {
  height: 60px;
  width: 80px;
  /* border-radius:8px; */
  margin-right: 8px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-swipe .van-swipe-item {
        width: 100%;
        height: 230px;
    color: #fff;
    font-size: 20px;
    line-height: 250px;
    text-align: center;
  }
</style>
