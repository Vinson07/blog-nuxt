<script setup lang="ts">
import type { PostList } from '@/types/article'

defineProps<{
  active: boolean
  item: PostList
}>()

const router = useRouter()

const { $markdownItContent } = useNuxtApp()

const createTime = computed(() => (time: string) => useDateFormat(time, 'YYYY-MM-DD').value)
</script>

<template>
  <li
    class="post__list emergence mb-10 overflow-hidden rounded-lg bg-[rgba(255,255,255,0.9)] shadow-[0_1px_30px_-4px_#e8e8e8] transition-shadow duration-500 hover:shadow-[0_1px_20px_10px_#e8e8e8] dark:bg-[rgba(51,51,51,0.7)] dark:shadow-[0_1px_35px_-8px_rgba(26,26,26,0.6)] dark:hover:shadow-[0_1px_20px_0px_rgb(99,102,241)] md:flex md:h-[300px]"
    :class="{ active: active }"
  >
    <div class="overflow-hidden max-md:h-56 md:flex-[1.4]">
      <TheImage :src="item.articleCover" />
    </div>
    <div class="post__list__content px-8 pt-5 text-right md:flex-1">
      <div
        class="inline-flex items-center rounded-md bg-[#fccd0026] py-1 px-2 text-xs text-orange-500 dark:bg-[#333333] dark:text-[#888]"
      >
        <Icon name="mingcute:time-fill" size="18" class="pr-1" />
        发布于 {{ createTime(item.createTime) }}
      </div>
      <h4
        class="post-title-link my-6 cursor-pointer text-xl hover:text-orange-500 hover:dark:text-indigo-500"
        @click="router.push(`/post/${item.id}`)"
      >
        {{ item.articleTitle }}
      </h4>
      <div class="content-info flex justify-end text-xs">
        <p class="mr-4 flex items-center">
          <Icon name="mdi:eye" size="16" class="text-orange-500 dark:text-[#888]" />
          <span class="ml-1">181 热度</span>
        </p>
        <p class="mr-4 flex items-center">
          <Icon name="fe:comment" size="16" class="text-orange-500 dark:text-[#888]" />
          <span class="ml-1">4 条评论</span>
        </p>
        <p class="mr-4 flex items-center">
          <Icon name="material-symbols:files" size="16" class="text-orange-500 dark:text-[#888]" />
          <span class="ml-1">{{ item.categoryName }}</span>
        </p>
      </div>
      <div class="text-15 pt-3 pb-5">
        <p class="multiline-ellipsis">{{ $markdownItContent(item.articleContent) }}</p>
      </div>
      <div class="content-ellipsis read-article flex justify-end max-md:hidden">
        <NuxtLink :to="`/post/${item.id}`">
          <Icon name="ion:ellipsis-horizontal" size="26" />
        </NuxtLink>
      </div>
    </div>
  </li>
</template>
