<?php
    header('content-type:text/html;charset="utf-8"');

    // 定义统一的返回格式
    $responseData=array("code" => 0, "message" => "");

    // 接收前端传递过来的数据
    $username = $_POST["username"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];
    $createTime = $_POST["createTime"];

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
    
    if($password!=$repassword){
        $responseData["code"] = 3;
        $responseData["message"] = "两次密码不一致";
        // 将数据转换为JSON字符串进行返回
        echo json_encode($responseData);
        exit;
    }
    
    // 连接数据库，进行判断用户名是否注册过
    // 1. 连接数据库
    $link = mysqli_connect("localhost","root","root");

    // 2. 验证数据库是否连接成功
    if(!$link){
        $responseData["code"] = 4;
        $responseData["message"] = "服务器忙";
        // 将数据转换为JSON字符串进行返回
        echo json_encode($responseData);
        exit;
    }

    // 3. 设置字符集
    mysqli_set_charset($link, "utf8");

    // 4. 选择数据库
    mysqli_select_db($link,"xiaomi");

    // 5. 准备sql语句验证是否注册过
    $sql ="SELECT * FROM `users` WHERE `username`='$username'";

    // 6. 发送sql语句
    $res = mysqli_query($link,$sql);

    // 7. 取出第一行数据
    $row=mysqli_fetch_assoc($res);
    // $row 不为空，表示用户名被注册过
    if($row){
        $responseData["code"] = 5;
        $responseData["message"] = "用户名重复";
        // 将数据转换为JSON字符串进行返回
        echo json_encode($responseData);
        exit;
    }
    // $row 为空，表示用户名没有被注册过
    // 密码加密处理
    $str = md5(md5(md5($password)."beijing")."China");
    // 将数据存入数据库
    $sql2 = "INSERT INTO users(`username`, `password`,`createTime`) VALUES('$username','$str','$createTime')";
    // 发送sql语句
    $res2 = mysqli_query($link,$sql2);

    if(!$res){
        // 数据存入数据库失败
        $responseData["code"] = 6;
        $responseData["message"] = "注册失败";
        // 将数据转换为JSON字符串进行返回
        echo json_encode($responseData);
        exit;
    }
    else{
        // 数据存入数据库成功
        $responseData["message"] = "注册成功";
        // 将数据转换为JSON字符串进行返回
        echo json_encode($responseData);
    }

    // 8. 关闭数据库的连接
    mysqli_close($link);
?>