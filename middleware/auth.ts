export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const info = useSessionStorage('user-info', { userInfoId: '' })
    if (!info.value.userInfoId) {
      return navigateTo({ path: '/login' })
    }
  }
})
