import{_ as n,o as t,c as e,O as l,z as s,a}from"./chunks/framework.aacc0fa0.js";const T=JSON.parse('{"title":"Background","description":"","frontmatter":{},"headers":[],"relativePath":"Floating Point.md"}'),m={name:"Floating Point.md"},i=l("",6),r=s("p",null,[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",null,[s("semantics",null,[s("mrow",null,[s("mo",null,"("),s("mo",null,"−"),s("mn",null,"1"),s("msup",null,[s("mo",null,")"),s("mrow",null,[s("mi",null,"s"),s("mi",null,"i"),s("mi",null,"g"),s("mi",null,"n")])]),s("mo",null,"×"),s("msup",null,[s("mn",null,"2"),s("mrow",null,[s("mi",null,"e"),s("mi",null,"x"),s("mi",null,"p"),s("mi",null,"o"),s("mi",null,"n"),s("mi",null,"e"),s("mi",null,"n"),s("mi",null,"t"),s("mo",null,"−"),s("mi",null,"b"),s("mi",null,"i"),s("mi",null,"a"),s("mi",null,"s")])]),s("mo",null,"×"),s("mn",null,"1"),s("mi",{mathvariant:"normal"},"."),s("mi",null,"m"),s("mi",null,"a"),s("mi",null,"n"),s("mi",null,"t"),s("mi",null,"i"),s("mi",null,"s"),s("mi",null,"s"),s("mi",null,"a")]),s("annotation",{encoding:"application/x-tex"},"(-1)^{sign} \\times 2^{exponent - bias} \\times 1.mantissa")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"strut",style:{height:"0.849108em"}}),s("span",{class:"strut bottom",style:{height:"1.099108em","vertical-align":"-0.25em"}}),s("span",{class:"base textstyle uncramped"},[s("span",{class:"mopen"},"("),s("span",{class:"mord"},"−"),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mclose"},[s("span",{class:"mclose"},")"),s("span",{class:"vlist"},[s("span",{style:{top:"-0.363em","margin-right":"0.05em"}},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),s("span",{class:"reset-textstyle scriptstyle uncramped"},[s("span",{class:"mord scriptstyle uncramped"},[s("span",{class:"mord mathit"},"s"),s("span",{class:"mord mathit"},"i"),s("span",{class:"mord mathit",style:{"margin-right":"0.03588em"}},"g"),s("span",{class:"mord mathit"},"n")])])]),s("span",{class:"baseline-fix"},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),a("​")])])]),s("span",{class:"mbin"},"×"),s("span",{class:"mord"},[s("span",{class:"mord mathrm"},"2"),s("span",{class:"vlist"},[s("span",{style:{top:"-0.363em","margin-right":"0.05em"}},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),s("span",{class:"reset-textstyle scriptstyle uncramped"},[s("span",{class:"mord scriptstyle uncramped"},[s("span",{class:"mord mathit"},"e"),s("span",{class:"mord mathit"},"x"),s("span",{class:"mord mathit"},"p"),s("span",{class:"mord mathit"},"o"),s("span",{class:"mord mathit"},"n"),s("span",{class:"mord mathit"},"e"),s("span",{class:"mord mathit"},"n"),s("span",{class:"mord mathit"},"t"),s("span",{class:"mbin"},"−"),s("span",{class:"mord mathit"},"b"),s("span",{class:"mord mathit"},"i"),s("span",{class:"mord mathit"},"a"),s("span",{class:"mord mathit"},"s")])])]),s("span",{class:"baseline-fix"},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),a("​")])])]),s("span",{class:"mbin"},"×"),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mord mathrm"},"."),s("span",{class:"mord mathit"},"m"),s("span",{class:"mord mathit"},"a"),s("span",{class:"mord mathit"},"n"),s("span",{class:"mord mathit"},"t"),s("span",{class:"mord mathit"},"i"),s("span",{class:"mord mathit"},"s"),s("span",{class:"mord mathit"},"s"),s("span",{class:"mord mathit"},"a")])])])],-1),o=s("ul",null,[s("li",null,[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",null,[s("semantics",null,[s("mrow",null,[s("mi",null,"b"),s("mi",null,"i"),s("mi",null,"a"),s("mi",null,"s")]),s("annotation",{encoding:"application/x-tex"},"bias")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"strut",style:{height:"0.69444em"}}),s("span",{class:"strut bottom",style:{height:"0.69444em","vertical-align":"0em"}}),s("span",{class:"base textstyle uncramped"},[s("span",{class:"mord mathit"},"b"),s("span",{class:"mord mathit"},"i"),s("span",{class:"mord mathit"},"a"),s("span",{class:"mord mathit"},"s")])])]),a(" 决定了数的取值范围，默认值为 127")]),s("li",null,"规定尾数部分最高位必须是 1，1 不保存就可以节省出 1 位用于提高精度，因此最高位的 1 是隐含的（Implied）")],-1),c=s("h3",{id:"_1-十进制整数-17-fp32",tabindex:"-1"},[a("（1）十进制整数 17 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",null,[s("semantics",null,[s("mrow",null,[s("mo",null,"→")]),s("annotation",{encoding:"application/x-tex"},"\\rightarrow")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"strut",style:{height:"0.36687em"}}),s("span",{class:"strut bottom",style:{height:"0.36687em","vertical-align":"0em"}}),s("span",{class:"base textstyle uncramped"},[s("span",{class:"mrel"},"→")])])]),a(" Fp32 "),s("a",{class:"header-anchor",href:"#_1-十进制整数-17-fp32","aria-label":'Permalink to "（1）十进制整数 17 $\\rightarrow$ Fp32"'},"​")],-1),p=s("ul",null,[s("li",null,"sign = (0)2"),s("li",null,[a("exponent = (10000011)2 "),s("ul",null,[s("li",null,"exponent - bias = (128 + 2 + 1) - 127 = 4")])]),s("li",null,"mantissa = (00010000……)2")],-1),u=s("p",null,[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",null,[s("semantics",null,[s("mrow",null,[s("mo",null,"("),s("mo",null,"−"),s("mn",null,"1"),s("msup",null,[s("mo",null,")"),s("mn",null,"0")]),s("mo",null,"×"),s("msup",null,[s("mn",null,"2"),s("mn",null,"4")]),s("mo",null,"×"),s("mo",null,"("),s("mn",null,"1"),s("mi",{mathvariant:"normal"},"."),s("mn",null,"0"),s("mn",null,"0"),s("mn",null,"0"),s("mn",null,"1"),s("mo",null,")"),s("mn",null,"2"),s("mo",null,"="),s("mo",null,"("),s("mn",null,"1"),s("mn",null,"0"),s("mn",null,"0"),s("mn",null,"0"),s("mn",null,"1"),s("mo",null,")"),s("mn",null,"2"),s("mo",null,"="),s("mn",null,"1"),s("mn",null,"7")]),s("annotation",{encoding:"application/x-tex"},"(-1)^0 \\times 2^4 \\times (1.0001)2 = (10001)2 = 17")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"strut",style:{height:"0.8141079999999999em"}}),s("span",{class:"strut bottom",style:{height:"1.064108em","vertical-align":"-0.25em"}}),s("span",{class:"base textstyle uncramped"},[s("span",{class:"mopen"},"("),s("span",{class:"mord"},"−"),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mclose"},[s("span",{class:"mclose"},")"),s("span",{class:"vlist"},[s("span",{style:{top:"-0.363em","margin-right":"0.05em"}},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),s("span",{class:"reset-textstyle scriptstyle uncramped"},[s("span",{class:"mord mathrm"},"0")])]),s("span",{class:"baseline-fix"},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),a("​")])])]),s("span",{class:"mbin"},"×"),s("span",{class:"mord"},[s("span",{class:"mord mathrm"},"2"),s("span",{class:"vlist"},[s("span",{style:{top:"-0.363em","margin-right":"0.05em"}},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),s("span",{class:"reset-textstyle scriptstyle uncramped"},[s("span",{class:"mord mathrm"},"4")])]),s("span",{class:"baseline-fix"},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),a("​")])])]),s("span",{class:"mbin"},"×"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mord mathrm"},"."),s("span",{class:"mord mathrm"},"0"),s("span",{class:"mord mathrm"},"0"),s("span",{class:"mord mathrm"},"0"),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mclose"},")"),s("span",{class:"mord mathrm"},"2"),s("span",{class:"mrel"},"="),s("span",{class:"mopen"},"("),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mord mathrm"},"0"),s("span",{class:"mord mathrm"},"0"),s("span",{class:"mord mathrm"},"0"),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mclose"},")"),s("span",{class:"mord mathrm"},"2"),s("span",{class:"mrel"},"="),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mord mathrm"},"7")])])])],-1),h=s("h3",{id:"_2-十进制数-3-25-fp32",tabindex:"-1"},[a("（2）十进制数 3.25 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",null,[s("semantics",null,[s("mrow",null,[s("mo",null,"→")]),s("annotation",{encoding:"application/x-tex"},"\\rightarrow")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"strut",style:{height:"0.36687em"}}),s("span",{class:"strut bottom",style:{height:"0.36687em","vertical-align":"0em"}}),s("span",{class:"base textstyle uncramped"},[s("span",{class:"mrel"},"→")])])]),a(" Fp32 "),s("a",{class:"header-anchor",href:"#_2-十进制数-3-25-fp32","aria-label":'Permalink to "（2）十进制数 3.25 $\\rightarrow$ Fp32"'},"​")],-1),d=s("ul",null,[s("li",null,"sign = (0)2"),s("li",null,[a("exponent = (10000000)2 "),s("ul",null,[s("li",null,"exponent - bias = 128 - 127 = 1")])]),s("li",null,"mantissa = (10100000……)2")],-1),b=s("p",null,[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",null,[s("semantics",null,[s("mrow",null,[s("mo",null,"("),s("mo",null,"−"),s("mn",null,"1"),s("msup",null,[s("mo",null,")"),s("mn",null,"0")]),s("mo",null,"×"),s("msup",null,[s("mn",null,"2"),s("mn",null,"1")]),s("mo",null,"×"),s("mo",null,"("),s("mn",null,"1"),s("mi",{mathvariant:"normal"},"."),s("mn",null,"1"),s("mn",null,"0"),s("mn",null,"1"),s("mo",null,")"),s("mn",null,"2"),s("mo",null,"="),s("mo",null,"("),s("mn",null,"1"),s("mn",null,"1"),s("mi",{mathvariant:"normal"},"."),s("mn",null,"0"),s("mn",null,"1"),s("mo",null,")"),s("mn",null,"2"),s("mo",null,"="),s("mn",null,"3"),s("mi",{mathvariant:"normal"},"."),s("mn",null,"2"),s("mn",null,"5")]),s("annotation",{encoding:"application/x-tex"},"(-1)^0 \\times 2^1 \\times (1.101)2 = (11.01)2 = 3.25")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"strut",style:{height:"0.8141079999999999em"}}),s("span",{class:"strut bottom",style:{height:"1.064108em","vertical-align":"-0.25em"}}),s("span",{class:"base textstyle uncramped"},[s("span",{class:"mopen"},"("),s("span",{class:"mord"},"−"),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mclose"},[s("span",{class:"mclose"},")"),s("span",{class:"vlist"},[s("span",{style:{top:"-0.363em","margin-right":"0.05em"}},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),s("span",{class:"reset-textstyle scriptstyle uncramped"},[s("span",{class:"mord mathrm"},"0")])]),s("span",{class:"baseline-fix"},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),a("​")])])]),s("span",{class:"mbin"},"×"),s("span",{class:"mord"},[s("span",{class:"mord mathrm"},"2"),s("span",{class:"vlist"},[s("span",{style:{top:"-0.363em","margin-right":"0.05em"}},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),s("span",{class:"reset-textstyle scriptstyle uncramped"},[s("span",{class:"mord mathrm"},"1")])]),s("span",{class:"baseline-fix"},[s("span",{class:"fontsize-ensurer reset-size5 size5"},[s("span",{style:{"font-size":"0em"}},"​")]),a("​")])])]),s("span",{class:"mbin"},"×"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mord mathrm"},"."),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mord mathrm"},"0"),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mclose"},")"),s("span",{class:"mord mathrm"},"2"),s("span",{class:"mrel"},"="),s("span",{class:"mopen"},"("),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mord mathrm"},"."),s("span",{class:"mord mathrm"},"0"),s("span",{class:"mord mathrm"},"1"),s("span",{class:"mclose"},")"),s("span",{class:"mord mathrm"},"2"),s("span",{class:"mrel"},"="),s("span",{class:"mord mathrm"},"3"),s("span",{class:"mord mathrm"},"."),s("span",{class:"mord mathrm"},"2"),s("span",{class:"mord mathrm"},"5")])])])],-1),f=l("",24),g=[i,r,o,c,p,u,h,d,b,f];function x(_,F,z,P,y,k){return t(),e("div",null,g)}const q=n(m,[["render",x]]);export{T as __pageData,q as default};
