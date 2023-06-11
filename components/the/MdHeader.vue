<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore()
const searchStore = useSearchStore()

const menuToggle = ref(false)
function handleIconMenu() {
  menuToggle.value = !menuToggle.value
}
function handleHdMenu() {
  menuToggle.value = false
}
function handleSearch() {
  searchStore.setModal(true)
}

function handleAvatar() {
  router.push('/user')
}
</script>

<template>
  <header class="md-header">
    <div class="md-header-operate">
      <h1 class="cursor-pointer text-2xl" @click="router.push('/')">
        {{ userStore.websiteConfig.websiteAuthor || 'Vinson' }}
      </h1>
      <div class="flex items-center">
        <dark-toggle />
        <div class="mr-4 cursor-pointer">
          <Icon name="icon-park:search" size="22" @click="handleSearch" />
        </div>
        <div class="cursor-pointer md:hidden" @click="handleIconMenu">
          <Icon v-if="menuToggle" name="line-md:menu-to-close-alt-transition" size="26" />
          <Icon v-else name="line-md:close-to-menu-transition" size="26" />
        </div>
      </div>
    </div>
    <div
      class="md-deader-menu transition-[left] duration-500"
      :style="{ left: menuToggle ? '0' : '-100%' }"
      @click="handleHdMenu"
    >
      <div class="h-full w-2/3 rounded-lg bg-white shadow-xl dark:bg-[#1e1e20]">
        <div class="flex justify-center py-7">
          <Avatar size="60" :src="userStore.userInfo.avatar" @click="handleAvatar" />
        </div>
        <ul class="menu-info">
          <li>
            <p>文章</p>
            <span>{{ userStore.articleCount || 0 }}</span>
          </li>
          <li>
            <p>分类</p>
            <span>{{ userStore.categoryCount || 0 }}</span>
          </li>
        </ul>
        <ul class="flex flex-wrap pt-7 text-center">
          <li v-for="(item, index) in userStore.menuList" :key="index" class="basis-1/2 p-1">
            <div class="menu-item" @click="router.push(`${item.path}`)">
              <Icon :name="item.icon" />
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="less">
.md-header {
  @apply fixed top-0 left-0 right-0 z-50;
  .md-header-operate {
    @apply flex h-14 items-center justify-between px-4 shadow-md backdrop-blur;
  }
  .md-deader-menu {
    @apply absolute top-0 left-0 bottom-0 h-screen w-full;
    .menu-info {
      @apply flex justify-evenly border-b-2 border-dashed border-sky-500 pb-4 text-center text-lg;
    }
    .menu-item {
      @apply rounded-md bg-cyan-500 py-2 shadow-lg shadow-cyan-500/50 dark:bg-indigo-500 dark:shadow-indigo-500/50;
    }
  }
}
</style>
