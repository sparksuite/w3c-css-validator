"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[100],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>c});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=a.createContext({}),p=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return a.createElement(d.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,d=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=p(n),c=r,k=u["".concat(d,".").concat(c)]||u[c]||m[c]||i;return n?a.createElement(k,l(l({ref:t},s),{},{components:n})):a.createElement(k,l({ref:t},s))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},282:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(3117),r=(n(7294),n(3905));const i={title:"validateURL()"},l=void 0,o={unversionedId:"functions/validate-url",id:"functions/validate-url",title:"validateURL()",description:"This function is used to validate external CSS via a URL.",source:"@site/docs/functions/validate-url.md",sourceDirName:"functions",slug:"/functions/validate-url",permalink:"/w3c-css-validator/docs/functions/validate-url",draft:!1,editUrl:"https://github.com/sparksuite/w3c-css-validator/edit/master/website/docs/functions/validate-url.md",tags:[],version:"current",frontMatter:{title:"validateURL()"},sidebar:"default",previous:{title:"validateText()",permalink:"/w3c-css-validator/docs/functions/validate-text"},next:{title:"Errors vs. warnings",permalink:"/w3c-css-validator/docs/notes/errors-vs-warnings"}},d={},p=[{value:"Options",id:"options",level:2},{value:"Response structure",id:"response-structure",level:2}],s={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This function is used to validate external CSS via a URL."),(0,r.kt)("h2",{id:"options"},"Options"),(0,r.kt)("p",null,"You can customize the behavior with options, passed as the second argument."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Option"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Possible values"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"medium")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"all")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"all"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"braille"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"embossed"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"handheld"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"print"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"projection"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"screen"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"speech"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"tty"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"tv"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"warningLevel")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"0")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"0"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"1"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"2"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"3"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"timeout")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"10000")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"integer"))))),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Option"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Explanation"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"medium")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The equivalent of the ",(0,r.kt)("inlineCode",{parentName:"td"},"@media")," rule, applied to all of the CSS")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"warningLevel")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"0")," means don\u2019t return any warnings; ",(0,r.kt)("inlineCode",{parentName:"td"},"1"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"2"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"3")," will return warnings (if any), with higher numbers corresponding to more warnings")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"timeout")),(0,r.kt)("td",{parentName:"tr",align:"left"},"The time in milliseconds after which the request to the W3C API will be terminated and an error will be thrown")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const result = await cssValidator.validateURL(cssSourceURL, {\n    medium: 'print',\n    warningLevel: 3,\n    timeout: 3000,\n});\n")),(0,r.kt)("h2",{id:"response-structure"},"Response structure"),(0,r.kt)("p",null,"By default, the function returns a Promise, which resolves to an object that looks like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"{\n    valid: boolean;\n    errors: {\n        line: number;\n        message: string;\n        url: string | null;\n    }[];\n}\n")),(0,r.kt)("p",null,"If you ask it to return warnings via ",(0,r.kt)("inlineCode",{parentName:"p"},"warningLevel"),", it will also include a ",(0,r.kt)("inlineCode",{parentName:"p"},"warnings")," key:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"{\n    ...\n    warnings: {\n        line: number;\n        level: 1 | 2 | 3;\n        message: string;\n        url: string | null;\n    }[];\n}\n")))}m.isMDXComponent=!0}}]);