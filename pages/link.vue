<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { getLink } from '@/apis/link'
import type { Link } from '@/types/link'

const linkList = ref<Link[]>([])
const message = useMessage()
const imageStore = useImageStore()
const cover = [
  'https://npm.elemecdn.com/anzhiyu-blog@1.1.6/img/post/common/anzhiy.cn.jpg',
  'https://doc.panjingyi.top/blog/202207031648703.jpg'
]

definePageMeta({
  layout: 'no-bottom'
})

onMounted(async () => {
  const { code, data, message: msg } = await getLink()
  if (code === 20000) {
    linkList.value = data
  } else {
    message.warning(msg)
  }
})
</script>

<template>
  <div class="min-h-screen">
    <TheTopBgImg :bg-cover="imageStore.pageList.link" bg-title="友链" />
    <div class="flex flex-wrap justify-center py-24">
      <LinkRecommend
        v-for="(item, index) in linkList"
        :key="item.id"
        :avatar="item.linkAvatar"
        :title="item.linkName"
        :cover="cover[index]"
        :link="item.linkAddress"
        :intro="item.linkIntro"
      />
    </div>
  </div>
</template>
