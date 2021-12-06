<template>
    <div id="detailContainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @click="handleBack"></i>
        </Header>
        <div id="content" class="contentDetail">
            <div class="detail_list" >
                <div class="detail_list_bg" :style="{backgroundImage:'url('+detailMovie.poster+')'}"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div class="detail_list_img">
                        <img :src="detailMovie.poster" alt="img">
                    </div>
                    <div class="detail_list_info">
                        <h2>{{detailMovie.name}}</h2>
                        <p>{{detailMovie.category}}</p>
                        <p>上映时间：{{detailMovie.premiereAt | timerFilter}}</p>
                        <p>{{detailMovie.nation}} / {{detailMovie.runtime}}分钟</p>
                    </div>
                </div>
            </div>
            
            <div class="synopsis" :class="isHidden?'hidden':''">{{detailMovie.synopsis}}</div>
            <div style="text-align:center;font-size: 14px;color: #797d82;padding:10px 0" @click="isHidden=!isHidden">
                <span v-if="isHidden">展开</span>
                <span v-else>收起</span>
                <i @click="isHidden=!isHidden" class="iconfont" :class="isHidden?'icon-moreunfold':'icon-less'"></i>
            </div>

            <!-- 演职人员信息 -->
            <div class="title">演职人员</div>
            <div class="actors">
                <detail-swiper :perview="3.5" name="swiperActors">
                    <detail-swiper-item v-for="(data,index) in detailMovie.actors" :key="index">
                        <div :style="{backgroundImage:'url(' + data.avatarAddress+')'}" class="avatarImg"></div>
                        <div style="padding-top: 5px;">{{data.name}}</div>
                        <div style="color:#797d82;font-size:12px;padding-top: 5px;">{{data.role}}</div>
                    </detail-swiper-item>
                </detail-swiper>
            </div>

            <!-- 剧照 -->
            <div class="title">剧照</div>
            <div class="photos" v-if="detailMovie.photos">
                <detail-swiper  :perview="2.2" name="swiperPhotos">
                    <detail-swiper-item v-for="(data,index) in detailMovie.photos" :key="index">
                        <div :style="{backgroundImage:'url(' + data +')'}" class="avatarImg" @click="handlePreview(index)"></div>
                    </detail-swiper-item>
                </detail-swiper>
            </div>
        
            <div v-else style="text-align: center;height: 115px; line-height: 58px;">
                暂无剧照
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import detailSwiper from '@/components/Detail/DetailSwiper.vue'
import DetailSwiperItem from '@/components/Detail/DetailSwiperItem.vue'
import http from '@/util/http'
export default {
    name:'Detail',
    data () {
        return {
            detailMovie:{},
            isHidden:true
        }
    },
    components:{
        Header,
        Swiper,
        detailSwiper,
        DetailSwiperItem
    },
    props:['movieId'],
    methods:{
        handleBack(){
            this.$router.back()
        }
    },
    mounted(){
        http({
            url:`/gateway?filmId=${this.movieId}&k=1570676`,
            headers:{
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res=>{
            console.log(res.data.data.film)
            this.detailMovie=res.data.data.film
        })
    }
}
</script>

<style lang="scss" scoped>
    #detailContainer{position:absolute;left: 0;top: 0;z-index: 999;width: 100%;min-height: 100%;background: #fff;}
    #detailContainer.slide-enter-active{animation: .6s detailMove ease-in-out;}
    @keyframes detailMove{0%{transform: translateX(100%);}100%{transform: translateX(0);}}

    #content.contentDetail{ display: block; margin-bottom:0;}
    #content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
    .detail_list .detail_list_bg{ width:100%; height:100%;background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
    .detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
    .detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
    .detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
    .detail_list .detail_list_img img{ width:100%; height: 100%;}
    .detail_list .detail_list_info{ margin-top: 20px;}
    .detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
    .detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
    
    #content .title{font-size: 18px; padding: 15px;}

    .synopsis{
        font-size: 14px;
        color: #797d82;
        margin-top: 13px;
        line-height: 20px;
        padding: 0 15px;
        text-align: justify;
    }
    .hidden{
      overflow: hidden;
      height: 38px;
    }

    .actors{
        .swiperActors{
            padding-left: 15px;
            font-size: 12px;
            text-align: center;
            .avatarImg{
                width: 85px;
                height: 85px;
                background-position: center;
                background-size: cover;
            }
        }
    }
    .photos{
        padding-left: 15px;
            .avatarImg{
            width: 150px;
            height: 100px;
            background-position: center;
            background-size: cover;
        }
    }

</style>