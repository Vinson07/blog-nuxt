<script setup lang="ts">
import type { Article } from '@/types/article'

interface Props {
  item: Article
}

defineProps<Props>()

const router = useRouter()

const { $markdownItContent } = useNuxtApp()

const createTime = computed(() => (time: string) => useDateFormat(time, 'YYYY-MM-DD').value)
</script>

<template>
  <li
    class="emergence group mb-10 overflow-hidden rounded-lg bg-[rgba(255,255,255,0.9)] shadow-[0_1px_30px_-4px_#e8e8e8] transition-shadow duration-500 even:flex-row-reverse hover:shadow-[0_1px_20px_10px_#e8e8e8] dark:bg-[rgba(51,51,51,0.7)] dark:shadow-[0_1px_35px_-8px_rgba(26,26,26,0.6)] dark:hover:shadow-[0_1px_20px_0px_rgb(99,102,241)] md:flex md:h-[300px]"
  >
    <div class="overflow-hidden max-md:h-56 md:flex-[1.4]">
      <TheImage :src="item.articleCover" />
    </div>
    <div class="px-8 pt-5 text-right group-even:text-left md:flex-1">
      <div class="content-top flex items-center justify-end text-xs group-even:flex-row-reverse">
        <p v-if="item.isTop" class="mx-4 flex items-center">
          <Icon
            name="ant-design:pushpin-filled"
            size="16"
            class="text-orange-500 dark:text-indigo-600"
          />
          <span class="ml-1 text-orange-500 dark:text-indigo-600">顶置</span>
        </p>
        <p
          class="rounded-md bg-[#fccd0026] py-1 px-2 text-orange-500 dark:bg-[#333333] dark:text-indigo-600"
        >
          <Icon name="mingcute:time-fill" size="18" class="pr-1" />
          <span>发布于 {{ createTime(item.createTime) }}</span>
        </p>
      </div>
      <h4
        class="post-title-link my-6 cursor-pointer text-xl hover:text-orange-500 hover:dark:text-indigo-500"
        @click="router.push(`/post/${item.id}`)"
      >
        {{ item.articleTitle }}
      </h4>
      <div class="flex justify-end text-xs group-even:justify-start">
        <p class="mr-4 flex items-center">
          <Icon name="mdi:eye" size="16" class="text-orange-500 dark:text-indigo-600" />
          <span class="ml-1">181 热度</span>
        </p>
        <p class="mr-4 flex items-center">
          <Icon name="fe:comment" size="16" class="text-orange-500 dark:text-indigo-600" />
          <span class="ml-1">4 条评论</span>
        </p>
        <p class="mr-4 flex items-center">
          <Icon
            name="material-symbols:files"
            size="16"
            class="text-orange-500 dark:text-indigo-600"
          />
          <span class="ml-1">{{ item.category.categoryName }}</span>
        </p>
      </div>
      <div class="text-15 pt-3 pb-5">
        <p class="multiline-ellipsis">{{ $markdownItContent(item.articleContent) }}</p>
      </div>
      <div class="read-article flex justify-end group-even:justify-start max-md:hidden">
        <NuxtLink :to="`/post/${item.id}`">
          <Icon name="ion:ellipsis-horizontal" size="26" />
        </NuxtLink>
      </div>
    </div>
  </li>
</template>
