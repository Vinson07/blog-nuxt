import { createDiscreteApi } from 'naive-ui'
import { getBlogInfo } from '@/apis/home'
import { getYiYan } from '@/apis/poetry'
import type { WebsiteConfig } from '@/types'
import type { IUserInfo } from '@/types/user'

const { message: msg } = createDiscreteApi(['message'])

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as IUserInfo,
    websiteConfig: {} as WebsiteConfig,
    // pageImage: {
    //   home: '',
    //   category: '',
    //   tag: '',
    //   album: '',
    //   about: '',
    //   message: '',
    //   user: '',
    //   articleList: '',
    //   talk: '',
    //   link: '',
    //   archive: ''
    // } as { [key: string]: string },
    // 菜单
    menuList: [
      {
        icon: 'noto:house-with-garden',
        text: '首页',
        path: '/'
      },
      {
        icon: 'flat-color-icons:calendar',
        text: '归档',
        path: '/archives'
      },
      {
        icon: 'icon-park:message',
        text: '留言',
        path: '/barrage'
      },
      {
        icon: 'icon-park:friends-circle',
        text: '友链',
        path: '/link'
      },
      {
        icon: 'flat-color-icons:gallery',
        text: '图库',
        path: '/album'
      }
    ],
    bannerList: [
      {
        title: 'Web音乐播放器',
        describe: '高颜值的第三方网易云播放器',
        link: 'https://music.sakura520.co/',
        bgSrc: 'https://cdn.sakura520.co/images/0712.jpeg'
      },
      {
        title: '图库',
        describe: '这里有好多图片',
        link: 'https://view.lixingyong.com/explore/trending',
        bgSrc: 'https://cdn.sakura520.co/FmcgKQQGHWnGwzALOBTbRIzrTeeP'
      },
      {
        title: 'sakura',
        describe: '本站 Sakura 主题',
        link: '',
        bgSrc: 'https://cdn.sakura520.co/images/0711.jpeg'
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
    },
    yiYan: '梦想是一个天真的词，实现梦想是一个残酷的词'
  }),
  actions: {
    setUserInfo(userInfo: IUserInfo) {
      const info = useSessionStorage('user-info', {})
      this.userInfo = userInfo
      info.value = userInfo
    },
    async blogInfoData() {
      try {
        const { code, data, message } = await getBlogInfo()
        if (code === 20000) {
          const { websiteConfig, categoryCount, articleCount, tagCount, viewsCount } = data
          this.websiteConfig = websiteConfig
          this.articleCount = articleCount
          this.categoryCount = categoryCount
          this.tagCount = tagCount
          this.viewsCount = viewsCount

          // pageList.forEach((item) => {
          //   this.pageImage[item.pageLabel] = item.pageCover
          // })
        } else {
          msg.warning(message)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async setYiYan() {
      // 每日一言
      try {
        const { data } = await getYiYan()
        if (data.yiyan) {
          this.yiYan = data.yiyan
        }
      } catch (error) {
        console.warn(error)
      }
    }
  }
})

// console.log(import.meta.hot)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
