import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "数据结构与算法",
  description: "数据结构与算法",
  ignoreDeadLinks: true,
  base: '/lesson-algorithm/',
  head: [
    ['link', { rel: 'icon', href: '/lesson-algorithm/logo_icon.jpeg' }],
  ],
  themeConfig: {
    sidebar: [
      {
        text: '入门',
        collapsed: true,
        items: [
          { text: '绪论', link: '/docs/1-介绍/a-绪论.md' },
          { text: '如何学习', link: '/docs/1-介绍/b-学习.md' },
          { text: '算法的复杂度', link: '/docs/1-介绍/c-复杂度.md' },
          { text: '数据结构概述', link: '/docs/1-介绍/d-概述.md' },
        ]
      },
      {
        text: '数据结构',
        collapsed: true,
        items: [
          { text: '线性表', link: '/docs/2-数据结构/a-线性表.md' },
          { text: '链表', link: '/docs/2-数据结构/b-链表.md' },
          { text: '其他链表', link: '/docs/2-数据结构/c-链表.md' },
          { text: '栈和队列', link: '/docs/2-数据结构/d-栈.md' },
          { text: '字符串', link: '/docs/2-数据结构/e-字符串.md' },
          { text: '哈希表', link: '/docs/2-数据结构/f-哈希.md' },
          { text: '树和递归', link: '/docs/2-数据结构/g-树.md' },
          { text: '二叉树', link: '/docs/2-数据结构/h-二叉树.md' },
          { text: '其他二叉树', link: '/docs/2-数据结构/i-其他树.md' },
          { text: '堆', link: '/docs/2-数据结构/j-堆.md' },
          { text: '图', link: '/docs/2-数据结构/k-图.md' },
        ]
      },
      {
        text: '算法',
        collapsed: true,
        items: [
          { text: '查找', link: '/docs/3-算法/a-查找.md' },
          { text: '排序', link: '/docs/3-算法/b-排序.md' },
          { text: '更快的排序', link: '/docs/3-算法/c-更快排序.md' },
          { text: '回溯与递归', link: '/docs/3-算法/d-递归与回溯.md' },
          { text: '动态规划', link: '/docs/3-算法/e-动态规划.md' },
          { text: '贪心算法', link: '/docs/3-算法/f-贪心算法.md' },
        ]
      }
    ],

    outline: {
      label: '导航',
    },

    footer: {
      copyright: '徐夙 &copy; 2026 北方工业大学',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]

    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],
  }
})
