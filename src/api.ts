import { Request, Response } from "express";
import { Connect } from "./db/mongo"
import jwt from "jsonwebtoken"  //给token加密的插件
import {UpdateResult} from "mongodb"
import {join} from "path"
import moment from "moment";
//导入commonjs语法的配置文件
const {protocal,ip,port,imgs_url,secretOrPrivateKey} = require("../config")

const session: any = {} 
// 搜索作品
export const Search = async (req: Request, resp: Response) => {
    const params = req.body;
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query: any = {
            name: {
                $regex: params.searchContent
            }
        }
        const res = await db.collection("goods").find(query).toArray()
        resp.send({
            code: 1,
            msg: "成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "数据库查询失败",
            data: err
        })
    }
}

export const queryGood = async (req: Request, resp: Response) => {
    const params = req.body;
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const res = await db.collection("goods").find().toArray()
        resp.send({
            code: 1,
            msg: "成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "数据库查询失败",
            data: err
        })
    }
}

// 查询活动数据
export const QueryActive = async (req: Request, resp: Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query: any = {
           id:p.id
        }
        const res = await db.collection("actives").findOne(query)
        console.log('res',res)
        resp.send({
            code: 1,
            msg: "数据库查询成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "数据库查询失败",
            data: err
        })
    }
    // resp.header("Access-Control-Allow-Origin", "*"); // 这么写比较方便，但安全性太差
    // resp.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); 
    // resp.send(["abc1","123","汉堡1","衣服2","可乐3"]

}

// 查询活动数据
export const QueryCollections = async (req: Request, resp: Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query = {
            userId:p.userId
        }
        const res = await db.collection("collection").findOne(query)
        console.log('res',res)
        resp.send({
            code: 1,
            msg: "查询成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "查询失败",
            data: err
        })
    }
    // resp.header("Access-Control-Allow-Origin", "*"); // 这么写比较方便，但安全性太差
    // resp.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); 
    // resp.send(["abc1","123","汉堡1","衣服2","可乐3"]

}
// 查询报名表数据
export const QueryErroll = async (req: Request, resp: Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const res = await db.collection("enroll").find().toArray()
        console.log('res',res)
        resp.send({
            code: 1,
            msg: "查询成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "查询失败",
            data: err
        })
    }
    // resp.header("Access-Control-Allow-Origin", "*"); // 这么写比较方便，但安全性太差
    // resp.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); 
    // resp.send(["abc1","123","汉堡1","衣服2","可乐3"]

}

// 查询参赛作品
export const QueryJoin = async (req: Request, resp: Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p.id)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query = {
            joinActives:p.id
        }
        const res = await db.collection("goods").find(query).toArray()
        console.log('res',res)
        resp.send({
            code: 1,
            msg: "查询成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "查询失败",
            data: err
        })
    }
    // resp.header("Access-Control-Allow-Origin", "*"); // 这么写比较方便，但安全性太差
    // resp.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); 
    // resp.send(["abc1","123","汉堡1","衣服2","可乐3"]

}
// 更改活动时间显示状态
export const UpdateTime = async (req: Request, resp: Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p.id)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query = {
            joinActives:p.id
        }
        const update = {
            status:p.status
        }
        const res = await db.collection("actives").updateOne(query,{
            "$set":update
        })
        console.log('res',res)
        resp.send({
            code: 1,
            msg: "更新成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "更新失败",
            data: err
        })
    }
    // resp.header("Access-Control-Allow-Origin", "*"); // 这么写比较方便，但安全性太差
    // resp.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); 
    // resp.send(["abc1","123","汉堡1","衣服2","可乐3"]

}
// 更新活动作品数量
export const UpdateWorkCount = async (req: Request, resp: Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p.id)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        
        const query = {
            id:p.id
        }
        const resWork = await db.collection("actives").findOne(query)
        const update = {
            workCount: resWork?.workCount + 1
        }
        const res = await db.collection("actives").updateOne(query,{
            "$set":update
        })
        console.log('res',res)
        resp.send({
            code: 1,
            msg: "更新成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "更新失败",
            data: err
        })
    }
    // resp.header("Access-Control-Allow-Origin", "*"); // 这么写比较方便，但安全性太差
    // resp.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); 
    // resp.send(["abc1","123","汉堡1","衣服2","可乐3"]

}
// 更新活动报名人数
export const UpdatepeopleCount = async (req: Request, resp: Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p.id)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        
        const query = {
            id:p.id
        }
        const resWork = await db.collection("actives").findOne(query)
        const update = {
            people: resWork?.people + 1
        }
        const res = await db.collection("actives").updateOne(query,{
            "$set":update
        })
        console.log('res',res)
        resp.send({
            code: 1,
            msg: "更新成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "更新失败",
            data: err
        })
    }
    // resp.header("Access-Control-Allow-Origin", "*"); // 这么写比较方便，但安全性太差
    // resp.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); 
    // resp.send(["abc1","123","汉堡1","衣服2","可乐3"]

}
export const PingDb = async (req: Request, resp: Response) => {
    try {
        //连接数据库时异步
        const client = await Connect()
        //切换数据库是同步
        const db = client.db("twelve_weeks")  //use twelve_weeks
        //ping 一下数据库是否能正常的读取
        const res = await db.command({ ping: 1 })  //db.runCommand({ping:1})
        console.log(res)
        if (res.ok === 1) {
            resp.send("mongo connect success")
        } else {
            resp.send("mongo connect failed")
        }
    } catch (e) {
        console.log(e)
        resp.send("数据库连接失败")
    }
}

