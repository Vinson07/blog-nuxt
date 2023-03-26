// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      title: 'Vinson',
      meta: [
        { name: 'keywords', content: '博客，前端' },
        { name: 'description', content: 'Vinson个人博客，知识库' }
      ],
      // link: [
      //   {
      //     rel: 'stylesheet',
      //     href: 'https://cdn.sakura520.co/static/live2d/all.min.css'
      //   }
      // ],
      script: [
        {
          src: 'https://cdn.sakura520.co/static/live2d/autoload.js',
          body: true
        }
      ]
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    },
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
  server: true,
  nitro: {
    devProxy: {
      '/qiniuApi': {
        target: 'https://sakura520.co/qiniuApi',
        changeOrigin: true
        // prependPath: true
      }
    }
  },
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
