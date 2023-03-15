<script setup lang="ts">
import { NAvatar } from 'naive-ui'
interface Props {
  avatar: string
  title: string
  cover: string
  link: string
  intro: string
}

defineProps<Props>()
</script>

<template>
  <div class="group/img relative m-1 h-36 w-64 cursor-pointer overflow-hidden rounded-md">
    <nuxt-link :to="link" target="_blank">
      <img class="h-full w-full object-cover" :src="cover" alt="" />
      <div class="link-mask nuxt-gradient transition-[top]">
        <div class="text-center">
          <n-avatar round :size="70" :src="avatar" />
          <h4>{{ title }}</h4>
        </div>
      </div>
    </nuxt-link>
    <div class="link-intro top-[21%]">
      {{ intro }}
    </div>
  </div>
</template>

<style lang="less">
.link-mask {
  @apply bg-link-black-gradien dark:bg-link-white-gradient absolute top-0 left-0 flex h-full w-full items-center justify-center duration-500 group-hover/img:-top-full;
}
.link-intro {
  @apply fixed left-1/2 hidden -translate-x-1/2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 py-2 px-5 text-xl text-white group-hover/img:inline-block dark:from-green-400 dark:to-blue-500;
}
</style>
