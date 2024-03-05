import { defineConfig } from 'vitepress'

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
          { text: 'CTF_Web_PNG图片转换器', link: '/CTF_Web_PNG图片转换器' },
          { text: 'CTF_Web_rce', link: '/CTF_Web_rce' },
          { text: 'CTF_Web_yeeclass', link: '/CTF_Web_yeeclass' },
          { text: 'CTF_Web_yet_another_mysql_injection', link: '/CTF_Web_yet_another_mysql_injection' },
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
