<script setup lang="ts">
import { Waterfall } from 'vue-waterfall-plugin-next'
import { NImage } from 'naive-ui'
import 'vue-waterfall-plugin-next/dist/style.css'
import errorImg from '@/assets/img/404/404.gif'

interface List {
  src: string
}

definePageMeta({
  layout: 'no-bottom'
})

const route = useRoute()

const albumId = route.params.id as string
const desc = route.query.desc as string
const imgList = ref<List[]>([])

const { album } = useApi()

const { data: photoData } = await album.getPhotoList(Number(albumId))
if (photoData.value?.flag) {
  photoData.value.data.photoVOList.forEach((item) => {
    imgList.value.push({
      src: item.photoUrl
    })
  })

  useHead({
    title: photoData.value.data.albumName
  })
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-3 pt-20">
    <AlbumHorizontalCard :title="photoData?.data.albumName" :describe="desc" />
    <div class="animate-[slideUpIn_1s] py-8">
      <ClientOnly>
        <Waterfall :list="imgList" background-color="transparent">
          <template #item="{ url }">
            <n-image :src="url" :fallback-src="errorImg" class="rounded-lg" />
          </template>
        </Waterfall>
      </ClientOnly>
    </div>
  </div>
</template>
