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
  <div class="pattern relative h-[400px]">
    <img class="h-full w-full object-cover" :src="props.imgSrc" alt="" />
    <div class="absolute bottom-0 left-3 md:left-1/2 md:w-[800px] md:-translate-x-1/2">
      <h3 class="text-[32px] text-white">{{ props.title }}</h3>
      <div class="flex items-center py-5 text-white">
        <Avatar class="mr-3" />
        <span class="text-sm">{{ props.author }}</span>
        <Icon name="bi:dot" />
        <span class="text-sm">{{ props.time }}</span>
        <Icon name="bi:dot" />
        <span class="text-sm">{{ props.view }} 次阅读</span>
      </div>
    </div>
  </div>
</template>
