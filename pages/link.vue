<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { getLink } from '@/apis/link'
import type { Link } from '@/types/link'

const linkList = ref<Link[]>([])
const message = useMessage()
const imageStore = useImageStore()

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
  <div class="h-screen">
    <TheTopBgImg
      bg-cover="https://cdn.sakura520.co/images/20180325154208_GYwna.jpeg"
      bg-title="友链"
    />
    <div class="flex flex-wrap justify-center pt-24">
      <LinkRecommend
        v-for="item in linkList"
        :key="item.id"
        :avatar="item.linkAvatar"
        :title="item.linkName"
        :cover="`${imageStore.randomImage[1]}?id=${item.id}`"
        :link="item.linkAddress"
        :intro="item.linkIntro"
      />
    </div>
  </div>
</template>
