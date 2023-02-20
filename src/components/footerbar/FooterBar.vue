<template>
    <div class="footer-bar">
        <slot></slot>
        <div class="wrapper-left"></div>
        <div class="wrapper-right"></div>
    </div>
</template>

<style scoped>

.footer-bar {
    position:fixed;
    bottom: 0;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 0.2);
    height: 58px;
    /* width: 100%;           有固定定位所以跟上面一样实现*/
     left: 0;
     right: 0; 
     display: flex;
}

</style>