<template>
    <div class="city_body">
        <Scroller class="city_list" ref="city_list" :key="hotList">
            <van-loading v-if="isLoading" size="28px" vertical>加载中...</van-loading>
            <div>
                <div class="city_hot">
                    <h2>热门城市</h2>
                    <ul class="clearfix">
                        <li v-for="item in hotList" :key="item.id" @click="handleToCity(item.nm,item.id)">{{item.nm}}</li>
                    </ul>
                </div>
                <div class="city_sort" ref="city_sort">
                    <div v-for="item in cityList" :key="item.index">
                        <h2>{{item.index}}</h2>
                        <ul>
                            <li v-for="cityItem in item.list" :key="cityItem.id" @click="handleToCity(cityItem.nm,cityItem.id)">{{cityItem.nm}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Scroller>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name:'City',
    data(){
        return{
            cityList:[],
            hotList:[],
            isLoading:true
        }
    },
    mounted(){
        // 获取本地存储，防止多次发送ajax请求
        var cityList = window.localStorage.getItem('cityList')
        var hotList = window.localStorage.getItem('hotList')
        if(cityList && hotList){
            this.cityList=JSON.parse(cityList)
            this.hotList=JSON.parse(hotList)
            this.isLoading=false
        }else{
            this.axios.get('/api/dianying/cities.json')
                .then(res=> {
                    this.isLoading=false
                    var cities = res.data.cts
                    // console.log(cities)
                    var {cityList,hotList} = this.formatCityList(cities)
                    this.cityList=cityList
                    this.hotList=hotList
    
                    // 本地存储
                    window.localStorage.setItem('cityList',JSON.stringify(cityList))
                    window.localStorage.setItem('hotList',JSON.stringify(hotList))
                })
        }
    },
    methods:{
        formatCityList(cities){
            var cityList=[]
            var hotList=[
                {id:1,nm:'北京',py:"beijing"},
                {id: 10,nm: "上海",py: "shanghai"},
                {id: 20,nm: "广州",py: "guangzhou"},
                {id: 30,nm: "深圳",py: "shenzhen"},
                {id: 57,nm: "武汉",py: "wuhan"},
                {id: 40,nm: "天津",py: "tianjin"},
                {id: 42,nm: "西安",py: "xian"},
                {id: 55,nm: "南京",py: "nanjing"},
                {id: 50,nm: "杭州",py: "hangzhou"},
                {id: 59,nm: "成都",py: "chengdu"},
                {id: 45,nm: "重庆",py: "chongqing"},
            ]
            // 热门城市筛选
            for(var i=0;i<cities.length;i++){
                if(cities[i].isHot===1){
                    hotList.push(cities[i])
                }
            }
            console.log(hotList)

            // 城市首字母索引提取及城市分类
            for(var i=0;i<cities.length;i++){
                var firstLetter=cities[i].py.substring(0,1).toUpperCase()
                if(toCom(firstLetter)){ // 当没有该索引，新添加索引
                    cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})
                }
                else{ // 已有该索引，添加城市名
                    for(var j=0;j<cityList.length;j++){
                        if(cityList[j].index===firstLetter){
                            cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                        }
                    }
                }
            }
            // 索引从A~B排序
            cityList.sort((e1,e2)=>{
                if(e1.index>e2.index) return 1
                else if(e1.index<e2.index) return -1
                else  return 0
            })

            function toCom(firstLetter){
                for(var i=0;i<cityList.length;i++){
                    if(cityList[i].index === firstLetter){
                        return false
                    }
                }
                return true
            }
            return{
                cityList,
                hotList
            }
        },
        handleToIndex(index){
            var h2 = this.$refs.city_sort.getElementsByTagName('h2')
            this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
        },
        handleToCity(nm,id){
            console.log(nm,id)
            this.$store.commit('city/CITY_INFO',{nm,id})
            window.localStorage.setItem('nowNm',nm)
            window.localStorage.setItem('nowId',id)
            this.$router.push('/movie/nowPlaying')
        }
    }
}
</script>

<style scoped>
    #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
    .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
    .city_body .city_list::-webkit-scrollbar{
        background-color:transparent;
        width:0;
    }
    .city_body .city_hot{ margin-top: 20px;}
    .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
    .city_body .city_sort div{ margin-top: 20px;}
    .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
    .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
    .city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>