<script setup lang="ts">
definePageMeta({
  layout: 'no-bottom'
})
useHead({
  title: '图库'
})

const router = useRouter()
const imageStore = useImageStore()

const { album } = useApi()

// 获取相册列表
const { data: albumData } = await album.getAlbumList()
</script>

<template>
  <div class="mx-auto max-w-[1350px] px-3 pt-20">
    <AlbumHorizontalCard
      title="这里是我的相册集哦"
      tip="相册集"
      :cover="imageStore.pageList.album"
    />
    <div
      class="album-card my-10 grid animate-[slideUpIn_1s] grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <AlbumVerticalCard
        v-for="item in albumData?.data"
        :key="item.id"
        :album="item"
        @click="router.push(`/album/${item.id}`)"
      />
    </div>
  </div>
</template>
