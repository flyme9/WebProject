var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.js');

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
router.get('/logout',usersController.logout)// 获取用户
router.get('/getUser',usersController.getUser)
// 找回密码
router.post('/findPassword',usersController.findPassword)

module.exports = router;
