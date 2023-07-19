export const useLayoutStore = defineStore('layout', () => {
  const isMobile = ref(false)

  function setMobile(status: boolean) {
    isMobile.value = status
  }

  return { isMobile, setMobile }
})

// console.log(import.meta.hot)
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
