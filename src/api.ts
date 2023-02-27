import { Request, Response } from "express";
import { Connect } from "./db/mongo"
import jwt from "jsonwebtoken"  //给token加密的插件
import {UpdateResult} from "mongodb"
import {join} from "path"
import moment from "moment";
//导入commonjs语法的配置文件
const {protocal,ip,port,imgs_url,secretOrPrivateKey} = require("../config")

const session: any = {} //放在任何地方都是全局
/**
 * Post请求无论是成功还是失败
    我们都返回给页面同一个数据结构

     {
        code:1     2        3     
        msg:成功   没有权限   没有登陆
        data:
    }

    restful post
 */

export const Search = async (req: Request, resp: Response) => {
    // resp.header("Access-Control-Allow-Origin", "*"); // 这么写比较方便，但安全性太差
    // resp.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); 
    //获取post 请求的参数
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
                    /**
                     * 转为base64
                     * var strToBase64 - new Buffer('aaabbbccc').toString('base64')
                     * base64反解析为字符串
                     * var base64ToStr = new Buffer(str,'base64').toString()
                     */
                    //自己实现的简陋的编码
                    // const token = new Buffer(user.id + user.pwd).toString("base64")
                    //JWT
                    const token = jwt.sign({ id: user.id, role: user.role }, secretOrPrivateKey, {
                        expiresIn: "24h" //超时事件
                    })
                    // const tokenId = user.id + Date.now()
                    // const userState = {
                    //     id:user.id,
                    //     role:user.role
                    // }
                    // session[tokenId] = userState

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

export const AddCart = async (req: Request, resp: Response) => {
    const p = req.body
    // var base64ToStr = new Buffer(p.token, 'base64').toString()
    try {
        // 无状态的token 
        // const decoded: any = jwt.verify(p.token,secretOrPrivateKey)
        // console.log("解码之后的内容：", decoded)
        // if (decoded.id === p.userId) {
        //     resp.send({
        //         code: 1,
        //         msg: "加入成功",
        //         data: {}
        //     })
        // } else {
        //     resp.send({
        //         code: 2,
        //         msg: "非法token",
        //         data: {}
        //     })
        // }

        // console.log("addCart p:",p)

        const client = await Connect()
        try{
            const db = client.db("twelve_weeks")
            const query = {
                id:p.good.id, //商品ID
                userId:p.userId
            }
            delete p.good.count // 移除good对象中的count属性  保持数据库与前台同步
            delete p.good.checked
            const insert = {
                ...p.good,
                userId:p.userId,
                sysdate:new Date(),  //加入时间
                
            }
            const update = {
                count:p.ifIncrease ? 1 : -1
            }
            const options = {
                upsert:true
             }
             // db.test.updateOne({name:"zhang"},{$setOnInsert:{name:"zhang"},$inc:{count:1}},{upsert:true})
             //查询数据库
             const res:UpdateResult = await db.collection("cart").updateOne(query,{
                "$setOnInsert":insert,
                "$inc":update
             },options)
             if(res.upsertedCount === 1 || res.modifiedCount === 1){
                resp.json({
                    code:1,
                    msg:"添加成功",
                    data:{}
                })
             }else {
                resp.json({
                    code:4,
                    msg:"添加购物车失败",
                    data:{}
                })
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
        
        //有状态的token
        // if(p.token){
        //     const userState = session[p.token]
        //     if(userState){

        //     }else{
        //         resp.send({
        //             code:2,
        //             msg:"非法token",
        //             data:{}
        //         })
        //     }
        // }else{
        //     resp.send({
        //         code:3,
        //         msg:"缺少token",
        //         data:{}
        //     })
        // }
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
            role:"c"
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

export const UploadImg = async (req:Request,resp:Response) => {
    const p = req.body
    const file = req.file
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
                    //avatar:file?.filename  问好是不确定有没有值
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
            const res = await db.collection("order").insertOne(order)
            console.log(res)
            if(true){
                resp.send({
                    code:1,
                    msg:"创建订单成功",
                    data:{
                        id
                    }
                })
            }else{
                resp.send({
                    code:4,
                    msg:"订单创建失败",
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

export const ModifyProduct = async (req:Request,resp:Response) => {
    const p = req.body
    console.log(p)
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