(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e18568e"],{"0bb4":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"register_body"},[n("div",{staticClass:"register_email"},[e._v(" 邮箱："),n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"register_text",attrs:{type:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),e._v(" "),n("button",{attrs:{disabled:e.disabled},on:{click:e.handleToVerify}},[e._v(e._s(e.verifyInfo))])]),n("div",[e._v(" 用户名："),n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"register_text",attrs:{type:"text"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),n("div",[e._v(" 密码："),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"register_text",attrs:{type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e._m(0),n("div",[e._v(" 验证码："),n("input",{directives:[{name:"model",rawName:"v-model",value:e.verify,expression:"verify"}],staticClass:"register_text",attrs:{type:"text"},domProps:{value:e.verify},on:{input:function(t){t.target.composing||(e.verify=t.target.value)}}})]),n("div",{staticClass:"register_btn"},[n("button",{on:{click:e.handleToRegister}},[e._v("注册")])]),n("div",{staticClass:"register_link"},[n("router-link",{attrs:{to:"/mine/login"}},[e._v("已有帐号？点击登录")]),n("router-link",{attrs:{to:"/mine/findPassword"}},[e._v("找回密码")])],1)])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" 确认密码："),n("input",{staticClass:"register_text",attrs:{type:"email"}})])}],s=n("bc3a"),r=n.n(s),o=n("7826"),l={name:"Register",data:function(){return{email:"",username:"",password:"",verify:"",verifyInfo:"发送验证码",disabled:!1}},methods:{handleToVerify:function(){var e=this;this.disabled||r.a.get("/api2/users/verify?email=".concat(this.email)).then((function(t){var n=e,a=t.data.status;0===a?Object(o["a"])({title:"验证码",content:"验证码已发送",ok:"确定",handleOk:function(){n.countDown()}}):Object(o["a"])({title:"验证码",content:"验证码发送失败",ok:"确定"})}))},handleToRegister:function(){var e=this;r.a.post("/api2/users/register",{email:this.email,username:this.username,password:this.password,verify:this.verify}).then((function(t){var n=t.data.status,a=e;0===n?Object(o["a"])({title:"用户注册",content:"用户注册成功",ok:"确定",handleOk:function(){a.$router.push("/mine/login")}}):Object(o["a"])({title:"用户注册",content:t.data.msg+"，请重新注册",ok:"确定"})}))},countDown:function(){var e=this;this.disabled=!0;var t=120,n=setInterval((function(){t--,e.verifyInfo="剩余"+t+"秒",0===t&&(e.disabled=!1,t=60,e.verifyInfo="发送验证码",clearInterval(n))}),1e3)}}},c=l,d=(n("d820"),n("2877")),u=Object(d["a"])(c,a,i,!1,null,"99bf565c",null);t["default"]=u.exports},7826:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"messageBox"},[n("h2",[e._v(e._s(e.title))]),n("p",[e._v(e._s(e.content))]),n("div",[e.cancel?n("div",{on:{click:e.handleCancel}},[e._v(e._s(e.cancel))]):e._e(),e.ok?n("div",{on:{click:e.handleOk}},[e._v(e._s(e.ok))]):e._e()])])},s=[],r={name:"MessageBox"},o=r,l=(n("aa83"),n("2877")),c=Object(l["a"])(o,i,s,!1,null,"2997c902",null),d=c.exports,u=function(){return function(e){var t={title:"",content:"",cancel:"",ok:"",handleCancel:null,handleOk:null},n=a["default"].extend(d);for(var i in e)t[i]=e[i];var s=new n({el:document.createElement("div"),data:{title:t.title,content:t.content,cancel:t.cancel,ok:t.ok},methods:{handleCancel:function(){t.handleCancel&&t.handleCancel.call(this),document.body.removeChild(s.$el)},handleOk:function(){t.handleOk&&t.handleOk.call(this),document.body.removeChild(s.$el)}}});document.body.appendChild(s.$el)}}()},aa83:function(e,t,n){"use strict";n("bd67")},bd67:function(e,t,n){},d1d2:function(e,t,n){},d820:function(e,t,n){"use strict";n("d1d2")}}]);
//# sourceMappingURL=chunk-2e18568e.a2d06505.js.map