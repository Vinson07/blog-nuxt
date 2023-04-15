<script setup lang="ts">
import { NDropdown } from 'naive-ui'
import type { IUserInfo } from '@/types/user'

interface IOption {
  label: string
  key: string | number
}

const router = useRouter()
const userStore = useUserStore()
const darkStore = useDarkStore()
const searchStore = useSearchStore()
const showMenu = ref(true)

const options = ref<IOption[]>([])
// 切换暗黑模式
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})

watch(
  isDark,
  (v) => {
    darkStore.setDark(v)
  },
  { immediate: true }
)

watch(
  () => userStore.userInfo.userInfoId,
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
  switch (key) {
    case 'user':
      router.push('/user')
      break
    case 'logout':
      useSessionStorage('user-info', {}).value = null
      userStore.setUserInfo({} as IUserInfo)
      router.push('/login')
      break
    case 'login':
      router.push('/login')
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

// 切换主题
const toggleDark = useToggle(isDark)

// 搜索
function handleSearch() {
  searchStore.setModal(true)
}
</script>

<template>
  <header class="header-nav group/nav" :class="{ active: showMenu }">
    <h1 class="cursor-pointer text-2xl" @click="router.push('/')">
      {{ userStore.websiteConfig.websiteAuthor || 'Vinson' }}
    </h1>
    <nav class="group-hover/nav:block" :class="{ hidden: showMenu }">
      <ul class="flex">
        <li
          v-for="(item, index) in userStore.menuList"
          :key="index"
          class="nav-item mx-4 flex cursor-pointer items-center font-semibold"
          @click="router.push(`${item.path}`)"
        >
          <Icon :class="`icon-${index + 1}`" :name="item.icon" />
          <span class="pl-1">{{ item.text }}</span>
        </li>
      </ul>
    </nav>
    <div class="flex items-center">
      <div class="mr-4 cursor-pointer" @click="toggleDark()">
        <Icon v-if="isDark" name="line-md:sun-rising-filled-loop" size="22" />
        <Icon v-if="!isDark" name="line-md:moon-filled-loop" size="22" />
      </div>
      <div class="mr-4 cursor-pointer" @click="handleSearch">
        <Icon name="icon-park:search" size="22" />
      </div>
      <div>
        <n-dropdown :options="options" @select="handleSelect">
          <Avatar :src="userStore.userInfo.avatar" />
        </n-dropdown>
      </div>
    </div>
  </header>
</template>

<style lang="less">
.header-nav {
  @apply fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-4 backdrop-blur transition-all;
  &.active {
    @apply bg-transparent backdrop-blur-none hover:backdrop-blur;
  }
  .nav-item {
    &:hover .icon-1 {
      -webkit-animation: shake-lr 0.7s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
      animation: shake-lr 0.7s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
    }
    &:hover .icon-2 {
      -webkit-animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
      animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
    }
    &:hover .icon-3 {
      -webkit-animation: shake-vertical 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
      animation: shake-vertical 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
    }
    &:hover .icon-4 {
      -webkit-animation: vibrate-1 0.3s linear infinite both;
      animation: vibrate-1 0.3s linear infinite both;
    }
  }
}
</style>
