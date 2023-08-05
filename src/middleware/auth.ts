export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const userStore = useUserStore()
    if (!userStore.userInfo) {
      return navigateTo({ path: '/login' })
    }
  }
})
