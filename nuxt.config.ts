// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  app: {
    head: {
      viewport:
        'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
      title: 'Vinson',
      meta: [
        { name: 'keywords', content: '博客，前端' },
        { name: 'description', content: 'Vinson个人博客，知识库' }
      ],
      link: [
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.sakura520.co/static/live2d/all.min.css'
        // }
      ],
      script: [
        // {
        //   src: 'https://cdn.sakura520.co/static/blog-plugin/js/particleSpace.min.js', // 粒子空间背景
        //   body: true
        // },
        {
          src: 'https://cdn.sakura520.co/static/blog-plugin/js/starrySky.min.js', // 星空背景
          body: true
        },
        {
          src: 'https://cdn.sakura520.co/static/live2d/autoload.js', // 看板娘
          body: true
        }
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
    // build: {
    //   chunkSizeWarningLimit: 1500,
    //   rollupOptions: {
    //     output: {
    //       manualChunks(id) {
    //         if (id.includes('node_modules')) {
    //           return id.toString().split('node_modules/')[1].split('/')[0].toString()
    //         }
    //       }
    //     }
    //   }
    // },
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : []
    }
  },
  css: ['@/assets/css/animation.css', '@/assets/css/cyanosis.css', '@/assets/css/component.css'],
  // 代理
  // server: false,
  nitro: {
    devProxy: {
      '/qiniuApi': {
        target: 'https://sakura520.co/qiniuApi',
        changeOrigin: true
        // prependPath: true
      },
      '/api': {
        target: 'https://sakura520.co/api',
        changeOrigin: true
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
  colorMode: {
    classSuffix: ''
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
    'nuxt-icon',
    '@nuxtjs/color-mode'
  ]
})