export const LoginByState = async (req: Request, resp: Response) => {
    const p = req.body
    console.log("login的参数", p)
    try {
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            const user = await db.collection("user").findOne({ id: p.id._value })
            if (user) {
                if (user.pwd === p.pwd) {
                    //JWT
                    const token = jwt.sign({ id: user.id, role: user.role }, secretOrPrivateKey, {
                        expiresIn: "24h" //超时事件
                    })
                    resp.json({
                        code: 1,
                        msg: "登录成功",
                        //再传一次
                        data: {
                            userId: user.id,
                            avatar: user.avatar,
                            role: user.role,
                            token
                        }
                    })
                } else {
                    resp.json({
                        code: 5,
                        msg: "密码不正确",
                        data: {}
                    })
                }
            } else {
                resp.json({
                    code: 4,
                    msg: "无此用户",
                    data: {}
                })
            }
        } catch (err) {
            resp.json({
                code: 3,
                msg: "用户输入信息问题",
                data: {}

            })
        } finally {

        }
    } catch (e) {
        resp.json({
            code: 2,
            msg: "数据库连接失败",
            data: {}
        })
    }

}
 
// 用户登录接口
export const Login = async (req: Request, resp: Response) => {
    const p = req.body
    console.log('333', req.body)
    // console.log("login的参数:", p)
    try {
        const client = await Connect();
        try {
            const db = client.db("twelve_weeks");
            const user = await db.collection("user").findOne({ id:p.id,role:p.role })
            console.log('5555', user)
            if (user) {
                if (user.password === p.password) {
                    // JWT 编码
                    const token = jwt.sign({ id: user.id, role: user.role }, secretOrPrivateKey, {
                        expiresIn: "24h"
                        // expiresIn:"10000ms"
                    })
                    // console.log("avatar:",`${protocal}://${ip}:${port}${imgs_url}/`+join(user.avatar))

                    resp.json({
                        code: 1,
                        msg: "登陆成功",
                        data: {
                            userId: user.id,
                            userName:user.username,
                            avatar:user.role === "a" ? "" :  `${protocal}://${ip}:${port}${imgs_url}/`+join(user.avatar), // http://ip:port/static/upload/xxx.png
                            role: user.role,
                            token
                        }
                    })
                } else {
                    resp.json({
                        code: 5,
                        msg: "密码不正确",
                        data: {}
                    })
                }
            } else {
                resp.json({
                    code: 4,
                    msg: "无此用户",
                    data: {}
                })
            }
        } catch (err) {
            resp.json({
                code: 3,
                msg: "用户输入信息问题",
                data: {}
            })
        } finally {
            client.close()
        }
    } catch (e) {
        resp.json({
            code: 2,
            msg: "数据库连接失败",
            data: {}
        })
    }

}

// 免密登录接口
export const NoPassLogin = async (req: Request, resp: Response) => {
    const p = req.body
    console.log('333', req.body)
    // console.log("login的参数:", p)
    try {
        const client = await Connect();
        try {
            const db = client.db("twelve_weeks");
            const user = await db.collection("user").findOne({ tel:p.id,role:p.role })
            if (user) {
                const token = jwt.sign({ id: user.id, role: user.role }, secretOrPrivateKey, {
                    expiresIn: "24h"
                    // expiresIn:"10000ms"
                })
                resp.json({
                    code: 1,
                    msg: "登陆成功",
                    data: {
                        userId: user.id,
                        userName:user.username,
                        avatar:user.role === "a" ? "" :  `${protocal}://${ip}:${port}${imgs_url}/`+join(user.avatar), // http://ip:port/static/upload/xxx.png
                        role: user.role,
                        token
                    }
                })
            } else {
                resp.json({
                    code: 4,
                    msg: "无此用户",
                    data: {}
                })
            }
        } catch (err) {
            resp.json({
                code: 3,
                msg: "用户输入信息问题",
                data: {}
            })
        } finally {
            client.close()
        }
    } catch (e) {
        resp.json({
            code: 2,
            msg: "数据库连接失败",
            data: {}
        })
    }

}

// 获取验证码接口 const num = Math.random().toString().slice(-6)
export const GetKeyWord = async (req: Request, resp: Response) => {
    const p = req.body
    console.log('333', req.body)
    // console.log("login的参数:", p)
    try {
        const client = await Connect();
        try {
            const db = client.db("twelve_weeks");
            const user = await db.collection("user").findOne({ tel:p.id })
            console.log('5555', user)
            if (user) {
                // 如果电话号码存在，说明此号码实名认证过 随机返回6位数字
                const num = Math.random().toString().slice(-6)
                    resp.json({
                        code: 1,
                        msg: "生成验证",
                        data: num
                    })
            }
        } catch (err) {
            resp.json({
                code: 3,
                msg: "生成失败",
                data: {}
            })
        } finally {
            client.close()
        }
    } catch (e) {
        resp.json({
            code: 2,
            msg: "数据库连接失败",
            data: {}
        })
    }
}

