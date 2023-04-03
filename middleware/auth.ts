export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const info = useLocalStorage('user-info', { userInfoId: '' })
    if (!info.value.userInfoId) {
      return navigateTo({ path: '/login' })
    }
  }
})
