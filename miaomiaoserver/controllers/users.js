var {Email} = require('../untils/config.js')
var UserModel = require('../models/users.js')

var login  = async(req,res,next)=>{
	var {username,password} =req.body
	console.log(username,password)

	var result = await UserModel.findLogin({
		username,
		password
	})
	if(result){
		req.session.username = username
		req.session.isAdmin = result.isAdmin
		if(result.isFreeze){
			res.send({
				msg:'账号已冻结',
				status:-2
			})
		}
		else{
			res.send({
				msg:'登录成功',
				status:0 
			})
		}
	}
	else{
		res.send({
			msg:'登录失败',
			status:-1
		})
	}
}

var register  = async(req,res,next)=>{
	var {username,password,email,verify} = req.body

	if(email !== req.session.email || verify!==req.session.verify){
		res.send({
			msg:'验证码错误',
			status:-1
		})
	}
	var result = await UserModel.save({
		username,
		password,
		email
	})
	if(result){
		res.send({
			msg:'注册成功',
			status:0
		})
	}else{
		res.send({
			msg:'注册失败',
			status:-2
		})
	}
}

var verify = async(req,res,next)=>{
	var email = req.query.email;
	var verify = Email.verify;

	// 将数据存入cookie中
	req.session.verify = verify
	req.session.email = email

	// 配置邮件信息
	var mailOptions = {
		// 发件人
		from: '喵喵网 2016754638@qq.com',
		// 收件人
	    to: email,
	    // 邮件标题
	    subject: "喵喵网邮箱验证码",
	    // 邮件内容
	    text: '验证码：' + verify
	}


	// 接收信息
	Email.transporter.sendMail(mailOptions,(err)=>{
		if(err){
			console.log(err)
			res.send({
				msg:'验证码发送失败',
				status:-1
			})
		}
		else{
			res.send({
				msg:'验证码发送成功',
				status:0
			})
		}
	})
}

var logout = async(req,res,next)=>{
	req.session.username = ''
	res.send({
		msg:'退出成功',
		status:0
	})
}

var getUser = async(req,res,next)=>{
	if(req.session.username){
		res.send({
			msg:'获取用户信息成功',
			data:{
				username:req.session.username,
				isAdmin:req.session.isAdmin
			},
			status:0
		})
	}
	else{
		res.send({
			msg:'获取用户信息失败',
			status:-1
		})
	}
}

var findPassword = async(req,res,next)=>{
	var {email,password,verify} = req.body

	if(email === req.session.email && verify === req.session.verify){
		var result = await UserModel.updataPassword(email,password)
		if(result){
			res.send({
				msg:'修改密码成功',
				status:0
			})
		}
		else{
			res.send({
				msg:'修改密码失败',
				status:-2
			})
		}
	}
	else{
		res.send({
			msg:'验证码验证失败',
			status:-1
		})
	}
}

module.exports = {
	login,
	register,
	verify,
	logout,
	getUser,
	findPassword
}