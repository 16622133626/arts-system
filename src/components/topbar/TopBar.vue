<script setup>
import {watch,ref} from "vue"
import { SearchOutlined } from '@ant-design/icons-vue';

const props = defineProps({
    searchInput:String,
    edit:{
        typeof:Boolean,
        default:false
    }
})
// //通过三元表达式保证searchContent是一个字符串
// const searchContent = ref(props.searchInput ? props.searchInput : "")
const searchContent = ref(props.searchInput ? props.searchInput : "")

const emit = defineEmits(["handleTabbar","searchContentChangeHandle"])

const focusHandle = () => emit("handleTabbar")

watch(searchContent,curr => {
    console.log("topbar中输入框最新值",curr)
    emit("searchContentChangeHandle",curr)
})

let timeoutId = null
watch(searchContent, curr => {
    // console.log("topbar 中 输入框最新值", curr)
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => emit("searchContentChangeHandle", curr),500)
    
})
</script>
<template>
    <div class="top-bar">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <slot name="middle">
                <a-input v-if="edit" placeholder="请输入搜索内容" v-model:value="searchContent">
                    <template #prefix>
                        <search-outlined />
                    </template>

                </a-input>
                <a-input v-else placeholder="请输入搜索内容" @focus="focusHandle">
                    <template #prefix>
                        <search-outlined />
                    </template>

                </a-input>
            </slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped>
.top-bar {
    height: 65px;
    background-color: #fff;
    box-shadow: 0px 1px 2px rgb(0 0 0 / 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    

}
.middle {
    width: 80%;
}

.anticon {
    color: grey;

}

.ant-input-affix-wrapper {
    border-radius: 7px;
    border: unset;
    background-color: rgb(172 172 172 / 0.1);
    color: #979797;
}

/**
 我们想修改 input.ant-input 的背景颜色
 但由于 input.ant-input  是 ant-input-affix-wrapper 的后代样式
 又由于我们的style是局部的 scoped 所以我们的效果没有生效，相当于被屏蔽

 解决方式有两种;
 第一种：把style行间的scpoed 去掉，但是同时会把这个style中的其他样式升级全局
 第二中：在样式前面加上:deep()，这样会在保持局部的情况下，这个能穿透。
 
*/
:deep(.ant-input-affix-wrapper > input.ant-input) {
    background-color: unset !important;
}
</style>