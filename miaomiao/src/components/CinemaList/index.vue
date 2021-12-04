<template>
    <div class="cinema_body">
        <van-loading v-if="isLoading" size="28px" vertical>加载中...</van-loading>
        <Scroller :key="cinemaList">
            <ul>
                <li v-for="item in cinemaList" :key="item.id">
                    <div>
                        <span>{{item.nm}}</span>
                        <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{item.addr}}</span>
                        <span>{{item.distance}}</span>
                    </div>
                    <div class="card">
                        <div v-for="(itemCard,key) in item.tag" v-if="itemCard===1" :key="key" :class="key | classCard">
                            {{key | formatCard}}
                        </div>
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
export default {
    name:'CinemaList',
    data () {
        return {
            cinemaList:[],
            isLoading:true,
            prevCityId:-1

        }
    },
    activated () {
        var cityId = this.$store.state.city.id
        if(this.prevCityId === cityId) {return}
        this.isLoading=true
        this.axios.get(`/ajax/moreCinemas?movieId=0&day=2021-12-03&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1638535550609&cityId=${cityId}&optimus_uuid=04D2B4803BC011ECAE9317E1779F1006015FE837A4444119A1D780B418407A09&optimus_risk_level=71&optimus_code=10`)
        .then(res=>{
            console.log(res.data.cinemas.cinemas)
            this.cinemaList=res.data.cinemas.cinemas
            this.isLoading=false
            this.prevCityId=cityId
        })
    },
    filters: {
        formatCard(key){
            var card=[
                {key:'allowRefund',value:'退'},
                {key:'endorse',value:'改签'},
                {key:'sell',value:'折扣'},
                {key:'snack',value:'小吃'},
            ]
            for(var i=0;i<card.length;i++){
                if(card[i].key==key){
                    return card[i].value
                }
            }
            return ''
        },
        classCard(key){
            var card=[
                {key:'allowRefund',value:'bl'},
                {key:'endorse',value:'bl'},
                {key:'sell',value:'or'},
                {key:'snack',value:'or'},
            ]
            for(var i=0;i<card.length;i++){
                if(card[i].key==key){
                    return card[i].value
                }
            }
            return ''
        }
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