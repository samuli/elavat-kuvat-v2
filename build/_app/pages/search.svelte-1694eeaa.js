import{S as s,i as t,s as o,k as e,l as r,Q as a,d as n,n as c,f as u,u as i,w as l,x as d,H as f,r as p,j as m,m as g,o as k,v as h,e as $,t as j,c as C,a as P,g as v,D as b,E as x}from"../chunks/vendor-de530dcf.js";import{R as y}from"../chunks/index-4144c977.js";import{s as E,l as w,a as H,c as S}from"../chunks/util-d79d52b9.js";import{s as q,t as N}from"../chunks/api-d72cf0fe.js";import{n as D}from"../chunks/navigationState-2f35a129.js";import"../chunks/navigation-51f4a605.js";import"../chunks/singletons-12a22614.js";import"../chunks/SearchHeading-22de2d8e.js";import"../chunks/index-4a6bec82.js";function Q(s){let t,o;return t=new y({props:{lookfor:s[4],resultPage:s[3],resultCount:s[2],records:s[1],topics:s[0],heading:"Haku: "}}),{c(){m(t.$$.fragment)},l(s){g(t.$$.fragment,s)},m(s,e){k(t,s,e),o=!0},p(s,o){const e={};16&o&&(e.lookfor=s[4]),8&o&&(e.resultPage=s[3]),4&o&&(e.resultCount=s[2]),2&o&&(e.records=s[1]),1&o&&(e.topics=s[0]),t.$set(e)},i(s){o||(d(t.$$.fragment,s),o=!0)},o(s){i(t.$$.fragment,s),o=!1},d(s){h(t,s)}}}function R(s){let t,o;return{c(){t=$("p"),o=j("Ei tuloksia...")},l(s){t=C(s,"P",{});var e=P(t);o=v(e,"Ei tuloksia..."),e.forEach(n)},m(s,e){u(s,t,e),b(t,o)},p:x,i:x,o:x,d(s){s&&n(t)}}}function z(s){let t,o,f,m,g,k;document.title=t=s[4]+" | "+H;const h=[R,Q],$=[];function j(s,t){return s[5]||0!==s[1].length?1:0}return f=j(s),m=$[f]=h[f](s),{c(){o=e(),m.c(),g=r()},l(s){a('[data-svelte="svelte-b29k8i"]',document.head).forEach(n),o=c(s),m.l(s),g=r()},m(s,t){u(s,o,t),$[f].m(s,t),u(s,g,t),k=!0},p(s,[o]){(!k||16&o)&&t!==(t=s[4]+" | "+H)&&(document.title=t);let e=f;f=j(s),f===e?$[f].p(s,o):(p(),i($[e],1,1,(()=>{$[e]=null})),l(),m=$[f],m?m.p(s,o):(m=$[f]=h[f](s),m.c()),d(m,1),m.m(g.parentNode,g))},i(s){k||(d(m),k=!0)},o(s){i(m),k=!1},d(s){s&&n(o),$[f].d(s),s&&n(g)}}}const A=async({fetch:s,page:t})=>{const o=t.query.get("lookfor"),e=Number(t.query.get("page")||1),r=q(o,e),a=E(s,r),[{records:n,resultCount:c}]=await w([a]);return{props:{lookfor:o,records:n,resultCount:c,resultPage:e}}};function B(s,t,o){let{records:e=[]}=t,{resultCount:r=0}=t,{topics:a=[]}=t,{resultPage:n}=t,{lookfor:c=""}=t,u=!1;const i=D.subscribe((s=>{o(5,u="loading"===s)}));return f((()=>{i()})),s.$$set=s=>{"records"in s&&o(1,e=s.records),"resultCount"in s&&o(2,r=s.resultCount),"topics"in s&&o(0,a=s.topics),"resultPage"in s&&o(3,n=s.resultPage),"lookfor"in s&&o(4,c=s.lookfor)},s.$$.update=()=>{if(16&s.$$.dirty){const s=N(c),t=S(fetch,"topic",s);(async()=>{const[s]=await w([t]);o(0,a=s)})()}},[a,e,r,n,c,u]}class F extends s{constructor(s){super(),t(this,s,B,z,o,{records:1,resultCount:2,topics:0,resultPage:3,lookfor:4})}}export{F as default,A as load};