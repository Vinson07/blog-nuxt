<script setup lang="ts">
interface Props {
  imgSrc: string
  title: string
  time: string
  author?: string
  view?: number
  updateTime?: string
}

withDefaults(defineProps<Props>(), {
  author: 'Vinson',
  updateTime: '',
  view: 0
})
</script>

<template>
  <div class="pattern relative h-[500px] md:h-[400px]">
    <img class="h-full w-full object-cover brightness-75 dark:brightness-50" :src="imgSrc" alt="" />
    <div class="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center text-white">
      <h3 class="text-5xl">{{ title }}</h3>
      <div class="my-3 flex flex-wrap items-center justify-center text-sm">
        <Icon name="ic:baseline-calendar-month" />
        <span class="ml-1">发表于 {{ time }}</span>
        <span class="mx-2">|</span>
        <Icon name="ic:outline-access-time" />
        <span class="ml-1">更新于 {{ updateTime }}</span>
      </div>
      <div class="flex items-center justify-center text-sm">
        <Icon name="ph:user-duotone" />
        <span class="ml-1">{{ author }}</span>
        <span class="mx-2">|</span>
        <Icon name="majesticons:eye-line" />
        <span class="ml-1">阅读量 {{ view }}</span>
      </div>
    </div>
  </div>
</template>
