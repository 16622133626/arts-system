<script setup>
import TabBar from "@/components/tabbar/TabBar.vue"
import TabBarItem from "@/components/tabbar/TabBarItem.vue"
</script>
<template>
    <div>
        <router-view></router-view>
    <!-- position:fixed bottom:0 div -->
    <!-- <div style="position:fixed; bottom:0px; height: 58px;width:100% ;background-color: red;"></div> -->
    <tab-bar>
        <tab-bar-item name="首页" path="/main/home">
            <template v-slot:icon>
                <div class="iconfont icon-shouye" style="font-size:20px;"></div>
            </template>
        </tab-bar-item>
        <tab-bar-item name="活动" path="/main/cate">
            <template v-slot:icon>
                <div class="iconfont icon-huodong1" style="font-size:20px;"></div>
            </template>
        </tab-bar-item>
        <tab-bar-item name="发布" path="/main/publish">
            <template v-slot:icon>
                <div class="iconfont icon-fabu" style="font-size:20px;"></div>
            </template>
        </tab-bar-item>
        <tab-bar-item name="发现" path="/main/order">
            <template v-slot:icon>
                <div class="iconfont icon-faxian" style="font-size:20px;"></div>
            </template>
        </tab-bar-item>
        <tab-bar-item name="我的" path="/main/my">
            <template v-slot:icon>
                <div class="iconfont icon-wode" style="font-size:20px;"></div>
            </template>
        </tab-bar-item>
        
    </tab-bar>
    </div>
    
</template>