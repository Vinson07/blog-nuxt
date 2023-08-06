<script setup lang="ts">
import { NDropdown, NAvatar } from 'naive-ui'

interface IOption {
  label: string
  key: string | number
}

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const blogStore = useBlogStore()
const searchStore = useSearchStore()
const showMenu = ref(true)

const options = ref<IOption[]>([])

watch(
  () => userStore.userInfo,
  (val) => {
    if (val) {
      options.value = [
        {
          label: '个人中心',
          key: 'user'
        },
        {
          label: '登出',
          key: 'logout'
        }
      ]
    } else {
      options.value = [
        {
          label: '登录',
          key: 'login'
        }
      ]
    }
  },
  { immediate: true }
)

const handleSelect = (key: string | number) => {
  const { path } = route
  switch (key) {
    case 'user':
      router.push('/user')
      break
    case 'logout':
      userStore.clearUserInfo()
      if (path === '/user') {
        router.push('/login')
      }
      break
    case 'login':
      if (path !== '/login') {
        router.push(`/login`)
      }
      break
    default:
      break
  }
}

onMounted(() => {
  const handleScroll = () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    if (scrollTop === 0) {
      showMenu.value = true
    } else {
      showMenu.value = false
    }
  }

  window.addEventListener('scroll', handleScroll)
})

// 搜索
function handleSearch() {
  searchStore.setModal(true)
}
</script>

<template>
  <header
    class="header-nav group/nav fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-[rgba(255,255,255,0.7)] px-4 transition-colors duration-700 dark:bg-[rgba(38,38,38,0.7)]"
    :class="{ active: showMenu }"
  >
    <h1 class="site-author cursor-pointer text-2xl" @click="router.push('/')">
      {{ blogStore.siteConfig?.siteAuthor ?? 'Vinson' }}
    </h1>
    <nav class="group-hover/nav:block" :class="{ hidden: showMenu }">
      <ul class="flex">
        <li
          v-for="(item, index) in blogStore.menuList"
          :key="index"
          class="nav-item mx-4 flex cursor-pointer items-center font-semibold hover:text-orange-500 dark:hover:text-indigo-500"
          :class="item.class"
        >
          <NuxtLink :to="`${item.path}`">
            <Icon :class="`icon-${index + 1}`" :name="item.icon" />
            <span class="pl-1">{{ item.text }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="flex items-center">
      <BaseDarkToggle />
      <div class="menu-item-search mr-4 cursor-pointer" @click="handleSearch">
        <Icon name="icon-park:search" size="22" />
      </div>
      <div>
        <n-dropdown :options="options" @select="handleSelect">
          <n-avatar :src="userStore.userInfo?.avatar" round class="mt-1 h-[30px] w-[30px]" />
        </n-dropdown>
      </div>
    </div>
  </header>
</template>
