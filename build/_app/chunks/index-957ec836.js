import{S as l,i as s,s as t,l as e,f as a,x as r,e as n,c,b as o,a1 as i,a2 as h,a3 as u,W as d,O as f,d as p,r as m,u as $,w as g,a4 as v,a5 as x,a6 as w,k as I,a as E,n as U,D,E as y,t as V,g as b,h as j,P as R,a7 as k,R as C,T as G,U as L,j as M,m as A,o as B,v as N,Y as O}from"./vendor-1a5a643c.js";function P(l){let s,t,e,r,m;return{c(){s=n("img"),this.h()},l(l){s=c(l,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){o(s,"class","object-none object-center h-full"),i(s.src,t=l[1])||o(s,"src",t),o(s,"alt","Esikatselukuva")},m(l,t){a(l,s,t),m=!0},p(l,e){(!m||2&e&&!i(s.src,t=l[1]))&&o(s,"src",t)},i(l){m||(h((()=>{r&&r.end(1),e=u(s,d,{duration:300}),e.start()})),m=!0)},o(l){e&&e.invalidate(),r=f(s,d,{duration:100}),m=!1},d(l){l&&p(s),l&&r&&r.end()}}}function S(l){let s,t,n=l[1]&&P(l);return{c(){n&&n.c(),s=e()},l(l){n&&n.l(l),s=e()},m(l,e){n&&n.m(l,e),a(l,s,e),t=!0},p(l,t){l[1]?n?(n.p(l,t),2&t&&r(n,1)):(n=P(l),n.c(),r(n,1),n.m(s.parentNode,s)):n&&(m(),$(n,1,1,(()=>{n=null})),g())},i(l){t||(r(n),t=!0)},o(l){$(n),t=!1},d(l){n&&n.d(l),l&&p(s)}}}function T(l){let s,t,e,r;return{c(){s=n("img"),this.h()},l(l){s=c(l,"IMG",{class:!0,style:!0}),this.h()},h(){o(s,"class","absolute top-0 hidden opacity-0"),v(s,"width","0px"),v(s,"height","0px")},m(n,c){a(n,s,c),e||(r=x(t=l[4].call(null,s,{src:l[2]})),e=!0)},p(l,s){t&&w(t.update)&&4&s&&t.update.call(null,{src:l[2]})},d(l){l&&p(s),e=!1,r()}}}function W(l){let s,t;return{c(){s=n("div"),t=V(" "),this.h()},l(l){s=c(l,"DIV",{class:!0});var e=E(s);t=b(e," "),e.forEach(p),this.h()},h(){o(s,"class","self-end")},m(l,e){a(l,s,e),D(s,t)},p:y,d(l){l&&p(s)}}}function Y(l){let s,t;return{c(){s=n("div"),t=V(l[0]),this.h()},l(e){s=c(e,"DIV",{class:!0});var a=E(s);t=b(a,l[0]),a.forEach(p),this.h()},h(){o(s,"class","self-end")},m(l,e){a(l,s,e),D(s,t)},p(l,s){1&s&&j(t,l[0])},d(l){l&&p(s)}}}function q(l){let s,e,i,h,u,d,f,v,x=l[3],w=S(l),V=l[2]&&T(l);function b(l,s){return l[1]&&l[0]?Y:W}let j=b(l),R=j(l);return{c(){s=n("div"),e=n("div"),i=n("div"),w.c(),h=I(),V&&V.c(),u=I(),d=n("div"),f=n("div"),R.c(),this.h()},l(l){s=c(l,"DIV",{class:!0});var t=E(s);e=c(t,"DIV",{class:!0});var a=E(e);i=c(a,"DIV",{class:!0});var r=E(i);w.l(r),h=U(r),V&&V.l(r),r.forEach(p),a.forEach(p),u=U(t),d=c(t,"DIV",{class:!0});var n=E(d);f=c(n,"DIV",{class:!0});var o=E(f);R.l(o),o.forEach(p),n.forEach(p),t.forEach(p),this.h()},h(){o(i,"class","overflow-hidden h-full"),o(e,"class","rounded-sm aspect-w-5 aspect-h-4 h-full"),o(f,"class","text-center line-clamp-2 text-gray-200 text-center text-xs overflow-ellipsis group-hover:text-white"),o(d,"class","py-2 px-3"),o(s,"class","bg-gray-800")},m(l,t){a(l,s,t),D(s,e),D(e,i),w.m(i,null),D(i,h),V&&V.m(i,null),D(s,u),D(s,d),D(d,f),R.m(f,null),v=!0},p(l,[s]){8&s&&t(x,x=l[3])?(m(),$(w,1,1,y),g(),w=S(l),w.c(),r(w),w.m(i,h)):w.p(l,s),l[2]?V?V.p(l,s):(V=T(l),V.c(),V.m(i,null)):V&&(V.d(1),V=null),j===(j=b(l))&&R?R.p(l,s):(R.d(1),R=j(l),R&&(R.c(),R.m(f,null)))},i(l){v||(r(w),v=!0)},o(l){$(w),v=!1},d(l){l&&p(s),w.d(l),V&&V.d(),R.d()}}}function z(l,s,t){let{imageUrl:e=""}=s,{title:a}=s;const r=l=>`https://api.finna.fi${l}&w=300`;let n,c,o=!1;return l.$$set=l=>{"imageUrl"in l&&t(5,e=l.imageUrl),"title"in l&&t(0,a=l.title)},l.$$.update=()=>{32&l.$$.dirty&&t(2,c=e)},[a,n,c,o,(l,s)=>{const e=new Image;return e.onload=()=>{t(1,n=r(s.src)),t(2,c=null),t(3,o=!o)},t(1,n=null),e.src=r(s.src),{destroy(){}}},e]}class F extends l{constructor(l){super(),s(this,l,z,q,t,{imageUrl:5,title:0})}}function H(l){let s,t;const e=l[2].default,i=R(e,l,l[1],null);return{c(){s=n("li"),i&&i.c(),this.h()},l(l){s=c(l,"LI",{class:!0});var t=E(s);i&&i.l(t),t.forEach(p),this.h()},h(){o(s,"class","px-1 mt-2 w-1/2 sm:w-1/3 md:w-1/4 h-full flex flex-col group"),k(s,"cursor-pointer",!l[0])},m(l,e){a(l,s,e),i&&i.m(s,null),t=!0},p(l,[a]){i&&i.p&&(!t||2&a)&&C(i,e,l,l[1],t?L(e,l[1],a,null):G(l[1]),null),1&a&&k(s,"cursor-pointer",!l[0])},i(l){t||(r(i,l),t=!0)},o(l){$(i,l),t=!1},d(l){l&&p(s),i&&i.d(l)}}}function J(l,s,t){let{$$slots:e={},$$scope:a}=s,{placeholder:r=!1}=s;return l.$$set=l=>{"placeholder"in l&&t(0,r=l.placeholder),"$$scope"in l&&t(1,a=l.$$scope)},[r,a,e]}class K extends l{constructor(l){super(),s(this,l,J,H,t,{placeholder:0})}}function Q(l,s,t){const e=l.slice();return e[1]=s[t],e}function X(l){var s;let t,e,i,h,u;return e=new F({props:{imageUrl:(null==(s=l[1])?void 0:s.images)&&l[1].images[0]||void 0,title:l[1].title}}),{c(){t=n("a"),M(e.$$.fragment),h=I(),this.h()},l(l){t=c(l,"A",{class:!0,href:!0});var s=E(t);A(e.$$.fragment,s),s.forEach(p),h=U(l),this.h()},h(){o(t,"class","flex flex-col"),o(t,"href",i=`/view/${encodeURIComponent(l[1].id)}`)},m(l,s){a(l,t,s),B(e,t,null),a(l,h,s),u=!0},p(l,s){var a;const r={};1&s&&(r.imageUrl=(null==(a=l[1])?void 0:a.images)&&l[1].images[0]||void 0),1&s&&(r.title=l[1].title),e.$set(r),(!u||1&s&&i!==(i=`/view/${encodeURIComponent(l[1].id)}`))&&o(t,"href",i)},i(l){u||(r(e.$$.fragment,l),u=!0)},o(l){$(e.$$.fragment,l),u=!1},d(l){l&&p(t),N(e),l&&p(h)}}}function Z(l){let s,t;return s=new K({props:{$$slots:{default:[X]},$$scope:{ctx:l}}}),{c(){M(s.$$.fragment)},l(l){A(s.$$.fragment,l)},m(l,e){B(s,l,e),t=!0},p(l,t){const e={};17&t&&(e.$$scope={dirty:t,ctx:l}),s.$set(e)},i(l){t||(r(s.$$.fragment,l),t=!0)},o(l){$(s.$$.fragment,l),t=!1},d(l){N(s,l)}}}function _(l){let s,t,e,i=l[0],h=[];for(let a=0;a<i.length;a+=1)h[a]=Z(Q(l,i,a));const u=l=>$(h[l],1,1,(()=>{h[l]=null}));return{c(){s=n("div"),t=n("ul");for(let l=0;l<h.length;l+=1)h[l].c();this.h()},l(l){s=c(l,"DIV",{});var e=E(s);t=c(e,"UL",{class:!0});var a=E(t);for(let s=0;s<h.length;s+=1)h[s].l(a);a.forEach(p),e.forEach(p),this.h()},h(){o(t,"class","flex flex-row flex-wrap overflow-hidden.")},m(l,r){a(l,s,r),D(s,t);for(let s=0;s<h.length;s+=1)h[s].m(t,null);e=!0},p(l,[s]){if(1&s){let e;for(i=l[0],e=0;e<i.length;e+=1){const a=Q(l,i,e);h[e]?(h[e].p(a,s),r(h[e],1)):(h[e]=Z(a),h[e].c(),r(h[e],1),h[e].m(t,null))}for(m(),e=i.length;e<h.length;e+=1)u(e);g()}},i(l){if(!e){for(let l=0;l<i.length;l+=1)r(h[l]);e=!0}},o(l){h=h.filter(Boolean);for(let s=0;s<h.length;s+=1)$(h[s]);e=!1},d(l){l&&p(s),O(h,l)}}}function ll(l,s,t){let{records:e=[]}=s;return l.$$set=l=>{"records"in l&&t(0,e=l.records)},[e]}class sl extends l{constructor(l){super(),s(this,l,ll,_,t,{records:0})}}export{sl as R};