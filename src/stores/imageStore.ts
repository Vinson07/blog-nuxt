import type { PageListStore } from '@/types'

export const useImageStore = defineStore('image', () => {
  const pageList = ref<PageListStore>({
    // home: 'https://www.loliapi.com/acg',
    home: '',
    message: 'https://cdn.sakura520.co/photo/53033434c3b8a0f50e9cc2d3dfeb0511.jpeg',
    link: 'https://cdn.sakura520.co/photo/8a61af20803cbca20f17d39f4dd33370.webp',
    archive: 'https://cdn.sakura520.co/photo/9aec31ec72f9a931cb5ef91de350abe6.jpeg',
    login: 'https://cdn.sakura520.co/photo/ed99cfa9c3766816833e4e8947175b46.jpeg',
    user: 'https://cdn.sakura520.co/photo/dd9d1c2e0d08b37ff0c669277b93b718.jpeg',
    album:
      'https://cdn.sakura520.co/static/images/tumblr_752e98a41362e1c7e51c7a50a78c179c_187cb60b_1280.gif',
    category: 'https://cdn.sakura520.co/photo/d2328c7d55058b925dde89d5710b4834.jpg',
    talk: 'https://cdn.sakura520.co/photo/cbc9a5939dd7742a80fec1873f8b68d4.jpg'
  })
  const randomImage = ref([
    'https://t.mwm.moe/ai',
    'https://t.mwm.moe/ycy/',
    'https://imgapi.xl0408.top/index.php',
    'https://www.loliapi.com/acg'
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
