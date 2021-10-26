define(["jquery"], function ($) {
    // 下载数据
    function download() {
        $.ajax({
            url: "../data/slide.json",
            success: function (result) {
                var slideArr = result.data.list.list
                for (var i = 0; i < slideArr.length; i++) {
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                    <a href="#" target = "_blank">
                        <div class = 'content'>
                            <div class = 'thumb'>
                                <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                            </div>
                            <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                            <p class = 'desc'>${slideArr[i].desc}</p>
                            <p class = 'price'>
                                <span>${slideArr[i].seckill_Price}</span>元
                                <del>${slideArr[i].goods_price}</del>
                            </p>
                        </div>
                    </a>
                </li>`).appendTo("#J_flashSaleList ul")
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }


    // 商品列表滚动
    function slideTab() {
        var aSpans = $(".swiper-controls").find("span")
        var iNow = 0 // 显示第一组图片，默认下表是0开始，每四个图片为一组
        var count = Math.ceil(26 / 4) - 1 // 计算分多少组
        // 启动定时器，自动滚动
        var timer = setInterval(function() {
            iNow++
            tab();
            if (iNow == count) {
                clearInterval(timer)
            }
        }, 4000);
        function tab() {
            iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass("swiper-button-disabled")
            iNow == count ? aSpans.eq(1).addClass("swiper-button-disabled") : aSpans.eq(1).removeClass("swiper-button-disabled")

            // 计算要运动的目的值
            var iTarget = iNow == count ? iNow * -992 + 496 : iNow * -992
            $("#J_flashSaleList ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration: "1000ms"
            })
        }

        // 左右按钮点击切换效果
        aSpans.click(function(){
            if($(this).index()==0){
                // 向左按钮
                iNow--
                iNow=Math.max(0,iNow)
            }else{
                // 向右按钮
                iNow++
                iNow=Math.min(count,iNow)
            }
            tab()
        })

        // 移出移出效果
        $("#J_flashSaleList").mouseenter(function(){
            clearInterval(timer)
        }).mouseleave(function(){
            timer = setInterval(function() {
                iNow++
                tab();
                if (iNow == count) {
                    clearInterval(timer)
                }
            }, 4000);
        })
    }

    return {
        download: download,
        slideTab: slideTab
    }

});

