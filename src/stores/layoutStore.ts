export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isMobile: false
  }),
  actions: {
    setMobile(status: boolean) {
      this.isMobile = status
    }
  }
})

// console.log(import.meta.hot)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
