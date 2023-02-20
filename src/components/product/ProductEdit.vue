<script setup>
import { inject, computed } from "vue"
import { useState } from "@/store/cart"
import { getItem } from "@/kits/LocalStorageKit"

const message = inject("$message")
const token = getItem("token")
const userId = getItem("userId")
const state = useState()
const props = defineProps({
    product: Object
})

const id = "cart-cb-" + props.product.id

const bgStyle = computed(() => {
    return {
        backgroundImage: `url(${props.product.imgpath})`,
        backgroundSize: "cover"
    }
})

const decrease = () => {
    state.addCart({
        token,
        userId,
        ifIncrease: false,
        good: props.product
    }).then(res => {
        //在组件中去提示警告
        if (res.code != 1) {
            message.warning(res.msg)
        }
    })

}

const increase = () => {
    if (props.product.count === 9) {
        message.warning("最多只能购买9个")
        return
    }
    state.addCart({
        token,
        userId,
        ifIncrease: true,
        good: props.product
    }).then(res => {
        if (res.code != 1) {
            message.warning(res.msg)
        }
    })
}

const delConfirm = () => {
    state.delCartSingle({
        userId,
        token,
        goodId:props.product.id
    }).then(res => {
        if(res.code === 1){
            message.success(res.msg)
        }
    })
}

const cancel = () => {
    console.log("取消")
}

</script>

<template>

    <div class="product-edit">
        <div class="wrapper-cb">
            <div class="diy-cb">
                <input :id="id" type="checkbox" class="cb" v-model="product.checked" />
                <label :for="id"></label>
            </div>

        </div>
        <div class="pic" :style="bgStyle"></div>
        <div class="wrapper-right">
            <div>{{product.name}}{{product.checked}}</div>
            <div style="color:yellow ;">{{product.price}}</div>
            <div style="display: flex;">
                <a-popconfirm 
                v-if="product.count <= 1"
                title="是否要移除该商品?" 
                ok-text="移除"
                 cancel-text="取消"
                  @confirm="delConfirm">
                    <div class="btn">-</div>
                </a-popconfirm>
                <div v-else class="btn" @click="decrease">-</div>
                <div style="margin: auto 8px;">{{product.count}}</div>
                <div class="btn" @click="increase">+</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-edit {
    display: flex;
    border-radius: 12px;
    margin-bottom: 12px;
    box-shadow: 0px 2px 8px rgb(0 0 0 / 0.1);
}


.pic {
    flex: 1;
    width: 80px;
    height: 80px;
    background-color: #efeefe;
    margin-right: 24px;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;

}

.wrapper-right {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: rgb(0 0 0 / 0.5);
    align-items: flex-end;
    padding: 8px 18px;
    box-sizing: border-box;
}

.btn {
    width: 20px;
    height: 20px;
    padding: 6px;
    border-radius: 50%;
    box-shadow: 0px 1px 8px rgb(0 0 0 / 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper-cb {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cb {
    visibility: hidden;
}

.diy-cb {
    position: relative;
}

.diy-cb label::before {
    content: "";
    position: absolute;
    border: 1px solid #1989fa;
    border-radius: 3px;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    line-height: 16px;
}

.diy-cb input[type='checkbox']:checked+label:after {
    content: "√";
    position: absolute;
    border: 1px solid #1989fa;
    border-radius: 3px;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    background-color: #1989fa;
    line-height: 16px;
    text-align: center;
    color: #fff;
}
</style>