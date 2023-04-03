<script setup lang="ts">
import { NDropdown } from 'naive-ui'
import type { IUserInfo } from '@/types/user'
interface Menu {
  icon: string
  text: string
  path: string
}

interface Props {
  isDark: boolean
  menuList: Array<Menu>
  title?: string
}

interface IOption {
  label: string
  key: string | number
}

const props = defineProps<Props>()
const router = useRouter()
const userStore = useUserStore()
// 监听滚动
const { y } = useWindowScroll()
const emit = defineEmits(['toggle-dark', 'toggle-search'])

const options = ref<IOption[]>([])

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
      useLocalStorage('user-info', {}).value = null
      userStore.setUserInfo({} as IUserInfo)
      router.push('/')
      break
    case 'login':
      router.push('/login')
      break
    default:
      break
  }
}

const headerStyle = computed(() => {
  if (y.value === 0) {
    return ['bg-transparent']
  } else if (props.isDark) {
    return ['bg-[#1e1e20]', 'dark:shadow-md', 'dark:shadow-indigo-500']
  } else {
    return ['bg-white', 'shadow-md']
  }
})

// 切换主题
function handleToggleDark() {
  emit('toggle-dark')
}

// 搜索
function handleSearch() {
  emit('toggle-search')
}
</script>

<template>
  <header class="header-nav group/nav" :class="headerStyle">
    <h1 class="cursor-pointer text-2xl" @click="router.push('/')">{{ props.title || 'Vinson' }}</h1>
    <nav class="group-hover/nav:block" :class="{ hidden: y == 0 }">
      <ul class="flex">
        <li
          v-for="(item, index) in props.menuList"
          :key="index"
          class="nav-item mx-4 flex cursor-pointer items-center"
          @click="router.push(`${item.path}`)"
        >
          <Icon :class="`icon-${index + 1}`" :name="item.icon" />
          <span class="pl-1">{{ item.text }}</span>
        </li>
      </ul>
    </nav>
    <div class="flex items-center">
      <div class="mr-4 cursor-pointer" @click="handleToggleDark">
        <Icon v-if="props.isDark" name="line-md:sun-rising-filled-loop" size="22" />
        <Icon v-else name="line-md:moon-filled-loop" size="22" />
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
  @apply fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-4 transition-all duration-500 hover:bg-white dark:hover:bg-[#1e1e20];
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
