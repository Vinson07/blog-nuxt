<script setup lang="ts">
const userStore = useUserStore()
const darkStore = useDarkStore()

// 切换暗黑模式
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})

const toggleDark = () => {
  isDark.value = !isDark.value
  darkStore.setDark(isDark.value)
}
</script>

<template>
  <div>
    <TheHeader
      :title="userStore.websiteConfig.websiteAuthor"
      :is-dark="isDark"
      :menu-list="userStore.menuList"
      @toggle-dark="toggleDark"
    />
    <TheBackTop />
    <slot />
    <TheFooter />
  </div>
</template>
