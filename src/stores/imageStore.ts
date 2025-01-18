import type { PageListStore } from '@/types'

export const useImageStore = defineStore('image', () => {
  const pageList = ref<PageListStore>({
    home: 'https://www.loliapi.com/acg',
    message: 'https://static.sakura520.cn/photo/8da1d13ff384ec8cb5b19c6073e0af23.jpeg',
    link: 'https://static.sakura520.cn/photo/85cbe94867d3d4f5b108b5d3f3e9bc2e.jpg',
    archive: 'https://static.sakura520.cn/photo/4422a35159d26159ef13b3eb0754480b.png',
    login: 'https://static.sakura520.cn/photo/7991c06a543f73731f2c798f8e4b4fbd.jpg',
    user: 'http://view.lixingyong.com/images/2020/10/09/wallhaven-0p1z90.png',
    album:
      'http://cdn.sakura520.cn/static/blog-plugin/imgs/tumblr_752e98a41362e1c7e51c7a50a78c179c_187cb60b_1280.gif',
    category: 'https://static.sakura520.cn/photo/c4c5647537957487fb629d05d3f17d1d.jpg',
    talk: 'https://static.sakura520.cn/photo/e5b4acf484a187f7d299016bddc0d079.jpg'
  })
  const randomImage = ref([
    'https://www.loliapi.com/acg',
    'https://t.mwm.moe/ai',
    'https://t.mwm.moe/ycy/',
    'https://imgapi.xl0408.top/index.php'
  ])
  // const videoUrl = ref(['https://cdn.sakura520.co/static/video/007.mp4'])
  const colors = ref([
    '#ee7752',
    '#e73c7e',
    '#23a6d5',
    '#23d5ab',
    '#23d5ab',
    '#ff4757',
    '#ff7f50',
    '#eccc68',
    '#7bed9f',
    '#2ed573',
    '#1e90ff',
    '#5352ed',
    '#2f3542',
    '#fd79a8',
    '#6c5ce7',
    '#63cdda',
    '#2bcbba'
  ])

  function togglePage(page: keyof PageListStore, url: string) {
    pageList.value[page] = url
  }

  return { pageList, randomImage, colors, togglePage }
})

// console.log(import.meta.hot)
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useImageStore, import.meta.hot))
