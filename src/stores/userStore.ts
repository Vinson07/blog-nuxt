import type { UserInfo } from '@/types/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref<string | null>(null)
    // 用户信息
    const userInfo = ref<UserInfo | null>(null)

    // 设置token
    function setToken(key: string) {
      token.value = key
    }
    // 获取用户信息
    async function getUserInfo() {
      const { user } = useApi()
      const { data } = await user.getUserInfo()
      if (data.value?.flag) {
        userInfo.value = data.value.data
      }
    }
    // 清除用户信息
    function clearUserInfo() {
      userInfo.value = null
      token.value = null
    }

    // 文章点赞
    function setLikeArticle(articleId: number) {
      if (userInfo.value) {
        if (userInfo.value?.articleLikeSet?.includes(articleId)) {
          userInfo.value.articleLikeSet.splice(userInfo.value.articleLikeSet.indexOf(articleId), 1)
        } else {
          userInfo.value.articleLikeSet?.push(articleId)
        }
      }
    }
    // 评论点赞
    function setLikeComment(commentId: number) {
      if (userInfo.value) {
        if (userInfo.value.commentLikeSet?.includes(commentId)) {
          userInfo.value.commentLikeSet.splice(userInfo.value.commentLikeSet.indexOf(commentId), 1)
        } else {
          userInfo.value.commentLikeSet?.push(commentId)
        }
      }
    }
    // 说说点赞
    function setLikeTalk(talkId: number) {
      if (userInfo.value) {
        if (userInfo.value.talkLikeSet?.includes(talkId)) {
          userInfo.value.talkLikeSet.splice(userInfo.value.talkLikeSet.indexOf(talkId), 1)
        } else {
          userInfo.value.talkLikeSet?.push(talkId)
        }
      }
    }

    return {
      token,
      userInfo,
      setToken,
      getUserInfo,
      clearUserInfo,
      setLikeArticle,
      setLikeComment,
      setLikeTalk
    }
  },
  {
    // 持久化 默认存cookie
    persist: {
      key: 'user_info',
      // 设置 cookie 有效期为 7 天
      storage: persistedState.cookiesWithOptions({ maxAge: 7 * 24 * 60 * 60 })
    }
  }
)

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
