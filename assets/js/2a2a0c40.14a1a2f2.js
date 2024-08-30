"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[292],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>m});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),u=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||l;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var u=2;u<l;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9365:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(6540),a=n(53);const l="tabItem_Ymn6";function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.A)(l,o),hidden:n},t)}},4865:(e,t,n)=>{n.d(t,{A:()=>m});var r=n(9668),a=n(6540),l=n(53),o=n(2303),s=n(1682),i=n(6976),u=n(723);const c="tabList__CuJ",p="tabItem_LNqP";function d(e){var t;const{lazy:n,block:o,defaultValue:d,values:m,groupId:f,className:b}=e,g=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),v=m??g.map((e=>{let{props:{value:t,label:n,attributes:r}}=e;return{value:t,label:n,attributes:r}})),y=(0,s.X)(v,((e,t)=>e.value===t.value));if(y.length>0)throw new Error(`Docusaurus error: Duplicate values "${y.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const h=null===d?d:d??(null==(t=g.find((e=>e.props.default)))?void 0:t.props.value)??g[0].props.value;if(null!==h&&!v.some((e=>e.value===h)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${h}" but none of its children has the corresponding value. Available values are: ${v.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:w,setTabGroupChoices:O}=(0,i.x)(),[T,E]=(0,a.useState)(h),k=[],{blockElementScrollPositionUntilNextRender:x}=(0,u.a_)();if(null!=f){const e=w[f];null!=e&&e!==T&&v.some((t=>t.value===e))&&E(e)}const N=e=>{const t=e.currentTarget,n=k.indexOf(t),r=v[n].value;r!==T&&(x(t),E(r),null!=f&&O(f,String(r)))},j=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{const t=k.indexOf(e.currentTarget)+1;n=k[t]??k[0];break}case"ArrowLeft":{const t=k.indexOf(e.currentTarget)-1;n=k[t]??k[k.length-1];break}}null==(t=n)||t.focus()};return a.createElement("div",{className:(0,l.A)("tabs-container",c)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":o},b)},v.map((e=>{let{value:t,label:n,attributes:o}=e;return a.createElement("li",(0,r.A)({role:"tab",tabIndex:T===t?0:-1,"aria-selected":T===t,key:t,ref:e=>k.push(e),onKeyDown:j,onFocus:N,onClick:N},o,{className:(0,l.A)("tabs__item",p,null==o?void 0:o.className,{"tabs__item--active":T===t})}),n??t)}))),n?(0,a.cloneElement)(g.filter((e=>e.props.value===T))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},g.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==T})))))}function m(e){const t=(0,o.A)();return a.createElement(d,(0,r.A)({key:String(t)},e))}},4850:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>u,toc:()=>p});var r=n(9668),a=(n(6540),n(5680)),l=n(4865),o=n(9365);const s={title:"Install",slug:"/"},i=void 0,u={unversionedId:"getting-started/install",id:"getting-started/install",title:"Install",description:"Installation is simple. Just run one of the following two commands, depending on whether you\u2019re using Yarn or npm:",source:"@site/docs/getting-started/install.md",sourceDirName:"getting-started",slug:"/",permalink:"/w3c-css-validator/docs/",draft:!1,editUrl:"https://github.com/sparksuite/w3c-css-validator/edit/master/website/docs/getting-started/install.md",tags:[],version:"current",frontMatter:{title:"Install",slug:"/"},sidebar:"default",next:{title:"Import",permalink:"/w3c-css-validator/docs/getting-started/import"}},c={},p=[],d={toc:p};function m(e){let{components:t,...n}=e;return(0,a.yg)("wrapper",(0,r.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"Installation is simple. Just run one of the following two commands, depending on whether you\u2019re using Yarn or npm:"),(0,a.yg)(l.A,{groupId:"package-manager",defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"npm",value:"npm"}],mdxType:"Tabs"},(0,a.yg)(o.A,{value:"yarn",mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"yarn add w3c-css-validator\n"))),(0,a.yg)(o.A,{value:"npm",mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"npm install w3c-css-validator\n")))))}m.isMDXComponent=!0}}]);