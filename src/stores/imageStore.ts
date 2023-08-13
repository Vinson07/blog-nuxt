import type { PageListStore } from '@/types'

export const useImageStore = defineStore('image', () => {
  const pageList = ref<PageListStore>({
    // home: 'https://www.loliapi.com/acg',
    home: '',
    message: 'https://cdn.sakura520.co/images/0510.webp',
    link: 'https://cdn.sakura520.co/images/0517.webp',
    archive: 'https://cdn.sakura520.co/images/058.jpeg',
    login: 'https://cdn.sakura520.co/images/055.jpeg',
    user: 'https://cdn.sakura520.co/images/0304.jpeg',
    album: 'https://cdn.sakura520.co/images/079.webp',
    category: 'https://cdn.sakura520.co/images/0512.webp'
  })
  const randomImage = ref([
    'https://api.ghser.com/random/api.php',
    'https://t.mwm.moe/ycy/',
    'https://imgapi.xl0408.top/index.php',
    'https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/'
  ])
  const videoUrl = ref(['https://cdn.sakura520.co/static/video/007.mp4'])
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

  return { pageList, randomImage, videoUrl, colors, togglePage }
})

// console.log(import.meta.hot)
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useImageStore, import.meta.hot))