// // 短信验证登录
// export const LoginKeyWord = async (req: Request, resp: Response) => {
//     const p = req.body
//     console.log('333', req.body)
//     // console.log("login的参数:", p)
//     try {
//         const client = await Connect();
//         try {
//             const db = client.db("twelve_weeks");
//             const user = await db.collection("user").findOne({ tel:p.id })
//             console.log('5555', user)
//             if (user) {
//                 // 如果电话号码存在，说明此号码实名认证过 随机返回6位数字
//                 const num = Math.random().toString().slice(-6)
//                     resp.json({
//                         code: 1,
//                         msg: "生成验证",
//                         data: num
//                     })
//             }
//         } catch (err) {
//             resp.json({
//                 code: 3,
//                 msg: "生成失败",
//                 data: {}
//             })
//         } finally {
//             client.close()
//         }
//     } catch (e) {
//         resp.json({
//             code: 2,
//             msg: "数据库连接失败",
//             data: {}
//         })
//     }
// }
// 收藏接口
export const Collection = async (req: Request, resp: Response) => {
    const p = req.body
    console.log('5555',p)
    try {
        const client = await Connect()
        try{
            const db = client.db("twelve_weeks")
            const query = { //用户ID
                userId:p.userId
            }
            const resUser = await db.collection("collection").findOne(query)
            console.log('ggagga',resUser)
            if(!resUser) {
                // 如果用户不存在 新建数组
                const colleList: string | any[] = []
                colleList.push(p.goodId)
                console.log('推进去',colleList)
                const query = {
                    userId:p.userId,
                }
                const insert = {
                    userId:p.userId,
                    userName:p.userName,
                    count:1,
                    colleList:colleList
                }
                const res = await db.collection("collection").insertOne(insert)
                console.log('/api/collection',res)
               if(res.acknowledged === true){
                resp.json({
                    code:1,
                    msg:"收藏成功",
                    data:res
                })
               }
            }
            // 如果用户存在 先判断数组长度
            else {
                    
                    resUser?.colleList.forEach(async (e: any) => {
                        console.log('666',222)
                        if(e != p.goodId){
                            console.log('666',333)
                            resUser?.colleList.push(p.goodId) //已经推进去了
                            console.log('666',resUser.colleList)
                            const query = {
                                userId:p.userId,
                            }
                            const update = {
                                count:resUser.count+1,
                                colleList:resUser.colleList
                            }
                            // session 会话已结束？？
                            const resInsert = await db.collection("collection").updateOne(query,{
                                "$set":update,
                            })
                            console.log('555',resInsert)
                            if(resInsert.upsertedCount === 1 || resInsert.modifiedCount === 1){
                                resp.json({
                                    code:6,
                                    msg:"收藏成功",
                                    data:{}
                                })
                             }else {
                                resp.json({
                                    code:4,
                                    msg:"收藏失败",
                                    data:{}
                                })
                             } 
                        }else {
                            try {
                                const db = client.db("twelve_weeks")
                                resUser.colleList.splice(resUser.colleList.indexOf(p.goodId),1)
                                        const query = {
                                    userId:p.userId,
                                }
                                console.log('删除后的数组',resUser.colleList)
                                const update = {
                                    count:resUser.colleList.lenght,
                                    colleList:resUser.colleList
                                }
                                const res = await db.collection("collection").updateOne(query,{
                                    "$set":update,
                                },{upsert:true})
                                console.log('取消收藏',res)
                                if(res.upsertedCount === 1 || res.modifiedCount === 1) {
                                    resp.json({
                                        code:8,
                                        msg:"取消收藏",
                                        data:res
                                    })
                                }
                            }catch (e:any){
                                resp.send({
                                    code:9,
                                    msg:e.message,
                                    data:{}
                                })
                            }
                                
                        }
                    })
                
            //     // 如果数组长度大于0
            //     // if(resUser.colleList && resUser.colleList.lenght > 0){
            //     //     resUser.colleList.forEach(async (e: any) => {
            //     //         if(e === p.goodId){
            //     //             // 如果数组里面有这个ID，就代表已经收藏过，取消收藏 删除数组里面指定元素
            //     //             resUser.colleList.splice(resUser.colleList.indexOf(p.goodId),1)
            //     //             const query = {
            //     //                 userId:p.userId,
            //     //             }
            //     //             console.log('删除后的数组',resUser.colleList)
            //     //             const update = {
            //     //                 count:resUser.colleList.lenght,
            //     //                 colleList:resUser.colleList
            //     //             }
            //     //             const res = await db.collection("collection").updateOne(query,{
            //     //                 "$set":update,
            //     //             })
            //     //             if(res.upsertedCount === 1 || res.modifiedCount === 1) {
            //     //                 resp.json({
            //     //                     code:8,
            //     //                     msg:"取消收藏",
            //     //                     data:{res}
            //     //                 })
            //     //             }
                            
            //     //         }else {
            //     //             // 如果没收藏过就重新PUSH进去
            //     //             resUser.colleList.push(p.goodId)
            //     //             const query = {
            //     //                 userId:p.userId,
            //     //             }
            //     //             const update = {
            //     //                 count:resUser.count+1,
            //     //                 // colleList:Array.from(new Set(resUser.colleList)) // 数组去重
            //     //                 colleList:resUser.colleList
            //     //             }
            //     //             const res = await db.collection("collection").updateOne(query,{
            //     //                 "$set":update,
            //     //             })
            //     //             if(res.upsertedCount === 1 || res.modifiedCount === 1){
            //     //                 resp.json({
            //     //                     code:6,
            //     //                     msg:"收藏成功",
            //     //                     data:{}
            //     //                 })
            //     //              }else {
            //     //                 resp.json({
            //     //                     code:4,
            //     //                     msg:"收藏失败",
            //     //                     data:{}
            //     //                 })
            //     //              }    

            //     //         }
            //     //     }) 
            //     // }else{
            //     //     // 如果数组不大于0 就是收藏后取消过一次 在冲洗
            //     //     resUser.colleList.push(p.goodId)
            //     //     const query = {
            //     //         userId:p.userId,
            //     //     }
            //     //     const update = {
            //     //         count:resUser.count+1,
            //     //         // colleList:Array.from(new Set(resUser.colleList)) // 数组去重
            //     //         colleList:resUser.colleList
            //     //     }
            //     //     const res = await db.collection("collection").updateOne(query,{
            //     //         "$set":update,
            //     //     })
            //     //     if(res.upsertedCount === 1 || res.modifiedCount === 1){
            //     //         resp.json({
            //     //             code:7,
            //     //             msg:"收藏成功",
            //     //             data:{}
            //     //         })
            //     //      }else {
            //     //         resp.json({
            //     //             code:4,
            //     //             msg:"收藏失败",
            //     //             data:{}
            //     //         })
            //     //      }    
            //     // }
            //     // 如果用户存在 插入数组
                   
            }
            
        }catch(e:any){
            resp.send({
                code:3,
                msg:e.message,
                data:{}
            })
        }finally{
            client.close()//关闭数据库
        }
        
    } catch (error:any) {
        resp.send({
            code:2,
            msg:error.message,
            data:{}
        })
    }

}
// 取消收藏 
export const CancelCollection = async (req: Request, resp: Response) => {
    const p = req.body
    console.log('5555',p)
    try {
        const client = await Connect()
        try{
            const db = client.db("twelve_weeks")
            const query = { //用户ID
                userId:p.userId
            }
            const resUser = await db.collection("collection").findOne(query)
            console.log('ggagga',resUser)
            // 如果用户存在 先判断数组长度
                console.log('666',555)
                resUser?.colleList.forEach(async (e: any,i:any) => {
                    console.log('666',222)
                    if(e === p.goodId){
                        console.log('666',333)
                        resUser.colleList.splice(i,1) //已经shanchu
                        console.log('666',resUser.colleList)
                        const query1 = {
                            userId:p.userId,
                        }
                        const update1 = {
                            count:resUser.count+1,
                            colleList:resUser.colleList
                        }
                        const res = await db.collection("collection").updateOne(query1,{
                            "$set":update1,
                        })
                        console.log('555',res)
                        if(res.upsertedCount === 1 || res.modifiedCount === 1){
                            resp.json({
                                code:6,
                                msg:"取消成功",
                                data:{}
                            })
                         }else {
                            resp.json({
                                code:4,
                                msg:"取消成功",
                                data:{}
                            })
                         } 
                    }
                })
        }catch(e:any){
            resp.send({
                code:3,
                msg:e.message,
                data:{}
            })
        }finally{
            client.close()//关闭数据库
        }
        
    } catch (error:any) {
        resp.send({
            code:2,
            msg:error.message,
            data:{}
        })
    }

}

