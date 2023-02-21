export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'vinson',
    age: 18
  }),
  actions: {
    setName(text: string) {
      this.name = text
    }
  }
})

// console.log(import.meta.hot)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
