<script setup lang="ts">
import type { ArticleRecommend } from '@/types/article'

defineProps<{ list: ArticleRecommend[] | null }>()

const router = useRouter()
</script>

<template>
  <div
    v-if="list && list.length > 0"
    class="recommend mb-5 w-[inherit] rounded px-5 shadow-md dark:bg-neutral-800"
  >
    <div class="border-b py-4 text-base font-medium dark:border-amber-300">推荐文章</div>
    <ul class="pb-1 text-sm">
      <li
        v-for="item in list"
        :key="item.id"
        class="text-15 my-3 cursor-pointer rounded py-1 px-2 hover:bg-gray-200 dark:hover:bg-indigo-500"
        @click="router.push(`/post/${item.id}`)"
      >
        <p>{{ item.articleTitle }}</p>
        <p class="pt-1 text-gray-400">
          <span>20点赞</span>
          <Icon name="bi:dot" />
          <span>10评论</span>
        </p>
      </li>
    </ul>
  </div>
</template>
