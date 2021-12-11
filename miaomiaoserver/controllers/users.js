var {Email,Head} = require('../untils/config.js')
var UserModel = require('../models/users.js')
var fs = require('fs')
var url = require('url')
var {setCrypto,createVerify} = require('../untils/base.js')

var login  = async(req,res,next)=>{
	var {username,password,verifyImg} =req.body

	if(verifyImg!== req.session.verifyImg){
		res.send({
			msg:'图形验证码错误',
			status:-3
		})
		return
	}

	var result = await UserModel.findLogin({
		username,
		password:setCrypto(password)
	})
	if(result){
		req.session.username = username
		req.session.isAdmin = result.isAdmin
		req.session.userHead = result.userHead
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
		return
	}

	if((Email.time - req.session.time) / 1000 > 120){
		res.send({
			msg:'验证码已过期',
			status:-3
		})
		return
	}
	var result = await UserModel.save({
		username,
		password:setCrypto(password),
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
	req.session.time = Email.time

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
			status:0,
			data:{
				username:req.session.username,
				isAdmin:req.session.isAdmin,
				userHead:req.session.userHead
			}
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
		var result = await UserModel.updataPassword(email,setCrypto(password))
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

var verifyImg = async (req,res,next)=>{
	var result = await createVerify(req,res)
	if(result){
		res.send(result)
	}
}

var uploadUserHead = async (req,res,next)=>{
	await fs.rename( 'public/uploads/' + req.file.filename , 
					 'public/uploads/' + req.session.username + '.jpg',
					 function(err){
						if(err){
							throw err;
						}
						 	console.log('done!');
					})
	var result = await UserModel.updateUserHead( req.session.username , url.resolve(Head.baseUrl , req.session.username + '.jpg' ) );
	if(result){
		res.send({
			msg:'头像修改成功',
			data:{
				userHead : url.resolve(Head.baseUrl , req.session.username + '.jpg' )
			},
			status:0
		})
	}
	else{
		res.send({
			msg:'头像修改失败',
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
	findPassword,
	verifyImg,
	uploadUserHead
}