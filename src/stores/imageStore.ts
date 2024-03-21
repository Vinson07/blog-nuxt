import type { PageListStore } from '@/types'

export const useImageStore = defineStore('image', () => {
  const pageList = ref<PageListStore>({
    // home: 'https://www.loliapi.com/acg',
    home: '',
    message:
      'http://view.lixingyong.com/images/2020/12/25/Konachan.com---200042-akame-ga-kill-blue-blue-eyes-blue-hair-breasts-esdeath-hat-raizo35b126e52e2f730da78a6ac60a757a588b.png',
    link: 'http://view.lixingyong.com/images/2020/12/25/Konachan.com---200273-hatsune-miku-jpeg-artifacts-long-hair-sishenfan-twintails-vocaloid04c3c4c625df607f595204f9bd22a37d.jpg',
    archive: 'http://view.lixingyong.com/images/2020/07/20/39e4b4318197c3df024e302b00bf2b0a.jpg',
    login: 'http://view.lixingyong.com/images/2021/01/04/2.jpg',
    user: 'http://view.lixingyong.com/images/2020/10/09/wallhaven-0p1z90.png',
    album:
      'http://cdn.sakura520.cn/static/blog-plugin/imgs/tumblr_752e98a41362e1c7e51c7a50a78c179c_187cb60b_1280.gif',
    category:
      'http://view.lixingyong.com/images/2020/12/25/Konachan.com---200344-hatsune-miku-long-hair-tameiki-twintails-vocaloid521bcdde712d923ef5b071142d96ac86.jpg',
    talk: 'http://view.lixingyong.com/images/2020/10/09/wallhaven-r2l1vw.png'
  })
  const randomImage = ref([
    'https://t.mwm.moe/ai',
    'https://t.mwm.moe/ycy/',
    'https://imgapi.xl0408.top/index.php',
    'https://www.loliapi.com/acg'
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
