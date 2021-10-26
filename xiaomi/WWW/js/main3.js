// 配置当前项目引入的模块
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "login":"login"
    }
})

require(['login'],function(login){
    login.loginSend()
})