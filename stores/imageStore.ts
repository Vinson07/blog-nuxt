import type { PageListStore } from '@/types'

export const useImageStore = defineStore('image', {
  state: () => ({
    pageList: {
      // home: 'http://service-ki5kzs0b-1306777571.sh.apigw.tencentcs.com/Mobuv2?form=webp',
      home: 'https://t.lizina.top/pc',
      link: 'https://cdn.sakura520.co/images/5e8889652e7a2148e48797202.png',
      archive:
        'https://cdn.sakura520.co/images/36b8935e9968f1c530b7f5f5544bdac1fcf5c05d215902-DPCqjQ.jpeg'
    } as PageListStore,
    randomImage: [
      'https://api.ghser.com/random/api.php',
      'https://imgapi.xl0408.top/index.php',
      'https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/'
    ],
    videoUrl: ['https://cdn.sakura520.co/static/video/007.mp4'],
    colors: [
      '#ee7752',
      '#e73c7e',
      '#23a6d5',
      '#23d5ab',
      'rgb(131,123,199)',
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
