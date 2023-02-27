<script setup lang="ts">
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
  <div class="transition-colors duration-700 dark:bg-[#1e1e20] dark:text-neutral-400">
    <TheHeader :isDark="isDark" @toggle-dark="toggleDark()" />
    <TheBackTop />
    <slot />
    <TheFooter />
  </div>
</template>
