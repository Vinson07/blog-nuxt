<script setup lang="ts">
// 代码高亮 引入个性化的vs2015样式
// import 'highlight.js/styles/vs2015.css'
import 'highlight.js/styles/atom-one-dark.css'

const props = defineProps({
  post: {
    type: Object,
    default: () => {}
  }
})
const router = useRouter()

const { post } = toRefs(props)

// markdown解析插件
const { $markdownIt, $copy } = useNuxtApp()

onMounted(() => {
  nextTick(() => {
    // 复制代码
    const copy = $copy('.copy-btn')
    // 复制成功失败的提示
    copy.on('success', (e) => {
      console.log('复制成功', e)
    })
    copy.on('error', (e) => {
      console.log('复制成功失败', e)
    })

    // a标签 新窗口打开
    const a = document.querySelectorAll('.markdown-body a')
    a.forEach((el) => {
      el.setAttribute('target', '_blank')
    })
  })
})
</script>

<template>
  <main class="post-main mx-auto pt-10 max-md:px-3 md:w-[800px]">
    <div>
      <!-- eslint-disable -->
      <article class="markdown-body" v-html="$markdownIt(post.articleContent)"></article>
      <!-- eslint-enable -->
      <div id="toc"></div>
    </div>
    <div class="mt-4 mb-7 flex items-center">
      <span class="mr-1">Q.E.D. </span>
      <Icon name="cryptocurrency-color:data" />
    </div>
    <!-- <div
      class="my-9 mx-auto h-10 w-10 cursor-pointer rounded-full bg-red-500 text-center text-lg leading-10 text-white"
    >
      赏
    </div> -->
    <!-- <div class="absolute top-10 left-1/2 w-[335px] -translate-x-1/2 pt-3">
        <Icon
          name="uis:triangle"
          class="absolute top-0 left-1/2 -translate-x-1/2"
          color="#f3f4f6"
        />
        <div
          class="flex justify-between rounded-md bg-gray-100 px-6 pt-5 pb-2 text-center text-sm text-zinc-500"
        >
          <div>
            <img class="h-32 w-32" src="~/assets/img/AliPayQR.jpeg" alt="" />
            <p class="mt-2">支付宝</p>
          </div>
          <div>
            <img class="h-32 w-32" src="~/assets/img/AliPayQR.jpeg" alt="" />
            <p class="mt-2">支付宝</p>
          </div>
        </div>
      </div> -->
    <div class="border-t border-b border-dashed py-5 text-sm text-zinc-500">
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
    <div class="my-14 overflow-hidden rounded md:flex">
      <div
        v-if="post.lastArticle.id"
        class="group/previous relative h-[150px] flex-1 cursor-pointer"
        @click="router.push(`/post/${post.lastArticle.id}`)"
      >
        <img class="h-full w-full object-cover" :src="post.lastArticle.articleCover" alt="" />
        <div
          class="absolute inset-0 bg-[rgba(0,0,0,0.3)] transition-colors duration-500 group-hover/previous:bg-transparent"
        >
          <div class="mx-10 mt-10 text-sm uppercase">
            <p class="mb-2 text-slate-300">Previous Post</p>
            <h4 class="single-line-ellipsis text-white">
              {{ post.lastArticle.articleTitle }}
            </h4>
          </div>
        </div>
      </div>
      <div
        v-if="post.nextArticle.id"
        class="group/next relative h-[150px] flex-1 cursor-pointer"
        @click="router.push(`/post/${post.nextArticle.id}`)"
      >
        <img class="h-full w-full object-cover" :src="post.nextArticle.articleCover" alt="" />
        <div
          class="absolute inset-0 bg-[rgba(0,0,0,0.3)] transition-colors duration-500 group-hover/next:bg-transparent"
        >
          <div class="mx-10 mt-10 text-sm uppercase">
            <p class="mb-2 text-slate-300">Next Post</p>
            <h4 class="single-line-ellipsis text-white">
              {{ post.nextArticle.articleTitle }}
            </h4>
          </div>
        </div>
      </div>
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
  }
}
</style>
