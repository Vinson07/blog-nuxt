<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import errorAvatarImg from '@/assets/img/default-avatar.png'

interface Props {
  avatar: string
  title: string
  intro: string
  link: string
  color: string
}

defineProps<Props>()
</script>

<template>
  <nuxt-link :to="link" target="_blank" class="inline-block">
    <div
      class="hover:bg-v-hc/80 dark:hover:bg-v-hc-dark/80 group flex h-24 w-full cursor-pointer items-center rounded-xl border bg-transparent p-3 transition-all duration-500 dark:border-zinc-700"
    >
      <n-avatar
        class="flex-none overflow-hidden transition-all duration-500 group-hover:-ml-2 group-hover:h-0 group-hover:w-0 group-hover:opacity-0"
        round
        object-fit="cover"
        :size="60"
        :src="avatar"
        :fallback-src="errorAvatarImg"
      />
      <div class="ml-2">
        <h4
          class="mb-1 h-7 text-lg text-black group-hover:text-white dark:text-white"
          :style="{ color: color }"
        >
          {{ title }}
        </h4>
        <p class="multiline-two-ellipsis h-12 text-base text-zinc-500 group-hover:text-white">
          {{ intro }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>
