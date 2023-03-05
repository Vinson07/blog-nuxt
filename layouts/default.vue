<script setup lang="ts">
const userStore = useUserStore()
// 切换暗黑模式
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark)

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

// 适配移动端 屏幕宽度小于768显示
const divRef = ref(null)
const { width } = useElementSize(divRef)
</script>

<template>
  <div ref="divRef" class="transition-colors duration-500 dark:bg-[#202124] dark:text-neutral-400">
    <TheHeader
      v-if="width > 768"
      :title="userStore.websiteConfig.websiteAuthor"
      :is-dark="isDark"
      :menu-list="menuList"
      @toggle-dark="toggleDark()"
    />
    <TheMdHeader v-else :md-dark="isDark" :md-menu-list="menuList" @toggle-md-dark="toggleDark()" />
    <TheBackTop />
    <slot />
    <TheFooter />
  </div>
</template>
