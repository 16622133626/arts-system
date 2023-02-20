<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import TopBar from "@/components/topbar/TopBar.vue";
import Content from "@/components/content/Content.vue";
import {
  BellOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { getItem, clearItem } from "@/kits/LocalStorageKit";
import Modal from "ant-design-vue/lib/modal";

const message = inject("$message");
const router = useRouter();
const state = useState();
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
const menus = ref(
  loginStatus.value
    ? [
        { name: "作品管理", path: "/blankpage" },
        { name: "我的资料", path: "/blankpage" },
        { name: "合作联系", path: "/blankpage" },
        { name: "我的点赞", path: "/blankpage" },
        { name: "我的收藏", path: "/blankpage" },
        { name: "历史足迹", path: "/blankpage" },
        { name: "版本更新", path: "/version" },
        // { name: "退出登录", path: "/logout" },
      ]
    : []
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
  Modal.confirm({
    title: "是否要残忍离开",
    okText: "去意已决",
    cancelText: "再看看",
    centered: true,
    onOk() {
      clearItem("token");
      clearItem("userName");
      clearItem("userId");
      clearItem("avatar");
      //清完缓存之后手动置空
      loginStatus.value = false;
      userName.value = "";
      avatar.value = "";
      menus.value = [
        { name: "系统设置", path: "/blankpage" },
        { name: "查看版本", path: "/version" },
      ];
    },
    onCancel() {},
  });
};

const uploadAvatar = () => goto("/uploadavatar");
</script>

<template>
  <div>
    <!-- Math.random() 可以实现随机分配图像 -->
    <top-bar style="box-shadow: unset">
      <template v-slot:middle>
        <div class="top-title">我的主页</div>
      </template>
      <template v-slot:right>
        <bell-outlined style="font-size: 20px" />
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
        <div class="arts-fans">
          <div>
            <div style="margin: 0 auto;">0</div>
            人气
          </div>
          <div><div>0</div>作品</div>
          <div><div style="margin: 0 auto;">0</div>关注</div>
          <div><div style="margin: 0 auto;">0</div>粉丝</div>
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
      <div style="position:relative;width: 100%; margin-left: 40%;margin-top: 20px;" @click="goto('/logout')">
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-weight: 600;
}

.userName {
  font-size: 16px;
  color: rgb(0 0 0 / 0.5);
  margin-top: 12px;
}
</style>
