<script setup lang="ts">
import { NAvatar } from 'naive-ui'
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
  <nuxt-link :to="link" target="_blank" class="m-1">
    <div
      class="group flex h-[100px] w-64 cursor-pointer items-center rounded-xl border bg-transparent p-3 transition-all hover:bg-blue-600 dark:border-zinc-700"
    >
      <n-avatar
        class="flex-none overflow-hidden transition-all group-hover:-ml-2 group-hover:w-0"
        round
        object-fit="cover"
        :size="60"
        :src="avatar"
      />
      <div class="ml-2">
        <h4
          class="mb-1 text-lg text-black group-hover:text-white dark:text-white"
          :style="{ color: color }"
        >
          {{ title }}
        </h4>
        <p class="multiline-two-ellipsis text-base text-zinc-500 group-hover:text-gray-300">
          {{ intro }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>
