<script setup lang="ts">
import { NBackTop } from 'naive-ui'

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

watch(
  isDark,
  (v) => {
    darkStore.setDark(v)
  },
  { immediate: true }
)

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

const toggleDark = useToggle(isDark)

const toggleSearch = () => {
  searchStore.setModal(true)
}
</script>

<template>
  <div ref="el">
    <TheMdHeader
      v-if="isMobile"
      :dark="isDark"
      :menu-list="userStore.menuList"
      @toggle-dark="toggleDark"
      @toggle-search="toggleSearch"
    />
    <TheHeader
      v-else
      :title="userStore.websiteConfig.websiteAuthor"
      :is-dark="isDark"
      :menu-list="userStore.menuList"
      @toggle-dark="toggleDark"
      @toggle-search="toggleSearch"
    />
    <n-back-top v-if="isMobile" :right="20" />
    <TheBackTop v-else />
    <slot />
    <TheFooter />
  </div>
</template>
