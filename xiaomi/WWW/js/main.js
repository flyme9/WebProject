/**
 * 配置当前项目有依赖哪些文件
 * 都是使用的AMD规范
 */

require.config({
    // 依赖文件路径
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "slide":"slide",
        "data":"data"
    },
    // 文件的依赖关系
    shim:{
        "jquery-cookie":["jquery"]
    }

})

// 引入模块文件
require(["nav","slide","data"],function(nav,slide,data){
    // 导航
    nav.download()
    nav.banner()
    nav.leftNavTab()
    nav.topNavTab()
    nav.searchTab()
    // 商品列表
    slide.download()
    slide.slideTab()

    // 
    data.download()
    data.tabMenu()
})