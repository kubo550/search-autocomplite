(this["webpackJsonpsearch-autocomplite"]=this["webpackJsonpsearch-autocomplite"]||[]).push([[0],{10:function(e,t,n){e.exports={search_list:"AutocompleteList_search_list__uGYHS",no_result:"AutocompleteList_no_result__2BVWM",list_element:"AutocompleteList_list_element__8qgfn"}},14:function(e,t,n){e.exports={container:"Error_container__1AtNj",img:"Error_img__2A_an"}},25:function(e,t,n){e.exports={search_container:"SearchAutocomplete_search_container__1MphT"}},26:function(e,t,n){e.exports={submit_btn:"SubmitSearchBtn_submit_btn__32VYl"}},27:function(e,t,n){e.exports={button:"Button_button__2x89E"}},28:function(e,t,n){e.exports={search_input:"Input_search_input__lpAlK"}},35:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"fetchUsers",(function(){return j})),n.d(r,"fetchUsersRequest",(function(){return _})),n.d(r,"fetchUsersSuccess",(function(){return h})),n.d(r,"fetchUsersFailure",(function(){return m}));var c,a=n(0),o=n.n(a),u=n(7),s=n.n(u),i=(n(35),n(3)),l=n(6),d=n(24),f=n.n(d);!function(e){e.FETCH_USERS_REQUEST="FETCH_USERS_REQUEST",e.FETCH_USERS_SUCCESS="FETCH_USERS_SUCCESS",e.FETCH_USERS_FAIL="FETCH_USERS_FAIL"}(c||(c={}));var b=c,j=function(){return function(e){e(_()),f.a.get("https://jsonplaceholder.typicode.com/users").then((function(t){var n=t.data;e(h(n))})).catch((function(t){e(m(t.message))}))}},_=function(){return{type:b.FETCH_USERS_REQUEST}},h=function(e){return{type:b.FETCH_USERS_SUCCESS,payload:e}},m=function(e){return{type:b.FETCH_USERS_FAIL,payload:e}},O=n(15),p={loading:!0,users:[],error:null},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.FETCH_USERS_REQUEST:return Object(O.a)(Object(O.a)({},e),{},{loading:!0});case b.FETCH_USERS_SUCCESS:return{loading:!1,users:t.payload,error:null};case b.FETCH_USERS_FAIL:return{loading:!1,users:[],error:t.payload};default:return e}},E=Object(i.c)({user:S}),g=n(9),v=n.n(g),x=n(1),C=function(){return Object(x.jsxs)("div",{className:v.a.container,children:[Object(x.jsx)("div",{className:v.a.loader,children:Object(x.jsx)("span",{})}),Object(x.jsx)("p",{className:v.a.loading_text,children:"Loading..."})]})},U=n(14),T=n.n(U),y=n.p+"static/media/error.532ea75d.svg",R=function(){document.location.reload()},k=function(e){var t=e.error;return Object(x.jsxs)("div",{className:T.a.container,children:[Object(x.jsx)("h3",{children:" Sorry, We have an error. Please try again later."}),Object(x.jsxs)("p",{children:[" ",t," "]}),Object(x.jsx)("button",{onClick:R,children:" Refresh "}),Object(x.jsx)("img",{src:y,className:T.a.img,alt:"Error"})]})},L=n(4),F=n(25),N=n.n(F),w=n(30),A=function(e){var t=Object(w.a)(e),n=["\\","[","]","*"];return t.some((function(e){return n.includes(e)}))},H=function(e,t){if(e.current){var n=e.current.childNodes[t];e.current.scrollTo(0,n.offsetTop)}},I=function(e){return{__html:e}},B=function(e,t){if(!t)return I(e);var n=new RegExp(t,"i"),r=e.replace(n,(function(e){return"<b>".concat(e,"</b>")}));return I(r)},M=function(e){var t=e.data,n=Object(a.useState)(""),r=Object(L.a)(n,2),c=r[0],o=r[1],u=Object(a.useState)(!1),s=Object(L.a)(u,2),i=s[0],l=s[1],d=Object(a.useState)(!0),f=Object(L.a)(d,2),b=f[0],j=f[1],_=Object(a.useState)(null),h=Object(L.a)(_,2),m=h[0],O=h[1],p=Object(a.useRef)(null),S=b?"name":"username",E=new RegExp(c,"gi"),g=t.filter((function(e){return E.test(e[S])})),v=Object(a.useCallback)((function(){j((function(e){return!e})),o("")}),[]),C=Object(a.useCallback)((function(e){var t=g.length;if(t)switch(e.key){case"ArrowUp":m?(H(p,m-1),O((function(e){return e-1}))):(O(t-1),H(p,t-1));break;case"ArrowDown":null===m||m===t-1?(O(0),H(p,0)):(H(p,m+1),O((function(e){return null!==e?e+1:0})));break;case"Enter":if(null===m||m>=t)return;o(g[m][S]),l(!1),document.activeElement.blur();break;default:return}}),[m,g,S]);Object(a.useEffect)((function(){return i?document.addEventListener("keydown",C):O(null),function(){return document.removeEventListener("keydown",C)}}),[i,C,m,g,S]);return Object(x.jsxs)("div",{className:N.a.search_container,children:[Object(x.jsxs)(V,{onClick:v,children:["By ",S]}),Object(x.jsx)(W,{searchingText:c,onChange:function(e){var t=e.target.value;A(t)||("/"!==t&&o(t),O(null),l(!0))},togglePopup:function(e){return l(e)},onBlur:function(){return null!==m&&o(g[m][S])},resetInput:function(){return o("")}}),i&&Object(x.jsx)(z,{searchingText:c,mouseLeave:function(){O(null),H(p,0)},list:g,ref:p,curIdx:m,dataKey:S,mouseEnter:function(e){return O(e)}})]})},P=n(26),Q=n.n(P),Y=Object(a.memo)((function(){return Object(x.jsx)("button",{className:Q.a.submit_btn,title:"Search","aria-label":"Search",children:Object(x.jsx)("i",{className:"fas fa-search"})})})),q=n(27),K=n.n(q),V=Object(a.memo)((function(e){var t=e.children,n=e.onClick;return Object(x.jsx)("button",{className:K.a.button,onClick:n,title:"Toggle searching value","aria-label":"Toggle searching value",children:t})})),D=n(28),J=n.n(D),W=function(e){var t=e.searchingText,n=e.onChange,r=e.togglePopup,c=e.onBlur,o=e.resetInput,u=Object(a.useState)(!1),s=Object(L.a)(u,2),i=s[0],l=s[1],d=Object(a.useRef)(null);Object(a.useEffect)((function(){var e=function(e){var t,n;"/"===e.key&&(null===(t=d.current)||void 0===t||t.focus(),null===(n=d.current)||void 0===n||n.click(),o())};return document.addEventListener("keydown",e),function(){return document.removeEventListener("keydown",e)}}),[o]);var f=Object(a.useCallback)((function(){r(!0),l(!0)}),[r]),b=Object(a.useCallback)((function(){c(),r(!1),l(!1)}),[c,r]);return Object(x.jsx)("input",{type:"search",placeholder:i?"Search For Users":'Press "/" to focus',"aria-label":"Search",className:J.a.search_input,ref:d,value:t,onChange:n,onFocus:f,onClick:f,onBlur:b})},G=n(10),X=n.n(G),z=Object(a.forwardRef)((function(e,t){var n=e.list,r=e.curIdx,c=e.mouseEnter,a=e.dataKey,o=e.searchingText,u=e.mouseLeave;return Object(x.jsxs)("div",{ref:t,className:X.a.search_list,style:{overflowY:n.length>3?"scroll":"auto"},onMouseLeave:u,children:[n.map((function(e,t){var n=t===r,u=n?"#cc98c7":"#BC7DB6",s=n?"#000":"#424242";return Object(x.jsx)("div",{style:{backgroundColor:u,color:s},className:X.a.list_element,onMouseEnter:function(){return c(t)},children:Object(x.jsx)("div",{dangerouslySetInnerHTML:B(e[a],o)})},e.id)})),0===n.length&&Object(x.jsx)("div",{className:X.a.no_result,children:" No Results "})]})})),Z=function(){var e=Object(l.b)(),t=Object(i.b)(r,e).fetchUsers,n=Object(l.c)((function(e){return e.user})),c=n.error,o=n.users,u=n.loading;if(Object(a.useEffect)((function(){t()}),[]),u)return Object(x.jsx)(C,{});if(c)return Object(x.jsx)(k,{error:c});var s=o.map((function(e){return{id:e.id,name:e.name,username:e.username}}));return Object(x.jsx)("div",{className:"app",children:Object(x.jsxs)("div",{className:"search-container",children:[Object(x.jsx)(M,{data:s}),Object(x.jsx)(Y,{})]})})},$=n(29),ee=Object(i.d)(E,{},Object(i.a)($.a));s.a.render(Object(x.jsx)(o.a.StrictMode,{children:Object(x.jsx)(l.a,{store:ee,children:Object(x.jsx)(Z,{})})}),document.getElementById("root"))},9:function(e,t,n){e.exports={container:"Loading_container__ifAg_",loader:"Loading_loader__1UNbf",animate:"Loading_animate__2qxPQ",loading_text:"Loading_loading_text__9XYnV"}}},[[59,1,2]]]);
//# sourceMappingURL=main.c1e7aec2.chunk.js.map