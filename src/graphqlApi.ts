import { Connect } from "./db/mongo"
const { protocal, ip, port, imgs_url } = require("../config")

export const Good = async (parent: any, args: any) => {
    try {
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            //参数  查询时
            const query: any = {
                id: args.id
            }
            const result = await db.collection("goods").findOne(query) //查到数据就返回
            return result
        } catch (err) {
            return err
        } finally {
            //使用完或者报错后立马关掉 方便下一用户使用
            client.close()
        }
    } catch (error) {
        return error
    }
}

export const Goods = async (parent: any, args: any, context: any, info: any) => {

    try {
        const client = await Connect()
        try {

            const db = client.db("twelve_weeks");
            const query: any = {}
            if (args.type) {
                query.type = args.type
            }
            if (args.name) {
                query.name = {
                    $regex: args.name
                }
            }                                      //find查到一个集合 要toArray 返回数组
            const res = await db.collection("goods").find(query).limit(args.count).skip(args.start).toArray()
            return res
        } catch (err) {
            return err
        } finally {
            client.close()  //数据库抛异常关闭数据库
        }
    } catch (e) {
        return e
    }
}

export const GoodType = async (parent: any, args: any) => {
    try {
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            /**
             *{
                  id:1,
                   name:"大类1"
                   list:[
                    {
                        id:1,
                        name:"小类01"
                    }
                   ]
                },
                  

                mongodb 想查询出上面的小类的结果数组 需要使用aggregate
             */
            const aggregate: any = [
                { $unwind: "$items" },
                {
                    $match: {
                        id: args.id,
                        "items.id": parent.type
                    }
                },
                { $project: { "items": 1 } }
            ]
            const res = await db.collection("dict").aggregate(aggregate).toArray()
            return res[0].items
        } catch (err) {
            return err
        } finally {
            client.close()
        }
    } catch (e) {
        return e
    }
}
export const HomeImgs = () => {
    const baseUrl = `${protocal}://${ip}:${port}${imgs_url}` 
    return [
        baseUrl + "/home01.png",
        baseUrl + "/home02.png",
        baseUrl + "/home03.png"
    ]
}

export const Categorys = async (parent: any, args: any) => {
    console.log('2222',args)
    try {
        //获取mongodb的客户端
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            const aggregate: any = [
                { $unwind: "$items" },
                {
                    $match: {
                        id: args.id,  //大类的ID
                        "items.id": {
                            $in: args.type   //["03","04"]
                        }
                    }
                },
                {$project: { "items": 1 }}
            ]
            const result = await db.collection("dict").aggregate(aggregate).toArray()
            const res: any = []
            result.forEach(item => {
                res.push(item.items)
            })
            return res
        } catch (err) {
            return err
        } finally {
            //手动关掉客户端
            client.close()
        }
    } catch (error) {
        return error
    }
}

export const GoodsCategory = async (parent: any, args: any) => {
    try {
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            const query: any = {
                type: parent.id
            }
            const res = await db.collection("goods").find(query).skip(args.start).limit(args.count).toArray()
            return res
        } catch (err) {
            return err
        } finally {
            client.close()
        }
    } catch (error) {
        return error
    }
}

export const Cart =  async (parent:any, args:any, context:any, info:any) =>{
    try{

        if(!context.checkToken()){
            throw new Error('Unauthorized')
        } 
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            const query:any = {
                userId:args.userId
            }
            const res = await db.collection("cart").find(query).toArray()
            return res
        }catch(err){
            return err
        }finally {
            client.close()
        }
    }catch(e){
        return e
    }
}

export const OrderList = async (parent:any, args:any, context:any, info:any) => {
    try{

        // if(!context.checkToken()){
        //     throw new Error('Unauthorized')
        // } 
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            const query:any = {
                userId:args.userId
            }
            const res = await db.collection("order").find(query).limit(args.count).skip(args.start).toArray()
            return res
        }catch(err){
            return err
        }finally {
            client.close()
        }
    }catch(e){
        return e
    }
}

export const OrderStatus = async (parent: any, args: any) => {
    try {
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            const aggregate: any = [
                { $unwind: "$items" },
                {
                    $match: {
                        id: args.id,
                        "items.id": parent.status
                    }
                },
                { $project: { "items": 1 } }
            ]
            const res = await db.collection("dict").aggregate(aggregate).toArray()
            return res[0].items
        } catch (err) {
            return err
        } finally {
            client.close()
        }
    } catch (e) {
        return e
    }
}

export const delGood = async (parent: any, args: any) => {
    try{

        // if(!context.checkToken()){
        //     throw new Error('Unauthorized')
        // } 
        const client = await Connect()
        try {
            const db = client.db("twelve_weeks")
            const res = await db.collection("goods").deleteOne({id:args.id})
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