// 作品点赞
export const Like = async (req: Request, resp: Response) => {
    const p = req.body
    console.log('5555',p)
    try {
        const client = await Connect()
        try{
            const db = client.db("twelve_weeks")
            const query = { //用户ID
                userId:p.userId
            }
            const resUser = await db.collection("like").findOne(query)
            console.log('ggagga',resUser)
            if(!resUser) {
                // 如果用户不存在 新建数组
                const colleList: string | any[] = []
                colleList.push(p.goodId)
                console.log('推进去',colleList)
                const query = {
                    userId:p.userId,
                }
                const insert = {
                    userId:p.userId,
                    userName:p.userName,
                    count:1,
                    likeList:colleList
                }
                const res = await db.collection("like").insertOne(insert)
               if(res.acknowledged === true){
                resp.json({
                    code:1,
                    msg:"点赞成功",
                    data:res
                })
               }
            }else {
                resUser.collection.forEach()
            }
            
        }catch(e:any){
            resp.send({
                code:3,
                msg:e.message,
                data:{}
            })
        }finally{
            client.close()//关闭数据库
        }
        
    } catch (error:any) {
        resp.send({
            code:2,
            msg:error.message,
            data:{}
        })
    }

}

//创建订单之后删除购物车里数据
export const RemoveCart = async (req:Request,resp:Response) => {
    const p = req.body
    try {
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            const goodIds = p.cart.reduce((acc:any,item:any) => {
                acc.push(item.id)
                return acc
            },[])
            const filter = {
                id:{
                    "$in":goodIds
                },
                userId:p.userId
            }
         
            const res = await db.collection("cart").deleteMany(filter)
            // console.log(res)
            if(res.deletedCount > 0){
                resp.json({
                    code:1,
                    msg:"删除成功",
                    data:{}
                })
            }else{
                resp.json({
                    code:4,
                    msg:"删除失败",
                    data:{}
                })
            }
        } catch (e:any) {
            resp.send({
                code:3,
                msg:e.message,
                data:{}
            })
        } finally {
            client.close()
        }
    } catch (error:any) {
        resp.send({
            code:2,
            msg:error.message,
            data:{}
        })
    } 
}


// 注册
export const Register = async (req: Request, resp: Response) => {
    const p = req.body;
    console.log('11',p)
    //去连接数据库
    try {
        const client = await Connect()
        try{
         const db = client.db("twelve_weeks")
         const query = {
            id:p.id
         }
         const insert = {
            ...p,
            status:'1',
            //只要服务器在，就能访问到
            avatar:"./touxiang.png",
            role:"c",
            // 插入一个空数组，活动投票时候使用
            list:[]
         }
         const options = {
            upsert:true
         }
         const res:UpdateResult = await db.collection("user").updateOne(query,{
            "$setOnInsert":insert
         },options)
         console.log('8888', res)
         if(res.upsertedCount === 1){
            resp.json({
                code:1,
                msg:"注册成功",
                data:{}
            })
         }else if(res.upsertedCount === 0 && res.matchedCount> 0){
            resp.json({
                code:4,
                msg:"该用户不存在",
                data:{}
            })
         }else{
            resp.json({
                code:5,
                msg:"未知原因，注册失败",
                data:{}
            })
         }
        }catch(err){
            resp.json({
                code: 3,
                msg:"数据库问题导致注册失败",
                data: {}
            })
        }finally{
            client.close()
        }
        
    } catch (e) {
        resp.json({
            code: 2,
            msg:"数据库连接失败",
            data: {}
        })
    }
}
// 用户上传头像
export const UploadImg = async (req:Request,resp:Response) => {
    const p = req.body
    const file = req.file
    console.log('拿到传递参数',p)
    console.log('拿到上传照片',file)
    try{
        const client = await Connect()
        try{
            const db = client.db("twelve_weeks")
            const query = {
                id:p.userId
            }
            const avatarPath = file ? "./avatar/"+file.filename : "./mockavatar.png"
            const update = {
                $set:{
                    //avatar:file?.filename  问号是不确定有没有值
                    avatar:avatarPath
                }
            }
            const res = await db.collection("user").updateOne(query,update)
            if(res.modifiedCount === 1 && res.matchedCount === 1){
                const avatar = `${protocal}://${ip}:${port}${imgs_url}/`+join(avatarPath)
                resp.send({
                    code:1,
                    msg:"上传成功",
                    data:{
                        avatar
                    }
                }) 
            }else{
                resp.send({
                    code:4,
                    msg:"上传失败",
                    data:{}
                }) 
            }
        }catch(e){
            resp.json({
                code:3,
                msg:"更新数据库失败",
                data:{}
            })

        }finally{
        client.close()
    }

    }catch(error){
        resp.json({
            code:2,
            msg:"数据库连接失败",
            data:{}
        })
    }
    
}

