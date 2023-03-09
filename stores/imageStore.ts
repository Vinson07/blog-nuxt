import type { PageListStore } from '@/types'

export const useImageStore = defineStore('image', {
  state: () => ({
    pageList: {
      home: 'https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/'
    } as PageListStore,
    randomImage: [
      'https://api.ghser.com/random/api.php',
      'https://imgapi.xl0408.top/index.php',
      'https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/'
    ],
    videoUrl: ['https://cdn.sakura520.co/static/video/007.mp4']
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
