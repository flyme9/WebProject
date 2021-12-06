<template>
    <div id="main">
        <Header title="喵喵电影" />
        <div id="content">
            <div class="movie_menu">
                <router-link to="/movie/city" custom v-slot="{navigate,isActive}">
                    <div class="city_name" :class="isActive?'router-link-active':''" @click="navigate">
                        <span>{{$store.state.city.nm}}</span>
                        <i class="iconfont icon-lower-triangle"></i>
                    </div>
                </router-link>
                <div class="hot_swtich">
                    <router-link to="/movie/nowPlaying" custom v-slot="{navigate,isActive}">
                        <div class="hot_item" :class="isActive?'router-link-active':''" @click="navigate">正在热映</div> 
                    </router-link>
                    <router-link to="/movie/comingSoon" custom v-slot="{navigate,isActive}">
                        <div class="hot_item" :class="isActive?'router-link-active':''" @click="navigate">即将上映</div>
                    </router-link>
                </div>
                <router-link to="/movie/search" custom v-slot="{navigate,isActive}">
                    <div class="search_entry" :class="isActive?'router-link-active':''" @click="navigate">
                        <i class="iconfont icon-search"></i>
                    </div>
                </router-link>
            </div>
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
        <TabBar />
        <router-view name="detail" />
    </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import {messageBox} from '@/components/JS'
export default {
    name:'Movie',
    components: {
        Header,
        TabBar
    },
    mounted(){
        setTimeout(() => {
            this.axios.get('/data/cityOrientation.json')
            .then(res=>{
                console.log(res.data)
                var CityName=res.data.data.city
                var CityId=res.data.data.id
                if(this.$store.state.city.id==CityId){return}
                messageBox({
                    title:'当前定位',
                    content:CityName,
                    cancel:'取消定位',
                    ok:'确定',
                    handleOk(){
                        console.log('handleOk')
                        window.localStorage.setItem('nowNm',CityName)
                        window.localStorage.setItem('nowId',CityId)
                        window.location.reload()
                    }
                })
            })
        }, 3000);
    }
}
</script>

<style scoped>
    #content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
    .movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
    .movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
    .movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
    .movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
    .movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
    .movie_menu .search_entry i{  font-size:20px; color:red;}
</style>