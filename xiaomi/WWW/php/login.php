<?php
    header('content-type:text/html;charset="utf-8"');

    // 定义统一的返回格式
    $responseData=array("code" => 0, "message" => "");

    // 接收前端传递过来的数据
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 简单验证接收到的数据是否合规
    if(!$username){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        // 将数据转换为JSON字符串进行返回
        echo json_encode($responseData);
        exit;
    }

    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        // 将数据转换为JSON字符串进行返回
        echo json_encode($responseData);
        exit;
    }

    // 1. 连接数据库
    $link = mysqli_connect("localhost","root","root");

    // 2. 验证数据库是否连接成功
    if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "服务器忙";
        // 将数据转换为JSON字符串进行返回
        echo json_encode($responseData);
        exit;
    }

    // 3. 设置字符集
    mysqli_set_charset($link, "utf8");

    // 4. 选择数据库
    mysqli_select_db($link,"xiaomi");

    // 5. 准备sql语句验证是否登录成功
    // 密码加密处理
    $str = md5(md5(md5($password)."beijing")."China");
    $sql ="SELECT * FROM `users` WHERE `username`='$username' AND `password`='$str'";

    // 6. 发送sql语句
    $res = mysqli_query($link,$sql);

    // 7. 取出第一行数据
    $row=mysqli_fetch_assoc($res);
    // $row 为空，表示用户名或密码错误
    if(!$row){
        $responseData["code"] = 4;
        $responseData["message"] = "用户名或密码错误";
        // 将数据转换为JSON字符串进行返回
        echo json_encode($responseData);
        exit;
    }
    else{
        // 登录成功
        $responseData["message"] = "登录成功";
        // 将数据转换为JSON字符串进行返回
        echo json_encode($responseData);
    }

    // 8. 关闭数据库的连接
    mysqli_close($link);
?>