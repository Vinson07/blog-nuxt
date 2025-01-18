<script setup lang="ts">
import { NEmpty } from 'naive-ui'

definePageMeta({
  layout: 'no-bottom'
})

const route = useRoute()
// const imageStore = useImageStore()

const albumId = route.params.id as string

const { album } = useApi()

const { data: photoData } = await album.getPhotoList(Number(albumId))
if (photoData.value?.flag) {
  useHead({
    title: photoData.value.data.albumName
  })
}
</script>

<template>
  <div>
    <AlbumWaterfall
      v-if="photoData && photoData.data.photoVOList && photoData.data.photoVOList.length > 0"
      :list="photoData.data.photoVOList"
    />
    <div v-else class="flex h-screen w-screen items-center justify-center">
      <n-empty description="暂无数据~" size="huge"> </n-empty>
    </div>
  </div>
</template>
