// https://nuxt.com/docs/api/configuration/nuxt-config
import compression from 'vite-plugin-compression'
import type { PluginOption } from 'vite'

// GZIP压缩
const plugin: PluginOption = [
  compression({
    ext: '.gz',
    deleteOriginFile: false
  }),
  compression({
    ext: '.br',
    algorithm: 'brotliCompress',
    deleteOriginFile: false
  })
]

export default defineNuxtConfig({
  srcDir: 'src',
  app: {
    head: {
      viewport:
        'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
      title: 'Vinson',
      meta: [
        { name: 'keywords', content: 'Vinson，Sakura，博客，前端' },
        { name: 'author', content: 'Vinson' },
        { name: 'description', content: 'Vinson，Sakura，博客，个人博客，知识库' }
      ],
      link: [
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.jsdelivr.net/npm/sakana-widget@2.5.0/lib/sakana.min.css'
        // }
      ],
      script: [
        {
          src: 'https://cdn.sakura520.co/static/blog-plugin/js/starrySky.min.js', // 星空背景
          defer: true
        },
        {
          src: 'https://cdn.sakura520.co/static/live2d/autoload.js', // 看板娘
          defer: true
        }
      ]
    }
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
        : ['@juggle/resize-observer']
  },
  vite: {
    build: {
      // chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 分包
            // if (id.includes('node_modules')) {
            //   return id.toString().split('node_modules/')[1].split('/')[0].toString()
            // }
            if (id.includes('highlight.js')) {
              return 'highlight'
            }
            if (id.includes('markdown-it')) {
              return 'markdown_it'
            }
          }
        }
      }
    },
    plugins: process.env.NODE_ENV === 'development' ? [] : plugin,
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
      exclude: ['fsevents']
    }
  },
  css: ['@/assets/css/animation.css', '@/assets/css/common.css', '@/assets/css/cyanosis.css'],
  // 代理
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
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/device',
    'nuxt-icon',
    '@nuxtjs/color-mode'
  ],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },
  piniaPersistedstate: {
    storage: 'sessionStorage'
  },
  imports: {
    dirs: ['stores']
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config'
  },
  colorMode: {
    classSuffix: ''
  }
})
