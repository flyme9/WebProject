<template>
    <div class="movie_body" ref="movie_body">
        <van-loading v-if="isLoading" size="28px" vertical>加载中...</van-loading>
        <Scroller :key="movieList" :handleToScroll='handleToScroll' :handleToTouchEnd='handleToTouchEnd'>
            <ul>
                <li class="pullDown">{{pullDownMsg}}</li>
                <li v-for="item in movieList" :key="item.id" @click="handleToDetail">
                    <div class="pic_show" >
                        <img :src="item.img | imgFilter('128.180')">
                    </div>
                    <div class="info_list">
                        <h2>{{item.nm}}
                            <img v-if="item.ver.startsWith('IMAX 2D')" src="@/assets/v2dimax.png" alt="">
                            <img v-else-if="item.ver.startsWith('IMAX 3D')" src="@/assets/v3dimax.png" alt="">
                        </h2>
                        <p>观众评 <span class="grade">{{item.mk}}</span></p>
                        <p>{{item.desc}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall" :style="{ backgroundColor:item.showStateButton.color}">
                        {{item.showStateButton.content}}
                    </div> 
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
export default {
    name:'NowPlaying',
    data(){
        return{
            movieList:[],
            pullDownMsg:'',
            isLoading:true,
            prevCityId:-1
        }
    },
    // 分页懒加载 https://i.maoyan.com/ajax/moreComingList?token=&movieIds=1291076,1357983,30932,1355028,1413176,1289358,1446129,1417305,1355569,1444433&optimus_uuid=04D2B4803BC011ECAE9317E1779F1006015FE837A4444119A1D780B418407A09&optimus_risk_level=71&optimus_code=10
    
    activated () {
        var cityId = this.$store.state.city.id
        if(this.prevCityId === cityId) {return}
        this.isLoading=true
        console.log(112)
        this.axios.get(`/api/mmdb/movie/v3/list/hot.json?ct=%E4%B8%8A%E6%B5%B7&ci=${cityId}&channelId=4`)
            .then(res=>{
                this.movieList=res.data.data.hot
                console.log(this.movieList)
                this.isLoading=false
                this.prevCityId=cityId
            })
    },
    methods:{
        handleToDetail(){
            console.log('handleToDetail')
        },
        handleToScroll(pos){
            if(pos.y>30){
                this.pullDownMsg='正在更新中'
            }
        },
        handleToTouchEnd(pos){
            if(pos.y>30){
                this.pullDownMsg='更新成功'
                setTimeout(() => {
                    this.pullDownMsg=''
                }, 3000);
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
    .movie_body .pullDown{margin: 0;padding: 0;border: none;}
</style>