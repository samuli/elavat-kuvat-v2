var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,n=(t,a,o)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[a]=o;"undefined"!=typeof require&&require;const c="https://api.finna.fi/api/v1",s=20,f=(e,t)=>`filter[]=${e}:${encodeURIComponent(t)}`,p=e=>{e=e||[1900,"*"];const t=["free_online_boolean:1","datasource_str_mv:kavi","~format_ext_str_mv:1/Video/Video/","~format_ext_str_mv:1/Video/Short/","-id:kavi.elonet_elokuva_1611548","-genre_facet:katsaus"];return t.push(`search_daterange_mv:"[${e[0]} TO ${e[1]}]"`),t.map((e=>`filter[]=${encodeURIComponent(e)}`)).join("&")},l=(e,t)=>{const a=["title","id","images","urls"].map((e=>`field[]=${e}`)).join("&");return`${c}/search?lookfor=${encodeURIComponent(e)}&${p()}&${a}&limit=${t}`},_=(e,t=1,a,o,r,i=20,n=["title","id","images","urls"])=>{const s=p(r)+(a?`&filter[]=topic_facet:${encodeURIComponent(a)}`:"")+(o?`&filter[]=genre_facet:${encodeURIComponent(o)}`:""),f=n.map((e=>`field[]=${e}`)).join("&");return`${c}/search?lookfor=${encodeURIComponent(e)}&${s}&${f}&limit=${i}&page=${t}`},m=()=>{const e=[["genre_facet","mainos"],["genre_facet","animaatio"],["genre_facet","tv-tuotanto"],["genre_facet","opetuselokuva"],["genre_facet","henkilödokumentti"],["genre_facet","ammatinkuvaus"],["genre_facet","draamadokumentti"],["genre_facet","teollisuusdokumentti"],["topic_facet","henkilöautot"],["topic_facet","tehtaat"],["topic_facet","matkailu"],["topic_facet","pankit"],["topic_facet","maisema"],["topic_facet","muoti"],["topic_facet","kahvi"],["topic_facet","kaupungit"],["topic_facet","virvoitusjuomat"],["topic_facet","hygienia"],["topic_facet","elintarvikkeet"],["topic_facet","ruoanvalmistus"],["topic_facet","maatalous"],["topic_facet","myymälät"],["topic_facet","rakennukset"],["search_daterange_mv","[1950 TO 1959]"],["search_daterange_mv","[1960 TO 1969]"],["search_daterange_mv","[1970 TO 1979]"],["search_daterange_mv","[1980 TO 2000]"]],t=e[Math.floor(Math.random()*e.length)],a=p()+"&"+f(t[0],t[1]),o=["title","id","images","urls"].map((e=>`field[]=${e}`)).join("&");return`${c}/search?${a}&${o}&limit=20&sort=first_indexed%20desc`},u=(e,t,a,o,r)=>{const i=p(o)+(t?`&${f("topic_facet",t)}`:"")+(a?`&${f("genre_facet",a)}`:""),n=`facet[]=${e}`;return`${c}/search?lookfor=${r?encodeURIComponent(r):""}&${i}&${n}&limit=0`},d=(e,t,a,o)=>u("topic_facet",t,a,o,e);u("genre_facet"),u("main_date_str");const $=["title","id","images","urls","recordPage","imageRights","rawData","buildings"],g=e=>{const t=$.map((e=>`field[]=${e}`)).join("&");return`${c}/record?id=${e}&${t}`},v=e=>{if(void 0===e.urls)return[];const c=[];return(e.urls||[]).forEach((e=>{(e.videoSources||[]).forEach((s=>{var f,p;"application/x-mpegURL"===s.type&&c.push((f=((e,t)=>{for(var a in t||(t={}))r.call(t,a)&&n(e,a,t[a]);if(o)for(var a of o(t))i.call(t,a)&&n(e,a,t[a]);return e})({},s),p={title:e.text},t(f,a(p))))}))})),c};export{l as a,v as e,m as f,s as l,g as r,_ as s,d as t};