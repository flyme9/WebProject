var express = require('express');
var usersController = require('../controllers/users.js');
var router = express.Router();
// 引入文件上传中间件
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登入
router.post('/login',usersController.login)
// 注册
router.post('/register',usersController.register)
// 验证码
router.get('/verify',usersController.verify)
// 登出
router.get('/logout',usersController.logout)
// 获取用户
router.get('/getUser',usersController.getUser)
// 找回密码
router.post('/findPassword',usersController.findPassword)
// 图形验证码
router.get('/verifyImg',usersController.verifyImg)
// 头像上传
router.post('/uploadUserHead',upload.single('file'),usersController.uploadUserHead)

module.exports = router;
