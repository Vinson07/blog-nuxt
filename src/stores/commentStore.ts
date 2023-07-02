export const useCommentStore = defineStore('comment', {
  state: () => ({
    commentList: []
  }),
  actions: {
    getCommentList() {}
  }
})

// console.log(import.meta.hot)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommentStore, import.meta.hot))
}
