<template>
    <div class="movie_body">
        <ul>
            <li v-for="item in comingList" :key="item.filmId" @click="handleToDetail(item.filmId)">
                <div class="pic_show"><img :src="item.poster"></div>
                <div class="info_list">
                    <h2>{{item.name}}</h2>
                    <p>主演:{{item.actors | actorsFilter}}</p>
                    <p>
                        <span class="person">{{item.category}} | {{item.nation}}</span>
                    </p>
                    <p>上映时间：{{item.premiereAt | timerFilter}}</p>
                </div>
                <div class="btn_pre">
                    预售
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import http from '@/util/http'
export default {
    name:'ComingSoon',
    data(){
        return{
            comingList:[],
            prevCityId:-1,
            cityId:null
        }
    },
    methods:{
        handleToDetail(movieId){
            this.$router.push(`/movie/detail/2/${movieId}`)
        }
    },
    activated(){
        this.cityId = this.$store.state.city.id
        if(this.prevCityId === this.cityId) {return}
        http({
            url:`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=1471394`,
            headers:{
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res=>{
            this.comingList=res.data.data.films
            this.prevCityId=this.cityId
        })
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

    #content .detail_intro{ padding: 10px;}
    #content .detail_player{ margin:20px;}
    .detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
    .detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
    .detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>