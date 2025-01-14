<script setup lang="ts">
import type { Album } from '@/types/album'

interface Props {
  album: Album
}

defineProps<Props>()
</script>

<template>
  <div class="verticla-card p-10px group relative cursor-pointer">
    <img
      class="card-cover h-full w-full rounded-3xl object-cover brightness-75 contrast-[0.85] saturate-[1.2] transition-all duration-500 group-hover:scale-105 group-hover:brightness-90 group-hover:contrast-100 group-hover:saturate-150"
      :src="album.albumCover"
      alt=""
    />
    <div class="absolute top-0 left-0 p-6">
      <p class="my-3 text-base text-gray-300">{{ album.albumName }}</p>
      <p class="text-2xl text-white">{{ album.albumDesc }}</p>
    </div>
  </div>
</template>

<style scoped>
.verticla-card:not(:hover) .card-cover {
  filter: brightness(0.5) saturate(0.9) contrast(1.2) blur(20px);
}
</style>
