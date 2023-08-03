import { getYiYan2 } from '@/apis/poetry'
import type { SiteConfig } from '@/types/home'
import type { IUserInfo } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<IUserInfo | null>(null)
  const siteConfig = ref<SiteConfig | null>(null)
  // 菜单
  const menuList = ref([
    {
      icon: 'noto:house-with-garden',
      text: '首页',
      path: '/',
      class: 'menu-item-home'
    },
    {
      icon: 'flat-color-icons:calendar',
      text: '归档',
      path: '/archives',
      class: 'menu-item-archives'
    },
    {
      icon: 'icon-park:message',
      text: '留言',
      path: '/barrage',
      class: ''
    },
    {
      icon: 'icon-park:friends-circle',
      text: '友链',
      path: '/link',
      class: 'menu-item-friends'
    },
    {
      icon: 'flat-color-icons:gallery',
      text: '图库',
      path: '/album',
      class: ''
    }
  ])
  const bannerList = ref([
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
  ])
  const articleCount = ref(0)
  const categoryCount = ref(0)
  const tagCount = ref(0)
  const viewsCount = ref('')
  const link = ref({
    gitHub: 'https://gitee.com/vinson007',
    zhiHu: '',
    music: 'https://music.163.com/playlist?id=7568550728&userid=1288893816'
  })
  const yiYan = ref('梦想是一个天真的词，实现梦想是一个残酷的词')

  function setUserInfo(info: IUserInfo) {
    const infoStorage = useSessionStorage('user-info', {})
    userInfo.value = info
    infoStorage.value = info
  }
  function setArticleLike(articleId: number) {
    const infoStorage = useSessionStorage('user-info', {})

    if (userInfo.value) {
      if (userInfo.value?.articleLikeSet?.includes(articleId)) {
        userInfo.value.articleLikeSet.splice(userInfo.value.articleLikeSet.indexOf(articleId), 1)
      } else {
        userInfo.value.articleLikeSet?.push(articleId)
      }
      infoStorage.value = userInfo.value
    }
  }
  function setCommentLike(commentId: number) {
    const infoStorage = useSessionStorage('user-info', {})

    if (userInfo.value) {
      if (userInfo.value.commentLikeSet?.includes(commentId)) {
        userInfo.value.commentLikeSet.splice(userInfo.value.commentLikeSet.indexOf(commentId), 1)
      } else {
        userInfo.value.commentLikeSet?.push(commentId)
      }
      infoStorage.value = userInfo.value
    }
  }
  // 查看博客信息
  async function blogInfoData() {
    const { home } = useApi()
    const { data } = await home.getBlogInfo({ lazy: true })
    if (data.value) {
      viewsCount.value = data.value.data.viewCount
      tagCount.value = data.value.data.tagCount
      articleCount.value = data.value.data.articleCount
      categoryCount.value = data.value.data.categoryCount
      siteConfig.value = data.value.data.siteConfig
    }
  }
  async function setYiYan() {
    // 每日一言
    const { data } = await getYiYan2()
    if (data.value) {
      // const yiyanObj = data.value as string
      yiYan.value = data.value.hitokoto
    }
  }

  return {
    userInfo,
    siteConfig,
    menuList,
    bannerList,
    articleCount,
    categoryCount,
    tagCount,
    viewsCount,
    link,
    yiYan,
    setUserInfo,
    setArticleLike,
    setCommentLike,
    blogInfoData,
    setYiYan
  }
})

// console.log(import.meta.hot)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
