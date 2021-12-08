<template>
    <div class="movie_body" ref="movie_body">
        <!-- <Scroll :key="movieList"> -->
            <ul>
                <li class="pullDown">{{pullDownMsg}}</li>
                <li v-for="item in movieList" :key="item.filmId" @click="handleToDetail(item.filmId)">
                    <div class="pic_show" >
                        <img :src="item.poster" alt="img">
                    </div>
                    <div class="info_list">
                        <h2>{{item.name}}</h2>
                        <p :style="item.grade?'':'color: transparent;'">观众评分<span class="grade">{{item.grade}}</span></p>
                        <p>主演:{{item.actors | actorsFilter}}</p>
                        <p>{{item.nation?item.nation:'暂无'}} | {{item.runtime}}分钟</p>
                    </div>
                    <div class="btn_mall">购票</div>
                </li>
            </ul>
        <!-- </Scroll> -->
    </div>
</template>

<script>
import http from '@/util/http'
// import Scroll from '@/components/Scroller'
export default {
    name:'NowPlaying',
    data(){
        return{
            movieList:[],
            total:1,
            pullDownMsg:'',
            prevCityId:-1,
            cityId:null
        }
    },
    components:{
        // Scroll
    },
    activated () {
        this.cityId = this.$store.state.city.id
        if(this.prevCityId === this.cityId) {return}
        http({
            url:`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=4414996`,
            headers:{
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res=>{
            this.movieList = res.data.data.films
            this.total = res.data.data.total
            this.prevCityId=this.cityId
        })
    },
    methods:{
        handleToDetail(movieId){
            this.$router.push(`/movie/detail/1/${movieId}`)
        },
        handleToScroll(pos){
            if(pos.y>30){
                this.pullDownMsg='正在更新中'
                http({
                    url:`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=4414996`,
                    headers:{
                        'X-Host': 'mall.film-ticket.film.list'
                    }
                }).then(res=>{
                    this.movieList = res.data.data.films
                    this.total = res.data.data.total
                })
            }
        },
        handleToTouchEnd(pos){
            if(pos.y>30){
                this.pullDownMsg='更新成功'
                setTimeout(() => {
                    this.pullDownMsg=''
                }, 1000);
            }
        }
    }
}
</script>

<style scoped>
    #content .movie_body{ flex:1; overflow:auto;}
    .movie_body ul{ margin:0 12px; overflow: hidden;}
    .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
    .movie_body .pic_show{ width:64px; height: 90px;}
    .movie_body .pic_show img{ width:100%;}
    .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
    .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
    .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
    .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
    .movie_body .btn_pre{ background-color: #3c9fe6;}
    .movie_body .pullDown{text-align: center;margin: 0;padding: 0;border: none;}
</style>