export const UploadBackImg = async (req:Request,resp:Response) => {
    const p = req.body
    const file = req.file
    console.log('拿到传递参数',p)
    console.log('拿到上传照片',file)
    try{
        const client = await Connect()
        try{
            const db = client.db("twelve_weeks")
            const query = {
                id:p.userId
            }
            const mustPath = file ? "./backImg/"+file.filename : "./fengjingyouhua1.jpg"
            const update = {
                $set:{
                    //avatar:file?.filename  问号是不确定有没有值
                    BackImg:mustPath
                }
            }
            const res = await db.collection("user").updateOne(query,update)
            if(res.modifiedCount === 1 && res.matchedCount === 1){
                const BackImg = `${protocal}://${ip}:${port}${imgs_url}/`+join(mustPath)
                resp.send({
                    code:1,
                    msg:"上传成功",
                    data:{
                        BackImg
                    }
                }) 
            }else{
                resp.send({
                    code:4,
                    msg:"上传失败",
                    data:{}
                }) 
            }
        }catch(e){
            resp.json({
                code:3,
                msg:"更新数据库失败",
                data:{}
            })

        }finally{
        client.close()
    }

    }catch(error){
        resp.json({
            code:2,
            msg:"数据库连接失败",
            data:{}
        })
    }
    
}
// 用户上传作品图片
export const UploadWork = async (req:Request,resp:Response) => {
    const p = req.body
    const file = req.file
    console.log('拿到传递参数',p)
    console.log('拿到上传照片',file)
    try{
        resp.json({
            code:1,
            msg:"上传成功",
            data:{
                file:file
            }
        })
    }catch(error){
        resp.json({
            code:2,
            msg:"数据库连接失败",
            data:{}
        })
    }
}
// 用户报名接口
export const CreateOrder = async (req:Request,resp:Response) => {
    const p = req.body
    try{
        const client = await Connect()
        const id = "OR"+Date.now()
        try{
            const order = {
                ...p.order,
                id,
                sysdate:moment().format("YYYY-MM-DD HH:mm:ss")
            }
            const db = client.db("twelve_weeks") //client.db() 不需要与数据库通讯，仅仅做了一个预先配置
            const res = await db.collection("enroll").insertOne(order)
            console.log(res)
            if(true){
                resp.send({
                    code:1,
                    msg:"报名成功",
                    data:{
                        id
                    }
                })
            }else{
                resp.send({
                    code:4,
                    msg:"报名失败",
                    data:{}
                })
            }

        }catch(err:any){
            resp.send({
                code:3,
                msg:err.message,
                data:{}
            })
        }finally{
            client.close()
        }
    }catch(e:any){
        resp.send({
            code:2,
            msg:e.message,
            data:{}
        })
    }
    //前端如何去处理一个事务？
    
}

