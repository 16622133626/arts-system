//引入需要的组件
import { Button } from 'vant';
import { Tab, Tabs } from 'vant';
import { Empty } from 'vant';
import { Icon } from 'vant'
//引入组件样式
import 'vant/lib/index.css';

// 3. 注册你需要的组件


export const useVant = (app) => {
    // ConfigProvider.config({
    //     theme:{
    //         primaryColor:'#1989fa',
    //     }
    // });
    // message.config({
    //     top:"120px"
    // })
    app.use(Button);
    app.use(Icon)
    app.use(Tab)
    app.use(Tabs)
    app.use(Empty)
}