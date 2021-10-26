define(["jquery", "jquery-cookie"], function ($) {
    // 加载已经加入购物车的商品
    function loadCarDate() {
        // 清空页面数据
        $('#J_cartListBody .J_cartGoods').html('')

        /*
        cookie 内只存储了商品id与数量
        加载的数据需要使用具体信息，数据来至 goodsCarList.json goodsList2.json两个数据源
        */

        // 通过Promise处理两个数据的并行异步获取数据
        new Promise(function (resolve, reject) {
            $.ajax({
                // 下载第一个数据源
                url: "../data/goodsCarList.json",
                success: function (obj) {
                    resolve(obj.data)
                },
                error: function (msg) {
                    reject(msg)
                }
            })
        }).then(function (arr1) {
            // 下载第二个数据源
            return new Promise(function (resolve, reject) {
                $.ajax({
                    // 下载第一个数据源
                    url: "../data/goodsList2.json",
                    success: function (arr2) {
                        // 合并两个数据
                        var newArr = arr1.concat(arr2)
                        resolve(newArr)
                    },
                    error: function (msg) {
                        reject(msg)
                    }
                })
            })
        }).then(function (arr) {
            // arr是所有商品的数据，我只需要加入购物车的数据进行加载页面

            // 拿到cookie中的商品数据
            var cookieStr = $.cookie("goods")
            if (cookieStr) {
                var cookieArr = JSON.parse(cookieStr)
                var newArr = []
                // 通过id筛选拿到加入购物车的商品信息
                for (var i = 0; i < cookieArr.length; i++) {
                    for (var j = 0; j < arr.length; j++) {
                        if (cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].goodsid) {
                            // 商品加入购物车的数量
                            arr[j].num = cookieArr[i].num
                            // 设置商品的id
                            arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid
                            // 存入新数组中
                            newArr.push(arr[j])
                        }
                    }
                }
                for (var i = 0; i < newArr.length; i++) {
                    var node = $(`
                    <div class="item-row clearfix" id="${newArr[i].id}"> 
                        <div class="col col-check">  
                            <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                        </div> 
                        <div class="col col-img">  
                            <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                <img alt="" src="${newArr[i].image}" width="80" height="80"> 
                            </a>  
                        </div> 
                        <div class="col col-name">  
                            <div class="tags">   
                            </div>     
                            <div class="tags">  
                            </div>   
                            <h3 class="name">  
                                <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                    ${newArr[i].name} 
                                </a>  
                            </h3>        
                        </div> 
                        <div class="col col-price"> 
                            ${newArr[i].price}元
                            <p class="pre-info">  </p> 
                        </div> 
                        <div class="col col-num">  
                            <div class="change-goods-num clearfix J_changeGoodsNum"> 
                                <a href="javascript:void(0)" class="J_minus">
                                    <i class="iconfont"></i>
                                </a> 
                                <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                                <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                            </div>  
                        </div> 
                        <div class="col col-total"> 
                            ${(newArr[i].price * newArr[i].num).toFixed(1)}元
                            <p class="pre-info">  </p> 
                        </div> 
                        <div class="col col-action"> 
                            <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                        </div> 
                    </div>
                    `)
                    node.appendTo("#J_cartListBody .item-box .item-table")
                }
                isCheckAll()
            }
        })
    }

    // 下载数据
    function download() {
        $.ajax({
            url: "../data/goodsCarList.json",
            success: function (obj) {
                var arr = obj.data
                for (var i = 0; i < arr.length; i++) {
                    $(`
                    <li class="J_xm-recommend-list span4">
                        <dl> 
                            <dt> 
                                <a href="//item.mi.com/1181300007.html"> 
                                    <img src="${arr[i].image}" srcset="${arr[i].image}  2x" alt="${arr[i].name}"> 
                                </a> 
                            </dt> 
                            <dd class="xm-recommend-name"> 
                                <a href="#"> 
                                    ${arr[i].name}
                                </a> 
                            </dd> 
                            <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                            <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                                <a href="#" id=${arr[i].goodsid} class="btn btn-small btn-line-primary"  style="display: none;">加入购物车</a>  
                            </dd> 
                            <dd class="xm-recommend-notice">

                            </dd> 
                        </dl>  
                    </li>
                    `).appendTo("#J_miRecommendBox .xm-recommend ul")
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    // 商品列表页移入显示加入购物车按钮，移出隐藏购物车按钮效果
    function cartHover() {
        // 结构是由异步加载出来的，需要通过事件委托形式进行添加事件
        $("#J_miRecommendBox .xm-recommend ul").on("mouseenter", ".J_xm-recommend-list", function () {
            $(this).find(".xm-recommend-tips a").css("display", "block")
        })
        $("#J_miRecommendBox .xm-recommend ul").on("mouseleave", ".J_xm-recommend-list", function () {
            $(this).find(".xm-recommend-tips a").css("display", "none")
        })

        // 通过实践委托方式加入购物车，利用cookie进行存储数据
        $("#J_miRecommendBox .xm-recommend ul").on("click", ".xm-recommend-tips .btn", function () {
            var id = this.id
            var first = $.cookie("goods") == null ? true : false
            // 第一次添加的情况
            if (first) {
                var cookieArr = [{ id: id, num: 1 }]
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            // 不是第一次添加
            else {
                var same = false
                var cookieStr = $.cookie("goods")
                var cookieArr = JSON.parse(cookieStr)
                for (var i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id == id) {
                        // 该商品之前添加过
                        cookieArr[i].num++
                        same = true
                        break
                    }

                }
                if (!same) {
                    // 该商品没有添加过
                    var obj = { id: id, num: 1 }
                    cookieArr.push(obj)
                }
                // 存储到cookie中
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            isCheckAll()
            loadCarDate()
            return false
        })
    }

    // 全选按钮与单选按钮添加点击事件
    function checkFunc() {
        // 全选
        $("#J_cartBox .list-head .col-check").find('i').click(function () {
            // 获取每个商品的单选框
            var allChecks = $('#J_cartListBody').find('.item-row .col-check').find('i')
            if ($(this).hasClass('icon-checkbox-selected')) {
                $(this).add(allChecks).removeClass('icon-checkbox-selected')
            }
            else {
                $(this).add(allChecks).addClass('icon-checkbox-selected')
            }
            isCheckAll()
        })

        // 商品复选框添加点击事件
        $('#J_cartListBody .J_cartGoods').on('click', '.item-row .col-check i', function () {
            if ($(this).hasClass('icon-checkbox-selected')) {
                $(this).removeClass("icon-checkbox-selected")
            } else {
                $(this).addClass("icon-checkbox-selected")
            }
            isCheckAll()
        })
    }

    // 判断有多少商品被选中
    function isCheckAll() {
        var allChecks = $('#J_cartListBody').find('.item-row')
        var isAll = true  // 假设全部选中
        var total = 0     // 计算总数
        var count = 0     // 记录被选中的数量
        var totalCount = 0  // 记录总数
        allChecks.each(function (index, item) {
            if (!$(item).find('.col-check i').hasClass('icon-checkbox-selected')) {
                // 商品没有全部被选中
                isAll = false
            } else {
                // 
                total += parseFloat($(item).find('.col-price').html().trim()) * parseFloat($(this).find('.col-num input').val())
                // 被选中的商品的数量
                count += parseInt($(this).find('.col-num input').val())
            }
            // 计算所有商品的总数
            totalCount += parseInt($(this).find('.col-num input').val())
        })
        // 在页面上进行渲染数据
        $('#J_selTotalNum').html(count)
        $('#J_cartTotalNum').html(totalCount)
        $('#J_cartTotalPrice').html(total.toFixed(1))


        // 判断是否全选
        if (isAll) {
            $("#J_cartBox .list-head .col-check").find('i').addClass('icon-checkbox-selected')
        } else {
            $("#J_cartBox .list-head .col-check").find('i').removeClass('icon-checkbox-selected')
        }
    }

    // 给页面上的商品添加删除，或数量增减操作
    function changeCars() {
        $('#J_cartListBody .J_cartGoods').on('click', '.col-action .J_delGoods', function () {
            // 删除页面上节点结构
            var id = $(this).closest('.item-row').remove().attr('id')

            // 将商品从cookie中删除
            var cookieStr = $.cookie("goods")
            var cookieArr = JSON.parse(cookieStr)
            for (var i = 0; i < cookieArr.length; i++) {
                if (id == cookieArr[i].id) {
                    cookieArr.splice(i, 1)
                    break
                }
            }
            cookieArr.length == 0 ? $.cookie('goods', null) : $.cookie('goods', JSON.stringify(cookieArr), { expires: 7 })
            isCheckAll()
            checkFunc()
            return false
        })
    }

    // 每个商品 + 和 - 进行添加事件
    $('#J_cartListBody .J_cartGoods').on('click', ".J_minus,.J_plus", function () {
        var id = $(this).closest('.item-row').attr('id')

        // 将商品从cookie中删除
        var cookieStr = $.cookie("goods")
        var cookieArr = JSON.parse(cookieStr)
        for (var i = 0; i < cookieArr.length; i++) {
            if (id == cookieArr[i].id) {
                if (this.className == 'J_minus') {
                    cookieArr[i].num == 1 ? alert('数量为1，不能继续减少') : cookieArr[i].num--
                } else {
                    cookieArr[i].num++
                }
                break
            }
        }
        // 更新商品数量
        $(this).siblings('input').val(cookieArr[i].num)
        // 更新页面上单个商品的价格
        var price = parseFloat($(this).closest('.col-num').siblings('.col-price').html().trim())
        $(this).closest('.col-num').siblings('.col-total').html((price * cookieArr[i].num).toFixed(1) + '元')


        // 更改后的数据存入cookie
        $.cookie('goods', JSON.stringify(cookieArr), {
            expires: 7
        })

        // 重新计算数据
        isCheckAll()
        return false
    })


    return {
        download: download,
        cartHover: cartHover,
        loadCarDate: loadCarDate,
        checkFunc: checkFunc,
        changeCars: changeCars
    }
});