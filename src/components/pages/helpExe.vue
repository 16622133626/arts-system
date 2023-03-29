<script setup>
import TopBar from "@/components/topbar/TopBar.vue";
import { useRouter } from "vue-router";
import { useState } from "@/store/pageDirection";
import Content from "@/components/content/Content.vue";

const state = useState();
const router = useRouter();

const back = () => {
  state.setDirection("backward");
  router.go(-1);
};
</script>

<template>
  <div>
    <top-bar>
      <template v-slot:left>
        <span class="iconfont icon-xiangzuojiantou" @click="back"></span>
      </template>
      <template v-slot:middle>
        <div>获奖领取</div>
      </template>
    </top-bar>
    <Content style="background-color: rgb(248, 239, 239);">
        <div class="item-que">
            <h3>我获奖后多久可以收到奖金和奖品？</h3>
            <div style="color:rgb(118, 115, 115);font-size: 16px;">
                &nbsp;&nbsp;一般情况下，公示期（公示期：比赛结果公布后20个自然日）到期后，20个工作日内完成发放。特殊情况会在活动获奖处进行公告。
            </div>
        </div>
        <div class="item-que">
            <h3>奖品寄出以后，我一直没收到货怎么办？</h3>
            <div style="color:rgb(118, 115, 115);font-size: 16px;">
                &nbsp;&nbsp;登陆个人中心核对个人收件信息是否准确完善，若信息无误仍未收到奖品，联系微信号：gracg005
            </div>
        </div>
        <div class="item-que">
            <h3>没有注意到自己获奖了，已经超过获奖回应的规定时间了怎么办？</h3>
            <div style="color:rgb(118, 115, 115);font-size: 16px;">
                &nbsp;&nbsp;主动与机器人（微信号：gracg005）联系，奖品或奖金3个月如果超过3个月，将视为自动放弃奖励
            </div>
        </div>
        <div class="item-que">
            <h3>有人声称是活动主办方工作人员，私底下联系我怎么办？</h3>
            <div style="color:rgb(118, 115, 115);font-size: 16px;">
                &nbsp;&nbsp;一般情况下只会通过机器人私信联系您，或者统一短信通知。如果遇到其他人员与您私下联系，可以第一时间找王国微信进行核实。
            </div>
        </div>
        <div class="item-que">
            <h3>赏金任务显示没填写收款信息导致任务金发放失败，我重新填写了还可以收到任务金吗？</h3>
            <div style="color:rgb(118, 115, 115);font-size: 16px;">
                &nbsp;&nbsp;只要是在有效期内提交都视为有效，若15个工作日内仍未收到，请私信联系机器人
            </div>
        </div>
    </Content>
  </div>
</template>
<style>
.image {
    width:100% ;
    padding-top: -20px --12px;
    height: 200px;
    background-color: bisque;
}
.item-que {
    width: 100%;
    height: 150px;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 15px;
}
</style>
