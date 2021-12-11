var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

// 数据库连接配置
var Mongoose = {
	url:'mongodb://localhost:27017/miaomiao',
	connect(){
		mongoose.connect(this.url,{useNewUrlParser:true},(err)=>{
			if(err){
				console.log('数据库连接失败')
				return
			}
			console.log('数据库连接成功')	
		})
	}
}

// 配置邮件
var Email = {
	config : {
		host: "smtp.qq.com",
	    port: 587,
	    secure: false,
	    auth: {
	      // 发件人邮箱
	      user: '2016754638@qq.com', 
	      pass: 'krotbjnxduuleagj'
	    }
	},
	// 获取邮箱信息
	get transporter(){
		return nodemailer.createTransport(this.config);
	},
	// 截取4位验证码
	get verify(){
		return Math.random().toString().substring(2,6);
	},
	// 设置验证码时效性
	get time(){
		return Date.now()
	}
}

// 默认头像地址
var Head={
	baseUrl:'http://localhost:3000/uploads/'
}

module.exports = {
	Mongoose,
	Email,
	Head
}