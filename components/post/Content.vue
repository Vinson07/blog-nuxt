<script setup lang="ts">
// 代码高亮 引入个性化的vs2015样式
// import 'highlight.js/styles/vs2015.css'
import 'highlight.js/styles/atom-one-dark.css'
import tocbot from 'tocbot'
import Clipboard from 'clipboard'
import { useMessage } from 'naive-ui'

const props = defineProps({
  post: {
    type: Object,
    default: () => {}
  }
})

const articleRef = ref<HTMLElement | null>(null)
const tocRef = ref<HTMLElement | null>(null)
const recommendRef = ref<HTMLElement | null>(null)
const router = useRouter()
const message = useMessage()

const { post } = toRefs(props)

// markdown解析插件
const { $markdownIt } = useNuxtApp()

// 滚动事件
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (tocRef.value && recommendRef.value) {
    const height = recommendRef.value.offsetHeight + 400
    if (scrollTop > height) {
      tocRef.value.style.position = 'fixed'
      tocRef.value.style.top = '80px'
    } else {
      tocRef.value.style.position = ''
      tocRef.value.style.top = ''
    }
  }
}

onMounted(() => {
  nextTick(() => {
    // 复制代码
    const copy = new Clipboard('.copy-btn')
    // 复制成功失败的提示
    copy.on('success', () => {
      message.success('复制成功')
    })
    copy.on('error', () => {
      message.error('复制成功失败')
    })

    // 文章目录
    if (articleRef.value) {
      const nodes = articleRef.value.children
      if (nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]
          // const reg = /^H[1-4]{1}$/
          const reg = /^H[1-2]{1}$/
          if (reg.exec(node.tagName)) {
            node.id = 'header-' + i.toString()
          }
        }
      }
    }
    tocbot.init({
      tocSelector: '#toc', // 要把目录添加元素位置，支持选择器
      contentSelector: '.markdown-body', // 获取html的元素
      headingSelector: 'h1, h2', // 要显示的id的目录
      hasInnerContainers: true,
      onClick: function (e) {
        e.preventDefault()
      }
    })

    addEventListener('scroll', handleScroll, false)
  })
})

onUnmounted(() => {
  removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <main class="post-main relative mx-auto mt-4 max-w-[1140px]">
    <div class="relative rounded p-4 shadow-md xl:w-[820px]">
      <!-- eslint-disable -->
      <article
        class="markdown-body"
        ref="articleRef"
        v-html="$markdownIt(post.articleContent)"
      ></article>
      <!-- eslint-enable -->
      <div class="my-14 border-t border-b border-dashed py-5 text-sm text-zinc-500">
        <p class="flex items-center justify-center">
          <Icon name="bi:cc-circle" />
          <span class="ml-1">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</span>
        </p>
        <div class="mt-2 flex justify-between">
          <div class="tag flex items-center">
            <Icon name="fluent:tag-multiple-16-regular" size="16" />
            <span>{{ post.categoryName }}</span>
            <span v-for="tag in post.tagDTOList" :key="tag.id">{{ tag.tagName }}</span>
          </div>
          <div class="flex">
            <Icon name="ci:share" class="mr-3 cursor-pointer" size="20" />
            <div class="flex items-center">
              <Icon
                name="bx:bxs-like"
                class="cursor-pointer"
                :class="{ 'text-red-600': false }"
                size="20"
              />
              <span class="ml-1 text-sm">{{ post.likeCount || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
      <PostTogglePost :last-article="post.lastArticle" :next-article="post.nextArticle" />
    </div>
    <div class="absolute top-0 right-0 w-[300px] max-xl:hidden">
      <div
        v-if="post.recommendArticleList && post.recommendArticleList.length > 0"
        ref="recommendRef"
        class="mb-5 w-[inherit] rounded px-5 shadow-md"
      >
        <div class="border-b py-4 font-medium dark:border-amber-300">推荐文章</div>
        <ul class="pb-1 text-sm">
          <li
            v-for="item in post.recommendArticleList"
            :key="item.id"
            class="my-3 cursor-pointer rounded py-1 px-2 hover:bg-gray-200 dark:hover:bg-indigo-500"
            @click="router.push(`/post/${item.id}`)"
          >
            <p>{{ item.articleTitle }}</p>
            <p class="pt-1 text-gray-400">
              <span>20点赞</span>
              <Icon name="bi:dot" />
              <span>10评论</span>
            </p>
          </li>
        </ul>
      </div>
      <nav
        id="toc"
        ref="tocRef"
        class="max-h-[500px] w-[inherit] overflow-y-auto rounded shadow-md"
      ></nav>
    </div>
  </main>
</template>

<style lang="less">
.post-main {
  .tag {
    span {
      margin: 0 5px;
      cursor: pointer;
    }
  }
}

// 目录
#toc {
  ol {
    @apply px-4;
    a {
      @apply block overflow-hidden text-ellipsis whitespace-nowrap rounded p-2 hover:bg-gray-200 dark:hover:bg-indigo-500;
    }
  }
  .is-active-link {
    @apply text-orange-500 dark:text-[#007fff];
  }
}

// 添加行号样式
pre.hljs {
  padding: 20px 2px 12px 40px;
  margin: 10px 0;
  border-radius: 5px;
  position: relative;
  font-size: 14px;
  line-height: 22px;
  overflow: hidden;
  code {
    display: block;
    margin: 0 10px;
    overflow-x: auto;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #666;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background: #1e1e1e;
    }
    &::-webkit-scrollbar-track-piece {
      background: #1e1e1e;
      width: 6px;
    }
  }
  .line-numbers-rows {
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
    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }
  b.name {
    position: absolute;
    top: 2px;
    right: 50px;
    z-index: 10;
    color: #999;
    pointer-events: none;
    user-select: none;
  }
  .copy-btn {
    position: absolute;
    top: 3px;
    right: 10px;
    z-index: 10;
    color: #999;
    cursor: pointer;
    border: 0;
    border-radius: 2px;
    user-select: none;
    &:hover {
      color: #fff;
    }
  }
}
</style>
