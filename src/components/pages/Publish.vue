<script setup>
import { ref, inject, reactive, defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import TopBar from "@/components/topbar/TopBar.vue";
import Content from "@/components/content/Content.vue";
import { getItem } from "@/kits/LocalStorageKit";
import { PlusOutlined } from "@ant-design/icons-vue";
import { baseURL } from "@/kits/HttpKit";
import { myHttp } from "@/kits/HttpKit";

const checked = ref("01");
const message = inject("$message");
const router = useRouter();
const state = useState();
const order = ref([]);
const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
const action = baseURL + "/api/uploadwork"; // 上传接口

const value = ref("");
const desc = ref("");

const publish = async () => {
  console.log("输出", formState);
  console.log("输出作品类型", checked.value);
  console.log("输出111", fileList.value[0].name);
  const imgpathDetail1 = fileList.value[0].name
  const imgpathDetail2 = fileList.value[1].name
  const imgpathDetail3 = fileList.value[2].name
  const imgpathDetail4 = fileList.value[3].name
  const resPublish = await myHttp("/api/publishwork", {
    token: getItem("token"),
    userId: getItem("userId"),
    formState,
    imgpathDetail1,
    imgpathDetail2,
    imgpathDetail3,
    imgpathDetail4
    });
  console.log('5555返回结果',resPublish)
  if (resPublish.code === 1) {
      message.success({
        content: resPublish.msg,
        duration: 2,
      });
    }
};

// const fileChange1 = () => {
//   console.log('$ref',this.$refs)
// }
const data = reactive({
  token: getItem("token"),
  userId: getItem("userId"),
});

const fileList = ref([]);

const formState = reactive({
  checked:'',
  value:'',
  desc:''
});

//限制上传大小
const beforeRead = async (file) => {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    this.$toast("图片大小不能超过 2MB!");
  }
  // const resPublish = await myHttp("/api/uploadwork", {
  //   userId,
  //   token,
  // });
  console.log("nihao ", resPublish);
};
</script>

<template>
  <div>
    <top-bar style="box-shadow: unset">
      <template v-slot:left>
        <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
      </template>
      <template v-slot:middle>
        <div></div>
      </template>
    </top-bar>
    <Content>
      <a-form :model="formState">
        <a-form-item name="radio-group" label="作品类别">
          <a-radio-group v-model:value="formState.checked">
            <a-radio value="01">书法</a-radio>
            <a-radio value="02">国画</a-radio>
            <a-radio value="03">摄影</a-radio>
            <a-radio value="04">油画</a-radio>
            <a-radio value="05">活动</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="upload" label="上传文件">
          <a-upload
            v-model:file-list="fileList"
            :action="action"
            :data="data"
            list-type="picture-card"
          >
            <div v-if="fileList.length < 4">
              <plus-outlined />
              <div style="margin-top: 8px">Upload</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :title="previewTitle"
            :footer="null"
          >
          </a-modal>
        </a-form-item>
        <a-form-item>
          <a-input
            style="margin-bottom: 10px"
            v-model:value="formState.value"
            placeholder="填写标题会有更多赞呦~"
          />
        </a-form-item>
        <a-form-item>
          <a-textarea
            style="margin-bottom: 10px"
            v-model:value="formState.desc"
            placeholder="请输入作品描述"
            :rows="5"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="publish">一键发布</a-button>
        </a-form-item>
      </a-form>
      <!-- <van-button type="info" @click="publish">发布作品</van-button> -->
    </Content>
  </div>
</template>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
