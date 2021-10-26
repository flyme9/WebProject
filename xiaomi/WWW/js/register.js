define(["jquery"], function ($) {
    function registerSend() {
        $('#register-button').click(function () {
            $.ajax({
                type: 'post',
                url: './php/register.php',
                data: {
                    username: $('.item_account').eq(0).val(),
                    password: $('.item_account').eq(1).val(),
                    repassword: $('.item_account').eq(2).val(),
                    createTime: (new Date()).getTime()
                },
                success: function (result) {
                    // 解析数据
                    var obj=JSON.parse(result)
                    // 判断数据
                    if(obj.code){
                        $(".err_tip").find("em").attr("class","icon_error")
                    }
                    else{
                        $(".err_tip").find("em").attr("class","icon_select icon_true")
                        $(".err_tip").find("span").css("color","green")
                        // 延时器注册成功后自动跳转至登录页
                        setTimeout(() => {
                            location.assign("login.html")
                        }, 1000);
                    }
                    $(".err_tip").show().find("span").html(obj.message)
                },
                error: function (msg) {
                    console.log(msg)
                }
            })
        })
    }


    return {
        registerSend: registerSend
    }
});