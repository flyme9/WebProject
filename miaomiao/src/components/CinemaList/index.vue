<template>
    <div class="cinema_body">
        <ul>
            <li v-for="item in cinemaList" :key="item.cinemaId">
                <div>
                    <span>{{item.name}}</span>
                    <span class="q"><span class="price"> {{item.lowPrice/100}}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{item.address}}</span>
                    <span>{{item.distance}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import http from '@/util/http'
export default {
    name:'CinemaList',
    data () {
        return {
            cinemaList:[],
            prevCityId:-1,
            cityId:null
        }
    },
    activated () {
        this.cityId = this.$store.state.city.id
        if(this.prevCityId === this.cityId) {return}
        http({
            url:`/gateway?cityId=${this.cityId}&ticketFlag=1&k=6143709`,
            headers:{
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res=>{
            this.cinemaList=res.data.data.cinemas
            this.prevCityId=this.cityId
        })
    }
}
</script>

<style scoped>
    #content .cinema_body{ flex:1; overflow:auto;}
    .cinema_body ul{ padding:20px;}
    .cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
    .cinema_body div{ margin-bottom: 10px;}
    .cinema_body .q{ font-size: 11px; color:#f03d37;}
    .cinema_body .price{ font-size: 18px;}
    .cinema_body .address{ font-size: 13px; color:#666;}
    .cinema_body .address span:nth-of-type(2){ float:right; }
    .cinema_body .card{ display: flex;}
    .cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
    .cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
    .cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>