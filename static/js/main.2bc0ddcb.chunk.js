(this["webpackJsonpfpa-aperry-6731160"]=this["webpackJsonpfpa-aperry-6731160"]||[]).push([[0],{28:function(e,t,c){},33:function(e,t,c){},34:function(e,t,c){},53:function(e,t,c){},54:function(e,t,c){"use strict";c.r(t);var s=c(2),a=c.n(s),i=c(21),n=c.n(i),r=(c(28),c(6)),l=c(4),d=c(3),o=(c(33),c(23)),j=(c(34),c(22)),b=c.n(j),u=c(0),m=function(e){var t=e.notifyAddFavorite,c=Object(s.useState)(null),a=Object(r.a)(c,2),i=a[0],n=a[1],j=Object(s.useState)(""),m=Object(r.a)(j,2),h=m[0],O=m[1],p=Object(s.useState)("?limit=10"),x=Object(r.a)(p,2),v=x[0],f=x[1],N=Object(s.useRef)(null),g=function(e){var t=e.target,c=t.value;switch(t.id){case"subreddit":O(c);break;case"limit-10":f("?limit=10");break;case"limit-50":f("?limit=50");break;case"limit-100":f("?limit=100")}};return Object(u.jsxs)("div",{className:"search-and-display",children:[Object(u.jsx)("div",{className:"search-group",children:Object(u.jsxs)("form",{onSubmit:function(e){e.preventDefault(),b.a.get("https://www.reddit.com/r/".concat(h,"/hot.json").concat(v)).then((function(e){var t=e.data.data.children;n(t)})).catch((function(e){alert("No subreddit found with that name. Try again."),O(""),N.current.focus()}))},children:[Object(u.jsx)("div",{className:"radios-group",children:Object(u.jsxs)("div",{className:"radios",children:[Object(u.jsx)("input",{type:"radio",id:"limit-10",name:"search-limit",value:"limit-10",defaultChecked:!0,onClick:g}),Object(u.jsx)("label",{htmlFor:"limit-10",children:"10"}),Object(u.jsx)("input",{type:"radio",id:"limit-50",name:"search-limit",value:"limit-50",onClick:g}),Object(u.jsx)("label",{htmlFor:"limit-50",children:"50"}),Object(u.jsx)("input",{type:"radio",id:"limit-100",name:"search-limit",value:"limit-50",onClick:g}),Object(u.jsx)("label",{htmlFor:"limit-100",children:"100"})]})}),Object(u.jsx)("input",{ref:function(e){return N.current=e},id:"subreddit",name:"subreddit",type:"text",value:h,onChange:g,placeholder:"Search",autoFocus:!0,required:!0}),Object(u.jsx)("button",{type:"submit",children:Object(u.jsx)(d.a,{icon:l.f,className:"faicon"})})]})}),i?Object(u.jsx)("div",{className:"content",children:Object(u.jsx)("div",{className:"grid-item",children:Object(u.jsx)("div",{className:"results-list",children:i.map((function(e,c){return Object(u.jsxs)("div",{className:"favorite-item",children:[Object(u.jsxs)("div",{className:"options-wrapper",children:[Object(u.jsx)("button",{onClick:function(){return function(e,c,s,a,r,l,d){localStorage.setItem(c,JSON.stringify({name:c,title:a,score:s,subreddit:r,author:l,thumbnail:d})),t(),i.splice(e,1),n(Object(o.a)(i))}(c,e.data.name.split("_")[1],e.data.score,e.data.title,e.data.subreddit,e.data.author,e.data.thumbnail)},children:Object(u.jsx)(d.a,{icon:l.e,className:"faicon"})}),Object(u.jsx)("button",{children:Object(u.jsx)("a",{href:"https://www.reddit.com/r/".concat(e.data.subreddit,"/comments/").concat(e.data.name),target:"_blank",rel:"noreferrer",children:Object(u.jsx)(d.a,{icon:l.d,className:"faicon"})})})]}),Object(u.jsxs)("div",{className:"post-details",children:[Object(u.jsxs)("div",{className:"post-subreddit grid-item",children:[Object(u.jsx)("span",{children:"r/ "}),e.data.subreddit]}),Object(u.jsxs)("div",{className:"post-author grid-item",children:[Object(u.jsx)("span",{children:"op "})," ",e.data.author]}),Object(u.jsxs)("div",{className:"post-stars grid-item",children:[Object(u.jsx)(d.a,{icon:l.b,className:"faicon"})," ",e.data.score]}),Object(u.jsx)("div",{className:"post-title",children:e.data.title})]})]},c)}))})})}):Object(u.jsx)("div",{className:"no-results-yet",children:"Go head, search for your favorite subreddit."})]})},h=(c(53),function(e){var t=e.update,c=Object(s.useState)(new Array(0)),a=Object(r.a)(c,2),i=a[0],n=a[1],o=Object(s.useState)("date"),j=Object(r.a)(o,2),b=j[0],m=j[1],h=function(){for(var e=[],t=Object.keys(localStorage),c=t.length;c--;)e.push(JSON.parse(localStorage.getItem(t[c])));n(e)};Object(s.useEffect)((function(){h()}),[t]);var O=function(e){switch(e.target.name){case"date":h(),m("date");break;case"upvote-desc":i.sort((function(e,t){return t.score-e.score})),n(i),m("upvote-desc");break;case"upvote-asc":i.sort((function(e,t){return e.score-t.score})),n(i),m("upvote-asc")}};return Object(u.jsxs)("div",{className:"show-favorites",children:[Object(u.jsxs)("div",{className:"sort-options",children:[Object(u.jsx)("div",{className:"title",children:"Saved Posts"}),Object(u.jsxs)("div",{className:"buttons",children:[Object(u.jsx)("span",{className:"tiny-title",children:"sort:"}),Object(u.jsx)("button",{name:"date",className:"date"===b?"selected":"",onClick:O,children:Object(u.jsx)(d.a,{icon:l.c,className:"faicon"})}),Object(u.jsx)("button",{name:"upvote-desc",className:"upvote-desc"===b?"selected":"",onClick:O,children:Object(u.jsx)(d.a,{icon:l.b,className:"faicon"})}),Object(u.jsx)("button",{name:"upvote-asc",className:"upvote-asc"===b?"selected":"",onClick:O,children:Object(u.jsx)(d.a,{icon:l.a,className:"faicon"})})]})]}),i.length?Object(u.jsx)("div",{className:"content",children:Object(u.jsx)("div",{className:"grid-item",children:Object(u.jsx)("div",{className:"results-list",children:i.map((function(e,t){return Object(u.jsxs)("div",{className:"favorite-item",children:[Object(u.jsxs)("div",{className:"options-wrapper",children:[Object(u.jsx)("button",{onClick:function(){return t=e.name,localStorage.removeItem(t),void h();var t},children:Object(u.jsx)(d.a,{icon:l.g,className:"faicon"})}),Object(u.jsx)("button",{children:Object(u.jsx)("a",{href:"https://www.reddit.com/r/".concat(e.subreddit,"/comments/").concat(e.name),target:"_blank",rel:"noreferrer",children:Object(u.jsx)(d.a,{icon:l.d,className:"faicon"})})})]}),Object(u.jsxs)("div",{className:"post-details",children:[Object(u.jsxs)("div",{className:"post-subreddit grid-item",children:[Object(u.jsx)("span",{children:"r/ "}),e.subreddit]}),Object(u.jsxs)("div",{className:"post-author grid-item",children:[Object(u.jsx)("span",{children:"op "})," ",e.author]}),Object(u.jsxs)("div",{className:"post-stars grid-item",children:[Object(u.jsx)(d.a,{icon:l.b,className:"faicon"})," ",e.score]}),Object(u.jsx)("div",{className:"post-title",children:e.title})]})]},t)}))})})}):Object(u.jsx)("div",{className:"no-results-yet",children:"Try favoriting a post! They will show up here."})]})});var O=function(){var e=Object(s.useState)(!1),t=Object(r.a)(e,2),c=t[0],a=t[1];return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("header",{className:"App-header",children:Object(u.jsxs)("div",{children:[Object(u.jsx)(d.a,{icon:l.e,className:"faicon"})," ",Object(u.jsx)("span",{children:"Reddit"})]})}),Object(u.jsxs)("section",{className:"App-content",children:[Object(u.jsx)(m,{notifyAddFavorite:function(){a(!c)}}),Object(u.jsx)(h,{update:c})]})]})},p=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,55)).then((function(t){var c=t.getCLS,s=t.getFID,a=t.getFCP,i=t.getLCP,n=t.getTTFB;c(e),s(e),a(e),i(e),n(e)}))};n.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(O,{})}),document.getElementById("root")),p()}},[[54,1,2]]]);
//# sourceMappingURL=main.2bc0ddcb.chunk.js.map