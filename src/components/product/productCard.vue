<script setup>
    import { computed } from "vue";
    import { useRouter } from "vue-router"
    import { useState } from "@/store/pageDirection"
    
    const router = useRouter()
    const state = useState();
    const props = defineProps({
        product:Object
    })
    
    const imgStyle = computed(() => {
        return {
            backgroundImage:`url(${props.product.imgpath})`,
            backgroundSize:"cover"
        }
    })
    
    const goto = () => {
        console.log("product:",props.product)
        state.setDirection("forward") // 页面跳转到明细页面
        router.push({
            name:"gooddetail",
            params:{
                id:props.product.id,
                type:props.product.type ? props.product.type.id : "1"
            }
        })
    }
    </script>
    
    <template>
        <div class="product-card" @click="goto">
        <div class="product-img" :style="imgStyle"></div>
        <div class="product-desc">
            <div class="name-desc">
                <div class="title-name">{{product.name}}</div>
                <span class="time-pulish" style="color:rgb(0 0 0 / 0.5);font-size:10px;">11天前</span>
            </div>
            <div class="count-desc">
                <span style="color:rgb(0 0 0 / 0.5);font-size:10px;margin-right: 5px;"><van-icon name="like-o" />{{ product.likeCount }}</span>
                <span style="color:rgb(0 0 0 / 0.5);font-size:10px;"><van-icon name="star-o" />{{ product.likeCount }}</span>
            </div>
        </div>
    </div>
        <!-- <div class="product-card">
            <div class="product-img" :style="imgStyle" @click="goto" ></div>
            <div class="product-desc">
                <div style="color:#7F7F7F;font-size: 16px;">{{product.name}}</div>
                <div style="color:#F57418;margin-top:12px;"> {{product.likeCount}}</div>
            </div>
        </div> -->
    </template>
    
    <style scoped>
    /* .product-card {
        display:flex;
        background-color: #fff;
        box-shadow: 0px 1px 8px #e3e3e3;
        height:100px;
        border-radius:16px;
        margin-top:18px;
        align-items: center;
    } */
    
    /* .product-img {
        height:100px;
        width: 130px;
        background-color: #e5e5e5;
        border-top-left-radius:15px;
        border-bottom-left-radius:15px;
    }
    
    .product-desc {
        display:flex;
        flex-direction: column;
        justify-content: center;
        margin-left:20px;
    } */
    .product-card {
    width: 171px;
    height: 210px;
    background-color: beige;
    border-radius: 5px;
    flex-shrink: 0;
    margin-bottom: 15px;
    box-shadow: 2px 2px 5px #989595;
}

.product-img {
    height: 140px;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
}
.name-desc {
    display: flex;
    justify-content: space-between;
    border-bottom-style: solid;
    border-bottom-color: #e3e2e2;
}
.title-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100px;
}
.time-pulish {
    white-space: nowrap;
}

.product-desc {
    height: calc(210px - 140px);
    background-color: #fff;
    padding: 12px;
    box-sizing: border-box;

}
    </style>