//用户投票接口 把用户邮票的活动ID放到user表下面便于查询
export const UserVoteActive = async (req:Request,resp:Response) => {
    const p = req.body
    console.log('获取传递参数',typeof(p.likeCount))
    try{
        const client = await Connect()
        const id = Math.random().toString().slice(-6)
        const db = client.db("twelve_weeks") //client.db() 不需要与数据库通讯，仅仅做了一个预先配置
        let user = await db.collection("user").findOne({id:p.userId})
        console.log('4444user',user)
        // 先查询活动时间是否结束
        let active = await db.collection("actives").findOne({id:p.id})
        console.log('查询活动列表',Date.parse(active?.resultPubTime)) //活动结束时间转化时间戳
        const t1 = new Date().valueOf() // 获取当前时间时间戳
        if(Date.parse(active?.resultPubTime) - t1 < 0) {
            // 本场活动结束
                    resp.send({
                            code:5,
                            msg:"本次活动结束",
                            data:{}
                        })
        } else {
            // 判断用户是否投票
        if(user) {
            console.log('length',user.list)
            // 用户已经投票活动
            // 用户遍历查看此次活动是否已投票
            if(user.list && user.list.length > 0) {
                console.log('3333')
                user.list.forEach(async (element: any) => {
                    // 如果list数组里面有相同ID，则不能再投票
                    console.log('444',element)
                    if(element === p.id) {
                        console.log('444')
                        resp.send({
                            code:3,
                            msg:"已经投过票啦",
                            data:{
                                id,
                                user
                            }
                        })
                        return
                    }else {
                        // 如果ID不存在list数组中，则继续放进去活动ID
                        const query = {
                            id:p.userId
                        }
                        user?.list.push(p.id)
                        console.log('use',user?.list)
                        const insert = {
                            list:Array.from(new Set(user?.list)) // 数组去重操作
                        }
                        const res = await db.collection("user").updateOne(query,{
                            '$set':insert
                        })
                        if(true){
                            resp.send({
                                code:4,
                                msg:"投票成功",
                                data:{
                                    id,
                                    user
                                }
                            })
                            const query = {
                                joinActives:p.id
                            }
                            const insert1 = {
                                likeCount:p.likeCount + 1
                            }
                            await db.collection("goods").updateOne(query,{
                                '$set':insert1
                            })
                        }else{
                            resp.send({
                                code:5,
                                msg:"投票失败",
                                data:{}
                            })
                        }
                    }
                });
            }else {
                // 如果list数组为空，证明此用户没有参与过任何活动
                const query = {
                    id:p.userId
                }
                user?.list.push(p.id)
                const insert = {
                    list:Array.from(new Set(user?.list)) // 数组去重操作
                }
                const res = await db.collection("user").updateOne(query,{
                    '$set':insert
                })
                if(true){
                    resp.send({
                        code:4,
                        msg:"投票成功",
                        data:{
                            id,
                            user
                        }
                    })
                    const query2 = {
                        joinActives:p.id
                    }
                    const insert2 = {
                        likeCount:p.likeCount + 1
                    }
                    const good = await db.collection("goods").updateOne(query2,{
                        '$set':insert2
                    })
                }else{
                    resp.send({
                        code:5,
                        msg:"投票失败",
                        data:{}
                    })
                }
            }
            

        }

        }
    }catch(e:any){
        resp.send({
            code:2,
            msg:e.message,
            data:{}
        })
    }
    //前端如何去处理一个事务？
    
}
// 查询用户报名数据接口
export const QueryUserVoteActive = async (req:Request,resp:Response) => {
    const p = req.body
    console.log('获取传递参数333',p)
    try{
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query: any = {
            id:p.userId
        }
        const res = await db.collection("user").findOne(query)
        resp.send({
            code: 1,
            msg: "成功",
            data: res
        })
    }catch(e:any){
        resp.send({
            code:2,
            msg:e.message,
            data:{}
        })
    }
    //前端如何去处理一个事务？
    
}
// 查询用户对应信息
export const QueryUserInfo = async (req:Request,resp:Response) => {
    const p = req.body
    console.log('获取传递参数333',p)
    try{
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query: any = {
            id:p.id
        }
        const res = await db.collection("user").findOne(query)
        resp.send({
            code: 1,
            msg: "成功",
            data: res
        })
    }catch(e:any){
        resp.send({
            code:2,
            msg:e.message,
            data:{}
        })
    }
    //前端如何去处理一个事务？
    
}

// 查询用户对应作品
export const QueryUserWork = async (req:Request,resp:Response) => {
    const p = req.body
    console.log('获取传递参数333',p)
    try{
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query: any = {
            userId: p.id
        }
        const res = await db.collection("goods").find(query).toArray()
        resp.send({
            code: 1,
            msg: "成功",
            data: res
        })
    }catch(e:any){
        resp.send({
            code:2,
            msg:e.message,
            data:{}
        })
    }
    
}


// 活动报名
export const JoinActive = async (req:Request,resp:Response) => {
    const p = req.body
    console.log('获取传递参数',p)
    try{
        const client = await Connect()
        const id = Math.random().toString().slice(-6)
        const db = client.db("twelve_weeks") //client.db() 不需要与数据库通讯，仅仅做了一个预先配置
        let user = await db.collection("enroll").findOne({userId:p.userId})
        console.log('4444user',user)
        
        if(user) {
            // 用户已经报名一次活动
            // 用户遍历查看此次活动是否已报名
            if(user.list.lenght != 0) {
                console.log('3333')
                user.list.forEach(async (element: any) => {
                    if(element === p.id) {
                        console.log('444')
                        resp.send({
                            code:3,
                            msg:"不能重复报名",
                            data:{
                                id,
                                user
                            }
                        })
                        return
                    }else {
                        const query = {
                            userId:p.userId
                        }
                        user?.list.push(p.id)
                        const insert = {
                            list:Array.from(new Set(user?.list))
                        }
                        const res = await db.collection("enroll").updateOne(query,{
                            '$set':insert
                        })
                        if(true){
                            resp.send({
                                code:4,
                                msg:"报名成功",
                                data:{
                                    id,
                                    user
                                }
                            })
                        }else{
                            resp.send({
                                code:5,
                                msg:"报名失败",
                                data:{}
                            })
                        }
                    }
                });
            }
            // user.list =  Array.from(new Set(user.list))
            

        }else {
            // 用户不存在直接 插入
            try{
                const order = {
                    ...p,
                    id,
                    sysdate:moment().format("YYYY-MM-DD HH:mm:ss")
                }
                
                const res = await db.collection("enroll").insertOne(order)
                console.log(res)
                if(true){
                    resp.send({
                        code:1,
                        msg:"报名成功",
                        data:{
                            id,
                            user
                        }
                    })
                }else{
                    resp.send({
                        code:4,
                        msg:"报名失败",
                        data:{}
                    })
                }
    
            }catch(err:any){
                resp.send({
                    code:3,
                    msg:err.message,
                    data:{}
                })
            }finally{
                client.close()
            }
        }
    }catch(e:any){
        resp.send({
            code:2,
            msg:e.message,
            data:{}
        })
    }
    //前端如何去处理一个事务？
    
}

