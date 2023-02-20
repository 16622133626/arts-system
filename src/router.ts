import {Express} from "express"
import * as api from "./api"
import { checkToken } from "./middleware/token"
import { uploadImg } from "./middleware/upload"

export const useRouter = (app:Express) => {
    app.get("/",(req,resp) => resp.send("hello ts"))
    app.get("/pingdb",api.PingDb)
    // curl -X POST http://localhost:3000/search 
    app.post("/search",api.Search)

    app.post("/api/register",api.Register)
    //无token方式
    app.post("/api/login",api.Login)
    //接口名字
    app.post("/api/loginbystate",api.LoginByState)
    //加入购物车接口  中间件拦截
    app.post("/api/addcart",checkToken,api.AddCart)
    //从购物车移除
    app.post("/api/removecart",checkToken,api.RemoveCart)

    app.post("/api/removecartsingle",checkToken,api.RemoveCartSingle)
     //上传文件的接口 中间件校验登录
    app.post("/api/uploadimg",uploadImg.single("file"),checkToken,api.UploadImg)

    app.post("/api/createorder",checkToken,api.CreateOrder)

    app.post("/api/modifyproduct",uploadImg.single("file"),api.ModifyProduct)
}