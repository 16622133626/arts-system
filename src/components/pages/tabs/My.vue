<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import TopBar from "@/components/topbar/TopBar.vue";
import Content from "@/components/content/Content.vue";
import { showConfirmDialog } from 'vant';
import { myHttp } from "@/kits/HttpKit"
import {
  BellOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { getItem, clearItem } from "@/kits/LocalStorageKit";
import Modal from "ant-design-vue/lib/modal";

const message = inject("$message");
const userWork = ref([])
const collectList = ref([])
const AllConcern = ref([])
const likeList = ref([])
const router = useRouter();
const state = useState();
const showLogout = ref(
  getItem("token") && getItem("token") !== "" ? true : false
);
//双向绑定的变量
const loginStatus = ref(
  getItem("token") && getItem("token") !== "" ? true : false
);
const userName = ref(
  getItem("userName") && getItem("userName") !== "" ? getItem("userName") : ""
);
const avatar = ref(
  getItem("avatar") && getItem("avatar") !== "" ? getItem("avatar") : ""
);

//如果登录账号，显示这些信息 否则为空
const menus = ref([
        { name: "我的作品", path: "/thismywork" },
        { name: "个人信息", path: "/component" },
        { name: "我的点赞", path: "/like" },
        { name: "我的收藏", path: "/collet" },
        { name: "历史足迹", path: "/history" },
        { name: "版本更新", path: "/version" },
      ]
);

const fetchData = async () => {
  return true;
};

const goto = (path) => {
  switch (path) {
    case "/version":
      message.warning("当前版本 1.1.0");
      break;
    case "/logout":
      logout();
      break;
    default:
      state.setDirection("forward");
      router.push({ path });
      break;
  }
};


const logout = () => {
  showConfirmDialog({
  message:
    '是否要残忍离开',
})
  .then(() => {
    clearItem("token");
      clearItem("userName");
      clearItem("userId");
      clearItem("avatar");
      //清完缓存之后手动置空
      loginStatus.value = false;
      showLogout.value = false
      userName.value = "";
      avatar.value = "";
      menus.value = [
        // { name: "系统设置", path: "/blankpage" },
        // { name: "查看版本", path: "/version" },
      ];
  })
  .catch(() => {
    // on cancel
  });
  // Modal.confirm({
  //   title: "是否要残忍离开",
  //   okText: "去意已决",
  //   cancelText: "再看看",
  //   centered: true,
  //   onOk() {
  //     clearItem("token");
  //     clearItem("userName");
  //     clearItem("userId");
  //     clearItem("avatar");
  //     //清完缓存之后手动置空
  //     loginStatus.value = false;
  //     showLogout.value = false
  //     userName.value = "";
  //     avatar.value = "";
  //     menus.value = [
  //       { name: "系统设置", path: "/blankpage" },
  //       { name: "查看版本", path: "/version" },
  //     ];
  //   },
  //   onCancel() {},
  // });
};

const uploadAvatar = () => goto("/uploadavatar");
const QueryUserWork = async () => {
  const userId = getItem('userId')
  const resWork = await myHttp("/api/queryuserwork", {
    id: userId,
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

const QueryLikeData = async () => {
    const userId = getItem('userId')
    const token = getItem('token')
    const res = await myHttp('/api/querylike',{
        token,
        userId
    })
    if(res.code === 1) {
        likeList.value = res.data.likeList
        console.log('2222',likeList.value)
    }
}


const QueryCollectData = async () => {
    const userId = getItem('userId')
    const token = getItem('token')
    const res = await myHttp('/api/querycollect',{
        token,
        userId
    })
    if(res.code === 1) {
        collectList.value = res.data.colleList
        console.log('222112',collectList.value)
    }
}
// 查询我的关注
const QueryConcern = async () => {
  const token = getItem('token')
  const userId = getItem('userId')
  const res = await myHttp('/api/queryconcern',{token,userId})
  if(res.code === 1) {
    AllConcern.value = res.data.concernList
    console.log('2222',AllConcern.value)
  }
}

const mounted = () => {
  QueryUserWork()
  QueryCollectData()
  QueryLikeData()
  QueryConcern()
}
mounted()
</script>

<template>
  <div>
    <!-- Math.random() 可以实现随机分配图像 -->
    <top-bar style="box-shadow: unset">
      <template v-slot:middle>
        <div class="top-title">我的主页</div>
      </template>
      <template v-slot:right>
        <!-- <bell-outlined style="font-size: 20px" /> -->
      </template>
    </top-bar>
    <content :hasTabBar="true" :pull="true" :refreshFunc="fetchData">
      <div class="avatar">
        <template v-if="loginStatus">
          <a-avatar :size="100" :src="avatar" @click="uploadAvatar"></a-avatar>
          <div class="userName">{{ userName }}</div>
        </template>
        <template v-else>
          <a-avatar :size="100" @click="goto('/login')">
            {{ avatar }}
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
        </template>
        <!-- <button @click="logout">退出登录</button> -->
        <div v-if="loginStatus" class="arts-fans">
          <div><div style="text-align:center;">{{ userWork.length }}</div>作品</div>
          <div><div style="text-align:center;">{{AllConcern.length}}</div>关注</div>
          <div><div style="text-align:center;">{{ likeList.length }}</div>喜欢</div>
          <div><div style="text-align:center;">{{ collectList.length }}</div>收藏</div>
        </div>
      </div>
      <div style="margin-top:30px;">
        <a-list :data-source="menus">
          <template #renderItem="{ item }">
            <a-list-item>
             <van-icon name="photo-o" size="1.5rem"/>
              <div style="color: rgb(0 0 0 / 0.5); margin-left: -12rem;" @click="goto(item.path)">
                {{ item.name }}
              </div>
              <a slot="action" style="opacity: 0.5" @click="goto(item.path)">
                <right-outlined
              /></a>
            </a-list-item>
          </template>
        </a-list>
      </div>
      <div v-if="showLogout" style="position:relative;width: 100%; margin-left: 40%;margin-top: 20px;" @click="goto('/logout')">
        <van-button round type="primary">退出登录</van-button>
      </div>
    </content>
  </div>
</template>

<style scoped>
.avatar {
    background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.arts-fans {
    width: 100%;
  height: 80px;
  display: flex;
  align-items: end;
  font-size: large;
  font-weight: 500;
  color: rgb(192, 198, 204);
  justify-content: space-around;
}
.logout-button {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.top-title {
  font-size: large;
  font-weight: 600;
    text-align: center;
}

.userName {
  font-size: 16px;
  color: rgb(0 0 0 / 0.5);
  margin-top: 12px;
}
</style>