// 发布作品表单数据
export const Publish = async (req:Request,resp:Response) => {
    const p = req.body
    console.log('前端传来参数',p)
    try{
        const client = await Connect()
        const activId = p.actId ? p.actId :''
        try {
            const good = {
                id:Math.random().toString().slice(-6),
                name:p.formState.value,
                gooddesc:p.formState.desc,
                type:p.formState.checked,
                status:'2',
                userId:p.userId,
                collectionCount:0,
                likeCount:0,
                joinActives:activId,
                imgpath:p.imgpathDetail1,
                imgpathDetail1:p.imgpathDetail1,
                imgpathDetail2:p.imgpathDetail2,
                imgpathDetail3:p.imgpathDetail3,
                imgpathDetail4:p.imgpathDetail4,
                publishTime:moment().format("YYYY-MM-DD HH:mm:ss")
            }
            const db = client.db("twelve_weeks")
            const res = await db.collection("goods").insertOne(good)
            console.log('上传结果',res)
            if(res.acknowledged === true){
                            resp.send({
                                code:1,
                                msg:"上传成功",
                                data:{
                                }
                            })
                        }else{
                            resp.send({
                                code:4,
                                msg:"上传失败",
                                data:{}
                            })
                        }
        }catch(err:any){
            resp.send({
                code:3,
                msg:err.message,
                data:{}
            })
        }finally{
            client.close()
        }
    }catch(e:any){
        resp.send({
            code:2,
            msg:e.message,
            data:{}
        })
    }
    
}
// 编辑信息
export const CommitInfor = async (req:Request,resp:Response) => {
    const p = req.body
    console.log('前端传来参数',p)
    try{
        const client = await Connect()
        const query = {
            id:p.userId
        }
        try {
            const informat = {
                username:p.username,
                email:p.email,
                intro:p.intro,
                address:p.address,
                area:p.area,
                tel:p.phone
            }
            const db = client.db("twelve_weeks")
            const res = await db.collection("user").updateOne(query,{
                '$set':informat
            },{
                upsert:true
            })
            console.log('上传结果',res)
            if(res.modifiedCount > 0 || res.upsertedCount > 0){
                            resp.send({
                                code:1,
                                msg:"修改成功",
                                data:{
                                }
                            })
                        }else{
                            resp.send({
                                code:4,
                                msg:"修改失败",
                                data:{}
                            })
                        }
        }catch(err:any){
            resp.send({
                code:3,
                msg:err.message,
                data:{}
            })
        }finally{
            client.close()
        }
    }catch(e:any){
        resp.send({
            code:2,
            msg:e.message,
            data:{}
        })
    }
    
}
// 后台审核作品接口
export const WorkAudit = async (req:Request,resp:Response) => {
    const p = req.body
    console.log('前端传来参数',p)
    try{
        const client = await Connect()
        try {
            const query = {
                id:p.id
            }
            const good = {
               status:p.type,
               reason:p.reason
            }
            const db = client.db("twelve_weeks")
            const res = await db.collection("goods").updateOne(query,{
                '$set':good
            },{upsert:true})
            if(res.upsertedCount === 1 || res.modifiedCount === 1){
                resp.send({
                    code:1,
                    msg:"审批成功",
                    data:{
                    }
                })
            }else{
                resp.send({
                    code:4,
                    msg:"审批成功",
                    data:{}
                })
            }
            
            
        }catch(err:any){
            resp.send({
                code:3,
                msg:err.message,
                data:{}
            })
        }finally{
            client.close()
        }
    }catch(e:any){
        resp.send({
            code:2,
            msg:e.message,
            data:{}
        })
    }
    
}

export const RemoveCartSingle = async (req:Request,resp:Response) => {
    const p = req.body
    try {
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            
            const filter = {
                userId:p.userId,
                id:p.goodId
            }
         
            const res = await db.collection("cart").deleteOne(filter)
            // console.log(res)
            if(res.deletedCount > 0){
                resp.json({
                    code:1,
                    msg:"删除成功",
                    data:{}
                })
            }else{
                resp.json({
                    code:4,
                    msg:"删除失败",
                    data:{}
                })
            }
        } catch (e:any) {
            resp.send({
                code:3,
                msg:e.message,
                data:{}
            })
        } finally {
            client.close()
        }
    } catch (error:any) {
        resp.send({
            code:2,
            msg:error.message,
            data:{}
        })
    } 
}

// 查询用户列表
export const QueryUseList = async (req:Request,resp:Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query:any = {}
        if(p.id != ''){
            query.id = {
                $regex: p.id
            }
        }
        const res = await db.collection("user").find(query)
        resp.send({
            code: 1,
            msg: "查询成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "查询失败",
            data: err
        })
    }
}

export const QueryActiveInfo = async (req:Request,resp:Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const res = await db.collection("actives").find().toArray()
        resp.send({
            code: 1,
            msg: "查询成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "查询失败",
            data: err
        })
    }
}
// 查询用户活动作品
export const QueryActiveWork = async (req:Request,resp:Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query = {
            type:'05'
        }
        const res = await db.collection("goods").find(query).toArray()
        resp.send({
            code: 1,
            msg: "查询成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "查询失败",
            data: err
        })
    }
}
// 更新用户列表
export const UpdateUseList = async (req:Request,resp:Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query = {
            id:p.userId
        }
        const update = {
            id:p.userId,
            username:p.formData.username,
            status:p.formData.status,
            pwd:p.formData.pwd,
            role:p.formData.role,
            avatar:p.formData.avatar
        }
        const res = await db.collection("user").updateOne(query,{
            '$set':update
        })
        resp.send({
            code: 1,
            msg: "更新成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "查询失败",
            data: err
        })
    }
}
// 更新用户
export const AddUser = async (req:Request,resp:Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const update = {
            id:p.userId,
            username:p.formData.username,
            status:p.formData.status,
            pwd:p.formData.pwd,
            role:p.formData.role,
            avatar:p.formData.avatar
        }
        const res = await db.collection("user").insertOne(update)
        resp.send({
            code: 1,
            msg: "新增成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "新增失败",
            data: err
        })
    }
}
// 更新活动信息
export const UpdateActiveInfo = async (req:Request,resp:Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query = {
            id:p.FormData.id
        }
        const update = {
            id:p.FormData.id,
            name:p.FormData.name,
            status:p.FormData.status,
            prize:p.FormData.prize,
            startTime:p.FormData.contributeTime[0],
            endTime:p.FormData.contributeTime[1],
            people:p.FormData.people,
            workCount:p.FormData.workCount,
            resultPubTime:p.FormData.resultPubTime,
            playImgpath:p.img
        }
        const res = await db.collection("actives").updateOne(query,{
            '$set':update
        })
        resp.send({
            code: 1,
            msg: "更新成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "更新失败",
            data: err
        })
    }
}

