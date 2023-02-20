import { createApp } from 'vue' //为啥是小写，因为是文件夹名
import {router} from '@/router'
import {store} from "@/vuex"
import { pinia } from "@/store"
import App from '@/App.vue'
import {useAntd} from '@/antd'
import {useVant } from '@/vant'


const app = createApp(App)
useAntd(app)
useVant(app)
app.use(router)
app.use(store)
app.use(pinia)
app.mount('#app')
 