(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-245962b3"],{"10a0":function(t,i,a){"use strict";a("cfde")},3134:function(t,i,a){},"39ee":function(t,i,a){},"4bdd":function(t,i,a){"use strict";var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("footer",{attrs:{id:"footer"}},[a("ul",[a("router-link",{attrs:{to:"/movie",custom:""},scopedSlots:t._u([{key:"default",fn:function(i){var e=i.navigate,n=i.isActive;return[a("li",{class:n?"active":"",on:{click:e}},[a("i",{staticClass:"iconfont icon-dianying"}),a("p",[t._v("电影")])])]}}])}),a("router-link",{attrs:{to:"/cinema",custom:""},scopedSlots:t._u([{key:"default",fn:function(i){var e=i.navigate,n=i.isActive;return[a("li",{class:n?"active":"",on:{click:e}},[a("i",{staticClass:"iconfont icon-yingyuan"}),a("p",[t._v("影院")])])]}}])}),a("router-link",{attrs:{to:"/mine",custom:""},scopedSlots:t._u([{key:"default",fn:function(i){var e=i.navigate,n=i.isActive;return[a("li",{class:n?"active":"",on:{click:e}},[a("i",{staticClass:"iconfont icon-wode"}),a("p",[t._v("我的")])])]}}])})],1)])},n=[],s={name:"Tabbar"},c=s,r=(a("9fb8"),a("2877")),o=Object(r["a"])(c,e,n,!1,null,"6fff2484",null);i["a"]=o.exports},"981c":function(t,i,a){"use strict";var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("header",{attrs:{id:"header"}},[t._t("default"),a("h1",[t._v(t._s(t.title))])],2)},n=[],s={name:"Header",props:{title:{type:String,default:"喵喵电影"}}},c=s,r=(a("ca95"),a("2877")),o=Object(r["a"])(c,e,n,!1,null,"6081b800",null);i["a"]=o.exports},"9fb8":function(t,i,a){"use strict";a("3134")},b1f0:function(t,i,a){},b32a:function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{attrs:{id:"main"}},[a("Header",{attrs:{title:"喵喵影院"}}),a("div",{attrs:{id:"content"}},[t._m(0),a("CinemaList")],1),a("TabBar")],1)},n=[function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"cinema_menu"},[a("div",{staticClass:"city_switch"},[t._v(" 全城 "),a("i",{staticClass:"iconfont icon-lower-triangle"})]),a("div",{staticClass:"brand_swtich"},[t._v(" 品牌 "),a("i",{staticClass:"iconfont icon-lower-triangle"})]),a("div",{staticClass:"feature_switch"},[t._v(" 特色 "),a("i",{staticClass:"iconfont icon-lower-triangle"})])])}],s=a("981c"),c=a("4bdd"),r=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"cinema_body"},[a("ul",t._l(t.cinemaList,(function(i){return a("li",{key:i.cinemaId},[a("div",[a("span",[t._v(t._s(i.name))]),a("span",{staticClass:"q"},[a("span",{staticClass:"price"},[t._v(" "+t._s(i.lowPrice/100))]),t._v(" 元起")])]),a("div",{staticClass:"address"},[a("span",[t._v(t._s(i.address))]),a("span",[t._v(t._s(i.distance))])])])})),0)])},o=[],l=a("adb5"),u={name:"CinemaList",data:function(){return{cinemaList:[],prevCityId:-1,cityId:null}},activated:function(){var t=this;this.cityId=this.$store.state.city.id,this.prevCityId!==this.cityId&&Object(l["a"])({url:"/gateway?cityId=".concat(this.cityId,"&ticketFlag=1&k=6143709"),headers:{"X-Host":"mall.film-ticket.cinema.list"}}).then((function(i){t.cinemaList=i.data.data.cinemas,t.prevCityId=t.cityId}))}},d=u,f=(a("10a0"),a("2877")),v=Object(f["a"])(d,r,o,!1,null,"740d07d4",null),_=v.exports,m={name:"Cinema",components:{Header:s["a"],TabBar:c["a"],CinemaList:_}},p=m,b=(a("b6b3"),Object(f["a"])(p,e,n,!1,null,"6da5d30d",null));i["default"]=b.exports},b6b3:function(t,i,a){"use strict";a("39ee")},ca95:function(t,i,a){"use strict";a("b1f0")},cfde:function(t,i,a){}}]);
//# sourceMappingURL=chunk-245962b3.13d95389.js.map