<script setup lang="ts">
const imageStore = useImageStore()

definePageMeta({
  layout: 'no-bottom'
})

const { link, poetry } = useApi()

// 友链列表
const { data: linkList } = await link.getLinkList({ lazy: true })

// 古诗
const { data: gushi } = poetry.getPoetry()
const poetryText = computed(() => {
  if (gushi.value) {
    return `${gushi.value.content} —— ${gushi.value.author}`
  } else {
    return ''
  }
})
</script>

<template>
  <div class="min-h-screen">
    <TheTopBgImg :bg-cover="imageStore.pageList.link" title="友链" :poetry-text="poetryText" />
    <div class="mx-auto my-6 max-w-6xl py-7 px-9 shadow-[0_0_1rem_rgba(0,0,0,0.1)]">
      <h2 class="text-22 mt-5 mb-4 font-bold">
        <span class="custom-rotate text-pink-200">
          <Icon name="mingcute:flower-3-fill" />
        </span>
        <span class="ml-1">本站信息</span>
      </h2>
      <blockquote
        class="text-15 mx-6 break-all rounded border-l-[3px] border-[#9d5b8b] bg-[#ffe6fa] px-4 py-3 leading-7 dark:border-[#cfacc5] dark:bg-[#322d31]"
      >
        <p>名称：Vinson</p>
        <p>简介：梦想是一个天真的词，实现梦想是一个残酷的词</p>
        <p>头像：https://static.sakura520.co/config/4cf0a0ba668d5195007ec1b4c902f500.png</p>
      </blockquote>
      <h2 class="text-22 mt-5 mb-4 font-bold">
        <span class="custom-rotate text-pink-200">
          <Icon name="mingcute:flower-3-fill" />
        </span>
        <span class="ml-1">申请方法</span>
      </h2>
      <div
        class="relative mx-9 mb-3 before:absolute before:top-2 before:-left-4 before:h-2 before:w-2 before:rounded-full before:bg-[#e9546b]"
      >
        需要交换友链的可在本页留言 (｡･∀･)ﾉﾞ
      </div>
      <blockquote
        class="text-15 mx-6 break-all rounded border-l-[3px] border-[#9d5b8b] bg-[#ffe6fa] px-4 py-3 leading-7 dark:border-[#cfacc5] dark:bg-[#322d31]"
      >
        <p>出于信息需要,大佬你的信息格式要包含：网站名称、网站链接、头像链接、网站介绍、名称颜色</p>
      </blockquote>
      <h2 class="text-22 mt-5 mb-4 font-bold">
        <span class="custom-rotate text-pink-200">
          <Icon name="mingcute:flower-3-fill" />
        </span>
        <span class="ml-1">小伙伴们</span>
      </h2>
      <div class="flex flex-wrap">
        <LinkBuddy
          v-for="item in linkList?.data"
          :key="item.id"
          :avatar="item.avatar"
          :title="item.name"
          :link="item.url"
          :intro="item.introduction"
          :color="item.color"
        />
      </div>
      <Comment :type="2" />
    </div>
  </div>
</template>
