// 配置当前项目引入的模块

require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "register":"register"
    }
})

require(['register'],function(register){
    register.registerSend()
})