export const AddActiveInfo = async (req:Request,resp:Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        
        const insert = {
            id:p.FormData.id,
            name:p.FormData.name,
            status:p.FormData.status,
            prize:p.FormData.prize,
            startTime:p.FormData.contributeTime[0],
            endTime:p.FormData.contributeTime[1],
            people:p.FormData.people,
            workCount:p.FormData.workCount,
            resultPubTime:p.FormData.resultPubTime,
            playImgpath:p.img
        }
        const res = await db.collection("actives").insertOne(insert)
        resp.send({
            code: 1,
            msg: "新增成功",
            data: res
        })
    } catch (err) {
        resp.send({
            code: 2,
            msg: "更新失败",
            data: err
        })
    }
}

// 修改分类
export const UpdateCate = async (req:Request,resp:Response) => {
    const p = req.body;
    console.log('chuandi 参数过来',p)
    try {
        const client = await Connect()
        const db = client.db("twelve_weeks");
        const query = {
            id:p.cate
        }
        const result = await db.collection("dict").findOne(query)
        console.log('返回结果',result)
        for(let i = 0;i < result?.items.length;i++){
            console.log('111')
            try {
                if(result?.items[i].id === p.FormData.id) {
                    console.log('111',result?.items[i].id)
                     result?.items.splice(i,1)
                    console.log('555999',result?.items)
                    const newData = {
                        id:p.FormData.id,
                        name:p.FormData.name
                    }
                    result?.items.push(newData)
                    console.log('5后来55999',result?.items)
                    const update = {
                        items:Array.from(new Set(result?.items))
                    }
                    const res = await db.collection("dict").updateOne(query,{
                                        '$set':update
                                    })
                    if(res.upsertedCount === 1 || res.modifiedCount === 1) {
                        resp.send({
                            code: 8,
                            msg: "修改成功",
                            data: res
                        })
                    }
                                    console.log('返回结果1',res)
                }else {
                            const add = {
                        id:p.FormData.id,
                        name:p.FormData.name,
                    }
                    const insert = result?.items.push(add)
                    const res = await db.collection("dict").insertOne(insert)
                    console.log('返回结果3',res)
                    resp.send({
                        code: 3,
                        msg: "新增成功",
                        data: res
                    })
                }
            }catch(e) {
                console.log('555')
            }
            
        }
        // result?.items.forEach(async (e: any) => {
        //     if(e.id === p.FormData.id) {
        //         console.log('8888',e)
        //         const newData = {
        //             id:p.FormData.id,
        //             name:p.FormData.name
        //         }
        //         let newitems = result.items.indexOf(e)
        //         console.log('5555',newitems)
        //         result.items.splice(newitems,1)
        //         console.log('555999',result.items)
        //         result.items.push(newData)
        //         console.log('5后来55999',result.items)
        //             const update = {
        //                 items:Array.from(new Set(result.items))
        //             }
        //             const res = await db.collection("dict").updateOne(query,{
        //                 '$set':update
        //             })
        //             console.log('返回结果',res)
        //             resp.send({
        //                 code: 1,
        //                 msg: "更新成功",
        //                 data: res
        //             })
                
        //     }else {
        //         const add = {
        //             id:p.FormData.id,
        //             name:p.FormData.name,
        //         }
        //         const insert = result.items.push(add)
        //         const res = await db.collection("dict").insertOne(insert)
        //         console.log('返回结果',res)
        //         resp.send({
        //             code: 3,
        //             msg: "新增成功",
        //             data: res
        //         })
        //     }
        // })
        
    } catch (err) {
        resp.send({
            code: 2,
            msg: "更新失败",
            data: err
        })
    }
}

 // 编辑产品
export const ModifyProduct = async (req:Request,resp:Response) => {
    const p = req.body
    try {
        resp.send({
            code:1,
            msg:"ok",
            data:{}
        })
    } catch (error:any) {
        resp.send({
            code:2,
            msg:error.message,
            data:{}
        })
    } 
}


export const ModifyUser = async (req:Request,resp:Response) => {
    const p = req.body
    try {
        resp.send({
            code:1,
            msg:"ok",
            data:{}
        })
    } catch (error:any) {
        resp.send({
            code:2,
            msg:error.message,
            data:{}
        })
    } 
}

export const delActive = async (req:Request,resp:Response) => {
    const p = req.body
    console.log('555',p)
    try{

        // if(!context.checkToken()){
        //     throw new Error('Unauthorized')
        // } 
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            const res = await db.collection("actives").deleteOne({id:p.id})
            console.log(res)
            if(res.deletedCount > 0){
                return {
                    code:1,
                    msg:"删除成功"
                }
            }else {
                return {
                    code:2,
                    msg:"删除失败"
                }
            }
            
        }catch(err:any){
            return {
                code:3,
                msg:err.message
            }
        }finally {
            client.close()
        }
    }catch(e:any){
        return {
            code:4,
            msg:e.message
        }
    }
}