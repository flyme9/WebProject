define(["jquery"], function ($) {
    var bannerArr = [];
    function download() {
        // 数据下载
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function (result) {
                bannerArr = result.banner
                console.log(bannerArr)
                for (var i = 0; i < bannerArr.length; i++) {
                    // 将banner图片插入到页面
                    $(`<a href="${bannerArr[i].url}">
                    <img class="swiper-lazy swiper-lazy-loader" src="../images/banner/${bannerArr[i].img}" alt=""/>
                    </a>`).appendTo("#J_homeSwiper .swiper-slide")

                    // 创建小圆点并插入到页面
                    var node = $(`<a href="#" class = 'swiper-pagination-bullet '></a>`)
                    if (i == 0) {
                        // 默认第一个小圆点为选中状态
                        node.addClass("swiper-pagination-bullet-active")
                    }
                    node.appendTo("#J_homeSwiper .swiper-pagination")
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
        leftNavDownload()
        topNavDownload()
    }

    // 实现轮播图轮播效果
    function banner() {
        var iNow = 0      // 当前显示的轮播图下标
        var aImgs = null  // 记录图片
        var aBtns = null  // 记录小圆点

        var timer = setInterval(() => {
            iNow++
            tab()
        }, 2500);

        // 轮播图切换函数
        function tab() {
            if (!aImgs) {
                aImgs = $("#J_homeSwiper .swiper-slide").find('a')
            }
            if (!aBtns) {
                aBtns = $("#J_homeSwiper .swiper-pagination").find('a')
            }
            if (iNow == bannerArr.length) {
                iNow = 0;
            }
            if (iNow == -1) {
                iNow = 4
            }

            // 图片切换
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({ opacity: 1 }, 500)
            // 小圆点
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active")
        }

        // 添加鼠标移除移出
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function () {
            clearInterval(timer)
        })
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseleave(function () {
            timer = setInterval(() => {
                iNow++
                tab()
            }, 2500);
        })

        // 点击小圆点切换对应轮播图 （异步加载渲染的页面，无法直接获取元素，需要使用事件委托完成）
        $("#J_homeSwiper .swiper-pagination").on("click", "a", function () {
            iNow = $(this).index()
            tab()
            // 阻止a连接默认行为
            return false
        })

        // 点击左右按钮进行切换轮播图
        $(".swiper-button-prev,.swiper-button-next").click(function () {
            if (this.className == "swiper-button-prev") {
                iNow--
            }
            else {
                iNow++
            }
            tab()
        })
    }

    // 侧边导航栏的加载
    function leftNavDownload() {
        $.ajax({
            url: "../data/nav.json",
            success: function (result) {
                var sideArr = result.sideNav
                // 循环进行创建节点
                for (var i = 0; i < sideArr.length; i++) {
                    var node = $(`<li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${sideArr[i].title}
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix">
                        
                        </div>
                    </li>`)
                    node.appendTo("#J_categoryList")

                    // 取出当前这个选项的对应的子节点
                    var childArr = sideArr[i].child
                    // 计算一共多少列
                    var col = Math.ceil(childArr.length / 6)
                    // 渲染页面
                    node.find("div.children").addClass("children-col-" + col)
                    for (var j = 0; j < childArr.length; j++) {
                        if (j % 6 == 0) {
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`)
                        }
                        newUl.appendTo(node.find("div.children"))
                        $(`<li>
                            <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                                <span class="text">${childArr[j].title}</span>
                            </a>
                        </li>`).appendTo(newUl)
                    }
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    // 侧边导航添加移入移出效果（选项卡切换效果，页面结构渲染出来的，需要事件委托完成）
    function leftNavTab() {
        $("#J_categoryList").on("mouseenter", ".category-item", function () {
            $(this).addClass("category-item-active")
        })
        $("#J_categoryList").on("mouseleave", ".category-item", function () {
            $(this).removeClass("category-item-active")
        })
    }

    // 下载顶部导航数据
    function topNavDownload() {
        $.ajax({
            url: "../data/nav.json",
            success: function (result) {
                var topNavArr = result.topNav
                topNavArr.push({ title: "服务" }, { title: "社区" })
                for (var i = 0; i < topNavArr.length; i++) {
                    $(`<li data-index="${i}" class="nav-item">
                            <a href="javascript: void(0);" class="link">
                                <span class="text">${topNavArr[i].title}</span>
                            </a>
                        </li>`).appendTo(".site-header .header-nav .nav-list")

                    var node = $(`<ul class="children-list " style="display: ${i == 0 ? "block" : "none"};"></ul>`)
                    node.appendTo("#J_navMenu .container")

                    // 取出子菜单数据
                    var childArr = topNavArr[i].childs
                    if (topNavArr[i].childs) {
                        // 如果存在子节点，进行创建
                        for (var j = 0; j < childArr.length; j++) {
                            $(`<li>
                            <a href="#">
                                <div class="figure figure-thumb">
                                    <img src="${childArr[j].img}" alt="">
                                </div>
                                <div class="title">${childArr[j].a}</div>
                                <p class="price">${childArr[j].i}</p>
                            </a>
                        </li>`).appendTo(node)
                        }
                    }

                }

            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    // 顶部菜单栏移入移出效果
    function topNavTab() {
        $(".header-nav .nav-list").on("mouseenter", ".nav-item", function () {
            $(this).addClass("nav-item-active")
            // 找出当前移入这个a标签的下标 与下面需要显示的ul下标一致
            var index = $(this).index() - 1
            if (index >= 0 && index <= 6) {
                $("#J_navMenu").css({ display: "block" }).removeClass("slide-up").addClass("slide-down")
                $("#J_navMenu .container").find("ul").eq(index).css("display", "block").siblings("ul").css("display", "none")
            }else{
                $("#J_navMenu").css({ display: "block" }).removeClass("slide-down").addClass("slide-up")
            }
        })
        $(".header-nav .nav-list").on("mouseleave", ".nav-item", function () {
            $(this).removeClass("nav-item-active")
        })
        $(".site-header").mouseleave(function () {
            $("#J_navMenu").css({ display: "block" }).removeClass("slide-down").addClass("slide-up")
        })
    }

    // 商品列表页的侧边导航栏移入移出的效果
    function allGoodsTab(){
        $(".header-nav .nav-list").on("mouseenter",".nav-category",function(){
            $(this).addClass('nav-category-active')
            $(this).find('.site-category').css('display','block')
        })

        $(".header-nav .nav-list").on("mouseleave",".nav-category",function(){
            $(this).removeClass('nav-category-active')
            $(this).find('.site-category').css('display','none')
        })
    }

    // 搜索框
    function searchTab(){
        $("#search").focus(function(){
            $("#J_keywordList").removeClass("hide").addClass("show")
        }).blur(function(){
            $("#J_keywordList").removeClass("show").addClass("hide")
        })
    }
    return {
        download: download,
        banner: banner,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        searchTab:searchTab,
        leftNavDownload:leftNavDownload,
        topNavDownload:topNavDownload,
        allGoodsTab:allGoodsTab
    }
})