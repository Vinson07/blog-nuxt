export const useDarkStore = defineStore('dark', {
  state: () => ({
    isDark: false
  }),
  actions: {
    setDark(status: boolean) {
      this.isDark = status
    }
  }
})

// console.log(import.meta.hot)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDarkStore, import.meta.hot))
}
