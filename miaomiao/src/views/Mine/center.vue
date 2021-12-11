<template>
    <div>
        <div>个人中心：</div>
        <div>当前用户：{{$store.state.user.name}} <a href="javascript:;" @click="handleToLogout">退出</a></div>
        <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/admin" target="_blank">进入管理后台</a></div>
        <div v-else>用户身份：普通用户</div>
        <div class="userHead">
            <input type="file" name="file" value="上传头像" @change="handleToUpload">
            <img class="userHead" :src="$store.state.user.userHead">
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { messageBox } from '@/components/JS';
export default {
    name:'center',
    methods:{
        handleToLogout(){
            axios.get('/api2/users/logout')
              .then(res=>{
                  var status = res.data.status
                  if(status === 0){
                    window.localStorage.removeItem('username')
                    window.localStorage.removeItem('isAdmin')
                    this.$store.commit('user/USER_NAME',{name:'',isAdmin:false,userHead:''})
                    this.$router.push('/mine/login')
                  }
              })
        },
        handleToUpload(event){
            var file = event.target.files[0]
            var param = new FormData()
            param.append('file' , file , file.name);
            var config = {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            }
            axios.post('/api2/users/uploadUserHead',param,config)
            .then(res=>{
                var status = res.data.status
                var This =this
                if(status === 0){
                    messageBox({
                        title:'上传信息',
                        content:'上传头像信息成功',
                        ok:'确定',
                        handleOk(){
                            This.$store.commit('user/USER_NAME',{
                                name:This.$store.state.user.name,
                                isAdmin:This.$store.state.user.isAdmin,
                                userHead:res.data.data.userHead + '?' + Math.random()
                            })
                        }
                    })
                }
                else{
                    messageBox({
                        title:'上传信息',
                        content:'上传头像信息失败',
                        ok:'确定'
                    })
                }
            })
        }
    },
    beforeRouteEnter(to, from, next) {
        axios.get('/api2/users/getUser')
            .then(res=>{
                var status = res.data.status
                if(status === 0){
                    next(vm=>{
                        window.localStorage.setItem('username',res.data.data.username)
                        window.localStorage.setItem('isAdmin',res.data.data.isAdmin)
                        vm.$store.commit('user/USER_NAME',{
                            name:res.data.data.username,
                            isAdmin:res.data.data.isAdmin,
                            userHead:res.data.data.userHead
                        })
                    })
                }
                else{
                  next('/mine/login')
                }
            })
    }
}
</script>

<style scoped>
    .userHead{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
</style>