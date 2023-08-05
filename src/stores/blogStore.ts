import { getYiYan2 } from '@/apis/poetry'
import type { SiteConfig } from '@/types/home'

export const useBlogStore = defineStore('blog', () => {
  // 博客基本信息
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
      path: '/message',
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
  // banner
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
  // 文章数
  const articleCount = ref(0)
  // 分类数
  const categoryCount = ref(0)
  // 标签数
  const tagCount = ref(0)
  // 访问数
  const viewsCount = ref('')
  const link = ref({
    gitHub: 'https://gitee.com/vinson007',
    zhiHu: '',
    music: 'https://music.163.com/playlist?id=7568550728&userid=1288893816'
  })
  // 一言
  const yiYan = ref('梦想是一个天真的词，实现梦想是一个残酷的词')

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
    siteConfig,
    menuList,
    bannerList,
    articleCount,
    categoryCount,
    tagCount,
    viewsCount,
    link,
    yiYan,
    blogInfoData,
    setYiYan
  }
})

// console.log(import.meta.hot)
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot))
