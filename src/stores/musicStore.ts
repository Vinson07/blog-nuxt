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
      key: 'music_info'
    }
  }
)

// console.log(import.meta.hot)
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useMusicStore, import.meta.hot))
