import { defineConfig } from 'vitepress'
import markdownItKatex from 'markdown-it-katex'

const customElements = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml'
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mars Village",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blogs', link: '/CTF_tools' }
    ],

    sidebar: [
      {
        text: 'Blogs',
        items: [
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' },
          { text: '后量子密码', link: '/后量子密码' },
          { text: 'CTF_tools', link: '/CTF_tools' },
          { text: 'CTF_Web_mysql_injection', link: '/CTF_Web_mysql_injection' },
          { text: 'CTF_Web_PNG图片转换器', link: '/CTF_Web_PNG图片转换器' },
          { text: 'CTF_Web_rce', link: '/CTF_Web_rce' },
          { text: 'CTF_Web_yeeclass', link: '/CTF_Web_yeeclass' },
          { text: 'Floating Point', link: '/Floating Point' },
          { text: 'TLS', link: '/TLS' },
          { text: 'ZKP_Groth16', link: '/ZKP_Groth16' },
          { text: 'ZKP_libsnark', link: '/ZKP_libsnark' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/marsvillager/marsvillager.github.io' }
    ]
  },

  markdown: {
    math: true
  }
  
  // markdown: {
  //   config: (md) => {
  //     md.use(markdownItKatex)
  //   }
  // },
  // vue: {
  //   template: {
  //     compilerOptions: {
  //       isCustomElement: (tag) => customElements.includes(tag)
  //     }
  //   }
  // }
})
