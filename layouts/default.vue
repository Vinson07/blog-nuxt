<script setup lang="ts">
import { NBackTop } from 'naive-ui'

const isMobile = ref(false)
const el = ref(null)

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
</script>

<template>
  <div ref="el">
    <TheMdHeader v-if="isMobile" />
    <TheHeader v-else />
    <n-back-top v-if="isMobile" :right="20" />
    <TheBackTop v-else />
    <slot />
    <TheFooter />
  </div>
</template>
