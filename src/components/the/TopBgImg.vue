<script setup lang="ts">
import { UseImage } from '@vueuse/components'

interface Props {
  bgCover?: string
  title?: string
  time?: string
  author?: string
  view?: number
  poetryText?: string
}
const props = withDefaults(defineProps<Props>(), {
  title: 'Vinson',
  bgCover: '',
  time: '',
  author: '',
  view: 0,
  poetryText: ''
})

const publicationTime = useDateFormat(props.time, 'YYYY-MM-DD')
</script>

<template>
  <div class="slide-bottom relative h-[60vh]">
    <UseImage :src="bgCover">
      <template #loading>
        <img
          class="h-full w-full brightness-75 dark:brightness-50"
          src="~/assets/img/svg/progress-bar-stripe-loader.svg"
          alt=""
        />
      </template>
      <template #error>
        <img
          class="h-full w-full object-cover brightness-75 dark:brightness-50"
          src="~/assets/img/404.gif"
          alt=""
        />
      </template>
      <img
        class="h-full w-full object-cover brightness-75 dark:brightness-50"
        :src="bgCover"
        alt=""
      />
    </UseImage>
    <div class="absolute inset-0 flex items-center justify-center text-white">
      <div class="text-center">
        <h1 class="text-5xl">{{ title }}</h1>
        <p v-if="poetryText" class="mt-4 text-2xl">{{ poetryText }}</p>
        <div
          v-else
          class="m-4 flex flex-wrap items-center justify-center divide-x text-sm leading-3"
        >
          <div class="flex items-center px-3">
            <Icon name="ic:baseline-calendar-month" />
            <span class="ml-1">发表于 {{ publicationTime }}</span>
          </div>
          <div class="flex items-center px-3">
            <Icon name="ph:user-duotone" />
            <span class="ml-1">{{ author }}</span>
          </div>
          <div class="flex items-center px-3">
            <Icon name="majesticons:eye-line" />
            <span class="ml-1">阅读量 {{ view }}</span>
          </div>
          <!-- <Icon name="ic:outline-access-time" /> -->
          <!-- <span class="ml-1">更新于 {{ updateTime }}</span> -->
        </div>
      </div>
    </div>
    <Waves />
  </div>
</template>
