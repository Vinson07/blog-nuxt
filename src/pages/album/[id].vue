<script setup lang="ts">
definePageMeta({
  layout: 'no-bottom'
})

const route = useRoute()

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
  <AlbumHorizontal :list="photoData?.data.photoVOList ?? []" />
</template>
