<script setup lang="ts">
import { NImage } from 'naive-ui'
import type { Photo } from '@/types/album'

interface Props {
  list: Photo[]
}

defineProps<Props>()
</script>

<template>
  <!-- <div class="my-8 animate-[slideUpIn_1s] columns-2 gap-3 px-4 md:columns-3 lg:columns-4">
    <div v-for="item in list" :key="item.id" class="mb-1">
      <n-image :src="item.photoUrl" class="h-full w-full rounded-lg" />
    </div>
  </div> -->
  <div class="mx-4 my-14 columns-[auto_300px]">
    <div v-for="item in list" :key="item.id" class="mt-10px break-inside-avoid">
      <n-image :src="item.photoUrl" height="100%" class="h-full w-full rounded-md shadow-md" />
    </div>
  </div>
</template>
