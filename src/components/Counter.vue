<!-- <script>
import * as Vue from "vue"

export default {
  setup(){
    const count = Vue.ref(0)

    const add = () => count.value++

    return {
      count,
      add
    }

  }
}
</script> -->
<!-- SFC Simple-File-Compnent -->
<script setup>
import { ref } from "vue"
import { useStore } from "vuex"

const store = useStore()
const count = ref(35)

const add = () => count.value++

const sub = () => count.value--

const addByGlobal = () => {
  store.commit("increase")
}

const subByGlobal = () => {
  store.commit("decrease")
}
</script>
  
  
  
<template>
  <h1>普通计数器</h1>
  <div style="color:red;" class="counter">
    {{count}}
  </div>
  <button @click="sub">-</button>
  <button @click="add">+</button>
  <h1>全局计数器</h1>
  <!-- 全局状态管理的最外层 -->
<div>{{$store.state.count}}</div>
<!-- 全局状态管理的modules中的state -->
<div>{{$store.state.pageDirection.count}}</div>
<button @click="subByGlobal">-</button>
<button @click="addByGlobal">+</button>
</template>

<style scoped>
.counter {
  font-size: v-bind(count+"px");
  /*样式与vue绑定 但是耗性能 */
}
</style>
  