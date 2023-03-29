// export const mockHttp = () => {
//     return new Promise(function(resolve,reject){
//         // 模拟网络的延时
//         setTimeout(() => {
//             resolve(["abc1","123","汉堡1","衣服2","可乐3"])
//         },1000)
//     })
// }
// //fetch返回的是Promise对象
// //fetch 的问题，比较偏底层 封装的方法不全
// export const myHttp = () => {
//     return fetch("http://localhost:3000/search",{
//         method:"post"
//     })
// }

import axios from "axios"

const ip = "127.0.0.1"
// const ip = '192.168.1.101'
// const ip = '10.2.71.189'
const port = 4000
export const baseURL = `http://${ip}:${port}`
const instance = axios.create({
    baseURL,
    timeout:5000,    //超时时间
    headers:{
        "Content-Type":"application/json",
    }
})

//增加拦截器  可有可无，看需求
// instance.interceptors.request.use((config) => {
// //请求成功时不要忘记return 
//     console.log("请求成功",config)
//     return config
// },(e) => {
//     console.log("请求失败")
//     // 请求失败时，不需要return 可以直接reject
//     Promise.reject(e)
// })

// instance.interceptors.response.use((resp) => {
//     console.log(resp)
//     if(resp.status === 200){
//         return Promise.resolve(resp)
//     }else{
//         console.log("状态码",resp.status)
//         return Promise.reject(resp)
//     }
// },(e) => {
//     console.log("请求失败",e)
//     if(e.resp.status){
//         return Promise.reject(e.response.statusText)
//     }
//     // 请求失败时，不需要return 可以直接reject
//     Promise.reject(e)
// })

export const myHttp = (api,param) =>{
    return new Promise((resolve,reject) => {
        instance.post(api,param)
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })
}

export const gql = param => {
    //访问地址一直是 http://localhost:3000/gql
    return new Promise((resolve,reject) => {
        instance.post("/gql",param)
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })
}

