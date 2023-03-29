import { ApolloServer, gql } from "apollo-server-express"
import { ApolloServerPluginLandingPageGraphQLPlayground, ContextFunction } from 'apollo-server-core'
import * as gr from "./graphqlApi"
import jwt from "jsonwebtoken"
const {protocal,ip,port,imgs_url} = require("../config")
const secretOrPrivateKey = "hello"
const typeDefs = gql`
type Query {
    good (id:String!):Good
    users(username:String):[User]
    new (id:String!):New
    news (title:String,type:String,start:Int!,count:Int!):[New]
    goods (name:String,type:String,start:Int!,count:Int!):[Good]
    homeImgs:[String]
    categorys (id:String!,type:[String]!):[Category]
    cart(userId:String!):[Good]
    orderList (userId:String!,start:Int!,count:Int!):[Order]
    active (id:String!):Active
    actives (name:String,type:String,start:Int!,count:Int!):[Active]
    playcates:[PlayCate]
}

type Mutation {
    delGood (id:String!):ResData
    delActive (id:String!):ResData
    delUser (id:String!):ResData
    delCate (id:String!):ResData
}

type ResData {
    code:Int,
    msg:String
}

type Active {
    id:String,
    name:String,
    status (id:String):Dict,
    people:Int,
    workCount:Int,
    prize:String,
    startTime:String,
    endTime:String,
    resultPubTime:String,
    playImgpath:String
}

type Good {
    id:String,
    name:String,
    imgpath:String,  
    publishTime:String,
    imgpathDetail1:String,
    imgpathDetail2:String,
    imgpathDetail3:String,
    imgpathDetail4:String,
    gooddesc:String,
    joinActives:String,
    likeCount:Int,
    reason:String,
    collectionCount:Int
    type (id:String):Dict,
    userId:String
    like:Boolean
    status:String
    collection:Boolean
}

type User {
    id:String,
    avatar:String
    pwd:String
    status:String
    username:String
    role:String
}

type New {
    id:String,
    title:String,
    intro:String,
    content:String,
    findImgpath:String
    addTime:String
    status (id:String):Dict,
}

type Dict {
    id:String,
    name:String
}

type Img {
    id:String
    url:String
}

type Category {
    id:String,
    name:String
    goods (start:Int!,count:Int!):[Good]
    actives (start:Int!,count:Int!):[Active]
    news (start:Int!,count:Int!):[New]
}

type PlayCate {
    id:String,
    name:String
    actives:[Active]
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
        goods: gr.Goods,
        good:gr.Good,
        users:gr.User,
        new:gr.New,
        news:gr.News,
        homeImgs:gr.HomeImgs,
        categorys:gr.Categorys,
        cart:gr.Cart,
        orderList:gr.OrderList,
        active:gr.Active,
        actives:gr.Actives
    },
    Mutation:{
        delGood:gr.delGood,
        delActive:gr.delActive,
        delUser:gr.delUser,
        delCate:gr.delCate
    },
    Good:{
        imgpath:(parent:any) => parent.imgpath.indexOf("http") >= 0 ? parent.imgpath : `${protocal}://${ip}:${port}${imgs_url}/` + parent.imgpath,
        imgpathDetail1: (parent: any) => `http://${ip}:${port}${imgs_url}/` + parent.imgpathDetail1,
        imgpathDetail2: (parent: any) => `http://${ip}:${port}${imgs_url}/` + parent.imgpathDetail2,
        imgpathDetail3: (parent: any) => `http://${ip}:${port}${imgs_url}/` + parent.imgpathDetail3,
        imgpathDetail4: (parent: any) => `http://${ip}:${port}${imgs_url}/` + parent.imgpathDetail4,
        type:gr.GoodType,
        
    },
    New:{
        findImgpath:(parent:any) =>parent.findImgpath.indexOf("http") >= 0 ? parent.findImgpath : `${protocal}://${ip}:${port}${imgs_url}/` + parent.findImgpath,
        status:gr.NewsStatus
    },
    User:{
        avatar:(parent: any) => `http://${ip}:${port}${imgs_url}/` + parent.avatar,
    },
    Category:{
        //呆着类型的查询
        goods:gr.GoodsCategory,
        actives:gr.playCates,
        news:gr.NewsCates
    },
    // PlayCate:{
    //     // 带着类型的查询
    //     actives:gr.playCates
    // },
    Order:{
        // sysdate:(parent:any) => {
        //     console.log(parent.sysdate.toString())
        //     return parent.sysdate.toString().replace("T"," ").substr(0,19)
        // },
        status:gr.OrderStatus,

    },
    Active:{
        playImgpath:(parent:any) =>parent.playImgpath.indexOf("http") >= 0 ? parent.playImgpath : `${protocal}://${ip}:${port}${imgs_url}/` + parent.playImgpath,
        status:gr.ActiveStatus
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