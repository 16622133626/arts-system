//引入需要的组件
import { Button } from 'vant';
import { RadioGroup,Radio } from 'vant';
import { Tab, Tabs } from 'vant';
import { Empty } from 'vant';
import { Icon } from 'vant'
import { Form, Field, CellGroup } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Dialog } from 'vant';
import { Uploader } from 'vant';
import { Tag } from 'vant';
import { List } from 'vant';
import { Area, Popup } from 'vant'
//引入组件样式
import 'vant/lib/index.css';

// 3. 注册你需要的组件


export const useVant = (app) => {
    app.use(Button);
    app.use(Icon)
    app.use(Tab)
    app.use(Tabs)
    app.use(Empty)
    app.use(Dialog)
    app.use(Form)
    app.use(Field)
    app.use(Area)
    app.use(Popup)
    app.use(List)
    app.use(CellGroup)
    app.use(Swipe)
    app.use(SwipeItem)
    app.use(Uploader)
    app.use(Radio)
    app.use(Tag)
    app.use(RadioGroup)
}