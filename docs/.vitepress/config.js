import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mars Village",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blogs', link: '/CTF_Web_PNG图片转换器' }
    ],

    sidebar: [
      {
        text: 'Blogs',
        items: [
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'CTF_Web_rce', link: '/CTF_Web_PNG图片转换器' },
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
  }
})
