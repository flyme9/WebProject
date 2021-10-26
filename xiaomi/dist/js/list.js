// 引入文件
require.config({
    paths:{
        "jquery":"jquery-1.11.3",

        // 用到首页导航栏部分的JS代码
        "nav":"nav",
        "goodsList":"goodsList"
    }
})

require(["nav","goodsList"],function(nav,goodsList){
    nav.topNavDownload(),
    nav.leftNavDownload(),
    nav.leftNavTab(),
    nav.topNavTab(),
    nav.searchTab(),
    nav.allGoodsTab(),

    // 加载商品数据
    goodsList.download()
    goodsList.banner()
})