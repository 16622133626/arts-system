import { defineStore } from "pinia"
import { gql, myHttp } from "@/kits/HttpKit"
import { getItem } from "@/kits/LocalStorageKit"

export const useState = defineStore("cart", {
    state: () => {
        return {
            cart: []
        }
    },
    actions: {
        addCart(p) {
            return myHttp("/api/addcart", p).then((res) => {
                if (res.code === 1) {
                    console.log('this.cart',this.cart)
                     this.cart.forEach(item => {
                        if (item.id === p.good.id) {
                            
                    console.log('this.cart',item.id)
                            // if (p.ifIncrease) {
                            //     item.collectionCount++
                            // } else {
                            //     item.collectionCount--
                            // }
                        }
                    })
                }
                return res
            })
        },
        delCartSingle(p){
            return myHttp("/api/removecartsingle",p).then((res) => {
                if(res.code === 1){
                    this.cart = this.cart.filter(item => item.id !== p.goodId)
                }
                return res
            })
        },
        async getCart(userId) {
            const p = {
                // 这里的token和userId的目的是让gql的checkToken方法返回true
                token: getItem("token"),
                userId,
                query: `
                    {
                        cart (userId:"${userId}") {
                            id
                            name
                            price
                            imgpath
                            count
                        }
                    }
                `
            }

            try {
                const res = await gql(p);
                this.cart = res.data.cart.map(item => {
                    item.checked = false
                    return item
                })
                return {
                    code: "ok",
                    data: res.data.cart,
                    msg: ""
                }
            } catch (e) {
                return {
                    code: "fail",
                    msg: e.message,
                    data: {}
                }
            }
        },
        async createOrder(id) {
            const token = getItem("token")
            const userId = getItem("userId")
            // const cartChecked = this.cart.filter(item => item.checked)
            const AbtivesId = id
            const p = {
                token,
                userId,
                id,
                list:[AbtivesId] 
            }
            const res = await myHttp("/api/createorder", p)
            // if (res.code === 1) {
            //     const removeCartRes = await myHttp("/api/removecart", {
            //         userId,
            //         token,
            //         cart: cartChecked
            //     })
            //     if (removeCartRes.code === 1) {
            //         this.cart = this.cart.filter(item => {
            //             for (const c of cartChecked) {
            //                 if (item.id === c.id) {
            //                     return false
            //                 }
            //             }
            //             return true
            //         })
            //     }

            // }
            return res

        }
    },
    getters: {
        totalPrice() {
            return this.cart.filter(item => item.checked).reduce((acc, item) => {   // acc上一次的累加值 item 本次累加值
                return acc + parseFloat((item.price * item.count).toFixed(2))
            }, 0)


        }
    }
})