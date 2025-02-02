// https://nuxt.com/docs/api/configuration/nuxt-config
import compression from 'vite-plugin-compression'
import type { PluginOption } from 'vite'

const siteURL = import.meta.env.VITE_APP_WEBSITE as string

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
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      emojiUrl: process.env.NUXT_PUBLIC_EMOJI_URL
    }
  },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no',
      title: 'Vinson Blog',
      meta: [
        { name: 'keywords', content: 'vinson,blog,个人博客,博客,sakura,主题,前端,知识库' },
        { name: 'author', content: 'Vinson' },
        { name: 'description', content: 'Vinson & 梦想是一个天真的词，实现梦想是一个残酷的词' }
      ],
      link: [
        {
          rel: 'preconnect',
          href: siteURL
        },
        {
          rel: 'dns-prefetch',
          href: siteURL
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
          href: 'https://sourcebucket.s3.bitiful.net/fonts/ZhuZiAWan2.woff2'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.staticfile.org/highlight.js/11.7.0/styles/atom-one-dark.min.css' // 代码块高亮样式
        }
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.jsdelivr.net/npm/sakana-widget@2.5.0/lib/sakana.min.css'
        // }
      ],
      script: [
        {
          src: 'https://cdn.staticfile.org/flv.js/1.6.2/flv.min.js', // 引入b站视频播放插件
          defer: true
        }
        // {
        //   src: 'https://cdn.sakura520.co/static/live2d/autoload.js', // 看板娘
        //   defer: true
        // }
      ]
    }
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer', /echarts/]
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
            if (id.includes('echarts')) {
              return 'echarts'
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
  css: ['@/assets/css/animation.css'],
  // nitro: {
  //   // 代理
  //   devProxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:8080/',
  //       changeOrigin: true
  //     }
  //   }
  // },
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
  // piniaPersistedstate: {
  //   storage: 'cookies', // 使用 cookies 作为存储
  //   cookieOptions: {
  //     maxAge: 7 * 24 * 60 * 60 // 设置 cookie 有效期为 7 天
  //   }
  // },
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
