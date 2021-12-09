var UserModel = require('../models/users.js')

var index = async (req,res,next)=>{
	res.send({
		msg:'管理员用户',
		status:0
	})
}

var usersList = async (req,res,next)=>{
	var result = await UserModel.usersList()
	if(result){
		res.send({
			msg:'用户信息获取成功',
			data:{
				usersList:result
			},
			status:0
		})
	}
	else{
		res.send({
			msg:'用户信息获取失败',
			status:-1
		})
	}
}

var updateFreeze = async (req,res,next)=>{
 
	var {email,isFreeze} = req.body
	var result = await UserModel.updateFreeze(email,isFreeze)

	if(result){
		res.send({
			msg:'操作成功',
			status:0
		})
	}
	else{
		res.send({
			msg:'操作失败',
			status:0
		})
	}
}

var deleteUser = async (req,res,next)=>{
	var {email} = req.body
	var result = await UserModel.deleteUser(email)
	if(result){
		res.send({
			msg:'删除成功',
			status:0
		})
	}
	else{
		res.send({
			msg:'删除失败',
			status:-1
		})
	}
}
module.exports = {
	index,
	usersList,
	updateFreeze,
	deleteUser
}