import { getBlogInfo } from '@/apis/home'
import type { WebsiteConfig } from '@/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    websiteConfig: {} as WebsiteConfig,
    // 菜单
    menuList: [
      {
        icon: 'noto:house-with-garden',
        text: '首页',
        path: '/'
      },
      {
        icon: 'icon-park:message',
        text: '留言',
        path: ''
      },
      {
        icon: 'icon-park:friends-circle',
        text: '友链',
        path: ''
      },
      {
        icon: 'flat-color-icons:gallery',
        text: '图库',
        path: ''
      }
    ],
    articleCount: 0,
    categoryCount: 0,
    tagCount: 0,
    viewsCount: '',
    link: {
      gitHub: 'https://gitee.com/vinson007',
      zhiHu: '',
      music: 'https://music.163.com/playlist?id=7568550728&userid=1288893816'
    }
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
