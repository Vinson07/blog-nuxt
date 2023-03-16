<script setup lang="ts">
const userStore = useUserStore()
const darkStore = useDarkStore()
const searchStore = useSearchStore()

const isMobile = ref(false)
const el = ref(null)

// 切换暗黑模式
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})

// 适配移动端 屏幕宽度小于768显示
useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  // 更换布局
  if (width > 768) {
    isMobile.value = false
  } else {
    isMobile.value = true
  }
})

const toggleDark = () => {
  isDark.value = !isDark.value
  darkStore.setDark(isDark.value)
}

const handleSearch = () => {
  searchStore.setModal(true)
}
</script>

<template>
  <div ref="el">
    <TheHeader
      v-show="!isMobile"
      :title="userStore.websiteConfig.websiteAuthor"
      :is-dark="isDark"
      :menu-list="userStore.menuList"
      @toggle-dark="toggleDark"
      @handle-search="handleSearch"
    />
    <TheMdHeader
      v-show="isMobile"
      :dark="isDark"
      :menu-list="userStore.menuList"
      @toggle-dark="toggleDark"
    />
    <TheBackTop v-show="!isMobile" />
    <slot />
    <TheFooter />
  </div>
</template>
