<script setup lang="ts">
import { getLink } from '@/apis/link'
import type { Link } from '@/types/link'
import { getPoetry } from '@/apis/poetry'

const linkList = ref<Link[]>([])
const imageStore = useImageStore()
const cover = [
  'https://npm.elemecdn.com/anzhiyu-blog@1.1.6/img/post/common/anzhiy.cn.jpg',
  'https://doc.panjingyi.top/blog/202207031648703.jpg'
]
const poetryText = ref('')

definePageMeta({
  layout: 'no-bottom'
})

onMounted(async () => {
  try {
    const { data } = await getLink()
    if (data) linkList.value = data
  } catch (error) {
    console.warn(error)
  }

  try {
    const { data } = await getPoetry()
    poetryText.value = `${data.content} —— ${data.author}`
  } catch (error) {
    console.warn(error)
  }
})
</script>

<template>
  <client-only>
    <div class="min-h-screen">
      <the-top-bg-img
        :poetry-text="poetryText"
        :bg-cover="imageStore.pageList.link"
        bg-title="友链"
      />
      <div class="flex flex-wrap justify-center py-24">
        <link-recommend
          v-for="(item, index) in linkList"
          :key="item.id"
          :avatar="item.linkAvatar"
          :title="item.linkName"
          :cover="cover[index]"
          :link="item.linkAddress"
          :intro="item.linkIntro"
        />
        <link-buddy
          v-for="item in linkList"
          :key="item.id"
          :avatar="item.linkAvatar"
          :title="item.linkName"
          :link="item.linkAddress"
          :intro="item.linkIntro"
        />
      </div>
    </div>
  </client-only>
</template>
