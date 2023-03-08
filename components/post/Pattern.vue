<script setup lang="ts">
const props = defineProps({
  imgSrc: {
    type: String,
    default: 'https://static.sakura520.co/config/274a3851ab099df4b062848dca18bf84.jpg'
  },
  title: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  view: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="pattern relative h-[500px] md:h-[400px]">
    <img class="h-full w-full object-cover dark:brightness-50" :src="props.imgSrc" alt="" />
    <div class="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center text-white">
      <h3 class="text-5xl">{{ props.title }}</h3>
      <div class="my-3 flex flex-wrap items-center justify-center text-sm">
        <Icon name="ic:baseline-calendar-month" />
        <span class="ml-1">发表于 {{ props.time }}</span>
        <span class="mx-2">|</span>
        <Icon name="ic:outline-access-time" />
        <span class="ml-1">更新于 2023-02-15</span>
      </div>
      <div class="flex items-center justify-center text-sm">
        <Icon name="ph:user-duotone" />
        <span class="ml-1">{{ props.author }}</span>
        <span class="mx-2">|</span>
        <Icon name="majesticons:eye-line" />
        <span class="ml-1">阅读量 {{ props.view }}</span>
      </div>
    </div>
  </div>
</template>
