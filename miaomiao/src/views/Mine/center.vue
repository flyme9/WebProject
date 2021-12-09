<template>
    <div>
        <div>个人中心：</div>
        <div>当前用户：{{$store.state.user.name}} <a href="javascript:;" @click="handleToLogout">退出</a></div>
        <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/admin" target="_blank">进入管理后台</a></div>
        <div v-else>用户身份：普通用户</div>
    </div>
</template>

<script>
import axios from 'axios'
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
                    this.$store.commit('user/USER_NAME',{name:'',isAdmin:false})
                    this.$router.push('/mine/login')
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
                        vm.$store.commit('user/USER_NAME',{name:res.data.data.username,isAdmin:res.data.data.isAdmin})
                    })
                }
                else{
                  next('/mine/login')
                }
            })
    }
}
</script>