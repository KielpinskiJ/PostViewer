(function(){"use strict";var t={3858:function(t,e,s){var o=s(5130),r=s(9005),n=s(6768);const a={id:"app"};function i(t,e,s,o,r,i){const l=(0,n.g2)("PostList"),c=(0,n.g2)("PostDetails");return(0,n.uX)(),(0,n.CE)("div",a,[(0,n.bF)(l),o.postStore.selectedPost?((0,n.uX)(),(0,n.Wv)(c,{key:0,post:o.postStore.selectedPost},null,8,["post"])):(0,n.Q3)("",!0)])}var l=s(4232);const c=t=>((0,n.Qi)("data-v-e5dc6b94"),t=t(),(0,n.jt)(),t),u={class:"posts-filters"},d=(0,n.Fv)('<option value="" data-v-e5dc6b94>Sortuj według...</option><option value="alphabetical" data-v-e5dc6b94>Alfabetycznie</option><option value="reverseAlphabetical" data-v-e5dc6b94>Od końca alfabetu</option><option value="longest" data-v-e5dc6b94>Najdłuższy post</option><option value="shortest" data-v-e5dc6b94>Najkrótszy post</option>',5),p=[d],h=c((()=>(0,n.Lk)("option",{value:""},"Filtruj według użytkownika...",-1))),f=["value"],v={class:"post-wrapper"},b={class:"post-title"},g={class:"author"},P={class:"buttons"},S=["onClick"],y=["onClick"],k={class:"buttons-bottom"},m=["disabled"],w=["disabled"];function L(t,e,s,o,r,a){return(0,n.uX)(),(0,n.CE)("div",null,[(0,n.Lk)("div",u,[(0,n.Lk)("select",{onChange:e[0]||(e[0]=t=>o.postStore.setSort(t.target.value))},p,32),(0,n.Lk)("select",{onChange:e[1]||(e[1]=t=>o.postStore.setFilter(t.target.value))},[h,((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(o.userStore.users,(t=>((0,n.uX)(),(0,n.CE)("option",{key:t.id,value:t.id},(0,l.v_)(t.name),9,f)))),128))],32),(0,n.Lk)("input",{onInput:e[2]||(e[2]=t=>o.postStore.setSearch(t.target.value)),placeholder:"Wyszukaj..."},null,32)]),(0,n.Lk)("div",v,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(o.postStore.posts,(t=>((0,n.uX)(),(0,n.CE)("div",{class:"post",key:t.id},[(0,n.Lk)("h2",b,(0,l.v_)(t.title),1),(0,n.Lk)("p",null,(0,l.v_)(t.body.substring(0,100))+"...",1),(0,n.Lk)("p",g,"Autor: "+(0,l.v_)(o.userStore.getUser(t.userId).name),1),(0,n.Lk)("div",P,[(0,n.Lk)("button",{class:"button button-view",onClick:e=>o.viewPost(t)},"Zobacz więcej",8,S),(0,n.Lk)("button",{class:"button button-delete",onClick:e=>o.deletePost(t.id)},"Usuń post",8,y)])])))),128))]),(0,n.Lk)("div",k,[(0,n.Lk)("button",{class:"button button-prev",onClick:e[3]||(e[3]=t=>o.postStore.prevPage()),disabled:1===o.postStore.page}," Poprzednia strona ",8,m),(0,n.Lk)("button",{class:"button button-next",onClick:e[4]||(e[4]=t=>o.postStore.nextPage()),disabled:10*o.postStore.page>=o.postStore.filteredPosts.length}," Następna strona ",8,w)])])}var C=s(8355);const A=C.A.create({baseURL:"https://jsonplaceholder.typicode.com",headers:{Accept:"application/json","Content-Type":"application/json"}});var j={getAllPosts(){return A.get("/posts")},getPost(t){return A.get(`/posts/${t}`)},getCommentsByPostId(t){return A.get(`/posts/${t}/comments`)},getAllUsers(){return A.get("/users")},getUser(t){return A.get(`/users/${t}`)},deletePost(t){return A.delete(`/posts/${t}`)}};const _=(0,r.nY)({id:"user",state:()=>({users:[]}),actions:{async loadAllUsers(){const t=await j.getAllUsers();this.users=t.data},getUser(t){return this.users.find((e=>e.id===t))}}});var O=_;function E(t,e){return"alphabetical"===e?t.sort(((t,e)=>t.title.localeCompare(e.title))):"reverseAlphabetical"===e?t.sort(((t,e)=>e.title.localeCompare(t.title))):"longest"===e?t.sort(((t,e)=>e.body.length-t.body.length)):"shortest"===e?t.sort(((t,e)=>t.body.length-e.body.length)):t}function U(t,e){return e?t.filter((t=>t.userId===e)):t}function x(t,e){if(e){const s=e.toLowerCase();return t.filter((t=>t.body.toLowerCase().includes(s)||t.title.toLowerCase().includes(s)))}return t}const I=(0,r.nY)({id:"post",state:()=>({allPosts:[],filteredPosts:[],posts:[],page:1,selectedPost:null,searchState:{sort:"",filter:"",search:""}}),actions:{async loadAllPosts(){const t=await j.getAllPosts();this.allPosts=t.data},filterAndSortPosts(t,e,s){let o=[...this.allPosts];t&&(o=E(o,t)),e&&(o=U(o,e)),s&&(o=x(o,s)),this.filteredPosts=o},loadPosts(t,e,s){this.page=1,this.searchState={sort:t,filter:e,search:s},this.filterAndSortPosts(t,e,s),this.posts=this.filteredPosts.slice(10*(this.page-1),10*this.page)},deletePost(t){this.allPosts=this.allPosts.filter((e=>e.id!==t)),this.filteredPosts=this.filteredPosts.filter((e=>e.id!==t)),this.loadPosts(this.searchState.sort,this.searchState.filter,this.searchState.search)},nextPage(){10*this.page<this.filteredPosts.length&&(this.page+=1,this.posts=this.filteredPosts.slice(10*(this.page-1),10*this.page),window.scrollTo({top:0,behavior:"smooth"}))},prevPage(){this.page>1&&(this.page-=1,this.posts=this.filteredPosts.slice(10*(this.page-1),10*this.page),window.scrollTo({top:0,behavior:"smooth"}))},selectPost(t){this.selectedPost=t},setSort(t){this.searchState.sort=t,this.loadPosts(this.searchState.sort,this.searchState.filter,this.searchState.search)},setFilter(t){this.searchState.filter=Number(t),this.loadPosts(this.searchState.sort,this.searchState.filter,this.searchState.search)},setSearch(t){this.searchState.search=t,this.loadPosts(this.searchState.sort,this.searchState.filter,this.searchState.search)}}});var F=I,X={setup(){const t=O(),e=F();(0,n.sV)((async()=>{await t.loadAllUsers(),await e.loadAllPosts(),e.loadPosts(e.searchState.sort,e.searchState.filter,e.searchState.search)}));const s=async t=>{await j.deletePost(t),e.deletePost(t)},o=t=>{e.selectedPost=t};return{postStore:e,userStore:t,deletePost:s,viewPost:o}}},T=s(1241);const z=(0,T.A)(X,[["render",L],["__scopeId","data-v-e5dc6b94"]]);var W=z;const $={key:0,class:"modal"},N={class:"buttons"};function V(t,e,s,o,r,a){return s.post?((0,n.uX)(),(0,n.CE)("div",$,[(0,n.Lk)("h2",null,(0,l.v_)(s.post.title),1),(0,n.Lk)("p",null,(0,l.v_)(s.post.body),1),(0,n.Lk)("p",null,"Autor: "+(0,l.v_)(o.userStore.getUser(s.post.userId).name),1),(0,n.Lk)("div",N,[(0,n.Lk)("button",{class:"button button-back",onClick:e[0]||(e[0]=(...t)=>o.closePost&&o.closePost(...t))},"Wróć do listy postów"),(0,n.Lk)("button",{class:"button button-delete",onClick:e[1]||(e[1]=t=>o.deletePost(s.post.id))},"Usuń post")])])):(0,n.Q3)("",!0)}var M={props:["post"],setup(){const t=F(),e=O();(0,n.sV)((async()=>{await e.loadAllUsers()}));const s=()=>{t.selectedPost=null},o=async e=>{await j.deletePost(e),t.deletePost(e),s()};return{deletePost:o,closePost:s,userStore:e}}};const Q=(0,T.A)(M,[["render",V],["__scopeId","data-v-67ccef47"]]);var R=Q,B={components:{PostList:W,PostDetails:R},setup(){const t=F(),e=()=>{if(t.selectedPost){const t=window.innerWidth-document.documentElement.clientWidth;document.body.style.marginRight=`${t}px`,document.body.classList.add("modal-open")}else document.body.style.marginRight="0px",document.body.classList.remove("modal-open")};return(0,n.wB)((()=>t.selectedPost),e),(0,n.hi)((()=>{document.body.classList.remove("modal-open")})),{postStore:t}}};const D=(0,T.A)(B,[["render",i]]);var K=D,Y=s(1387);const Z=[{path:"/",component:W}],q=(0,Y.aE)({history:(0,Y.LA)(),routes:Z});var G=q;const H=(0,r.Ey)(),J=(0,o.Ef)(K);J.use(H),J.use(G),J.mount("#app")}},e={};function s(o){var r=e[o];if(void 0!==r)return r.exports;var n=e[o]={exports:{}};return t[o].call(n.exports,n,n.exports,s),n.exports}s.m=t,function(){var t=[];s.O=function(e,o,r,n){if(!o){var a=1/0;for(u=0;u<t.length;u++){o=t[u][0],r=t[u][1],n=t[u][2];for(var i=!0,l=0;l<o.length;l++)(!1&n||a>=n)&&Object.keys(s.O).every((function(t){return s.O[t](o[l])}))?o.splice(l--,1):(i=!1,n<a&&(a=n));if(i){t.splice(u--,1);var c=r();void 0!==c&&(e=c)}}return e}n=n||0;for(var u=t.length;u>0&&t[u-1][2]>n;u--)t[u]=t[u-1];t[u]=[o,r,n]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var o in e)s.o(e,o)&&!s.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};s.O.j=function(e){return 0===t[e]};var e=function(e,o){var r,n,a=o[0],i=o[1],l=o[2],c=0;if(a.some((function(e){return 0!==t[e]}))){for(r in i)s.o(i,r)&&(s.m[r]=i[r]);if(l)var u=l(s)}for(e&&e(o);c<a.length;c++)n=a[c],s.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return s.O(u)},o=self["webpackChunkPostViewer"]=self["webpackChunkPostViewer"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=s.O(void 0,[504],(function(){return s(3858)}));o=s.O(o)})();
//# sourceMappingURL=app.5fbcd324.js.map