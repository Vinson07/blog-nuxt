<script setup lang="ts">
interface Props {
  isDark: boolean
}

const props = defineProps<Props>()
const router = useRouter()
// 监听滚动
// const { y } = useWindowScroll()
const emit = defineEmits(['toggle-dark'])

// const headerStyle = computed(() => {
//   if (y.value === 0) {
//     return ['bg-transparent']
//   } else if (props.isDark) {
//     return ['bg-[#202124]', 'dark:shadow-md', 'dark:shadow-indigo-500']
//   } else {
//     return ['bg-white', 'shadow-md']
//   }
// })

// 切换主题
function handleToggleDark() {
  emit('toggle-dark')
}

// 菜单
const menuList = [
  {
    icon: 'noto:house-with-garden',
    text: '首页',
    path: '/'
  },
  {
    icon: 'icon-park:message',
    text: '留言',
    path: ''
  },
  {
    icon: 'icon-park:friends-circle',
    text: '友链',
    path: ''
  },
  {
    icon: 'flat-color-icons:gallery',
    text: '图库',
    path: ''
  }
]

const menuToggle = ref(true)
function handleMenuToggle() {
  menuToggle.value = !menuToggle.value
}
function handleNav() {
  menuToggle.value = true
}
</script>

<template>
  <header class="header-nav group/nav">
    <h1 class="cursor-pointer text-2xl" @click="router.push('/')">Vinson</h1>
    <nav class="nav" :style="{ left: menuToggle ? '-100%' : '0' }" @click="handleNav">
      <ul class="nav-box">
        <li class="md:hidden">
          <h1 class="pt-4 pb-6 text-center text-xl">欢迎光临</h1>
        </li>
        <li
          v-for="(item, index) in menuList"
          :key="index"
          class="nav-item mx-4 flex cursor-pointer items-center max-md:mb-3"
          @click="router.push(`${item.path}`)"
        >
          <Icon :class="`icon-${index + 1}`" :name="item.icon" />
          <span class="pl-1">{{ item.text }}</span>
        </li>
      </ul>
    </nav>
    <div class="flex items-center">
      <div class="mr-4 cursor-pointer" @click="handleToggleDark">
        <Icon v-if="props.isDark" name="line-md:sun-rising-filled-loop" size="20" />
        <Icon v-else name="line-md:moon-filled-loop" size="20" />
      </div>
      <div class="mr-4 cursor-pointer">
        <Icon name="icon-park:search" size="20" />
      </div>
      <div>
        <Avatar />
      </div>
      <div class="ml-4 cursor-pointer md:hidden" @click="handleMenuToggle">
        <Icon v-if="menuToggle" name="line-md:close-to-menu-transition" size="28" />
        <Icon v-else name="line-md:menu-to-close-alt-transition" size="28" />
      </div>
    </div>
  </header>
</template>

<style lang="less">
.header-nav {
  @apply fixed top-0 left-0 right-0 z-50 flex h-14 select-none items-center justify-between bg-transparent px-4 transition-all duration-500 md:hover:bg-white md:hover:shadow-md md:dark:hover:bg-[#202124] md:dark:hover:shadow-md md:hover:dark:shadow-indigo-500;
  .nav {
    @apply transition-all duration-500 max-md:absolute max-md:top-0 max-md:left-0 max-md:h-screen max-md:w-full;
    .nav-box {
      @apply max-md:h-full max-md:w-1/2 max-md:bg-white max-md:dark:bg-[#202124] md:flex;
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
  }
}
</style>
