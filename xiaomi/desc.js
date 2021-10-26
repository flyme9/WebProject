// 配置当前项目引入的模块
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        // 用到首页导航栏部分的JS代码
        "nav": "nav",
        "goodsDesc":"goodsDesc"
    },

    // 模块依赖关系
    shim: {
        "jquery-cookie": ["jquery"]
    }
})

require(['nav','goodsDesc'], function (nav,goodsDesc) {
    nav.topNavDownload(),
    nav.leftNavDownload(),
    nav.leftNavTab(),
    nav.topNavTab()
    nav.allGoodsTab(),
    nav.searchTab(),


    goodsDesc.download();
    goodsDesc.banner()
})