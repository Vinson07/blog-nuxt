// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    typeCheck: false // ts语法检查
  },
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
  css: ['@/assets/css/animation.css', '@/assets/css/cyanosis.css'],
  buidl: {
    transpile: ['markdown-it', 'highlight.js', 'clipboard']
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config'
    // exposeConfig: false,
    // config: {},
    // injectPosition: 0,
    // viewer: true,
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
