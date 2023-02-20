import { ApolloServer, gql } from "apollo-server-express"
import { ApolloServerPluginLandingPageGraphQLPlayground, ContextFunction } from 'apollo-server-core'
import * as gr from "./graphqlApi"
import jwt from "jsonwebtoken"
const {protocal,ip,port,imgs_url} = require("../config")
const secretOrPrivateKey = "hello"
const typeDefs = gql`
type Query {
    hello : String
    num:Float
    arr:[String]
    good (id:String!):Good
    goods (name:String,type:String,start:Int!,count:Int!):[Good]
    homeImgs:[String]
    categorys (id:String!,type:[String]!):[Category]
    cart(userId:String!):[Good]
    orderList (userId:String!,start:Int!,count:Int!):[Order]
}

type Mutation {
    delGood (id:String!):ResData
}

type ResData {
    code:Int,
    msg:String
}


type Good {
    id:String,
    name:String,
    price:Float,
    imgpath:String,
    gooddesc:String,
    count:Int,
    type (id:String):Dict
    userId:String
}

type Dict {
    id:String,
    name:String,
    sort:Int

}

type Category {
    id:String,
    name:String
    goods (start:Int!,count:Int!):[Good]
}


type Order {
    id:String,
    sysdate:String,
    userId:String,
    status (id:String):Dict,
    list:[Good]
}
`
//解析器
const resolvers = {
    //两个变量
    Query: {
        hello: () => {
            return "hello gql"
        },
        num: () => {
            return 3.14
        },
        arr: () => {
            return ["1", "hello", "你好"]
        },
        goods: gr.Goods,
        good:gr.Good,
        homeImgs:gr.HomeImgs,
        categorys:gr.Categorys,
        cart:gr.Cart,
        orderList:gr.OrderList
    },
    Mutation:{
        delGood:gr.delGood
    },
    Good:{
        // imgpath:(parent:any) => {
        //     return "http://localhost:3000/static/upload/" + parent.imgpath
        // },
        imgpath:(parent:any) =>parent.imgpath.indexOf("http") >= 0 ? parent.imgpath : `${protocal}://${ip}:${port}${imgs_url}/` + parent.imgpath,
        type:gr.GoodType,
        
    },
    Category:{
        //呆着类型的查询
        goods:gr.GoodsCategory
    },
    Order:{
        // sysdate:(parent:any) => {
        //     console.log(parent.sysdate.toString())
        //     return parent.sysdate.toString().replace("T"," ").substr(0,19)
        // },
        status:gr.OrderStatus,

    }
}

const context:ContextFunction = ({req}) => {
    return {
        a:1,
        b:2,
        //checkToken 返回true 证明 token 有效
        //checkToken 返回false 证明token 有问题 没传tokentoken失效 token中的userId 和参数的userid不匹配
        checkToken:():any => {
            const p = req.body
            let res = false
            if (p.token) {
                try {
                    const decoded:any = jwt.verify(p.token,secretOrPrivateKey)
                    // console.log("解码之后的内容：", decoded)
                    if (decoded.id === p.userId) {
                        res = true
                    } 
                } catch (e:any) {
                    
                }
        
                return res
            } 
        }
    }
}
 
export const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    context//拦截
})