<script setup lang="ts">
// 代码高亮 引入个性化的vs2015样式
// import 'highlight.js/styles/vs2015.css'
// import 'highlight.js/styles/atom-one-dark.css'
// import tocbot from 'tocbot'
import Clipboard from 'clipboard'
import { useMessage } from 'naive-ui'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

interface Props {
  articleContent: string
}

defineProps<Props>()

let clipboard: Clipboard | null = null
const articleRef = ref<HTMLElement | null>(null)
const message = useMessage()
const gallery = ref()

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

onMounted(() => {
  nextTick(() => {
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
    // const markdownBody: HTMLElement | null = document.querySelector('.markdown-body')
    if (articleRef.value) {
      gallery.value = new Viewer(articleRef.value, {
        // button: false
        navbar: false
      })
    }
  })
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

<style>
.markdown-body img {
  cursor: zoom-in;
}

/* 添加行号样式 */
pre.hljs {
  padding: 20px 2px 12px 40px;
  margin: 10px 0;
  border-radius: 5px;
  position: relative;
  font-size: 14px;
  line-height: 22px;
  overflow: hidden;
}
pre.hljs code {
  display: block;
  margin: 0 10px;
  overflow-x: auto;
}
pre.hljs code::-webkit-scrollbar {
  z-index: 11;
  width: 6px;
}
pre.hljs code::-webkit-scrollbar:horizontal {
  height: 6px;
}
pre.hljs code::-webkit-scrollbar-thumb {
  border-radius: 5px;
  width: 6px;
  background: #666;
}
pre.hljs code::-webkit-scrollbar-corner,
pre.hljs code::-webkit-scrollbar-track {
  background: #1e1e1e;
}
pre.hljs code::-webkit-scrollbar-track-piece {
  background: #1e1e1e;
  width: 6px;
}
pre.hljs .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 20px;
  bottom: 12px;
  left: 0;
  font-size: 100%;
  width: 40px;
  text-align: center;
  letter-spacing: -1px;
  border-right: 1px solid rgba(0, 0, 0, 0.66);
  user-select: none;
  counter-reset: linenumber;
}
pre.hljs .line-numbers-rows span {
  pointer-events: none;
  display: block;
  counter-increment: linenumber;
}
pre.hljs .line-numbers-rows span:before {
  content: counter(linenumber);
  color: #999;
  display: block;
  text-align: center;
}
pre.hljs b.name {
  position: absolute;
  top: 2px;
  right: 50px;
  z-index: 10;
  color: #999;
  pointer-events: none;
  user-select: none;
}
pre.hljs .copy-btn {
  position: absolute;
  top: 3px;
  right: 10px;
  z-index: 10;
  color: #999;
  cursor: pointer;
  border: 0;
  border-radius: 2px;
  user-select: none;
}
pre.hljs .copy-btn:hover {
  color: #7ee787;
}
</style>
