<template>
    <div class="messageBox">
        <h2>定位</h2>
        <p>北京</p>
        <div>
            <div>取消</div>
            <div>切换定位</div>
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
        margin: -60px 0 0 -100px;
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