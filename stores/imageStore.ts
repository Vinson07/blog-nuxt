import type { PageListStore } from '@/types'

export const useImageStore = defineStore('image', {
  state: () => ({
    pageList: {
      home: 'https://www.loliapi.com/acg',
      message: 'https://cdn.sakura520.co/images/0510.webp',
      link: 'https://cdn.sakura520.co/images/0517.webp',
      archive: 'https://cdn.sakura520.co/images/058.jpeg'
    } as PageListStore,
    randomImage: [
      'https://api.ghser.com/random/api.php',
      'https://t.mwm.moe/ycy/',
      'https://imgapi.xl0408.top/index.php',
      'https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/'
    ],
    videoUrl: ['https://cdn.sakura520.co/static/video/007.mp4'],
    colors: [
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
    ]
  }),
  actions: {
    togglePage(page: keyof PageListStore, url: string) {
      this.pageList[page] = url
    }
  }
})

// console.log(import.meta.hot)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImageStore, import.meta.hot))
}
