import {Express} from "express"
import * as api from "./api"
import { checkToken } from "./middleware/token"
import { uploadWorkImg,uploadImg,uploadBack } from "./middleware/upload"


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
    //收藏作品接口  中间件拦截
    app.post("/api/collection",checkToken,api.Collection)
     // 收藏取消
    app.post("/api/cancelcollection",checkToken,api.CancelCollection)
    // 点赞功能接口
    app.post("/api/addcart",checkToken,api.Like)
    //从购物车移除
    app.post("/api/removecart",checkToken,api.RemoveCart)

    app.post("/api/removecartsingle",checkToken,api.RemoveCartSingle)
     //上传文件的接口 中间件校验登录
    app.post("/api/uploadimg",uploadImg.single("file"),checkToken,api.UploadImg)
    //上传主页背景的接口 中间件校验登录
    app.post("/api/uploadbackimg",uploadBack.single("file"),checkToken,api.UploadBackImg)
    
    // 上传详情图片接口 // 后台管理上传活动照片
    app.post("/api/uploadwork",uploadWorkImg.single('file'),checkToken,api.UploadWork)
    
    // 发布作品接口
    app.post("/api/publishwork",checkToken,api.Publish)
    // 报名活动 
    app.post("/api/createorder",checkToken,api.JoinActive)
    // 进活动作品投票时的当前查询活动接口
    app.post("/api/queryactive",api.QueryActive)
    // 用户投票接口
    app.post("/api/uservoteactive",checkToken,api.UserVoteActive)
    // 用户投票查询
    app.post("/api/queryuservoteactive",checkToken,api.QueryUserVoteActive)
    // 查询对应用户信息
    app.post("/api/queryuserInfo",api.QueryUserInfo)
    // 查询对应活动信息
    app.post("/api/queryactiveInfo",api.QueryActiveInfo)
    /// 查询个人用户作品
    app.post("/api/queryuserwork",api.QueryUserWork)
    // 后台查询用户列表
    app.post("/api/queryuserlist",api.QueryUseList)
    // 查询用户参加活动作品列表
    app.post("/api/queryactivework",api.QueryActiveWork)
    // 修改用户信息
    app.post("/api/updateuserlist",checkToken,api.UpdateUseList)
    // 增加用户信息
    app.post("/api/adduser",checkToken,api.AddUser)
    // 修改活动信息
    app.post("/api/updateactiveinfo",checkToken,api.UpdateActiveInfo)
    // 增加活动信息
    app.post("/api/addactiveinfo",checkToken,api.AddActiveInfo)
    // 删除活动信息
    app.post("/api/delactive",checkToken,api.delActive)
    // 修改分类信息CommitInfor
    app.post("/api/updatecate",checkToken,api.UpdateCate)
    // 更新用户信息
    app.post("/api/updatuserinfo",checkToken,api.CommitInfor)
    // 后台活动审批
    app.post("/api/workaudit",checkToken,api.WorkAudit)
    // 查询所有作品
    app.post('/api/querygood',api.queryGood)
    // 查询所有收藏
    app.post('/api/querycollection',api.QueryCollections)
     // 查询所有报名用户
     app.post('/api/queryerrolluser',api.QueryErroll)
     // 查询参赛作品
     app.post('/api/queryjoinwork',api.QueryJoin)
    // 实时更改活动时间状态
     app.post('/api/updatetime',api.UpdateTime)
     // 实时更改活动作品数量
     app.post('/api/updateworkcount',api.UpdateWorkCount)
     // 实时更改活动参加人数
     app.post('/api/updatepeoplecount',api.UpdatepeopleCount)
     // 生成登录验证码接口
     app.post('/api/getkeyword',api.GetKeyWord)
     // 短信验证登录接口
     app.post('/api/nopasslogin',api.NoPassLogin)

    app.post("/api/modifyproduct",uploadImg.single("file"),api.ModifyProduct)
}