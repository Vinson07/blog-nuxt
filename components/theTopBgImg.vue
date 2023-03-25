<script setup lang="ts">
import { useImage } from '@vueuse/core'

interface Props {
  bgCover: string
  bgTitle: string
}
const props = defineProps<Props>()
const imageStore = useImageStore()

const { error } = useImage({ src: props.bgCover })
</script>

<template>
  <div class="slide-bottom relative h-80 cursor-pointer select-none">
    <img
      v-if="error"
      class="h-full w-full object-cover brightness-75 dark:brightness-50"
      :src="`${imageStore.randomImage[2]}?t=${Date.now()}`"
      alt=""
    />
    <img
      v-else
      class="h-full w-full object-cover brightness-75 dark:brightness-50"
      :src="bgCover"
      alt=""
    />
    <div class="absolute inset-0 flex items-center justify-center text-white">
      <div class="text-center">
        <h1 class="text-5xl font-bold">{{ bgTitle }}</h1>
        <!-- <p class="mt-4 text-2xl">欲把西湖比西子，淡妆浓抹总相宜。</p> -->
      </div>
    </div>
  </div>
</template>
