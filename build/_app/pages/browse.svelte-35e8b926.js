import{C as s,a8 as t,S as e,i as a,s as r,k as o,j as c,Q as i,d as l,n,m as u,f as p,o as d,x as m,u as g,v as f}from"../chunks/vendor-de530dcf.js";import{s as h,t as $}from"../chunks/api-d72cf0fe.js";import{s as k,l as j,a as C,c as b}from"../chunks/util-d79d52b9.js";import{R as v}from"../chunks/index-4144c977.js";import"../chunks/navigation-51f4a605.js";import"../chunks/singletons-12a22614.js";import"../chunks/SearchHeading-22de2d8e.js";import"../chunks/index-4a6bec82.js";var P=s(null);function x(s){let t,e,a,r;return document.title=t=s[4]+" | "+C,a=new v({props:{resultPage:s[3],resultCount:s[2],records:s[1],heading:s[4],topics:s[0]}}),{c(){e=o(),c(a.$$.fragment)},l(s){i('[data-svelte="svelte-cpjbv6"]',document.head).forEach(l),e=n(s),u(a.$$.fragment,s)},m(s,t){p(s,e,t),d(a,s,t),r=!0},p(s,[e]){(!r||16&e)&&t!==(t=s[4]+" | "+C)&&(document.title=t);const o={};8&e&&(o.resultPage=s[3]),4&e&&(o.resultCount=s[2]),2&e&&(o.records=s[1]),16&e&&(o.heading=s[4]),1&e&&(o.topics=s[0]),a.$set(o)},i(s){r||(m(a.$$.fragment,s),r=!0)},o(s){g(a.$$.fragment,s),r=!1},d(s){s&&l(e),f(a,s)}}}const y=async({fetch:s,page:e})=>{const[a,r]=e.query.get("facet").split(":"),o=Number(e.query.get("page")||1);let c="",i="",l="",n=[];switch(a){case"topic":i=h("",o,r),c=$("",r,null),l="Aihe";break;case"genre":i=h("",o,null,r),c=$("",null,r),l="Genre";break;case"date":let s=r.split("-").map((s=>"*"===s?s:Number(s)));i=h("",o,null,null,s),c=$("",null,null,s),l="Aikakausi";break;case"clips":i=h("",o),c=$(""),l="Selaa elokuvia"}let u="clips"!==a?`${l}: ${r}`:l;const p=t(P);let d=!0;p&&p.url===c&&(d=!1,n=p.topics);const m=k(s,i),[{records:g,resultCount:f}]=await j([m]);return{props:{records:g,resultCount:f,resultPage:o,heading:l,title:u,topicsUrl:c,loadTopics:d,topics:n}}};function T(s,t,e){let{records:a=[]}=t,{resultCount:r=0}=t,{topics:o=[]}=t,{resultPage:c}=t,{title:i}=t,{loadTopics:l}=t,{topicsUrl:n}=t;return s.$$set=s=>{"records"in s&&e(1,a=s.records),"resultCount"in s&&e(2,r=s.resultCount),"topics"in s&&e(0,o=s.topics),"resultPage"in s&&e(3,c=s.resultPage),"title"in s&&e(4,i=s.title),"loadTopics"in s&&e(5,l=s.loadTopics),"topicsUrl"in s&&e(6,n=s.topicsUrl)},s.$$.update=()=>{if(97&s.$$.dirty&&l){P.set({url:n,topics:[]}),e(0,o=[]);const s=b(fetch,"topic",n),t=async()=>{const[t]=await j([s]);e(0,o=t),P.set({url:n,topics:o})};e(5,l=!1),t()}},[o,a,r,c,i,l,n]}class U extends e{constructor(s){super(),a(this,s,T,x,r,{records:1,resultCount:2,topics:0,resultPage:3,title:4,loadTopics:5,topicsUrl:6})}}export{U as default,y as load};