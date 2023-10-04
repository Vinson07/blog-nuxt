<script setup lang="ts">
import Clipboard from 'clipboard'
import { useMessage } from 'naive-ui'
import { v3ImgPreviewFn } from 'v3-img-preview'
import '@/assets/themes/cyanosis.css'

interface Props {
  articleContent: string
}

defineProps<Props>()

let clipboard: Clipboard | null = null
const articleRef = ref<HTMLElement | null>(null)
const message = useMessage()

// markdown解析插件
const { $markdownIt } = useNuxtApp()

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.staticfile.org/highlight.js/11.7.0/styles/atom-one-dark.min.css' // 代码块高亮样式
    }
  ]
})

onMounted(async () => {
  await nextTick()

  // 复制代码
  clipboard = new Clipboard('.copy-btn')
  // 复制成功失败的提示
  clipboard.on('success', () => {
    message.success('复制成功')
  })
  clipboard.on('error', () => {
    message.error('复制成功失败')
  })

  // 图片预览
  if (articleRef.value) {
    articleRef.value.addEventListener('click', (event: Event) => {
      const el = event.target as HTMLElement
      if (el.tagName.toLowerCase() === 'img') {
        const imgUrl = el.getAttribute('src') as string
        v3ImgPreviewFn(imgUrl)
      }
    })
  }
})

onUnmounted(() => {
  if (clipboard) {
    clipboard.destroy()
  }
})
</script>

<template>
  <!-- eslint-disable -->
  <article
    class="markdown-body fancybox"
    ref="articleRef"
    v-html="$markdownIt(articleContent)"
  ></article>
  <!-- eslint-enable -->
</template>
