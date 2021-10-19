/**
 * 分析:
 *  1. 获取li的下标,使用 jQuery的index()方法
 *  2. 更换背景图片
 *  3. 播放器的图片和文本
 *  4. 暂停按钮与播放按钮切换与title的替换
 *  5. 图片旋转
 *  6. 播放音乐
 *
 *  1. 实现暂停播放功能
 *  2. 上一首下一首歌曲切换
 *  3. 播放器的显示与隐藏
 *
 */

// li初始索引
var index = 0;
// 获取所有li元素
var li = $(".banner ul li");
// 获取播放器的img元素
var img = $(".music .m_img img");
// 获取播放器的 m_text 元素
var text = $(".music .m_text");
// 获取播放器的按钮元素
var prev = $(".music .m_btn .m_prev");
var play = $(".music .m_btn .m_play");
var next = $(".music .m_btn .m_next");
// 获取audio元素
var audio = $("audio");
// 歌曲是否播放的标记,true表示播放,false表示暂停
var flag = false;
// 播放器是否隐藏,true表示显示,false表示隐藏
var close = true;

// 获取点击的li索引
li.click(function () {
    // 获取点击的li索引
    index = $(this).index();
    // 播放歌曲
    show();
});

// 歌曲播放函数
function show() {
    // 更换背景图片
    change_bg(index + 1);
    // 更改播放器图片 文本
    change_img_text(index+1);
    // 更换播放按钮状态以及title文字
    change_btn_title()
    // 图片旋转
    img_rotate()
    // 播放音乐
    play_mp3()
}
// 更换背景图片
function change_bg(idx) {
    $("body").css({
        background: "url(./img/" + idx + "_bg.jpg) no-repeat",
    });
}

// 播放器图片 文本
function change_img_text(idx) {
    img.attr("src", "./img/" + idx + ".jpg");
    text.html(li.eq(index).attr("title"));
}
// 更换播放按钮以及title位暂停
function change_btn_title(){
    // 移除原有的播放样式
    play.removeClass("m_play")
    // 添加新的暂停样式
    play.addClass("m_pause")
    play.attr("title","暂停")
}

// 图片旋转
function img_rotate(){
    // 将所有li的active移除
    li.children().removeClass('active')
    // 将active添加给点击的li
    li.eq(index).children().addClass('active')
}

// 播放歌曲
function play_mp3(){
    // 获取对应的li上的datasrc设置给audio的src
    audio.attr("src",li.eq(index).attr("datasrc"))
    // 播放音乐
    audio.get(0).play()
    // 修改判断歌曲是否播放的标记
    flag=true
}

// 暂停歌曲
play.click(function(){
    if(flag){
        // 暂停歌曲
        audio.get(0).pause()
        // 图片旋转停止
        li.eq(index).children().removeClass('active')
        // 按钮和title 替换为播放
        play.removeClass("m_pause").addClass("m_play").attr("title","播放")
        flag=false
    }else{
        show()
        // // 播放歌曲
        // play_mp3()
        // // 图片旋转
        // img_rotate()
        // // 按钮和title 替换为暂停
        // change_btn_title()
        // // 更换背景图片
        // change_bg(index + 1);
    }
})

// 上一首
prev.click(function(){
    index--
    if(0>index){
        index=li.length-1
    }
    show()
})

// 下一首
next.click(function(){
    index++
    if(li.length - 1 <index){
        index=0
    }
    show()
})


// 播放器的有隐藏与显示
$(".m_close").click(function(){
    // 显示变为隐藏
    if(close){
        $(this).addClass("m_open")
        $(".music").animate({
            "left":"-530px"
        },800)
        close=false
    }
    // 隐藏变为显示
    else{
        $(this).removeClass("m_open")
        $(".music").animate({
            "left":"0"
        },800)
        close=true
    }
})