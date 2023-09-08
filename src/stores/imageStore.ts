import type { PageListStore } from '@/types'

export const useImageStore = defineStore('image', () => {
  const pageList = ref<PageListStore>({
    // home: 'https://www.loliapi.com/acg',
    home: '',
    message: 'https://cdn.sakura520.co/photo/ab82b3035557d2bcd935d9764ad2212d.png',
    link: 'https://cdn.sakura520.co/photo/e349b2c28635d578b061652afa458e71.jpeg',
    archive: 'https://cdn.sakura520.co/photo/5d1b7e1378d31c9c18f3b78f34764945.png',
    login: 'https://cdn.sakura520.co/photo/80e7bae6740bef1383ea079ad7f61b1e.jpeg',
    user: 'https://cdn.sakura520.co/photo/349b64d1d187c21dc20ba64928a2f866.jpeg',
    album: 'https://cdn.sakura520.co/photo/390a181f4bcfb107bce504423918c8eb.jpeg',
    category: 'https://cdn.sakura520.co/photo/a3598f1a90330f4309c212cdf3d0e8b6.jpeg'
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
