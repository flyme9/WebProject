(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-83a515c2"],{"04d1":function(t,i,n){var e=n("342f"),r=e.match(/firefox\/(\d+)/i);t.exports=!!r&&+r[1]},"4dae":function(t,i,n){var e=n("da84"),r=n("23cb"),o=n("07fa"),a=n("8418"),c=e.Array,s=Math.max;t.exports=function(t,i,n){for(var e=o(t),u=r(i,e),f=r(void 0===n?e:n,e),d=c(s(f-u,0)),l=0;u<f;u++,l++)a(d,l,t[u]);return d.length=l,d}},"4e82":function(t,i,n){"use strict";var e=n("23e7"),r=n("e330"),o=n("59ed"),a=n("7b0b"),c=n("07fa"),s=n("577e"),u=n("d039"),f=n("addb"),d=n("a640"),l=n("04d1"),h=n("d998"),y=n("2d00"),v=n("512ce"),g=[],m=r(g.sort),p=r(g.push),w=u((function(){g.sort(void 0)})),x=u((function(){g.sort(null)})),_=d("sort"),I=!u((function(){if(y)return y<70;if(!(l&&l>3)){if(h)return!0;if(v)return v<603;var t,i,n,e,r="";for(t=65;t<76;t++){switch(i=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:n=3;break;case 68:case 71:n=4;break;default:n=2}for(e=0;e<47;e++)g.push({k:i+e,v:n})}for(g.sort((function(t,i){return i.v-t.v})),e=0;e<g.length;e++)i=g[e].k.charAt(0),r.charAt(r.length-1)!==i&&(r+=i);return"DGBEFHACIJK"!==r}})),b=w||!x||!_||!I,C=function(t){return function(i,n){return void 0===n?-1:void 0===i?1:void 0!==t?+t(i,n)||0:s(i)>s(n)?1:-1}};e({target:"Array",proto:!0,forced:b},{sort:function(t){void 0!==t&&o(t);var i=a(this);if(I)return void 0===t?m(i):m(i,t);var n,e,r=[],s=c(i);for(e=0;e<s;e++)e in i&&p(r,i[e]);f(r,C(t)),n=r.length,e=0;while(e<n)i[e]=r[e++];while(e<s)delete i[e++];return i}})},"512ce":function(t,i,n){var e=n("342f"),r=e.match(/AppleWebKit\/(\d+)\./);t.exports=!!r&&+r[1]},"78a5":function(t,i,n){"use strict";n.r(i);var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"city_body"},[n("Scroller",{ref:"city_list",staticClass:"city_list"},[n("div",[n("div",{staticClass:"city_hot"},[n("h2",[t._v("热门城市")]),n("ul",{staticClass:"clearfix"},t._l(t.hotList,(function(i){return n("li",{key:i.cityId,on:{click:function(n){return t.handleToCity(i.name,i.cityId)}}},[t._v(t._s(i.name))])})),0)]),n("div",{ref:"city_sort",staticClass:"city_sort"},t._l(t.cityList,(function(i){return n("div",{key:i.index},[n("h2",[t._v(t._s(i.index))]),n("ul",t._l(i.list,(function(i){return n("li",{key:i.cityId,on:{click:function(n){return t.handleToCity(i.name,i.cityId)}}},[t._v(t._s(i.name))])})),0)])})),0)])]),n("div",{staticClass:"city_index"},[n("ul",t._l(t.cityList,(function(i,e){return n("li",{key:i.index,on:{touchstart:function(i){return t.handleToIndex(e)}}},[t._v(t._s(i.index))])})),0)])],1)},r=[],o=(n("e9c4"),n("b0c0"),n("4e82"),n("adb5")),a={name:"City",data:function(){return{cityList:[],hotList:[]}},mounted:function(){var t=this,i=window.localStorage.getItem("cityList"),n=window.localStorage.getItem("hotList");i&&n?(this.cityList=JSON.parse(i),this.hotList=JSON.parse(n)):Object(o["a"])({url:"/gateway?k=4343038",headers:{"X-Host":"mall.film-ticket.city.list"}}).then((function(i){var n=i.data.data.cities,e=t.formatCityList(n),r=e.cityList,o=e.hotList;t.cityList=r,t.hotList=o,window.localStorage.setItem("cityList",JSON.stringify(r)),window.localStorage.setItem("hotList",JSON.stringify(o))}))},methods:{formatCityList:function(t){for(var i=[],n=[],e=0;e<t.length;e++)1===t[e].isHot&&n.push(t[e]);console.log(n);for(e=0;e<t.length;e++){var r=t[e].pinyin.substring(0,1).toUpperCase();if(a(r))i.push({index:r,list:[{name:t[e].name,cityId:t[e].cityId}]});else for(var o=0;o<i.length;o++)i[o].index===r&&i[o].list.push({name:t[e].name,cityId:t[e].cityId})}function a(t){for(var n=0;n<i.length;n++)if(i[n].index===t)return!1;return!0}return i.sort((function(t,i){return t.index>i.index?1:t.index<i.index?-1:0})),{cityList:i,hotList:n}},handleToIndex:function(t){var i=this.$refs.city_sort.getElementsByTagName("h2");this.$refs.city_list.toScrollTop(-i[t].offsetTop)},handleToCity:function(t,i){console.log(t,i),this.$store.commit("city/CITY_INFO",{nm:t,id:i}),window.localStorage.setItem("nowNm",t),window.localStorage.setItem("nowId",i),this.$router.push("/movie/nowPlaying")}}},c=a,s=(n("f1f0"),n("2877")),u=Object(s["a"])(c,e,r,!1,null,"20327782",null);i["default"]=u.exports},8418:function(t,i,n){"use strict";var e=n("a04b"),r=n("9bf2"),o=n("5c6c");t.exports=function(t,i,n){var a=e(i);a in t?r.f(t,a,o(0,n)):t[a]=n}},"88c8":function(t,i,n){},addb:function(t,i,n){var e=n("4dae"),r=Math.floor,o=function(t,i){var n=t.length,s=r(n/2);return n<8?a(t,i):c(t,o(e(t,0,s),i),o(e(t,s),i),i)},a=function(t,i){var n,e,r=t.length,o=1;while(o<r){e=o,n=t[o];while(e&&i(t[e-1],n)>0)t[e]=t[--e];e!==o++&&(t[e]=n)}return t},c=function(t,i,n,e){var r=i.length,o=n.length,a=0,c=0;while(a<r||c<o)t[a+c]=a<r&&c<o?e(i[a],n[c])<=0?i[a++]:n[c++]:a<r?i[a++]:n[c++];return t};t.exports=o},d998:function(t,i,n){var e=n("342f");t.exports=/MSIE|Trident/.test(e)},e9c4:function(t,i,n){var e=n("23e7"),r=n("da84"),o=n("d066"),a=n("2ba4"),c=n("e330"),s=n("d039"),u=r.Array,f=o("JSON","stringify"),d=c(/./.exec),l=c("".charAt),h=c("".charCodeAt),y=c("".replace),v=c(1..toString),g=/[\uD800-\uDFFF]/g,m=/^[\uD800-\uDBFF]$/,p=/^[\uDC00-\uDFFF]$/,w=function(t,i,n){var e=l(n,i-1),r=l(n,i+1);return d(m,t)&&!d(p,r)||d(p,t)&&!d(m,e)?"\\u"+v(h(t,0),16):t},x=s((function(){return'"\\udf06\\ud834"'!==f("\udf06\ud834")||'"\\udead"'!==f("\udead")}));f&&e({target:"JSON",stat:!0,forced:x},{stringify:function(t,i,n){for(var e=0,r=arguments.length,o=u(r);e<r;e++)o[e]=arguments[e];var c=a(f,null,o);return"string"==typeof c?y(c,g,w):c}})},f1f0:function(t,i,n){"use strict";n("88c8")}}]);
//# sourceMappingURL=chunk-83a515c2.39c770c0.js.map