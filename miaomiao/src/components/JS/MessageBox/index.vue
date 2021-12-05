<template>
    <div class="messageBox">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div>
            <div @click="handleCancel">{{cancel}}</div>
            <div @click="handleOk">{{ok}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'MessageBox'
}
</script>

<style scoped>
    .messageBox{
        width: 200px;
        height: 120px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: white;
        box-shadow: 3px 3px 3px 3px #ddd;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 999;
    }
    .messageBox h2{
        text-align: center;
        line-height: 40px;
        font-size: 18px;
    }
    .messageBox p{
        text-align: center;
        line-height: 40px;
        font-size: 16px;
    }
    .messageBox > div{
        display: flex;
        position: relative;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #ddd;
    }
    .messageBox > div div{
        flex: 1;
        text-align: center;
        line-height: 40px;
        border-right: 1px solid #ddd;
    }
    .messageBox > div div:last-child{
        border: none;
    }
</style>