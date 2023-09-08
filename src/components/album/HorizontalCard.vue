<script setup lang="ts">
interface Props {
  title?: string
  describe?: string
  tip?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  describe: '',
  tip: '相册集'
})
</script>

<template>
  <div class="relative h-[410px] animate-[slideBottomIn_1s] overflow-hidden rounded-3xl">
    <!-- <video autoplay muted loop class="h-full w-full object-cover">
      <source src="https://cdn.sakura520.co/static/video/hutao.mp4" type="video/mp4" />
    </video> -->
    <img
      class="h-full w-full object-cover"
      src="https://cdn.sakura520.co/static/images/tumblr_752e98a41362e1c7e51c7a50a78c179c_187cb60b_1280.gif"
      alt=""
    />
    <div class="absolute top-0 left-0 h-full p-3 md:p-5">
      <div class="p-10px">
        <h5 class="text-15 text-white">{{ tip }}</h5>
        <p class="mt-5 mb-60 text-4xl text-white">{{ title }}</p>
        <p class="text-base text-white">{{ describe }}</p>
      </div>
    </div>
  </div>
</template>
