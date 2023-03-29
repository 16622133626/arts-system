<script setup>
import { ref, reactive, inject, getCurrentInstance } from "vue";
import TopBar from "@/components/topbar/topbar.vue";
import Content from "@/components/content/content.vue";

import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import { myHttp } from "@/kits/HttpKit";
import { setItem } from "@/kits/LocalStorageKit";

const instance = getCurrentInstance();
const message = inject("$message");
const router = useRouter();
const state = useState();
const Num = ref('')
const form = reactive({
  id: "",
  pwd: "",
});
const form1 = reactive({
  phone: "",
  keynumber: "",
});
const rules = {
  id: [
    { required: true, message: "请输入邮箱", trigger: "blur" }, //必填的校验规则
    { type: "email", message: "请输入合法的邮箱格式", trigger: "blur" }, //邮箱格式的校验规则
  ],
  pwd: [
    { required: true, message: "请输入密码", trigger: "blur" }, //必填的校验规则
    { min: 6, max: 20, message: "密码的长度在6个字符以上", trigger: "blur" }, //邮箱格式的校验规则
  ],
};

const back = () => {
  state.setDirection("backward");
  router.go(-1); //浏览器向左回退
  //router.back
};

const getNum =async () => {
  // 生成验证码接口
  if(form1.phone != '') {
    const res = await myHttp('/api/getkeyword',{
      id:form1.phone
    })
    if(res.code === 1) {
      message.success(res.data)
      Num.value = res.data
    }
  }
}

const sub = async () => {
  console.log("999", form.id, form.pwd);
  try {
    const key = "loading";
    message.loading({
      key,
      content: "登陆中...",
    });
    const resLogin = await myHttp("/api/login", {
      ...form,
      role: "c",
    });
    // console.log("resLogin:", resLogin)

    if (resLogin.code === 1) {
      message.success({
        key,
        content: resLogin.msg,
        duration: 2,
      });
      //本地缓存
      setItem("token", resLogin.data.token);
      setItem("userId", resLogin.data.userId);
      setItem("userName", resLogin.data.userName);
      setItem("avatar", resLogin.data.avatar);
      back();
    } else {
      message.error({
        key,
        content: resLogin.msg,
        duration: 2,
      });
    }
  } catch (e) {}
};

const sub2 = async () => {
  console.log("999", form1);
  console.log("999", Num);
  try {
    const key = "loading";
    message.loading({
      key,
      content: "登陆中...",
    });
   if(form1.keynumber === Num.value) {
    const res = await myHttp("/api/nopasslogin", {
      id:form1.phone,
      num:form1.keynumber,
      role: "c",
    });
    if (res.code === 1) {
      message.success({
        key,
        content: res.msg,
        duration: 2,
      });
      //本地缓存
      setItem("token", res.data.token);
      setItem("userId", res.data.userId);
      setItem("userName", res.data.userName);
      setItem("avatar", res.data.avatar);
      back();
    } else {
      message.error({
        key,
        content: res.msg,
        duration: 2,
      });
    }
   }

   
  } catch (e) {}
};

const register = () => {
  router.replace({ path: "/register" });
};
</script>
<template>
  <!-- 如果想要过效果，需要一个div包裹 -->
  <div>
    <top-bar style="box-shadow: unset">
      <template v-slot:left>
        <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
      </template>
      <template v-slot:middle>
        <div></div>
      </template>
    </top-bar>
    <content>
      <div class="title">你好，</div>
      <div class="title">欢迎来到字画部落</div>

      <van-tabs v-model:active="active" @click-tab="onClickTab" style="margin-top: 30px;">
        <van-tab title="密码登录">
          <van-form @submit="sub" :v-model="form">
            <van-cell-group inset style="margin-top: 25px;">
              <van-field
              style="background-color: #F5F5F5;border-radius: 20px;margin-bottom: 20px;" 
                v-model="form.id"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
              style="background-color: #F5F5F5;border-radius: 20px;margin-bottom: 20px;" 
                v-model="form.pwd"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
            </van-cell-group>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit">
                登录
              </van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="手机号登录">
            <van-form @submit="sub2" :v-model="form">
            <van-cell-group inset  style="margin-top: 25px;">
              <van-field
              style="background-color: #F5F5F5;border-radius: 20px;margin-bottom: 20px;" 
                v-model="form1.phone"
                name="手机号"
                label="手机号"
                placeholder="手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
              />
              <van-field
              style="background-color: #F5F5F5;border-radius: 20px;margin-bottom: 20px;" 
                v-model="form1.keynumber"
                name="验证码"
                label="验证码"
                placeholder="请输入6位验证码"
                :rules="[{ required: true, message: '请填写验证码' }]"
              >
              <template #button>
                  <van-button @click="getNum" size="small" type="primary">发送验证码</van-button>
              </template>
              </van-field>
            </van-cell-group>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit">
                登录
              </van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
      <div class="desc">
        <div>没有账号?去</div>
        <div @click="register" class="register">注册</div>
      </div>

      <!-- <van-form @submit="sub" :v-model="form">
        <van-cell-group inset>
          <van-field
            v-model="form.id"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="form.pwd"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form> -->
      <!-- <a-form
        :model="form"
        layout="vertical"
        style="margin-top: 30px"
        :rules="rules"
        ref="loginForm"
      >
        <a-form-item label="邮箱" name="id">
          <a-input v-model:value="form.id" placeholder="请输入邮箱"></a-input>
        </a-form-item>
        <a-form-item label="密码" name="pwd">
          <a-input
            v-model:value="form.pwd"
            type="password"
            placeholder="请输入密码"
          ></a-input>
        </a-form-item>
        <a-form-item style="margin-top: 45px">
          <a-button type="primary" @click="sub" size="large" block
            >登录</a-button
          >
        </a-form-item>
      </a-form> -->
    </content>
  </div>
</template>
<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  color: rgb(0 0 0 / 0.5);
  margin-top: 20px;
}

.desc {
  font-size: 15px;
  color: rgb(0 0 0 / 0.5);
  margin-top: 12px;
  margin-left: 50px;
  display: flex;
}

.register {
  color: #1989fa;
  font-weight: bold;
  margin-left: 2px;
}

/* 
  user 用户表  id state role 头像
*/
</style>
