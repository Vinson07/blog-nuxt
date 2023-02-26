<script setup lang="ts">
const router = useRouter()
// 切换暗黑模式
// const isDark = useDark({
//   selector: 'html',
//   attribute: 'class',
//   valueDark: 'dark',
//   valueLight: 'light'
// })

// const toggleDark = useToggle(isDark)

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

// 监听滚动
const { y } = useWindowScroll()
</script>

<template>
  <header
    class="group/nav fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-4 transition-all duration-500 hover:bg-white"
    :class="{ 'bg-white': y !== 0, 'shadow-md': y !== 0 }"
  >
    <h1 class="cursor-pointer text-2xl" @click="router.push('/')">Vinson</h1>
    <nav class="group-hover/nav:block" :class="{ hidden: y == 0 }">
      <ul class="flex">
        <li
          v-for="(item, index) in menuList"
          :key="index"
          class="mx-4 flex cursor-pointer items-center"
          @click="router.push(`${item.path}`)"
        >
          <Icon :name="item.icon" />
          <span class="pl-1">{{ item.text }}</span>
        </li>
      </ul>
    </nav>
    <div class="flex items-center">
      <div class="cursor-pointer pr-2">
        <Icon name="icon-park:search" size="1.2em" />
      </div>
      <div>
        <Avatar />
      </div>
    </div>
  </header>
</template>
