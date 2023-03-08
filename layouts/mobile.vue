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
</script>

<template>
  <div>
    <TheMdHeader :dark="isDark" :menu-list="userStore.menuList" @toggle-dark="toggleDark" />
    <slot />
    <TheFooter />
  </div>
</template>
