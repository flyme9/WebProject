<template>
    <div class="register_body">
        <div class="register_email">
            邮箱：<input v-model="email" class="register_text" type="email"> <button :disabled='disabled' @click="handleToVerify">{{verifyInfo}}</button>
        </div>
        <div>
            用户名：<input v-model="username" class="register_text" type="text">
        </div>
        <div>
            密码：<input v-model="password" class="register_text" type="password">
        </div>
        <div>
            确认密码：<input class="register_text" type="email">
        </div>
        <div >
            验证码：<input v-model="verify" class="register_text" type="text">
        </div>
        <div class="register_btn">
            <button @click="handleToRegister">注册</button>
        </div>
        <div class="register_link">
            <router-link to="/mine/login">已有帐号？点击登录</router-link>
            <router-link to="/mine/findPassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {messageBox} from '@/components/JS'
export default {
    name:'Register',
    data () {
        return {
            email:'',
            username:'',
            password:'',
            verify:'',
            verifyInfo:'发送验证码',
            disabled:false
        }
    },
    methods:{
        handleToVerify(){
            if(this.disabled){return}
            axios.get(`/api2/users/verify?email=${this.email}`)
              .then(res=>{
                  var This=this
                  var status = res.data.status
                  if(status === 0){
                      messageBox({
                          title:'验证码',
                          content:'验证码已发送',
                          ok:'确定',
                          handleOk(){
                              This.countDown()
                          }
                      })
                  }
                  else{
                      messageBox({
                          title:'验证码',
                          content:'验证码发送失败',
                          ok:'确定'
                      })
                  }
              })
        },
        handleToRegister(){
            axios.post('/api2/users/register',{
                email:this.email,
                username:this.username,
                password:this.password,
                verify:this.verify
            })
            .then(res=>{
                var status = res.data.status
                var This = this
                if(status === 0){
                    messageBox({
                        title:'用户注册',
                        content:'用户注册成功',
                        ok:'确定',
                        handleOk(){
                            This.$router.push('/mine/login')
                        }
                    })
                }
                else{
                    messageBox({
                        title:'用户注册',
                        content:res.data.msg + '，请重新注册',
                        ok:'确定'
                    })
                }
            })
        },
        countDown(){
            this.disabled=true
            var count = 120
            var timer = setInterval(() => {
                count--
                this.verifyInfo='剩余'+count+'秒'
                if(count ===0){
                    this.disabled=false
                    count = 60
                    this.verifyInfo='发送验证码'
                    clearInterval(timer)
                }
            }, 1000);
        }
    }
}
</script>

<style scoped>
    #content .register_body{  width:100%;}
    .register_body .register_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
    .register_body .register_btn{ height:50px; margin:10px;}
    .register_body .register_email{ position: relative;}
    .register_body .register_email button{ position: absolute; right: 15px; top: 10px; height: 30px;border: none;}
    .register_body .register_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
    .register_body .register_link{ display: flex; justify-content:space-between;}
    .register_body .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>