<script setup lang="ts">
import { Live2d } from '@tomiaa/live2d'

const live2dContentRef = ref()

onMounted(() => {
  /* eslint-disable no-new */
  new Live2d({
    el: live2dContentRef.value,
    showLoading: false,
    allowDrag: false,
    maxWidth: 300,
    jsBaseURL: 'https://cdn.sakura520.co/public'
  })
})
</script>

<template>
  <div ref="live2dContentRef"></div>
</template>
