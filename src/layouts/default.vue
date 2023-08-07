<script setup lang="ts">
import { NBackTop } from 'naive-ui'
</script>

<template>
  <main>
    <TheHeader class="max-md:hidden" />
    <TheMdHeader class="md:hidden" />
    <TheBackTop class="max-md:hidden" />
    <n-back-top :right="20" class="md:hidden" />
    <slot />
    <TheFooter />
  </main>
</template>
