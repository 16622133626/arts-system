<script setup>
import TopBar from "@/components/topbar/TopBar.vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import Content from "@/components/content/content.vue";
import {ref,reactive,inject} from "vue"
import areaList from '@/assets/area.js'
import { baseURL,myHttp } from "@/kits/HttpKit"
import { getItem, setItem,clearItem } from "@/kits/LocalStorageKit"
const state = useState();
const router = useRouter();
const result = ref('');
const showArea = ref(false);
const action = baseURL + "/api/uploadBackimg"

    const username = ref('')
    const message = inject("$message");
    const email = ref('')
    const intro = ref('')
    const address = ref('')
    const phone = ref('')


const back = () => {
  state.setDirection("backward");
  router.go(-1);
};
const list = ref([
        { name: "昵称",value:'1'},
        { name: "账号",value:'2'},
        { name: "联系电话",value:'3'},
        { name: "邮箱",value:'4'},
        { name: "职业",value:'5'},
        { name: "地区",value:'6'},
        { name: "简介",value:'7'},
]);

const commit = async () => {
  console.log('form',username.value,email.value,intro.value,result.value)
  const userId = getItem('userId')
  const token = getItem('token')
  if(username.value != '' && email.value != '' && intro.value != '') {
    const res = await myHttp('/api/updatuserinfo',{
    userId,
    token,
    username:username.value,
    email:email.value,
    phone:phone.value,
    intro:intro.value,
    address:address.value,
    area:result.value
  })
  if (res.code === 1 ) {
    message.success(res.msg)
  }
  }else {
    message.error('有必选项没有填写')
  }
  
}

const data = reactive({
    token: getItem("token"),
    userId: getItem("userId")
})
// 关闭选择器
const onConfirm = ({ selectedOptions }) => {
      showArea.value = false;
      result.value = selectedOptions.map((item) => item.text).join('/');
    };
    // 上传头像
    const handleChange = res => {
//正在传的时候中间件没走完，传成功之后走switch语句分支
    if (res.file.status !== "uploading") {
        console.log('555',res.file)
    } else if (res.file.status === "done") {
        switch (res.file.response.code) {
            case 1:
                message.success(res.file.response.msg),
                avatar.value = res.file.response.data.avatar
                setItem("avatar", res.file.response.data.avatar)
                break;
            case 101:
            case 102:
                //如果超时清除登录信息
                message.warning(res.file.response.msg)
                clearItem("token")
                state.setDirection("forward")
                router.push({
                    path: "/login"
                })
                break;
            default:
                message.warning(res.msg)
                break;
        }
    } else if (res.file.status === "error") {
        message.error(res.file.response.msg)
    }

}
</script>

<template>
  <div>
    <top-bar style="box-shadow: unset">
      <template v-slot:left>
        <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
      </template>
      <template v-slot:middle>
        <div>个人信息</div>
      </template>
    </top-bar>
    <Content>
      <van-form>
       <van-cell-group inset>
        <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="email"
      name="email"
      label="邮箱号"
      placeholder="邮箱号"
      :rules="[{ required: true, message: '请填写邮箱号' }]"
    />
    <van-field
      v-model="phone"
      name="phone"
      label="手机号"
      placeholder="手机号"
      :rules="[{ required: true, message: '请填写手机号' }]"
    />
    <van-field
      v-model="intro"
      name="简介"
      label="简介"
      placeholder="简介"
      :rules="[{ required: true, message: '请填写简介' }]"
    />
    <van-field
  v-model="result"
  is-link
  readonly
  name="area"
  label="地区选择"
  placeholder="点击选择省市区"
  @click="showArea = true"
/>
<van-popup v-model:show="showArea" position="bottom">
  <van-area
    :area-list="areaList"
    @confirm="onConfirm"
    @cancel="showArea = false"
  />
</van-popup>
<van-field v-model="address" label="详细地址" placeholder="请输入详细地址" />
       </van-cell-group>
      </van-form>
      <div style="display:flex;flex-direction: column;align-items: center;">
        <a-upload :data="data" name="file" :action="action" @change="handleChange">
                    <a-button size="large" style="margin: 10px auto;width:300px;">
                        上传主页背景
                    </a-button>
                </a-upload>
                <van-button type="primary" @click="commit">提交</van-button>
      </div>
      <!-- <a-list :data-source="list">
          <template #renderItem="{ item }">
            <a-list-item>
              <div>
                {{ item.name }}
              </div>
              <div>{{ item.value }}</div>

            </a-list-item>
          </template>
        </a-list> -->
    </Content>
  </div>
</template>
<style>
.service-li-img {
    display: flex;
    justify-content: center;
    border-bottom-style: solid;
    border-width: 2px;
    border-bottom-color: #afacac;
    margin-top: 20px;
    margin-bottom: 20px;
}
.service {
    width: 100%;
    height: 300px;
    border-radius: 5px;
    box-shadow: 0px 3px 5px #a5a2a2 ;
    padding: 20px;
}
.service-li {
    border-bottom-style: solid;
    border-width: 2px;
    border-bottom-color: #afacac
}
.img-help {
  width: 100%;
  height: 200px;
}
.title {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
ul li {
    margin-bottom: 10px;
}
.advantage {
  width: 100%;
  height: 200px;
  box-shadow: 0px 0px 5px #a5a2a2;
  margin-top: 10px;
  padding-top: 10px;
}
</style>
