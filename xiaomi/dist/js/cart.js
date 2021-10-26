// 配置当前项目需要引入的模块
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "goodsCart":"goodsCart"
    },

    // 模块依赖关系
    shim: {
        "jquery-cookie": ["jquery"]
    }
})


require(["goodsCart"],function(goodsCart){
    goodsCart.download()
    goodsCart.cartHover()
    goodsCart.loadCarDate()
    goodsCart.checkFunc()
    goodsCart.changeCars()
})