(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6922f70b"],{3923:function(e,t,a){},"503b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.nowTabData,border:""}},[a("el-table-column",{attrs:{prop:"userHead",width:"80",label:"用户头像"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticClass:"userHead",attrs:{src:e.row.userHead}})]}}])}),a("el-table-column",{attrs:{prop:"username",label:"用户名"}}),a("el-table-column",{attrs:{prop:"email",label:"用户邮箱"}}),a("el-table-column",{attrs:{prop:"data",label:"注册日期"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small"},on:{click:function(a){return e.handleToFreeze(t.$index,t.row)}}},[e._v(e._s(t.row.isFreeze?"已冻结":"未冻结"))]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("el-pagination",{staticClass:"page",attrs:{background:"",layout:"prev, pager, next","page-size":e.pageSize,"current-page":e.currentPage,total:e.tableData.length},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)},r=[],i=(a("fb6a"),a("a434"),a("bc3a")),o=a.n(i),l={name:"users",data:function(){return{tableData:[],currentPage:1,pageSize:6}},mounted:function(){var e=this;o.a.get("/api2/admin/usersList").then((function(t){var a=t.data.status;0===a&&(e.tableData=t.data.data.usersList)}))},computed:{nowTabData:function(){return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)||[]}},methods:{handleToFreeze:function(e,t){var a=this;o.a.post("/api2/admin/updateFreeze",{email:t.email,isFreeze:!t.isFreeze}).then((function(n){var r=n.data.status;0===r?a.$alert("操作成功",{confirmButtonText:"确定",callback:function(n){a.tableData[e].isFreeze=!t.isFreeze}}):a.$alert("操作失败",{confirmButtonText:"确定"})}))},handleDelete:function(e,t){var a=this;o.a.post("/api2/admin/deleteUser",{email:t.email}).then((function(t){var n=t.data.status;0===n?a.$alert("操作成功",{confirmButtonText:"确定",callback:function(t){a.tableData.splice(e,1)}}):a.$alert("操作成功",{confirmButtonText:"确定"})}))}}},s=l,u=(a("f095"),a("2877")),c=Object(u["a"])(s,n,r,!1,null,"1d8f3033",null);t["default"]=c.exports},8418:function(e,t,a){"use strict";var n=a("a04b"),r=a("9bf2"),i=a("5c6c");e.exports=function(e,t,a){var o=n(t);o in e?r.f(e,o,i(0,a)):e[o]=a}},a434:function(e,t,a){"use strict";var n=a("23e7"),r=a("da84"),i=a("23cb"),o=a("5926"),l=a("07fa"),s=a("7b0b"),u=a("65f0"),c=a("8418"),d=a("1dde"),f=d("splice"),p=r.TypeError,b=Math.max,h=Math.min,m=9007199254740991,g="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!f},{splice:function(e,t){var a,n,r,d,f,v,w=s(this),z=l(w),x=i(e,z),k=arguments.length;if(0===k?a=n=0:1===k?(a=0,n=z-x):(a=k-2,n=h(b(o(t),0),z-x)),z+a-n>m)throw p(g);for(r=u(w,n),d=0;d<n;d++)f=x+d,f in w&&c(r,d,w[f]);if(r.length=n,a<n){for(d=x;d<z-n;d++)f=d+n,v=d+a,f in w?w[v]=w[f]:delete w[v];for(d=z;d>z-n+a;d--)delete w[d-1]}else if(a>n)for(d=z-n;d>x;d--)f=d+n-1,v=d+a-1,f in w?w[v]=w[f]:delete w[v];for(d=0;d<a;d++)w[d+x]=arguments[d+2];return w.length=z-n+a,r}})},f095:function(e,t,a){"use strict";a("3923")},fb6a:function(e,t,a){"use strict";var n=a("23e7"),r=a("da84"),i=a("e8b5"),o=a("68ee"),l=a("861d"),s=a("23cb"),u=a("07fa"),c=a("fc6a"),d=a("8418"),f=a("b622"),p=a("1dde"),b=a("f36a"),h=p("slice"),m=f("species"),g=r.Array,v=Math.max;n({target:"Array",proto:!0,forced:!h},{slice:function(e,t){var a,n,r,f=c(this),p=u(f),h=s(e,p),w=s(void 0===t?p:t,p);if(i(f)&&(a=f.constructor,o(a)&&(a===g||i(a.prototype))?a=void 0:l(a)&&(a=a[m],null===a&&(a=void 0)),a===g||void 0===a))return b(f,h,w);for(n=new(void 0===a?g:a)(v(w-h,0)),r=0;h<w;h++,r++)h in f&&d(n,r,f[h]);return n.length=r,n}})}}]);
//# sourceMappingURL=chunk-6922f70b.09c5fbe5.js.map