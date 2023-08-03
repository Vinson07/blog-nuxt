<script setup lang="ts">
const userStore = useUserStore()

const day = computed(() => {
  if (userStore.siteConfig) {
    const differ = new Date().getTime() - new Date(userStore.siteConfig.createSiteTime).getTime()
    const day = Math.floor(differ / 1000 / 60 / 60 / 24)
    return day
  } else {
    return '--'
  }
})
</script>

<template>
  <footer>
    <div class="pt-20 pb-12 text-center text-xs">
      <img class="animate-spin-slow m-auto h-8 w-8" src="~/assets/img/svg/sakura.svg" alt="" />
      <p class="mt-2 text-slate-600">Crafted with by Vinson</p>
      <p class="my-3 text-neutral-400">
        <span> 小破站居然运行了 {{ day }} 天</span>
        <Icon class="heart mx-1 pb-1" name="fxemoji:beating-heart" size="22" />
        <span>访客 {{ userStore.viewsCount || '--' }}</span>
      </p>
      <p class="beian text-neutral-400">
        <span class="mr-1">© 2023 Vinson</span>
        <NuxtLink to="https://beian.miit.gov.cn" target="_blank">
          {{ userStore.siteConfig?.recordNumber }}
        </NuxtLink>
      </p>
    </div>
  </footer>
</template>
