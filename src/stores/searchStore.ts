export const useSearchStore = defineStore('search', {
  state: () => ({
    showModal: false
  }),
  actions: {
    setModal(status: boolean) {
      this.showModal = status
    }
  }
})

// console.log(import.meta.hot)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}
