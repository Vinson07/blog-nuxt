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
    class="emergence shadow-v-box-sh hover:shadow-v-box-sh-hover dark:shadow-v-box-sh-dark dark:hover:shadow-v-box-sh-hover-dark group/item dark:bg-v-bg-trans-dark bg-v-bg-trans mb-10 overflow-hidden rounded-lg transition-shadow duration-500 even:flex-row-reverse md:flex md:h-[300px]"
  >
    <div class="overflow-hidden max-md:h-56 md:flex-[1.4]">
      <TheImage :src="item.articleCover" />
    </div>
    <div class="px-8 pt-5 text-right group-even/item:text-left md:flex-1">
      <div
        class="content-top flex items-center justify-end text-xs group-even/item:flex-row-reverse"
      >
        <p v-if="item.isTop" class="mx-4 flex items-center">
          <Icon name="ant-design:pushpin-filled" size="16" class="text-v-hc dark:text-v-hc-dark" />
          <span class="text-v-hc dark:text-v-hc-dark ml-1">顶置</span>
        </p>
        <p
          class="text-v-hc dark:text-v-hc-dark rounded-md bg-[#fccd0026] py-1 px-2 dark:bg-[#333333]"
        >
          <Icon name="mingcute:time-fill" size="18" class="pr-1" />
          <span>发布于 {{ createTime(item.createTime) }}</span>
        </p>
      </div>
      <h4
        class="post-title-link hover:text-v-hc hover:dark:text-v-hc-dark my-6 cursor-pointer text-xl"
        @click="router.push(`/post/${item.id}`)"
      >
        {{ item.articleTitle }}
      </h4>
      <div class="flex justify-end text-xs group-even/item:justify-start">
        <p class="mr-4 flex items-center">
          <Icon name="mdi:eye" size="16" class="text-v-hc dark:text-v-hc-dark" />
          <span class="ml-1">181 热度</span>
        </p>
        <p class="mr-4 flex items-center">
          <Icon name="fe:comment" size="16" class="text-v-hc dark:text-v-hc-dark" />
          <span class="ml-1">4 条评论</span>
        </p>
        <p class="mr-4 flex items-center">
          <Icon name="material-symbols:files" size="16" class="text-v-hc dark:text-v-hc-dark" />
          <span class="ml-1">{{ item.category.categoryName }}</span>
        </p>
      </div>
      <div class="text-15 pt-3 pb-5">
        <p class="multiline-ellipsis">{{ $markdownItContent(item.articleContent) }}</p>
      </div>
      <div class="read-article flex justify-end group-even/item:justify-start max-md:hidden">
        <NuxtLink :to="`/post/${item.id}`">
          <Icon
            class="hover:text-v-hc hover:dark:text-v-hc-dark"
            name="ion:ellipsis-horizontal"
            size="26"
          />
        </NuxtLink>
      </div>
    </div>
  </li>
</template>
