<script setup lang="ts">
import { useImage } from '@vueuse/core'

interface Props {
  src: string
}
const props = defineProps<Props>()
const imageStore = useImageStore()

const { isLoading, error } = useImage({ src: props.src })
</script>

<template>
  <div class="the-image">
    <img v-if="isLoading" class="img" src="~/assets/img/loading-two.gif" alt="" />
    <img v-else-if="error" class="img" :src="imageStore.randomImage[1]" alt="" />
    <img v-else :src="src" class="img" alt="" />
  </div>
</template>

<style lang="less">
.the-image {
  @apply h-full w-full;
  .img {
    @apply h-full w-full object-cover transition-transform duration-500 group-hover:scale-125;
  }
}
</style>
