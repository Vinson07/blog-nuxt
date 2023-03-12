// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      title: 'Vinson',
      meta: [
        { name: 'keywords', content: 'vinson 博客 前端 全栈' },
        { name: 'description', content: '个人博客，知识库' }
      ]
    }
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
            'markdown-it',
            'highlight.js',
            'clipboard'
          ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : []
    }
  },
  css: ['@/assets/css/animation.css', '@/assets/css/cyanosis.css'],
  // 代理
  // server: true,
  // nitro: {
  //   devProxy: {
  //     '/api': {
  //       target: 'https://sakura520.co/api',
  //       changeOrigin: true
  //     }
  //   }
  // },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config'
  },
  imports: {
    dirs: ['stores']
  },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ],
    '@vueuse/nuxt',
    '@nuxtjs/device',
    'nuxt-icon'
  ]
})
