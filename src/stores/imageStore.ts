import type { PageListStore } from '@/types'

export const useImageStore = defineStore('image', () => {
  const pageList = ref<PageListStore>({
    home: 'http://cdn.sakura520.cn/photo/dce83619b79c1b1b12a36f7544620a2b.jpeg',
    message: 'http://cdn.sakura520.cn/photo/8da1d13ff384ec8cb5b19c6073e0af23.jpeg',
    link: 'http://cdn.sakura520.cn/photo/390a181f4bcfb107bce504423918c8eb.jpeg',
    archive: 'http://cdn.sakura520.cn/photo/d8b4210932b8765d7ae5bd353d308113.jpeg',
    login: 'http://cdn.sakura520.cn/photo/ce975b23f6b4362fb654b98b1a2ba815.jpeg',
    user: 'http://view.lixingyong.com/images/2020/10/09/wallhaven-0p1z90.png',
    album:
      'http://cdn.sakura520.cn/static/blog-plugin/imgs/tumblr_752e98a41362e1c7e51c7a50a78c179c_187cb60b_1280.gif',
    category: 'http://cdn.sakura520.cn/photo/8be08b4749c670ee73155a54b29394c9.jpeg',
    talk: 'http://cdn.sakura520.cn/photo/dcf0f3ee56ff85d94c2778b62c813950.jpeg'
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
