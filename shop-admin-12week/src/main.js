import { createApp } from 'vue'
import { router } from "./router"
import { useAntD } from "./antd"
import App from './App.vue'

const app = createApp(App)
useAntD(app)
app.use(router).mount('#app')
