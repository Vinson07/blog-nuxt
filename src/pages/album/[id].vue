<script setup lang="ts">
definePageMeta({
  layout: 'no-bottom'
})

const route = useRoute()
const imageStore = useImageStore()

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
  <div class="mx-auto max-w-[1350px] px-3 pt-20">
    <AlbumHorizontalCard
      :title="photoData?.data.albumName"
      tip="相册集"
      :cover="imageStore.pageList.album"
    />
    <!-- <AlbumHorizontal :list="photoData?.data.photoVOList ?? []" /> -->
    <AlbumWaterfallflow :list="photoData?.data.photoVOList ?? []" />
  </div>
</template>
