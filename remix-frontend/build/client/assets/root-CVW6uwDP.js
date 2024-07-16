import{u as m,y as d,z as f,A as g,r as i,_ as w,x as e,O as x,M as S,L as j,S as k}from"./components-4ka__UO6.js";/**
 * @remix-run/react v2.9.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function M({getKey:t,...l}){let{isSpaMode:c}=m(),r=d(),u=f();g({getKey:t,storageKey:a});let p=i.useMemo(()=>{if(!t)return null;let s=t(r,u);return s!==r.key?s:null},[]);if(c)return null;let h=((s,y)=>{if(!window.history.state||!window.history.state.key){let o=Math.random().toString(32).slice(2);window.history.replaceState({key:o},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[y||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(o){console.error(o),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",w({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${h})(${JSON.stringify(a)}, ${JSON.stringify(p)})`}}))}function L({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(S,{}),e.jsx(j,{})]}),e.jsxs("body",{children:[t,e.jsx(M,{}),e.jsx(k,{})]})]})}function I(){return e.jsx(x,{})}const R=()=>[{rel:"preconnect",href:"fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"preconnect",href:"fonts.googleapis.com"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"}];export{L as Layout,I as default,R as links};
