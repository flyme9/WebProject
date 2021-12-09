var mongoose = require('mongoose')
mongoose.set('autoIndex',false);

var UserSchema = new mongoose.Schema({
	username:{type:String,required:true,index:{unique:true}},
	password:{type:String,required:true},
	email:{type:String,required:true,index:{unique:true}},
	data:{type:Date,default:Date.now()},
	isAdmin:{type:Boolean,default:false},
	isFreeze:{type:Boolean,default:false}
})

var UserModel = mongoose.model('user' , UserSchema);
UserModel.createIndexes();

var save =(data)=>{
	var user = new UserModel(data)
	return user.save()
		.then(()=>{
			return true
		})
		.catch(()=>{
			return false
		})
}
var findLogin = (data)=>{
	return UserModel.findOne(data)
}

var updataPassword = (email,password)=>{
	return UserModel.update({email},{$set:{password}})
		.then(()=>{
			return true
		})
		.catch(()=>{
			return false
		})
}
var usersList=()=>{
	return UserModel.find()
}

var updateFreeze=(email,isFreeze)=>{
	return UserModel.update({email},{$set:{isFreeze}})
	  .then(()=>{
	  	return true
	  })
	  .catch(()=>{
	  	return false
	  })
}

var deleteUser=(email)=>{
	return UserModel.deleteOne({email})
}
module.exports={
	save,
	findLogin,
	updataPassword,
	usersList,
	updateFreeze,
	deleteUser
}