<script setup lang="ts">
const imageStore = useImageStore()
const cover = [
  'https://npm.elemecdn.com/anzhiyu-blog@1.1.6/img/post/common/anzhiy.cn.jpg',
  'https://doc.panjingyi.top/blog/202207031648703.jpg'
]

definePageMeta({
  layout: 'no-bottom'
})

const { link, poetry } = useApi()

// 友链列表
const { data: linkList } = await link.getLink()

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
    <div class="flex flex-wrap justify-center py-24">
      <LinkRecommend
        v-for="(item, index) in linkList?.data"
        :key="item.id"
        :avatar="item.linkAvatar"
        :title="item.linkName"
        :cover="cover[index]"
        :link="item.linkAddress"
        :intro="item.linkIntro"
      />
      <LinkBuddy
        v-for="item in linkList?.data"
        :key="item.id"
        :avatar="item.linkAvatar"
        :title="item.linkName"
        :link="item.linkAddress"
        :intro="item.linkIntro"
      />
    </div>
  </div>
</template>
