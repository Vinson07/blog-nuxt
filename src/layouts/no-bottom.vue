<script setup lang="ts">
import { NBackTop } from 'naive-ui'

const layoutStore = useLayoutStore()
</script>

<template>
  <main>
    <TheMdHeader v-if="layoutStore.isMobile" />
    <TheHeader v-else />
    <n-back-top v-if="layoutStore.isMobile" :right="20" />
    <TheBackTop v-else />
    <slot />
  </main>
</template>
