export const useMusicStore = defineStore(
  'music',
  () => {
    // 播放第几首
    const playCount = ref(0)

    // 设置第几首
    function setPlayCount(count: number) {
      playCount.value = count
    }

    return { playCount, setPlayCount }
  },
  {
    // 持久化 默认存cookie
    persist: {
      key: 'music_info',
      // 设置 cookie 有效期为 30 天
      storage: persistedState.cookiesWithOptions({ maxAge: 30 * 24 * 60 * 60 })
    }
  }
)

// console.log(import.meta.hot)
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useMusicStore, import.meta.hot))
