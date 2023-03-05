import { getBlogInfo } from '@/apis/home'
import { WebsiteConfig } from '@/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    websiteConfig: {} as WebsiteConfig,
    pageList: {
      home: 'https://cdn.sakura520.co/images/2018112111632_x5CSu.jpeg'
    },
    articleCount: 0,
    categoryCount: 0,
    tagCount: 0,
    viewsCount: ''
  }),
  actions: {
    async blogInfoData() {
      try {
        const { code, data } = await getBlogInfo()
        if (code === 20000) {
          const { websiteConfig, categoryCount, articleCount, tagCount, viewsCount } = data
          this.websiteConfig = websiteConfig
          this.articleCount = articleCount
          this.categoryCount = categoryCount
          this.tagCount = tagCount
          this.viewsCount = viewsCount
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})

// console.log(import.meta.hot)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
